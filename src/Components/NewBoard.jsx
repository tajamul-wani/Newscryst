import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';
import ArticleDetailModal from './ArticleDetailModal';
import FilterBar from './FilterBar';
import { getCacheItem, setCacheItem, buildCacheKey, CACHE_TTL } from '../services/cacheService';
import { getReadTimeMinutes } from '../services/aiService';

const PAGE_SIZE = 12;

const NewBoard = ({
  category,
  searchTerm,
  onSearch,
  showFavoritesOnly,
  favorites,
  isFavorite,
  onToggleFavorite,
  darkMode,
  isOnline,
  onSetLoading,
  onShowToast,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataCached, setIsDataCached] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  const [readFilter, setReadFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, searchTerm, showFavoritesOnly]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, searchTerm, showFavoritesOnly, readFilter, sortBy]);

  useEffect(() => {
    if (onSetLoading) onSetLoading(loading);
  }, [loading, onSetLoading]);

  useEffect(() => {
    if (showFavoritesOnly) return;

    const controller = new AbortController();
    const signal = controller.signal;

    if (searchTerm) {
      fetchSearchResults(searchTerm, signal);
    } else {
      fetchNewsByCategory(category, signal);
    }

    return () => {
      controller.abort();
    };
  }, [category, searchTerm, showFavoritesOnly]);

  const fetchNewsByCategory = async (selectedCategory, signal) => {
    const queryCategory = selectedCategory || 'general';
    const cacheKey = buildCacheKey('news_cat', queryCategory);

    const cached = getCacheItem(cacheKey);
    if (cached && cached.data && cached.data.length > 0) {
      setArticles(cached.data);
      setIsDataCached(true);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsDataCached(false);

    try {
      const response = await fetch(
        `/api/news?type=latest&category=${encodeURIComponent(queryCategory)}`,
        { signal }
      );
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || `News service error (${response.status})`);
      }

      const rawNews = data?.news || [];
      const cleanArticles = rawNews.filter(
        (article) =>
          article.title &&
          article.title.length > 15 &&
          article.description &&
          article.description.length > 20
      );

      if (cleanArticles.length > 0) {
        setCacheItem(cacheKey, cleanArticles, CACHE_TTL.NEWS_CATEGORY);
      }
      setArticles(cleanArticles);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.warn('[NewBoard] News fetch failed:', err.message);
      setError(err.message || 'Failed to load news.');
      setArticles([]);
    } finally {
      if (signal && !signal.aborted) {
        setLoading(false);
      }
    }
  };

  const fetchSearchResults = async (query, signal) => {
    const cleanQuery = query.trim().toLowerCase();
    const cacheKey = buildCacheKey('news_search', cleanQuery);

    const cached = getCacheItem(cacheKey);
    if (cached && cached.data) {
      setArticles(cached.data);
      setIsDataCached(true);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsDataCached(false);

    try {
      const response = await fetch(
        `/api/news?type=search&keywords=${encodeURIComponent(cleanQuery)}`,
        { signal }
      );
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || 'Search failed');
      }

      const rawNews = data?.news || [];
      const cleanArticles = rawNews.filter(
        (article) =>
          article.title &&
          article.title.length > 15 &&
          article.description &&
          article.description.length > 20
      );

      setCacheItem(cacheKey, cleanArticles, CACHE_TTL.NEWS_SEARCH);
      setArticles(cleanArticles);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Failed to search news.');
      setArticles([]);
    } finally {
      if (signal && !signal.aborted) {
        setLoading(false);
      }
    }
  };

  const baseArticles = showFavoritesOnly ? favorites : articles;

  const filteredAndSortedArticles = useMemo(() => {
    let list = [...baseArticles];

    if (readFilter === 'quick') {
      list = list.filter((a) => {
        const mins = getReadTimeMinutes(`${a.title} ${a.description}`);
        return mins < 2;
      });
    } else if (readFilter === 'deep') {
      list = list.filter((a) => {
        const mins = getReadTimeMinutes(`${a.title} ${a.description}`);
        return mins >= 2;
      });
    }

    if (sortBy === 'latest') {
      return list.sort((a, b) => new Date(b.published || 0) - new Date(a.published || 0));
    }
    if (sortBy === 'oldest') {
      return list.sort((a, b) => new Date(a.published || 0) - new Date(b.published || 0));
    }
    if (sortBy === 'title') {
      return list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }
    return list;
  }, [baseArticles, readFilter, sortBy]);

  const handleOpenDetail = (article) => {
    setSelectedArticle(article);
    setIsDetailOpen(true);
  };

  const getSubheadingText = () => {
    if (showFavoritesOnly) {
      return 'Articles bookmarked locally on this device.';
    }
    if (searchTerm) {
      return `Articles and reports matching the term "${searchTerm}".`;
    }
    switch (category) {
      case 'technology':
        return 'Engineering developments, computing systems, and hardware updates.';
      case 'business':
        return 'Economic indicators, financial markets, and corporate developments.';
      case 'sports':
        return 'League scores, international competitions, and athlete reporting.';
      case 'health':
        return 'Clinical research, preventative care guidelines, and medical findings.';
      case 'entertainment':
        return 'Film releases, media industry coverage, and cultural reporting.';
      case 'general':
      default:
        return 'Global breaking news and current events verified by wire correspondents.';
    }
  };

  return (
    <main className={`min-h-screen pt-6 pb-16 transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Offline banner */}
      {!isOnline && (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-4">
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 p-3 rounded-xl text-xs flex items-center justify-between">
            <span className="font-medium">
              Offline mode: Serving cached feeds from local storage.
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider">Cached Feeds Active</span>
          </div>
        </div>
      )}

      {/* Feed Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight capitalize text-slate-900 dark:text-white">
              {showFavoritesOnly ? 'Saved Articles' : searchTerm ? `Search: ${searchTerm}` : `${category} News`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
              {getSubheadingText()}
            </p>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {isDataCached && !showFavoritesOnly && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Cached
              </span>
            )}

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {showFavoritesOnly
                ? `${favorites.length} saved`
                : `${filteredAndSortedArticles.length} articles`}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Trending Tags Bar */}
      {!showFavoritesOnly && (
        <FilterBar
          category={category}
          searchTerm={searchTerm}
          onSearch={onSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
          readFilter={readFilter}
          onReadFilterChange={setReadFilter}
          darkMode={darkMode}
        />
      )}

      {/* Skeleton Loading State */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto px-4 my-16 text-center">
          <div className="rounded-2xl p-8 border border-red-200 dark:border-red-900/40 bg-white dark:bg-slate-800 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Feed Notice</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">{error}</p>
            <button
              onClick={() => fetchNewsByCategory(category)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      ) : filteredAndSortedArticles.length === 0 ? (
        <div className="max-w-md mx-auto px-4 my-20 text-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No articles found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {showFavoritesOnly
              ? 'No articles have been saved yet. Click Save on any article card to keep it here.'
              : 'Try selecting a different filter or search for alternative topics.'}
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <section className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedArticles.slice(0, visibleCount).map((news, index) => (
              <NewsCard
                key={`${news.url || news.title}-${index}`}
                news={news}
                priority={index < 4}
                isFavorite={isFavorite(news.url)}
                onToggleFavorite={onToggleFavorite}
                onOpenDetail={handleOpenDetail}
                onShowToast={onShowToast}
              />
            ))}
          </section>

          {visibleCount < filteredAndSortedArticles.length && (
            <div className="flex flex-col items-center gap-2 mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 px-8 rounded-xl shadow-md transition-all"
              >
                Load more
              </button>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Showing {Math.min(visibleCount, filteredAndSortedArticles.length)} of {filteredAndSortedArticles.length}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Article Detail Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isFavorite={selectedArticle ? isFavorite(selectedArticle.url) : false}
        onToggleFavorite={onToggleFavorite}
        onShowToast={onShowToast}
      />
    </main>
  );
};

NewBoard.propTypes = {
  category: PropTypes.string,
  searchTerm: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  showFavoritesOnly: PropTypes.bool,
  favorites: PropTypes.arrayOf(PropTypes.object),
  isFavorite: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool,
  onSetLoading: PropTypes.func,
  onShowToast: PropTypes.func,
};

NewBoard.defaultProps = {
  category: 'general',
  searchTerm: '',
  showFavoritesOnly: false,
  favorites: [],
  isOnline: true,
};

export default NewBoard;

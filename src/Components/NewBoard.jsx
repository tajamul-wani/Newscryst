import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';

// 10-minute Time-To-Live (TTL) for caching
const CACHE_TTL = 10 * 60 * 1000;

const setCache = (key, data) => {
  try {
    const cacheObject = { timestamp: Date.now(), articles: data };
    localStorage.setItem(key, JSON.stringify(cacheObject));
  } catch (e) {
    console.warn("Failed to write to localStorage cache:", e);
  }
};

const getCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { timestamp, articles } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return articles;
    }
    localStorage.removeItem(key);
  } catch (e) {
    console.warn("Failed to read from localStorage cache:", e);
  }
  return null;
};

const NewBoard = ({ category, searchTerm, showFavoritesOnly, favorites, isFavorite, onToggleFavorite, darkMode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayArticles, setDisplayArticles] = useState([]);

  // Scroll to top when category, search query, or favorites toggles
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, searchTerm, showFavoritesOnly]);

  // Trigger news fetch when category or searchTerm changes, or showFavoritesOnly changes
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

  // Sync displayArticles when articles, favorites or showFavoritesOnly changes
  useEffect(() => {
    if (showFavoritesOnly) {
      setDisplayArticles(favorites);
    } else {
      setDisplayArticles(articles);
    }
  }, [articles, favorites, showFavoritesOnly]);

  const fetchJson = async (url, signal) => {
    const response = await fetch(url, { signal });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || `API Error: ${response.status} ${response.statusText || ''}`.trim());
    }

    return data;
  };

  const fetchNewsByCategory = async (selectedCategory, signal) => {
    const queryCategory = selectedCategory || "general";
    const cacheKey = `news_cryst_cat_${queryCategory}`;

    // Read from cache
    const cachedArticles = getCache(cacheKey);
    if (cachedArticles) {
      setArticles(cachedArticles);
      setDisplayArticles(cachedArticles);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API;

      if (!apiKey) {
        setError("API key is not configured. Please check your environment variables.");
        setLoading(false);
        return;
      }

      const url = `https://api.currentsapi.services/v1/latest-news?language=en&category=${encodeURIComponent(queryCategory)}&apiKey=${apiKey}`;
      const data = await fetchJson(url, signal);

      if (!data || !data.news) {
        throw new Error(data?.error || data?.message || 'Failed to fetch news');
      }

      const filteredArticles = (data.news || []).filter(
        article => 
          article.title && 
          article.title.length > 15 &&
          article.description &&
          article.description.length > 20
      );

      // Save to cache
      setCache(cacheKey, filteredArticles);

      setArticles(filteredArticles);
      setDisplayArticles(filteredArticles);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || "Failed to fetch news. Please check your internet connection and try again.");
      console.error("Fetch error:", err);
      setArticles([]);
      setDisplayArticles([]);
    } finally {
      if (signal && !signal.aborted) {
        setLoading(false);
      }
    }
  };

  const fetchSearchResults = async (query, signal) => {
    const cleanQuery = query.trim().toLowerCase();
    const cacheKey = `news_cryst_search_${cleanQuery}`;

    // Read from cache
    const cachedArticles = getCache(cacheKey);
    if (cachedArticles) {
      setArticles(cachedArticles);
      setDisplayArticles(cachedArticles);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API;

      if (!apiKey) {
        setError("API key is not configured. Please check your environment variables.");
        setLoading(false);
        return;
      }

      const url = `https://api.currentsapi.services/v1/search?language=en&keywords=${encodeURIComponent(query)}&apiKey=${apiKey}`;

      const data = await fetchJson(url, signal);

      if (!data || !data.news) {
        throw new Error(data?.error || data?.message || 'Search failed');
      }

      const filteredArticles = (data.news || []).filter(
        article => 
          article.title && 
          article.title.length > 15 &&
          article.description &&
          article.description.length > 20
      );

      // Save to cache
      setCache(cacheKey, filteredArticles);

      setArticles(filteredArticles);
      setDisplayArticles(filteredArticles);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || "Search failed. Please try again.");
      console.error("Search error:", err);
      setArticles([]);
      setDisplayArticles([]);
    } finally {
      if (signal && !signal.aborted) {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-slate-900' : 'bg-slate-50'} min-h-screen pt-10 pb-10 md:pt-12 md:pb-16 lg:pt-8 lg:pb-20`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className={`rounded-lg p-8 max-w-md text-center border-2 ${darkMode ? 'bg-slate-800 border-red-500' : 'bg-white border-red-300'}`}>
          <p className={`text-2xl mb-2`}>⚠️</p>
          <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Error</p>
          <p className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-4`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (displayArticles.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className={`text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p className="text-4xl mb-3">📰</p>
          <p className="text-xl font-semibold mb-2">No articles found</p>
          <p className="text-sm opacity-75">Try searching for different terms or select another category</p>
        </div>
      </div>
    );
  }

  const getSubheadingText = () => {
    if (showFavoritesOnly) {
      return "Your personal collection of saved stories, bookmarked locally in your browser for easy offline reference.";
    }
    if (searchTerm) {
      return `Explore curated news articles and trending reports matching your custom search for "${searchTerm}".`;
    }
    
    switch (category) {
      case 'technology':
        return "Discover the latest tech advancements, hardware releases, computer science innovations, and digital trends shaping our future.";
      case 'business':
        return "Stay informed with venture insights, commercial updates, global economic indicators, and fiscal reporting.";
      case 'sports':
        return "Track game results, athlete interviews, athletic championships, and real-time summaries across global tournaments.";
      case 'health':
        return "Read clinical updates, wellness breakthroughs, medical research research, and safety announcements from around the globe.";
      case 'entertainment':
        return "Dive into show business, cinematic releases, television awards, music charts, and cultural events updating live.";
      case 'general':
      default:
        return "Your daily portal to curated headlines, global news flashes, and trending coverage updated in real-time.";
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-900' : 'bg-slate-50'} min-h-screen pt-10 pb-10 md:pt-12 md:pb-16 lg:pt-8 lg:pb-20`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="mb-6">
          <h1 className={`text-4xl md:text-5xl font-bold mb-2 capitalize ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {showFavoritesOnly ? 'Saved Articles' : searchTerm ? `Search Results` : `${category} News`}
          </h1>
          <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mt-2`}>
            {getSubheadingText()}
          </p>
          <div className="mt-4 flex">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
            }`}>
              {showFavoritesOnly 
                ? `Saved: ${favorites.length} ${favorites.length === 1 ? 'article' : 'articles'}`
                : `Showing ${displayArticles.length} articles`
              }
            </span>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <section className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
          {displayArticles.map((news, index) => (
            <NewsCard
              key={`${news.url}-${index}`}
              news={news}
              isFavorite={isFavorite(news.url)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

NewBoard.propTypes = {
  category: PropTypes.string,
  searchTerm: PropTypes.string,
  showFavoritesOnly: PropTypes.bool,
  favorites: PropTypes.arrayOf(PropTypes.object),
  isFavorite: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  darkMode: PropTypes.bool,
};

NewBoard.defaultProps = {
  category: 'general',
  searchTerm: '',
  showFavoritesOnly: false,
  favorites: [],
  darkMode: true,
};

export default NewBoard;

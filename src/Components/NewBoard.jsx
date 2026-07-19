import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import NewsCard from './NewsCard';

const NewBoard = ({ category, searchTerm, showFavoritesOnly, favorites, isFavorite, onToggleFavorite, darkMode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayArticles, setDisplayArticles] = useState([]);

  useEffect(() => {
    if (showFavoritesOnly) {
      setDisplayArticles(favorites);
      return;
    }

    if (searchTerm) {
      fetchSearchResults(searchTerm);
    } else {
      fetchNewsByCategory(category);
    }
  }, [category, searchTerm, showFavoritesOnly, favorites]);

  const fetchJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || `API Error: ${response.status} ${response.statusText || ''}`.trim());
    }

    return data;
  };

  const fetchNewsByCategory = async (selectedCategory) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API;
      const queryCategory = selectedCategory || "general";

      if (!apiKey) {
        setError("API key is not configured. Please check your environment variables.");
        setLoading(false);
        return;
      }

      const url = `https://gnews.io/api/v4/top-headlines?category=${encodeURIComponent(queryCategory)}&lang=en&apikey=${apiKey}`;
      const data = await fetchJson(url);

      if (!data || !data.articles) {
        throw new Error(data?.errors?.[0] || 'Failed to fetch news');
      }

      const filteredArticles = (data.articles || []).filter(
        (article) =>
          article.title &&
          article.description &&
          article.url &&
          article.source &&
          article.source.name
      );

      setArticles(filteredArticles);
      setDisplayArticles(filteredArticles);
    } catch (err) {
      setError(err.message || "Failed to fetch news. Please check your internet connection and try again.");
      console.error("Fetch error:", err);
      setArticles([]);
      setDisplayArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API;

      if (!apiKey) {
        setError("API key is not configured. Please check your environment variables.");
        setLoading(false);
        return;
      }

      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&apikey=${apiKey}`;

      const data = await fetchJson(url);

      if (!data || !data.articles) {
        throw new Error(data?.errors?.[0] || 'Search failed');
      }

      const filteredArticles = (data.articles || []).filter(
        (article) =>
          article.title &&
          article.description &&
          article.url &&
          article.source &&
          article.source.name
      );

      setArticles(filteredArticles);
      setDisplayArticles(filteredArticles);
    } catch (err) {
      setError(err.message || "Search failed. Please try again.");
      console.error("Search error:", err);
      setArticles([]);
      setDisplayArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
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

  return (
    <div className={`${darkMode ? 'bg-slate-900' : 'bg-slate-50'} min-h-screen py-8`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="mb-6">
          <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {showFavoritesOnly ? 'Saved Articles' : searchTerm ? `Search Results for "${searchTerm}"` : 'Latest News'}
          </h1>
          <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {showFavoritesOnly 
              ? `You have ${favorites.length} saved ${favorites.length === 1 ? 'article' : 'articles'}`
              : `Showing ${displayArticles.length} articles`
            }
          </p>
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

import PropTypes from 'prop-types';
import Image from '../assets/BN.png';
import { useState } from 'react';

const NewsCard = ({ news, isFavorite, onToggleFavorite }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <article 
      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-slate-200 dark:border-slate-700"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
        <img 
          src={imageError ? Image : (news.urlToImage || Image)} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" 
          alt={news.title}
          onError={handleImageError}
        />
        {/* Source Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
          {news.source.name.substring(0, 18)}
        </div>
        
        {/* Favorite Button - Top Left */}
        <button
          onClick={() => onToggleFavorite(news)}
          className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
            isFavorite 
              ? 'bg-red-500 hover:bg-red-600 scale-100' 
              : 'bg-white/80 hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-700 hover:scale-110'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label="Toggle favorite"
        >
          <span className={`text-lg transition-all duration-200 ${isFavorite ? 'scale-100' : 'scale-90'}`}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between p-3 flex-grow">
        {/* Title */}
        <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white leading-tight mb-2 line-clamp-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {news.title || "Breaking News"}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-2 line-clamp-2">
          {news.description || "Latest breaking news and headlines"}
        </p>

        {/* Meta Information */}
        <div className="space-y-1 mb-3 text-xs text-slate-500 dark:text-slate-500">
          <p>📅 {formatDate(news.publishedAt)}</p>
          {news.author && (
            <p className="truncate">By {news.author}</p>
          )}
        </div>

        {/* Read More Button */}
        <a 
          href={news.url} 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-2 rounded-md font-medium text-sm transition-all duration-200 text-center"
        >
          Read Full Article
        </a>
      </div>
    </article>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    url: PropTypes.string.isRequired,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    publishedAt: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

export default NewsCard;

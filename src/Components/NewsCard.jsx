import PropTypes from 'prop-types';
import ImageFallback from '../assets/BN.png';
import { useState, useRef, useEffect } from 'react';
import { estimateReadTime, detectTone } from '../services/aiService';
import { isSafeUrl, getSafeLinkProps } from '../utils/security';

const NewsCard = ({ news, isFavorite, onToggleFavorite, onOpenDetail, onShowToast, priority }) => {
  const imgRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle images already loaded from cache before React attached onLoad
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsImageLoaded(true);
    }
  }, []);

  const getOptimizedImageUrl = (originalUrl, width = 500) => {
    if (!originalUrl || originalUrl === 'None') return ImageFallback;
    if (originalUrl.startsWith('/') || originalUrl.startsWith('data:')) return originalUrl;
    
    let cleanUrl = originalUrl;
    if (cleanUrl.startsWith('//')) {
      cleanUrl = 'https:' + cleanUrl;
    }
    
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&h=${Math.round(width * 0.56)}&fit=cover&output=webp&q=75`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const fullText = `${news.title || ''} ${news.description || ''}`;
  const readTime = estimateReadTime(fullText);
  const tone = detectTone(fullText);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    if (news.url && isSafeUrl(news.url)) {
      navigator.clipboard.writeText(news.url);
      if (onShowToast) {
        onShowToast('Article link copied to clipboard', 'success');
      }
    }
  };

  const handleOpenDetail = (e) => {
    e.preventDefault();
    if (onOpenDetail) {
      onOpenDetail(news);
    }
  };

  return (
    <article 
      className="glass-panel group animate-fade-in hover-glow rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 cursor-pointer"
      onClick={handleOpenDetail}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0">
        {!isImageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">
            Loading
          </div>
        )}

        <img 
          ref={imgRef}
          src={imageError ? ImageFallback : getOptimizedImageUrl(news.image || news.urlToImage)} 
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} 
          alt={news.title || 'News image'}
          onError={() => setImageError(true)}
          onLoad={() => setIsImageLoaded(true)}
          srcSet={
            imageError || !news.image && !news.urlToImage
              ? undefined
              : `${getOptimizedImageUrl(news.image || news.urlToImage, 400)} 400w, ${getOptimizedImageUrl(news.image || news.urlToImage, 800)} 800w`
          }
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />

        {/* Source Badge */}
        <div className="absolute top-2.5 right-2.5 bg-slate-950/75 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-md border border-white/10">
          {(news.author || 'Currents News').substring(0, 18)}
        </div>
        
        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(news);
          }}
          className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 shadow-md backdrop-blur-md ${
            isFavorite 
              ? 'bg-red-600 text-white shadow-red-500/30' 
              : 'bg-white/90 hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
          title={isFavorite ? 'Remove from saved' : 'Save article'}
          aria-label="Toggle bookmark"
        >
          {isFavorite ? 'Saved' : 'Save'}
        </button>

        {/* Read Time and Tone Badge */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="bg-slate-950/75 text-slate-200 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-medium border border-white/10">
            {readTime}
          </span>
          <span className="bg-slate-950/75 text-slate-200 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-medium border border-white/10">
            {tone.label}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          {/* Title */}
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {news.title || 'Breaking News'}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">
            {news.description || 'Recent reporting and official statements from news correspondents.'}
          </p>
        </div>

        {/* Footer Meta & Actions */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-500">
            <span>{formatDate(news.published)}</span>
            <button
              onClick={handleCopyLink}
              className="hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded transition-colors font-medium"
              title="Copy article link"
            >
              Share Link
            </button>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenDetail}
              className="flex-1 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center transition-all"
              title="View Key Facts"
            >
              Key Facts
            </button>

            {news.url && isSafeUrl(news.url) && (
              <a 
                href={news.url} 
                {...getSafeLinkProps()}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl text-xs font-medium transition-all text-center"
                title="Open original source"
              >
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string.isRequired,
    published: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func.isRequired,
  onOpenDetail: PropTypes.func,
  onShowToast: PropTypes.func,
  priority: PropTypes.bool,
};

export default NewsCard;

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ImageFallback from '../assets/BN.png';
import { getArticleAiSummary, speechReader } from '../services/aiService';
import { isSafeUrl, getSafeLinkProps } from '../utils/security';

const ArticleDetailModal = ({ article, isOpen, onClose, isFavorite, onToggleFavorite, onShowToast }) => {
  const [aiData, setAiData] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isOpen || !article) {
      speechReader.stop();
      setIsSpeaking(false);
      setAiData(null);
      setAiError(null);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    let isCancelled = false;
    setLoadingAi(true);
    setAiError(null);

    getArticleAiSummary(article)
      .then((data) => {
        if (!isCancelled) {
          setAiData(data);
          setLoadingAi(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setAiError(err.message || 'Unable to generate summary');
          setLoadingAi(false);
        }
      });

    return () => {
      isCancelled = true;
      speechReader.stop();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, article, onClose]);

  if (!isOpen || !article) return null;

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechReader.stop();
      setIsSpeaking(false);
    } else {
      const textToSpeak = aiData
        ? `${article.title}. ${aiData.summaryText}`
        : `${article.title}. ${article.description || ''}`;

      setIsSpeaking(true);
      speechReader.speak(
        textToSpeak,
        speechRate,
        () => setIsSpeaking(false),
        (err) => {
          setIsSpeaking(false);
          if (onShowToast) onShowToast(err, 'warning');
        }
      );
    }
  };

  const handleCopyLink = () => {
    if (article.url && isSafeUrl(article.url)) {
      navigator.clipboard.writeText(article.url);
      if (onShowToast) {
        onShowToast('Article link copied to clipboard', 'success');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share && article.url) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const cleanImageUrl = () => {
    if (imageError) return ImageFallback;
    const raw = article.image || article.urlToImage;
    if (!raw || raw === 'None') return ImageFallback;
    let clean = raw.startsWith('//') ? 'https:' + raw : raw;
    return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=800&h=450&fit=cover&output=webp&q=80`;
  };

  const formattedDate = article.published
    ? new Date(article.published).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header and Image */}
        <div className="relative h-44 sm:h-56 md:h-64 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex-shrink-0">
          <img
            src={cleanImageUrl()}
            alt={article.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-all shadow-sm"
            aria-label="Close modal"
          >
            Close
          </button>

          {/* Source and Read Time Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
            <span className="bg-blue-600 text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
              {article.author || 'Currents News'}
            </span>
            {aiData?.readTime && (
              <span className="bg-slate-900/80 text-slate-200 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full border border-slate-700/60 backdrop-blur-md">
                {aiData.readTime}
              </span>
            )}
          </div>

          {/* Bottom Badges */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-300">
            <span className="text-[11px] sm:text-xs">Published {formattedDate}</span>
            {aiData?.tone && (
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-semibold ${aiData.tone.color}`}>
                {aiData.tone.label}
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 sm:space-y-5">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {article.title}
          </h2>

          {/* Key Facts Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5 sm:p-5">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Key Facts
              </h4>
              {aiData?.isCached && (
                <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Cached
                </span>
              )}
            </div>

            {loadingAi ? (
              <div className="space-y-2 py-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">Loading summary</p>
                <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded w-5/6 animate-pulse"></div>
                <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded w-4/5 animate-pulse"></div>
              </div>
            ) : aiError ? (
              <p className="text-xs text-amber-600 dark:text-amber-400">{aiError}</p>
            ) : aiData?.takeaways ? (
              <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                {aiData.takeaways.map((point, idx) => (
                  <li key={idx} className="pl-1">
                    <span>{point}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {article.description}
              </p>
            )}

            {/* Audio Reader Controls */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleSpeech}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSpeaking
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {isSpeaking ? 'Stop Audio' : 'Play Audio'}
                </button>

                <select
                  value={speechRate}
                  onChange={(e) => setSpeechRate(Number(e.target.value))}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
                  title="Audio playback speed"
                >
                  <option value={0.8}>0.8x</option>
                  <option value={1.0}>1.0x</option>
                  <option value={1.2}>1.2x</option>
                  <option value={1.5}>1.5x</option>
                </select>
              </div>

              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {aiData?.engine || 'Local Summarizer'}
              </span>
            </div>
          </div>

          {/* Full description */}
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Article Overview
            </h5>
            <p>{article.description || 'No additional article details available from source.'}</p>
          </div>
        </div>

        {/* Modal Footer: Fully responsive on mobile */}
        <div className="p-3.5 sm:p-4 md:p-5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(article)}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                isFavorite
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {isFavorite ? 'Saved' : 'Save Article'}
            </button>

            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-center transition-all"
            >
              Share
            </button>
          </div>

          {article.url && isSafeUrl(article.url) && (
            <a
              href={article.url}
              {...getSafeLinkProps()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md transition-all text-center"
            >
              Read Source Article
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ArticleDetailModal.propTypes = {
  article: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func.isRequired,
  onShowToast: PropTypes.func,
};

export default ArticleDetailModal;

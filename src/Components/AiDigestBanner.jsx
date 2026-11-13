import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getCategoryAiDigest, speechReader } from '../services/aiService';

const AiDigestBanner = ({ topic, articles, darkMode, onShowToast }) => {
  const [digest, setDigest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setDigest(null);
    setIsExpanded(false);
    speechReader.stop();
    setIsSpeaking(false);
  }, [topic]);

  const handleGenerateDigest = async () => {
    if (!articles || articles.length === 0) return;
    setLoading(true);
    setIsExpanded(true);

    try {
      const data = await getCategoryAiDigest(topic, articles);
      setDigest(data);
    } catch (err) {
      if (onShowToast) {
        onShowToast('Could not generate digest: ' + err.message, 'warning');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechReader.stop();
      setIsSpeaking(false);
    } else if (digest?.briefing) {
      setIsSpeaking(true);
      speechReader.speak(
        digest.briefing,
        1.0,
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  if (!articles || articles.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-5 sm:mb-6">
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        darkMode
          ? 'bg-slate-900/60 border-slate-800/80 shadow-lg shadow-blue-950/20'
          : 'bg-white border-blue-100 shadow-sm shadow-blue-500/5'
      }`}>
        <div className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md text-xs font-bold uppercase tracking-wider flex-shrink-0">
              News
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white capitalize truncate">
                  {topic} Executive Summary
                </h3>
                {digest?.isCached && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    Cached
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Curated overview of primary headlines in this section
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
            {digest && (
              <button
                onClick={handleToggleSpeech}
                className={`flex-1 sm:flex-none px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isSpeaking
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
                title={isSpeaking ? 'Stop audio' : 'Listen to briefing'}
              >
                <span>{isSpeaking ? 'Stop' : 'Audio'}</span>
              </button>
            )}

            {!digest && !loading ? (
              <button
                onClick={handleGenerateDigest}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition-all"
              >
                <span>Generate Summary</span>
              </button>
            ) : digest ? (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium"
              >
                {isExpanded ? 'Hide' : 'Show'}
              </button>
            ) : null}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Loading executive summary</span>
            </div>
            <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse"></div>
            <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-4/5 animate-pulse"></div>
          </div>
        )}

        {/* Expanded Briefing Content */}
        {digest && isExpanded && !loading && (
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80 animate-fade-in">
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                {digest.briefing}
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex-wrap gap-1">
                <span>Derived from {digest.headlineCount} verified articles</span>
                <span>{digest.engine}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AiDigestBanner.propTypes = {
  topic: PropTypes.string.isRequired,
  articles: PropTypes.array,
  darkMode: PropTypes.bool.isRequired,
  onShowToast: PropTypes.func,
};

export default AiDigestBanner;

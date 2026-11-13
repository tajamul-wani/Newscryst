import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getCacheSizeKb, clearAppCache } from '../services/cacheService';
import { getGeminiApiKey, saveGeminiApiKey } from '../services/aiService';

const SettingsModal = ({ isOpen, onClose, darkMode, setDarkMode, favorites = [], onShowToast }) => {
  const [cacheSize, setCacheSize] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCacheSize(getCacheSizeKb());
      setApiKey(getGeminiApiKey());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    saveGeminiApiKey(apiKey);
    if (onShowToast) {
      onShowToast(
        apiKey ? 'Custom Gemini API key saved' : 'Switched to local summarizer',
        'success'
      );
    }
  };

  const handleClearCache = () => {
    const cleared = clearAppCache();
    setCacheSize(getCacheSizeKb());
    if (onShowToast) {
      onShowToast(`Cleared ${cleared} cached news entries`, 'info');
    }
  };

  const handleExportFavorites = () => {
    if (!favorites || favorites.length === 0) {
      if (onShowToast) onShowToast('No saved articles to export', 'warning');
      return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `newscryst-bookmarks-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (onShowToast) onShowToast(`Exported ${favorites.length} saved bookmarks`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Preferences and Storage
          </h3>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-sm">
          {/* Theme Section */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">
              Appearance Theme
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                onClick={() => setDarkMode(false)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${
                  !darkMode
                    ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Light Mode
              </button>
              <button
                onClick={() => setDarkMode(true)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${
                  darkMode
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Dark Mode
              </button>
            </div>
          </div>

          {/* Bookmarks Backup */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">
                  Export Saved Articles
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {favorites.length} {favorites.length === 1 ? 'article' : 'articles'} in local storage
                </p>
              </div>
              <button
                onClick={handleExportFavorites}
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-colors text-center"
              >
                Download JSON
              </button>
            </div>
          </div>

          {/* Cache Management */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">
                  Local Cache Storage
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Currently using {cacheSize} KB of local cache
                </p>
              </div>
              <button
                onClick={handleClearCache}
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 transition-colors text-center"
              >
                Clear Cache
              </button>
            </div>
          </div>

          {/* Optional Gemini API Key */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">
                Google Gemini API Key (Optional)
              </label>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                Client Only
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Leave blank to use the built-in local natural language summarizer.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 pr-14 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium"
                >
                  {showKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <button
                onClick={handleSaveKey}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md text-center"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  favorites: PropTypes.array,
  onShowToast: PropTypes.func,
};

export default SettingsModal;

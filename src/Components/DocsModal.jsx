import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const DocsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('caching');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'caching', label: 'Caching and Speed' },
    { id: 'ai', label: 'AI Optimization' },
    { id: 'safety', label: 'Security and Privacy' },
    { id: 'ui', label: 'Interface and Controls' },
    { id: 'shortcuts', label: 'Shortcuts and API' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 flex-shrink-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-none">
              NewsCryst Documentation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              System architecture, caching policies, and security reference
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
            aria-label="Close documentation"
          >
            Close
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 overflow-x-auto gap-2 bg-slate-100/50 dark:bg-slate-950/30 flex-shrink-0 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {activeTab === 'caching' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
                <h4 className="font-bold mb-1">
                  Multi-Tier Caching Architecture
                </h4>
                <p className="text-xs leading-relaxed">
                  NewsCryst implements a dual-tier cache combining in-memory records with persistent local storage. Configured expiration periods prevent redundant HTTP requests and eliminate rate limit penalties.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Category Feeds and Search</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">15 Minute TTL</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                    Category switches and repeated keyword searches read from local memory without invoking additional network calls.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Article Summaries</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">24 Hour TTL</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                    Generated article summaries are saved for 24 hours. Reopening an article displays the summary instantly with zero latency.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Category Digests</span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">1 Hour TTL</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                    Synthesizes the leading reports in each category in a single request, preserved across the active reading session.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Storage Safety</span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">Auto Purge</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                    Expired cache records are evicted periodically. Emergency eviction runs automatically if browser storage quotas are approached.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200">
                <h4 className="font-bold mb-1">
                  Request-Conscious Processing
                </h4>
                <p className="text-xs leading-relaxed">
                  The summarization engine enforces on-demand execution, in-flight request deduplication, and client-side heuristic fallbacks to prevent excessive API consumption.
                </p>
              </div>

              <div className="space-y-3">
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    On-Demand Execution
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Articles are never summarized automatically in background loops. Summaries are computed solely when requested by the reader.
                  </p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    Request Deduplication
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    If a summary request is currently pending, any duplicate user interactions share the same active promise to prevent parallel requests.
                  </p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    Dual Engine Architecture
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Cloud generation connects to Gemini 1.5 Flash with strict token limits. If no API key is provided or the connection is offline, the client-side natural language summarizer runs instantly in the browser.
                  </p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    Speech Audio Reader
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Utilizes the native Web Speech API to provide audio reading with configurable playback speeds without external audio infrastructure.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
                <h4 className="font-bold mb-1">
                  Security and Link Validation
                </h4>
                <p className="text-xs leading-relaxed">
                  News aggregators interface with third-party web domains. NewsCryst enforces rigorous web security controls to guard against untrusted URI protocols and reverse tabnabbing.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block text-xs">Protocol Whitelisting</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    All outbound article links are verified through a protocol check that rejects non-standard URI schemes including javascript and data protocols.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block text-xs">Offline Operation</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Network connectivity is checked via system listeners. When offline, cached feeds remain accessible without blocking user navigation.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block text-xs">Tabnabbing Prevention</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    All external links use standard security attributes to isolate the opener window object from target destinations.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block text-xs">Credential Isolation</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    API tokens are restricted to local environment files or browser storage and are never transmitted to unauthorized logging services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ui' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200">
                <h4 className="font-bold mb-1">
                  Interface Navigation and Controls
                </h4>
                <p className="text-xs leading-relaxed">
                  Responsive layout features clean visual feedback and accessible controls.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h6 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                    Topic Hashtags
                  </h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Category chips enable targeted search filtering with one click.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h6 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                    Reading Length Filter
                  </h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Filter articles by estimated reading duration.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h6 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                    Top Loading Progress Bar
                  </h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Indicates in-flight network activity across navigation.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h6 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                    Bookmark Backup
                  </h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Export saved articles to a structured JSON file in Settings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Keyboard Shortcuts
              </h4>
              <div className="space-y-2">
                {[
                  { key: 'Esc', desc: 'Close open modals' },
                  { key: '/', desc: 'Focus the search bar' },
                  { key: 'D', desc: 'Toggle dark and light appearance' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{item.desc}</span>
                    <kbd className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 font-mono text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-bold">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                  Environment Configuration
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add tokens to .env.local:
                </p>
                <pre className="mt-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-950 font-mono text-xs overflow-x-auto text-blue-600 dark:text-blue-400">
CURRENTS_API_KEY=your_currents_api_token
VITE_GEMINI_API_KEY=your_gemini_api_key
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

DocsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DocsModal;

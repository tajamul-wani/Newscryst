import PropTypes from 'prop-types';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught render error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleClearAndReload = () => {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('newscryst_cache_')) {
          localStorage.removeItem(k);
        }
      }
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-8">
          <div className="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Application Notice
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-xs sm:text-sm leading-relaxed">
              An unexpected render issue occurred. You can retry immediately or clear the temporary cache to refresh.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all"
              >
                Retry View
              </button>
              <button
                onClick={this.handleClearAndReload}
                className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-all"
              >
                Clear Cache and Refresh
              </button>
            </div>

            {this.state.error && (
              <details className="mt-5 text-left text-[11px] text-slate-400 dark:text-slate-500">
                <summary className="cursor-pointer hover:underline font-medium">Technical details</summary>
                <pre className="mt-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 overflow-x-auto font-mono text-[10px] text-red-500">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;

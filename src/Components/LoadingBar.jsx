import PropTypes from 'prop-types';

const LoadingBar = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-slate-200 dark:bg-slate-800 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 animate-loading-bar w-full"></div>
      {message && (
        <div className="absolute top-2 right-4 bg-slate-900/90 text-white text-xs px-2.5 py-1 rounded-full shadow-lg border border-slate-700/60 backdrop-blur-md flex items-center gap-1.5 animate-fade-in pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

LoadingBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default LoadingBar;


const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        <p className="text-slate-700 dark:text-slate-300 font-medium">Loading latest news...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

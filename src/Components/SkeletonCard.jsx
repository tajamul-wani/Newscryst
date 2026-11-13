const SkeletonCard = () => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 p-3.5 flex flex-col h-full space-y-4 shadow-sm relative">
      {/* Shimmer Image Box */}
      <div className="relative h-48 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer"></div>
      </div>
      
      {/* Title Lines */}
      <div className="space-y-2.5 flex-grow">
        <div className="relative h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded-md w-5/6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded-md w-3/4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      {/* Description Lines */}
      <div className="space-y-2">
        <div className="relative h-3 bg-slate-200/60 dark:bg-slate-800/60 rounded w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative h-3 bg-slate-200/60 dark:bg-slate-800/60 rounded w-4/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      {/* Meta & Actions Skeleton */}
      <div className="pt-2 flex items-center justify-between">
        <div className="h-3 bg-slate-200/70 dark:bg-slate-800/70 rounded w-1/4"></div>
        <div className="h-3 bg-slate-200/70 dark:bg-slate-800/70 rounded w-1/5"></div>
      </div>
      
      {/* Button Row Skeleton */}
      <div className="flex gap-2 pt-1">
        <div className="h-9 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl w-1/3"></div>
        <div className="h-9 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl flex-1"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

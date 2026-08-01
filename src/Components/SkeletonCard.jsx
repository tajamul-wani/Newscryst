const SkeletonCard = () => {
  return (
    <div className="glass-panel rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800/80 p-3 flex flex-col h-full space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-md w-full"></div>
      
      {/* Title Skeleton */}
      <div className="space-y-2.5 flex-grow">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
      </div>
      
      {/* Description Skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 dark:bg-slate-800/60 rounded w-full"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800/60 rounded w-4/5"></div>
      </div>
      
      {/* Meta Skeleton */}
      <div className="h-2.5 bg-slate-200 dark:bg-slate-800/50 rounded w-1/3 mt-2"></div>
      
      {/* Button Skeleton */}
      <div className="h-9 bg-slate-250 dark:bg-slate-800 rounded-md w-full mt-3"></div>
    </div>
  );
};

export default SkeletonCard;

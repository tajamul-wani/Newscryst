import PropTypes from 'prop-types';

const TRENDING_TAGS = {
  general: ['World', 'Elections', 'Economy', 'Climate', 'Policy'],
  technology: ['Artificial Intelligence', 'Semiconductors', 'Cybersecurity', 'Startups', 'Computing'],
  business: ['Markets', 'Finance', 'Inflation', 'Trade', 'Energy'],
  sports: ['Football', 'Basketball', 'Tennis', 'Championships', 'Athletics'],
  health: ['Clinical Trials', 'Public Health', 'Research', 'Nutrition', 'Medicine'],
  entertainment: ['Cinema', 'Television', 'Music', 'Festivals', 'Arts'],
};

const FilterBar = ({
  category,
  searchTerm,
  onSearch,
  sortBy,
  onSortChange,
  readFilter,
  onReadFilterChange,
  darkMode,
}) => {
  const tags = TRENDING_TAGS[category] || TRENDING_TAGS.general;

  const handleTagClick = (tag) => {
    if (searchTerm.toLowerCase() === tag.toLowerCase()) {
      onSearch('');
    } else {
      onSearch(tag);
    }
  };

  return (
    <div className="hidden md:block max-w-7xl mx-auto px-4 mb-6">
      <div className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-3.5 ${
        darkMode 
          ? 'bg-slate-900/50 border-slate-800/80 shadow-md shadow-slate-950/20' 
          : 'bg-white border-slate-200/80 shadow-sm'
      }`}>
        {/* Trending Tags Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:flex-1">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap flex-shrink-0">
            Topics:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {tags.map((tag) => {
              const isSelected = searchTerm.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : darkMode
                      ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters and Sorters: Responsive Grid on Mobile, Flex on Desktop */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
          {/* Read Length Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 w-full sm:w-auto">
            <label htmlFor="read-filter" className="whitespace-nowrap font-medium hidden sm:inline">Length:</label>
            <select
              id="read-filter"
              value={readFilter}
              onChange={(e) => onReadFilterChange(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All lengths</option>
              <option value="quick">Under 2 mins</option>
              <option value="deep">2 mins or more</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 w-full sm:w-auto">
            <label htmlFor="sort-filter" className="whitespace-nowrap font-medium hidden sm:inline">Sort:</label>
            <select
              id="sort-filter"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>

          {/* Clear Active Filters Button */}
          {(searchTerm || readFilter !== 'all' || sortBy !== 'latest') && (
            <button
              onClick={() => {
                onSearch('');
                onReadFilterChange('all');
                onSortChange('latest');
              }}
              className="col-span-2 sm:col-span-1 text-center text-xs font-medium text-red-600 dark:text-red-400 px-2 py-1 rounded-md hover:bg-red-500/10 transition-colors whitespace-nowrap"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  category: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  readFilter: PropTypes.string.isRequired,
  onReadFilterChange: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default FilterBar;

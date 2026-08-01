import logo from '../assets/logo.svg';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Navbar = ({ category, setCategory, darkMode, setDarkMode, favoritesCount, onShowFavorites, showingFavorites, onSearch, searchTerm }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(!!searchTerm);

  // Sync search expand state if search term is cleared externally
  useEffect(() => {
    if (!searchTerm) {
      setIsSearchExpanded(false);
    } else {
      setIsSearchExpanded(true);
    }
  }, [searchTerm]);

  const handleMenuIcon = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCategoryClick = (catVal) => {
    setCategory(catVal);
    setIsNavOpen(false);
    setIsSearchExpanded(false);
  };

  const toggleSearchExpand = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        const input = document.querySelector('input[type="text"]');
        if (input) input.focus();
      }, 100);
    } else {
      if (searchTerm) {
        onSearch('');
      }
    }
  };

  const categories = [
    { name: 'Technology', value: 'technology' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Sports', value: 'sports' },
    { name: 'Health', value: 'health' },
    { name: 'Business', value: 'business' },
    { name: 'General', value: 'general' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className={`w-full border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-950/80 border-slate-900/60 text-white backdrop-blur-xl shadow-lg shadow-slate-950/20' 
          : 'bg-white/80 border-slate-100 text-slate-900 backdrop-blur-xl shadow-sm shadow-slate-200/20'
      }`}>
        {/* Increased Top and Bottom padding here: py-5 md:py-6 */}
        <div className="max-w-7xl mx-auto px-4 py-5 md:py-6 flex justify-between items-center w-full gap-6 relative">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleCategoryClick('general')}
            className={`flex items-center hover:opacity-85 transition-all duration-300 cursor-pointer flex-shrink-0 ${
              isSearchExpanded ? 'md:mr-4' : ''
            }`}
          >
            <img src={logo} alt="NewsCryst Logo" className="w-12 h-12 md:w-14 md:h-14 hover:rotate-12 transition-transform duration-300" />
          </div>

          {/* MIDDLE AREA: Switch between Category Tabs or Expanding Search Bar */}
          <div className="hidden md:flex flex-1 justify-center items-center px-8 relative h-10">
            {/* Desktop Categories (Fades out when search is active) */}
            <div className={`flex items-center gap-1 transition-all duration-300 ${
              isSearchExpanded 
                ? 'opacity-0 scale-95 pointer-events-none absolute' 
                : 'opacity-100 scale-100'
            }`}>
              {categories.map((cat) => {
                const isActive = category === cat.value && !showingFavorites && !searchTerm;
                return (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryClick(cat.value)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-105'
                        : darkMode
                        ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Expanding Search Bar */}
            <div className={`w-full max-w-xl transition-all duration-350 transform ${
              isSearchExpanded 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none absolute'
            }`}>
              <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
            </div>
          </div>

          {/* RIGHT AREA: Action Controls with Upgraded Buttons */}
          <div className="flex items-center gap-3.5 flex-shrink-0">
            {/* Desktop Search Toggle Button */}
            <button
              onClick={toggleSearchExpand}
              className={`hidden md:flex p-2.5 rounded-full transition-all duration-300 border ${
                isSearchExpanded
                  ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                  : darkMode
                  ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
              title={isSearchExpanded ? 'Close Search' : 'Open Search'}
            >
              {isSearchExpanded ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>

            {/* Premium Favorites Button with Floating Badge */}
            <button
              onClick={onShowFavorites}
              className={`relative p-2.5 rounded-full transition-all duration-300 border flex items-center justify-center ${
                showingFavorites
                  ? 'bg-gradient-to-tr from-red-500 to-pink-500 text-white border-transparent shadow-lg shadow-red-500/20 scale-105'
                  : darkMode
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:shadow-[0_0_12px_rgba(239,68,68,0.15)]'
                  : 'bg-slate-50 border-slate-200 text-slate-650 hover:text-slate-950 hover:border-slate-300 hover:shadow-[0_0_12px_rgba(239,68,68,0.1)]'
              }`}
              title="View saved articles"
            >
              <span className="text-base leading-none">❤️</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-extrabold text-white shadow-md shadow-red-500/25 border-2 border-white dark:border-slate-950">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Premium Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full transition-all duration-300 border flex items-center justify-center ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 text-yellow-400 hover:text-yellow-300 hover:border-slate-700 hover:shadow-[0_0_12px_rgba(234,179,8,0.2)]'
                  : 'bg-slate-50 border-slate-200 text-slate-650 hover:text-slate-950 hover:border-slate-300 hover:shadow-[0_0_12px_rgba(234,179,8,0.1)]'
              }`}
              title="Toggle dark/light mode"
            >
              <span className="text-base leading-none">{darkMode ? '☀️' : '🌙'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMenuIcon}
              className={`md:hidden transition-all duration-300 focus:outline-none ml-2 ${
                darkMode 
                  ? 'text-slate-400 hover:text-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isNavOpen ? (
                <svg className="w-6 h-6 stroke-current transition-transform duration-300 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 stroke-current transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <nav className={`md:hidden flex-col ${
          isNavOpen ? 'flex' : 'hidden'
        } ${
          darkMode ? 'bg-slate-950 border-t border-slate-900' : 'bg-slate-50 border-t border-slate-100'
        } p-4 gap-4 shadow-xl z-40 transition-all duration-300`}>
          {/* Mobile Search Bar */}
          <div className="w-full">
            <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
          </div>

          {/* Mobile Categories */}
          <div className="flex flex-col gap-1 w-full">
            {categories.map((cat) => {
              const isActive = category === cat.value && !showingFavorites && !searchTerm;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryClick(cat.value)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  category: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  favoritesCount: PropTypes.number,
  onShowFavorites: PropTypes.func.isRequired,
  showingFavorites: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

Navbar.defaultProps = {
  favoritesCount: 0,
  showingFavorites: false,
};

export default Navbar;

import logo from '../assets/logo.svg';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Navbar = ({
  category,
  setCategory,
  darkMode,
  setDarkMode,
  favoritesCount,
  onShowFavorites,
  showingFavorites,
  onSearch,
  searchTerm,
  onOpenDocs,
  onOpenSettings,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(!!searchTerm);

  useEffect(() => {
    if (!searchTerm) {
      setIsSearchExpanded(false);
    } else {
      setIsSearchExpanded(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchExpanded(true);
        setTimeout(() => {
          const input = document.querySelector('input[type="text"]');
          if (input) input.focus();
        }, 100);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    { name: 'General', value: 'general' },
    { name: 'Technology', value: 'technology' },
    { name: 'Business', value: 'business' },
    { name: 'Sports', value: 'sports' },
    { name: 'Health', value: 'health' },
    { name: 'Entertainment', value: 'entertainment' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <div className={`w-full border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-950/90 border-slate-900 text-white backdrop-blur-xl shadow-lg' 
          : 'bg-white/90 border-slate-200 text-slate-900 backdrop-blur-xl shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-3.5 md:py-4 flex justify-between items-center w-full gap-2 sm:gap-4 relative">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleCategoryClick('general')}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-all duration-200 cursor-pointer flex-shrink-0"
          >
            <img src={logo} alt="NewsCryst Logo" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 transition-transform duration-200" />
            <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-blue-600 dark:text-blue-400">
              NewsCryst
            </span>
          </div>

          {/* Desktop Categories & Expanding Search */}
          <div className="hidden md:flex flex-1 justify-center items-center px-4 relative h-10">
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
                    className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
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

            <div className={`w-full max-w-xl transition-all duration-300 transform ${
              isSearchExpanded 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none absolute'
            }`}>
              <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop Search Toggle (Magnifying glass / Close SVG) */}
            <button
              onClick={toggleSearchExpand}
              className={`hidden md:flex p-2.5 rounded-xl transition-all duration-200 border items-center justify-center ${
                isSearchExpanded
                  ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900'
                  : darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
              title={isSearchExpanded ? 'Close Search (Esc)' : 'Search News (/)'}
              aria-label="Toggle search"
            >
              {isSearchExpanded ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>

            {/* Desktop Saved Button (Heart SVG with Badge Counter) */}
            <button
              onClick={onShowFavorites}
              className={`hidden md:flex relative p-2.5 rounded-xl transition-all duration-200 border items-center justify-center ${
                showingFavorites
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300'
              }`}
              title="View saved articles"
              aria-label="View saved articles"
            >
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${
                  showingFavorites ? 'fill-white stroke-white' : 'fill-none stroke-current'
                }`}
                viewBox="0 0 24 24" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm border-2 border-white dark:border-slate-950">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Desktop Docs Button */}
            <button
              onClick={onOpenDocs}
              className={`hidden md:flex px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300'
              }`}
              title="Documentation"
            >
              Docs
            </button>

            {/* Desktop Settings Button */}
            <button
              onClick={onOpenSettings}
              className={`hidden md:flex px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300'
              }`}
              title="Settings"
            >
              Settings
            </button>

            {/* Theme Toggle Button with Light / Dark SVG Icon */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold transition-all duration-200 border flex items-center justify-center ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                /* Sun Icon */
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Toggle Button with SVG Icon */}
            <button
              onClick={handleMenuIcon}
              className={`md:hidden p-2 rounded-xl transition-all duration-200 border flex items-center justify-center ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              aria-label="Toggle navigation menu"
              title="Menu"
            >
              {isNavOpen ? (
                /* Close X Icon */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger Menu Icon */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <nav className={`md:hidden flex-col ${
          isNavOpen ? 'flex' : 'hidden'
        } ${
          darkMode ? 'bg-slate-950 border-t border-slate-900' : 'bg-slate-50 border-t border-slate-200'
        } p-3.5 sm:p-4 gap-3 shadow-xl transition-all duration-300 animate-fade-in`}>
          {/* Mobile Search */}
          <div className="w-full">
            <SearchBar onSearch={(term) => {
              onSearch(term);
              setIsNavOpen(false);
            }} searchTerm={searchTerm} />
          </div>

          {/* Mobile Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 w-full pt-1">
            {categories.map((cat) => {
              const isActive = category === cat.value && !showingFavorites && !searchTerm;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryClick(cat.value)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Mobile Actions: Saved Articles, Docs, and Settings */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            {/* Saved in Mobile Menu */}
            <button
              onClick={() => {
                setIsNavOpen(false);
                onShowFavorites();
              }}
              className={`py-2.5 px-2 rounded-xl border text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-all ${
                showingFavorites
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <svg 
                className={`w-3.5 h-3.5 ${showingFavorites ? 'fill-white stroke-white' : 'fill-none stroke-current'}`} 
                viewBox="0 0 24 24" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Saved</span>
              {favoritesCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsNavOpen(false);
                onOpenDocs();
              }}
              className="py-2.5 px-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-center text-slate-700 dark:text-slate-300"
            >
              Docs
            </button>

            <button
              onClick={() => {
                setIsNavOpen(false);
                onOpenSettings();
              }}
              className="py-2.5 px-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-center text-slate-700 dark:text-slate-300"
            >
              Settings
            </button>
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
  onOpenDocs: PropTypes.func.isRequired,
  onOpenSettings: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  favoritesCount: 0,
  showingFavorites: false,
};

export default Navbar;

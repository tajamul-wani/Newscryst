import menuIcon from '../assets/menuicon.svg';
import logo from '../assets/logo.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SearchBar from './SearchBar';

const Navbar = ({ setCategory, darkMode, setDarkMode, favoritesCount, onShowFavorites, showingFavorites, onSearch }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuIcon = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    setIsNavOpen(false);
  };

  const categories = [
    { name: 'Technology', value: 'technology' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Sports', value: 'sports' },
    { name: 'Health', value: 'Health' },
    { name: 'Business', value: 'business' },
    { name: 'General', value: 'general' },
  ];

  return (
    <header className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} p-4 w-full flex justify-between items-center sticky top-0 z-50 border-b transition-colors duration-200`}>
      {/* Logo */}
      <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img src={logo} alt="NewsCryst Logo" className="w-8 h-8 md:w-10 md:h-10" />
        <span className={`font-bold text-lg md:text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          NewsCryst
        </span>
      </div>

      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:block flex-1 mx-8 max-w-md">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Navigation & Controls */}
      <nav className={`${isNavOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static right-0 top-16 md:top-0 w-full md:w-auto ${darkMode ? 'bg-slate-800 md:bg-transparent' : 'bg-slate-50 md:bg-transparent'} p-3 md:p-0 gap-2 md:gap-2 items-start md:items-center transition-all duration-200`}>
        {/* Category Links */}
        <div className="flex flex-col md:flex-row gap-1 md:gap-1 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryClick(category.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                darkMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Favorites Button */}
        <button
          onClick={onShowFavorites}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            showingFavorites
              ? 'bg-red-500 text-white hover:bg-red-600'
              : darkMode
              ? 'text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-600'
              : 'text-slate-700 hover:text-slate-900 border border-slate-300 hover:bg-slate-100'
          }`}
          title="View saved articles"
        >
          ❤️ {favoritesCount > 0 && `(${favoritesCount})`}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            darkMode
              ? 'text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-600'
              : 'text-slate-700 hover:text-slate-900 border border-slate-300 hover:bg-slate-100'
          }`}
          title="Toggle dark/light mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={handleMenuIcon}
        className={`md:hidden p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
        aria-label="Toggle navigation menu"
      >
        <img src={menuIcon} alt="Menu" className="w-6" />
      </button>
    </header>
  );
};

Navbar.propTypes = {
  setCategory: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  favoritesCount: PropTypes.number,
  onShowFavorites: PropTypes.func.isRequired,
  showingFavorites: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  favoritesCount: 0,
  showingFavorites: false,
};

export default Navbar;

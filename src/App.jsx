import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar.jsx';
import NewBoard from './Components/NewBoard';
import Footer from './Components/Footer.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';

function App() {
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Initialize state directly from localStorage to prevent flashing on reload
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('newsCrystFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode !== null ? JSON.parse(savedDarkMode) : false; // false = light mode by default
  });
  
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('newsCrystFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleFavorite = (news) => {
    const isFavorited = favorites.some(fav => fav.url === news.url);
    if (isFavorited) {
      setFavorites(favorites.filter(fav => fav.url !== news.url));
    } else {
      setFavorites([...favorites, news]);
    }
  };

  const isFavorite = (newsUrl) => {
    return favorites.some(fav => fav.url === newsUrl);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchTerm('');
    setShowFavoritesOnly(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setShowFavoritesOnly(false);
  };

  const handleShowFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    setSearchTerm('');
  };

  return (
    <ErrorBoundary>
      <div className={darkMode ? 'dark' : ''}>
        <div className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-200`}>
          <Navbar 
            category={category}
            setCategory={handleCategoryChange} 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            favoritesCount={favorites.length}
            onShowFavorites={handleShowFavorites}
            showingFavorites={showFavoritesOnly}
            onSearch={handleSearch}
            searchTerm={searchTerm}
          />
          <div className="container-main">
            <NewBoard 
              category={category} 
              searchTerm={searchTerm}
              showFavoritesOnly={showFavoritesOnly}
              favorites={favorites}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              darkMode={darkMode}
            />
            <Footer darkMode={darkMode} setCategory={handleCategoryChange} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

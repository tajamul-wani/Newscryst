import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar.jsx';
import NewBoard from './Components/NewBoard';
import Footer from './Components/Footer.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';

function App() {
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('newsCrystFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

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
            setCategory={setCategory} 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            favoritesCount={favorites.length}
            onShowFavorites={handleShowFavorites}
            showingFavorites={showFavoritesOnly}
            onSearch={handleSearch}
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
            <Footer darkMode={darkMode} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

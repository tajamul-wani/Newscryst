import { useState, useEffect, useCallback } from 'react';
import Navbar from './Components/Navbar.jsx';
import NewBoard from './Components/NewBoard';
import Footer from './Components/Footer.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import LoadingBar from './Components/LoadingBar.jsx';
import DocsModal from './Components/DocsModal.jsx';
import SettingsModal from './Components/SettingsModal.jsx';
import Toast from './Components/Toast.jsx';
import { useNetworkStatus } from './utils/offlineDetector';

function App() {
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const isOnline = useNetworkStatus();
  
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('newsCrystFavorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedDarkMode = localStorage.getItem('darkMode');
      return savedDarkMode !== null ? JSON.parse(savedDarkMode) : false;
    } catch {
      return false;
    }
  });
  
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('newsCrystFavorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not persist favorites:', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (e) {
      console.warn('Could not persist darkMode:', e);
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'd' || e.key === 'D') {
        setDarkMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (news) => {
    const isFavorited = favorites.some((fav) => fav.url === news.url);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.url !== news.url));
      showToast('Removed from saved articles', 'info');
    } else {
      setFavorites([...favorites, news]);
      showToast('Article saved to favorites', 'success');
    }
  };

  const isFavorite = (newsUrl) => {
    return favorites.some((fav) => fav.url === newsUrl);
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
        <div className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-200 flex flex-col justify-between`}>
          {/* Top Nano Loading Bar */}
          <LoadingBar isLoading={isLoading} message={loadingMessage} />

          {/* Navigation Bar */}
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
            onOpenDocs={() => setIsDocsOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Main Board Container */}
          <div className="container-main flex-grow">
            <NewBoard 
              category={category} 
              searchTerm={searchTerm}
              onSearch={handleSearch}
              showFavoritesOnly={showFavoritesOnly}
              favorites={favorites}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              darkMode={darkMode}
              isOnline={isOnline}
              onSetLoading={(loading) => {
                setIsLoading(loading);
                setLoadingMessage(loading ? 'Loading feed' : '');
              }}
              onShowToast={showToast}
            />
          </div>

          {/* Footer */}
          <Footer 
            darkMode={darkMode} 
            setCategory={handleCategoryChange} 
            onOpenDocs={() => setIsDocsOpen(true)}
          />

          {/* Modals */}
          <DocsModal 
            isOpen={isDocsOpen} 
            onClose={() => setIsDocsOpen(false)} 
          />

          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            favorites={favorites}
            onShowToast={showToast}
          />

          {/* Floating Toasts */}
          <Toast toasts={toasts} onDismiss={dismissToast} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

import logo from '../assets/logo.svg';
import PropTypes from 'prop-types';

const Footer = ({ darkMode, setCategory, onOpenDocs }) => {
  const currentYear = new Date().getFullYear();

  const handleCategoryClick = (category) => {
    if (setCategory) {
      setCategory(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`${
      darkMode 
        ? 'bg-slate-950 border-slate-900 text-slate-400' 
        : 'bg-slate-100/70 border-slate-200 text-slate-600'
    } border-t transition-colors duration-300 py-10 sm:py-12 md:py-16`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand Identity */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="NewsCryst Logo" className="w-9 h-9" />
              <span className="font-extrabold text-lg tracking-tight text-blue-600 dark:text-blue-400">
                NewsCryst
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              Fast, reliable news aggregator delivering real-time headlines with local caching and concise summarization.
            </p>
          </div>

          {/* Quick Categories Navigation */}
          <div className="flex flex-col items-start gap-3">
            <h4 className={`text-xs font-bold tracking-wider uppercase ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Browse Categories
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm w-full">
              {['general', 'technology', 'business', 'sports', 'health', 'entertainment'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="text-left capitalize transition-colors hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {cat}
                </button>
              ))}
            </div>
            {onOpenDocs && (
              <button
                onClick={onOpenDocs}
                className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Documentation Reference
              </button>
            )}
          </div>

          {/* Connect & Source */}
          <div className="flex flex-col items-start gap-3">
            <h4 className={`text-xs font-bold tracking-wider uppercase ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              External Source
            </h4>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <a
                href="https://github.com/tajamul-wani"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tajamul-wani/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                LinkedIn
              </a>
            </div>

            <p className="text-xs">
              Powered by{' '}
              <a
                href="https://currentsapi.services/"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Currents API
              </a>
            </p>
          </div>
        </div>

        <div className={`h-px ${darkMode ? 'bg-slate-900' : 'bg-slate-200'} mb-8`}></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} NewsCryst. All rights reserved.</p>
          <p>
            Developed by Tajamul Wani
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setCategory: PropTypes.func,
  onOpenDocs: PropTypes.func,
};

export default Footer;

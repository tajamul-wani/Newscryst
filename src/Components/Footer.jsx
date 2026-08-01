import logo from '../assets/logo.svg';
import PropTypes from 'prop-types';

const Footer = ({ darkMode, setCategory }) => {
  const currentYear = new Date().getFullYear();

  const handleCategoryClick = (category) => {
    if (setCategory) {
      setCategory(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`${darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'} border-t transition-colors duration-300 py-12 md:py-16`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand Identity */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center">
              <img src={logo} alt="NewsCryst Logo" className="w-12 h-12 hover:rotate-12 transition-transform duration-300" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Your modern, elegant news gateway. Curating fresh global headlines, trending updates, and local stories instantly powered by Currents API.
            </p>
          </div>

          {/* Quick Categories Navigation */}
          <div className="flex flex-col items-start gap-3">
            <h4 className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Browse Categories
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm w-full">
              {['technology', 'business', 'sports', 'health', 'general'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="text-left capitalize transition-colors hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Connect & Social */}
          <div className="flex flex-col items-start gap-4">
            <h4 className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Connect & Source
            </h4>
            <div className="flex items-center gap-5">
              {/* GitHub Link */}
              <a
                href="https://github.com/TAJAMUL11"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <svg
                  className="w-6 h-6 fill-current transition-colors duration-200"
                  viewBox="0 0 496 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/tajamul-wani/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-6 h-6 fill-current transition-colors duration-200"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
            </div>

            <p className="text-xs">
              Powered by{' '}
              <a
                href="https://currentsapi.services/"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Currents API
              </a>
            </p>
          </div>
        </div>

        {/* Divider Line */}
        <div className={`h-px ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} mb-8`}></div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} NewsCryst. All rights reserved.</p>
          <p>
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/tajamul-wani/"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tajamul Wani
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  darkMode: PropTypes.bool,
  setCategory: PropTypes.func,
};

Footer.defaultProps = {
  darkMode: true,
};

export default Footer;

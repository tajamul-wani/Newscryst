import github from '../assets/github.svg';
import insta from '../assets/instagram.svg';
import linkedin from '../assets/linkedin.svg';
import logo from '../assets/logo.svg';
import PropTypes from 'prop-types';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'} border-t transition-colors duration-200 py-8 md:py-12`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="NewsCryst Logo" className="w-8 h-8" />
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                NewsCryst
              </span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Stay informed with the latest news from around the world.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-3">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Follow</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/TAJAMUL11"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 opacity-70 hover:opacity-100 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                title="GitHub"
              >
                <img src={github} alt="GitHub" className="w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/tajamul-wani/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 opacity-70 hover:opacity-100 ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                title="LinkedIn"
              >
                <img src={linkedin} alt="LinkedIn" className="w-6" />
              </a>
              <a
                href="https://www.instagram.com/tajamul__wani_/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 opacity-70 hover:opacity-100 ${darkMode ? 'hover:text-pink-400' : 'hover:text-pink-600'}`}
                title="Instagram"
              >
                <img src={insta} alt="Instagram" className="w-6" />
              </a>
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col items-center md:items-end gap-3 text-sm">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>About</h3>
            <p>
              Powered by{' '}
              <a
                href="https://gnews.io/"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                GNews API
              </a>
            </p>
            <p>
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px ${darkMode ? 'bg-slate-700' : 'bg-slate-300'} mb-6`}></div>

        {/* Bottom Info */}
        <div className={`text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p>&copy; {currentYear} NewsCryst. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ by{' '}
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
};

Footer.defaultProps = {
  darkMode: true,
};

export default Footer;

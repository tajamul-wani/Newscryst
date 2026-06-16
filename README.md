# 🗞️ NewsCryst - Modern News Aggregator

A sleek, modern news aggregation application built with React, Vite, and Tailwind CSS. Powered by NewsAPI, NewsCryst brings you the latest news from around the world with an intuitive interface and powerful features.

## ✨ Features

- **📰 Latest News**: Browse top headlines across multiple categories
- **🔍 Search Functionality**: Search for any news topic globally
- **❤️ Favorites**: Save your favorite articles for later reading (stored locally)
- **🌙 Dark/Light Mode**: Toggle between dark and light themes
- **📱 Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **⚡ Fast & Optimized**: Built with Vite for blazing-fast performance
- **🎨 Modern UI**: Beautiful gradient designs and smooth animations
- **🛡️ Error Handling**: Comprehensive error states and loading indicators
- **🔒 Secure API**: API key never exposed in source code

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A free API key from [NewsAPI.org](https://newsapi.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Newscryst
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your NewsAPI key:
   ```
   VITE_NEWS_API=your_newsapi_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The app will open at `http://localhost:5173/Newscryst/`

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm run preview
```

### Deploy to Netlify

#### Option 1: Using Netlify UI (Recommended)

1. **Push to GitHub**
   - Commit all changes (except `.env.local`)
   - Push to your GitHub repository

2. **Connect to Netlify**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the branch to deploy

3. **Set Environment Variables**
   - In Netlify dashboard, go to Site Settings
   - Navigate to "Build & Deploy" → "Environment"
   - Click "Edit variables"
   - Add: `VITE_NEWS_API` = your_newsapi_key_here

4. **Deploy**
   - Netlify will automatically build and deploy
   - Your site will be live within minutes!

#### Option 2: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod

# Set environment variables when prompted
```

## 🔒 Security Best Practices

### API Key Protection
- ✅ API key stored in `.env.local` (local development)
- ✅ `.env.local` is in `.gitignore` - never committed
- ✅ For Netlify: Add key via environment variables (not in code)
- ✅ Consider using a disposable/demo API key for public projects

### Recommended Workflow
1. Create a separate "demo" API key with limited rate limits
2. Use this demo key for public deployments
3. Keep your main API key local-only
4. Monitor API usage in NewsAPI dashboard

## 📋 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Fix vulnerabilities (optional)
npm audit fix

# List outdated packages (optional)
npm outdated
```

## 🏗️ Project Structure

```
Newscryst/
├── src/
│   ├── Components/
│   │   ├── Navbar.jsx          # Navigation & category filtering
│   │   ├── NewBoard.jsx        # News display grid
│   │   ├── NewsCard.jsx        # Individual news card
│   │   ├── SearchBar.jsx       # Search functionality
│   │   ├── LoadingSpinner.jsx  # Loading state
│   │   ├── ErrorBoundary.jsx   # Error handling
│   │   └── Footer.jsx          # Footer with links
│   ├── assets/                 # Images & SVGs
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── .env.local                  # Local API key (NOT committed)
├── .env.example                # Template for .env.local
├── .env.production             # Production environment
├── tailwind.config.js          # Tailwind CSS config
├── vite.config.js              # Vite configuration
├── netlify.toml                # Netlify deployment config
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## 🎯 Features Explained

### Categories
Browse news by category:
- Technology
- Entertainment
- Sports
- Health
- Business
- General

### Search
Search for any topic globally using the search bar at the top of the page.

### Favorites
- Click the heart (❤️) on any article to save it
- View all saved articles in the "Favorites" tab
- Favorites are saved in browser's local storage
- Persists even after closing the browser

### Dark Mode
Toggle between dark and light themes with the sun/moon icon in the navbar.

## 📊 API Information

This project uses [NewsAPI.org](https://newsapi.org/) for news data.

- **Free Plan**: 100 requests per day, great for personal use
- **Endpoints Used**:
  - `GET /v2/top-headlines` - Latest headlines
  - `GET /v2/everything` - Comprehensive search

**Rate Limits**: Be mindful of your API quota, especially on shared deployments.

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  'primary-bg-color': '#212529',  // Background
  'btn-ccolor': '#0d6efd'         // Button/accent
}
```

### Modify Categories
Update the categories array in `src/Components/Navbar.jsx`

## 🐛 Troubleshooting

### "API key is not configured"
- Ensure `.env.local` exists with `VITE_NEWS_API=your_key_here`
- Restart the dev server: `npm run dev`

### No articles loading
- Check internet connection
- Verify API key is valid at [NewsAPI.org](https://newsapi.org/)
- Check console for error messages

### Favorites not persisting
- Clear browser storage: Dev Tools → Application → Local Storage
- Check if localStorage is enabled

### Deploy issues on Netlify
- Verify `VITE_NEWS_API` environment variable is set
- Check build logs in Netlify dashboard
- Ensure `netlify.toml` is in root directory

## 🚀 Performance Tips

- Articles are limited to 50 per search
- Images are optimized with fallbacks
- CSS is minified and bundled efficiently
- React components are code-split for faster loading

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Mobile browsers: ✅ Fully responsive

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Tajamul Wani**
- GitHub: [@TAJAMUL11](https://github.com/TAJAMUL11)
- LinkedIn: [Tajamul Wani](https://www.linkedin.com/in/tajamul-wani/)
- Instagram: [@tajamul__wani_](https://www.instagram.com/tajamul__wani_/)

## 🤝 Contributing

Found a bug or have a feature request? Feel free to open an issue or submit a pull request!

## 🙏 Acknowledgments

- [NewsAPI.org](https://newsapi.org/) for the news data
- [React](https://react.dev) for the UI framework
- [Vite](https://vitejs.dev) for the build tool
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**Made with ❤️ by Tajamul Wani**

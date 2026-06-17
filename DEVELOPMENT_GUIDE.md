# 📚 Development Guide - NewsCryst

## Local Development Setup

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- Git
- A code editor (VS Code recommended)
- NewsAPI key ([get one free](https://newsapi.org))

### First Time Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd Newscryst

# 2. Install dependencies
npm install

# 3. Create local environment file
cp .env.example .env.local

# 4. Add your API key to .env.local
# Edit .env.local and set:
# VITE_NEWS_API=your_api_key_here

# 5. Start development server
npm run dev
```

Your app will open at `http://localhost:5173/`

## Available Scripts

### Development
```bash
npm run dev
```
- Starts the Vite development server with hot module replacement
- Opens browser automatically
- Watch mode for file changes

### Production Build
```bash
npm run build
```
- Creates optimized production build in `dist/` folder
- Minifies code and bundles assets
- ~200KB total size (gzipped)

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Useful for testing before deployment
- Visit `http://localhost:4173`

### Lint (Optional)
```bash
npm run lint
```
- Check code for ESLint issues
- Helps maintain code quality

## Project Structure

```
src/
├── Components/
│   ├── Navbar.jsx          # Navigation with categories and search
│   ├── NewBoard.jsx        # Main news grid display
│   ├── NewsCard.jsx        # Individual news card component
│   ├── SearchBar.jsx       # Search input component
│   ├── LoadingSpinner.jsx  # Loading animation
│   ├── ErrorBoundary.jsx   # Error handling
│   └── Footer.jsx          # Footer with links
├── assets/                 # Images and SVGs
├── App.jsx                 # Main app component (state management)
├── main.jsx                # React entry point
└── index.css               # Global styles

Configuration Files:
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── tailwind.config.js      # PostCSS config
├── eslint.config.js        # ESLint rules
├── netlify.toml            # Netlify deployment config
└── .env.example            # Environment template
```

## Key Technologies

### Frontend Framework
- **React 18.3**: UI library with hooks (useState, useEffect)
- **Vite 5.4**: Fast build tool and dev server

### Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Custom CSS**: Global styles and animations

### Data Source
- **NewsAPI**: REST API for news articles
- **Fetch API**: HTTP requests

### State Management
- React Hooks (useState, useEffect)
- localStorage for persisting favorites and theme

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/awesome-feature

# Make changes
# Test with: npm run dev

# Commit changes
git add .
git commit -m "feat: Add awesome feature"

# Push to GitHub
git push origin feature/awesome-feature

# Create Pull Request on GitHub
```

### 2. Testing Locally
```bash
# Start dev server
npm run dev

# Test in browser
# - Different categories
# - Search functionality
# - Add/remove favorites
# - Toggle dark mode
# - Mobile responsiveness (use browser DevTools)

# Check console for errors
# Press F12 → Console tab
```

### 3. Build for Production
```bash
# Test production build
npm run build
npm run preview

# Should see no errors or warnings
```

## Common Development Tasks

### Adding a New Category

Edit `src/Components/Navbar.jsx`:

```jsx
const categories = [
  { name: 'Technology', value: 'technology' },
  { name: 'Entertainment', value: 'entertainment' },
  { name: 'Sports', value: 'sports' },
  { name: 'Health', value: 'Health' },
  { name: 'Business', value: 'business' },
  { name: 'General', value: 'general' },
  // Add new category here
  { name: 'Science', value: 'science' },
];
```

### Changing Colors

Edit `tailwind.config.js`:

```js
colors: {
  'primary-bg-color': '#212529',    // Background color
  'btn-ccolor': '#0d6efd'           // Button/accent color
}
```

### Modifying the News Card Layout

Edit `src/Components/NewsCard.jsx`:

- Change card dimensions
- Modify image height
- Adjust button styling
- Add/remove information fields

## Debugging Tips

### Browser DevTools
```
F12 or Right-click → Inspect → Console
```

Look for:
- JavaScript errors (red messages)
- Network errors (failed API calls)
- Console warnings

### React DevTools Extension
- Install "React Developer Tools" browser extension
- Inspect component hierarchy
- Check props and state

### Vite Hot Module Replacement
- HMR automatically refreshes when you save
- App state is preserved
- Error overlay for quick debugging

## Performance Optimization

### Already Implemented
✅ Code splitting (vendor/app separation)  
✅ Image optimization with fallbacks  
✅ CSS minification  
✅ Lazy loading for components  
✅ Debounced search  

### Further Optimization Ideas
- Implement image lazy loading (Intersection Observer)
- Add pagination for large result sets
- Cache API responses
- Service Worker for offline support
- Progressive Web App (PWA)

## Security Best Practices

### ✅ Current Security
- API key never exposed in code
- Environment variables for secrets
- Input validation for search
- Error handling without exposing sensitive info

### 🔒 Additional Measures
- Content Security Policy (CSP) headers
- CORS configuration
- Rate limiting considerations
- Input sanitization for any user content

## Testing Checklist

### Before Committing Code
- [ ] `npm run dev` starts without errors
- [ ] App loads in browser
- [ ] News loads for each category
- [ ] Search functionality works
- [ ] Can add/remove favorites
- [ ] Dark mode toggles correctly
- [ ] No console errors
- [ ] Mobile responsive looks good
- [ ] `npm run build` completes successfully

### Before Deploying
- [ ] All tests pass
- [ ] No console warnings
- [ ] Production build works: `npm run preview`
- [ ] `.env.local` is NOT committed
- [ ] API key set on deployment platform
- [ ] All features tested in production build

## Helpful Resources

### Documentation
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [NewsAPI Docs](https://newsapi.org/docs)
- [MDN Web Docs](https://developer.mozilla.org)

### Tools
- [VS Code](https://code.visualstudio.com) - Code editor
- [React DevTools](https://react-devtools-tutorial.vercel.app/) - Browser extension
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing

## Frequently Asked Questions

**Q: How do I get a NewsAPI key?**
A: Go to [newsapi.org](https://newsapi.org), sign up for free, and get your API key from the dashboard.

**Q: Can I change the API?**
A: Yes! Update `VITE_NEWS_API` environment variable and modify the fetch URLs in `NewBoard.jsx`.

**Q: How do favorites persist?**
A: They're stored in browser's localStorage, which persists across sessions.

**Q: Why is the API key visible in network requests?**
A: Frontend apps expose API keys by design. Use a backend proxy for complete security.

**Q: How can I improve performance?**
A: Check Lighthouse report (Chrome DevTools), optimize images, implement pagination.

## Getting Help

- Check existing GitHub issues
- Review browser console for errors
- Verify API key is valid
- Ensure internet connection is stable
- Clear browser cache and try again
- Check Vite and React documentation

---

**Happy Coding! 💻**

For issues or improvements, create a GitHub issue or submit a pull request.

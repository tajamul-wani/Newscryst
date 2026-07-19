# NewsCryst 🗞️

**NewsCryst** is a modern, responsive, and highly visual news aggregator application built to deliver the latest breaking news and headlines straight to your device. Using modern glassmorphism UI design, persistent dark mode, and seamless API integration, NewsCryst offers a premium reading experience.

---

## 🚀 Features at a Glance

- **Global & Categorized News**: Browse breaking news or dive into categories like Technology, Business, Entertainment, Sports, and Health.
- **Search Integration**: Instantly find specific topics using the built-in search bar.
- **Save to Favorites**: Bookmark your favorite articles. The application uses LocalStorage to ensure your favorites persist across page reloads and sessions.
- **Persistent Dark Mode**: Toggle between light and dark themes. Your preference is securely stored and remembered for your next visit.
- **Premium Aesthetics**: Features a modern glassmorphism design, vibrant micro-animations, loading states, and smooth hover effects.
- **SEO Optimized**: Fully integrated meta tags, OpenGraph properties, and proper semantic HTML to ensure search engine visibility.

---

## 💻 Tech Stack

- **Frontend Framework**: [React.js](https://reactjs.org/) (Hooks, State Management)
- **Build Tool**: [Vite](https://vitejs.dev/) (For ultra-fast HMR and building)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling for quick, responsive layouts)
- **Data Provider**: [GNews API](https://gnews.io/) (Fast, reliable, and CORS-friendly news JSON endpoint)
- **Deployment**: [Netlify](https://www.netlify.com/) (Configured via `netlify.toml` for seamless SPA deployment)

---

## ⚙️ How to Setup & Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/TAJAMUL11/Newscryst.git
   cd Newscryst
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - The app securely references environment variables and prevents them from being committed.
   - Rename the provided `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Insert your API Key inside `.env`:
   ```env
   VITE_NEWS_API=your_gnews_api_key_here
   ```
   *(You can obtain a free API key by signing up at [gnews.io](https://gnews.io/))*

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

---

## 🌍 Live Deployment

This application is structurally configured to deploy directly to Netlify.

- The root folder contains a `netlify.toml` which defines the build command (`npm run build`) and correctly rewrites all routes (`/*`) to `index.html` to support React Router.
- **Crucial Step**: Before deploying to production on Netlify, navigate to your **Site Configuration -> Environment Variables** in the Netlify dashboard and add the `VITE_NEWS_API` key. The build will succeed, but the API calls will fail if this key is missing on the live server.

---

## 🔒 Security Notes

- This project is configured to safely exclude `.env` files from Git tracking. You will never accidentally push your API keys to the public repository.
- Sensitive development guides and local backend testing configs have been removed from source tracking to keep the repository extremely clean and secure.

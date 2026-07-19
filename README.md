# NewsCryst

NewsCryst is a modern, responsive, and visually stunning news aggregator built with React, Vite, and Tailwind CSS. It leverages the **GNews API** to bring you the latest headlines from around the globe, organized by category.

## Features
- **Premium Aesthetics**: Glassmorphism design elements, micro-animations, and smooth transitions.
- **Dark Mode**: Persistent dark mode support using Tailwind CSS and LocalStorage.
- **Save Favorites**: Bookmark your favorite articles persistently to read later.
- **Search**: Fully integrated search functionality to find specific news.
- **Client-Side Requests**: Uses GNews API to allow direct browser requests seamlessly without backend proxies.
- **SEO Optimized**: Fully integrated SEO tags.

## Quick Start
1. Clone the repository
2. Run `npm install`
3. Rename `.env.example` to `.env` and insert your **GNews API** key (`VITE_NEWS_API`).
4. Run `npm run dev` to start the development server.

## Deployment
This application is configured for seamless deployment on Netlify. It includes a `netlify.toml` file to automatically handle the build commands (`npm run build`) and SPA routing. Ensure you inject your `VITE_NEWS_API` environment variable inside your Netlify dashboard prior to deployment!

# NewsCryst

NewsCryst is a modern, responsive, and visually stunning news aggregator built with React, Vite, and Tailwind CSS. It leverages the NewsAPI to bring you the latest headlines from around the globe, organized by category.

## Features
- **Premium Aesthetics**: Glassmorphism design elements, micro-animations, and smooth transitions.
- **Dark Mode**: Persistent dark mode support using Tailwind CSS and LocalStorage.
- **Save Favorites**: Bookmark your favorite articles persistently to read later.
- **Search**: Fully integrated search functionality to find specific news.
- **Serverless Backend**: API calls are routed through a secure Netlify Serverless Function, keeping API keys 100% hidden and bypassing browser CORS restrictions.
- **SEO Optimized**: Fully integrated SEO tags.

## Quick Start
1. Clone the repository
2. Run `npm install`
3. Rename `.env.example` to `.env` and insert your NewsAPI key (`VITE_NEWS_API`).
4. To run locally with the serverless backend, use `npx netlify dev`. (Do not use `npm run dev` directly, as it won't proxy the Netlify backend functions).

## Deployment
This application is configured for seamless deployment on Netlify. It includes a `netlify.toml` file to automatically handle the build commands (`npm run build`) and SPA routing. Ensure you inject your `VITE_NEWS_API` environment variable inside your Netlify dashboard prior to deployment!

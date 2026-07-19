# NewsCryst

A modern, responsive news aggregator built with React, Vite, and Tailwind CSS. It natively supports Cross-Origin Resource Sharing (CORS) directly from the browser using the Currents API.

## Features
- Global & Categorized News
- Search Integration
- Save to Favorites
- Persistent Dark Mode

## Setup
1. Clone the repository
2. Run `npm install`
3. Get a free API key from [currentsapi.services](https://currentsapi.services/)
4. Add your API key to `.env` as `VITE_NEWS_API`
5. Run `npm run dev` to start the development server.

## Deployment
Configured for deployment on Netlify via GitHub integration. Ensure you inject `VITE_NEWS_API` in your Netlify site configuration prior to deploying.

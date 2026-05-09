This is a beginner project for React, using React components and NewsAPI for data fetching.
It uses useState and useEffect hooks for rendering and state management.
I have used Bootstrap v5 for UI building.

## Secure API Key Setup

This project is frontend-only and uses a Vite environment variable for the NewsAPI key.
The actual key is stored locally in `.env.local`, which is ignored by Git.

### Local development
1. Copy `.env.example` to `.env.local`.
2. Set `VITE_NEWS_API=your_newsapi_key_here` in `.env.local`.
3. Run `npm install`.
4. Start the app with `npm run dev`.

### GitHub/Public hosting
- Keep `.env.local` out of version control. It is ignored by `.gitignore`.
- Do not commit your real API key.
- For GitHub Pages, add `VITE_NEWS_API` as a repository secret in GitHub settings.
- Use GitHub Actions to build and deploy to GitHub Pages so the key never appears in source control.
- Note: because this is a static frontend app, the API key will still be included in the generated build artifacts and can be discovered by a determined user.
- For the safest public demo, use a disposable or limited NewsAPI key.

### Recommended workflow for recruiters/demo
- Use a temporary NewsAPI key dedicated to this demo.
- Do not upload `.env.local` or any real key to GitHub.
- Deploy to GitHub Pages with the included workflow.

### Why this is the right compromise
This keeps your repository secure by removing the key from version control.
It also makes your site live on GitHub Pages.
For complete secrecy of the key, a backend or proxy would still be required.

# NewsCryst

NewsCryst is a modern, responsive news aggregator built with **React 18**, **Vite**, and **Tailwind CSS**. It fetches real-time articles, categories, and keyword queries directly from the **Currents API**, delivering optimized images and cached responses for a fast and bandwidth-efficient reading experience.

---

## Features

- **Categorized Feeds & Search**: Instant access to Technology, Business, Sports, Health, Entertainment, and General news feeds with persistent search queries.
- **Optimized Caching (10-Min TTL)**: Implements browser-based caching for API responses to minimize request consumption and speed up navigation.
- **Image CDN Resizing**: Routes all third-party images through a proxy cache (`images.weserv.nl`) to compress images to WebP format and fit card dimensions on-the-fly.
- **Race Condition Prevention**: Utilizes `AbortController` to cancel pending HTTP requests during rapid category toggles or search typing.
- **Premium UI/UX**: Includes an expanding inline desktop search animation, responsive mobile menu drawer, glassmorphic styles, responsive social SVGs, and automated scroll-to-top navigation.
- **Persistent Favorites**: Bookmark articles locally in the browser with zero-refresh state updates.

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TAJAMUL11/Newscryst.git
   cd Newscryst
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and add your Currents API token:

```env
VITE_NEWS_API=your_currents_api_token
```

> Note: The `.env` file is git-ignored by default to prevent leaking credentials.

### Running Locally

To start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### Building for Production

To compile the application bundle for production:

```bash
npm run build
```

---

## Project Structure

```text
├── public/                 # Static assets (logo, favicon)
├── src/
│   ├── assets/             # Images, placeholders, and SVGs
│   ├── Components/
│   │   ├── ErrorBoundary   # React Error Boundary
│   │   ├── Footer          # Dynamic footer with theme SVGs
│   │   ├── Navbar          # Header with inline expanding search
│   │   ├── NewBoard        # Grid container and fetch engine
│   │   ├── NewsCard        # Article card component
│   │   ├── SearchBar       # Controlled search input
│   │   └── SkeletonCard    # Shimmer loaders for articles
│   ├── App.jsx             # Main state coordinator
│   ├── index.css           # Global styles and tailwind directives
│   └── main.jsx            # Application entrypoint
├── package.json
└── vite.config.js
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).

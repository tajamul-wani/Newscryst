# NewsCryst

NewsCryst is a responsive news aggregator built with React 18, Vite, and Tailwind CSS. It delivers verified headlines and search feeds from the Currents API, backed by local caching and natural language summarization.

## Key Architecture

### Multi-Tier Caching
The application implements in-memory caching and persistent local storage with configured expiration periods:
1. Category and keyword search feeds are cached for 15 minutes.
2. Individual article summaries are cached for 24 hours to prevent redundant compute calls.
3. Category digests are cached for 1 hour.
4. Expired records are evicted automatically to keep storage usage low.
5. The interface provides a visible indicator when content is retrieved from cache.

### Request-Conscious Summarization
Summarization is designed to prevent excessive network consumption:
1. Summaries execute solely on user request and are not called automatically in background loops.
2. Parallel user clicks share the same pending promise to prevent duplicate requests.
3. When configured with an API key, summaries run through Gemini 1.5 Flash with strict token rationing.
4. When offline or unconfigured, the application runs an internal client-side natural language summarizer with zero external requests.
5. Category digests summarize the leading headlines in a single batch request.
6. The built-in audio reader uses the browser Web Speech API with selectable playback speeds.

### Visual States and Loading Effects
1. A loading progress bar displays along the top edge during active network requests.
2. Card and image skeleton loaders prevent layout shifts while content loads.
3. Floating toast notifications provide confirmation for bookmarks and link actions.

### Security and Network Resilience
1. Outbound hyperlinks are validated to reject non-standard and dangerous URI schemes.
2. Real-time network monitoring alerts the user when disconnected while continuing to serve cached articles.
3. External links enforce secure window opener isolation.
4. Content is rendered through safe text nodes to prevent script execution.
5. Tokens reside exclusively in git-ignored local environment files or browser storage.

### Feed Filtering and Navigation
1. Category topic tags enable immediate targeted search.
2. Reading duration filters allow filtering by short or extended articles.
3. Articles can be sorted by latest, oldest, or alphabetical order.

### Documentation and Preferences
1. An in-app documentation modal provides an architectural reference and keyboard shortcut list.
2. Settings allow toggling light and dark appearance, inspecting cache storage size, clearing local data, and exporting bookmarked articles to JSON.

## Keyboard Shortcuts

Esc: Close open modals
/: Focus the search bar
D: Toggle light and dark appearance

## Getting Started

### Prerequisites
Node.js version 18 or higher
npm version 9 or higher

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/tajamul-wani/Newscryst.git
cd Newscryst
npm install
```

### Configuration
Create a .env.local file in the project root:
```env
VITE_NEWS_API=your_currents_api_token
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Running Locally
Start the development server:
```bash
npm run dev
```

### Building for Production
Compile the production build:
```bash
npm run build
```

## License
MIT License

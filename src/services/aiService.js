/**
 * AI Service for NewsCryst
 * Clean journalistic summarization and audio synthesis engine.
 * No emojis, no dashes, no robotic boilerplate.
 */

import { buildCacheKey, getCacheItem, setCacheItem, CACHE_TTL } from './cacheService';
import { sanitizeText } from '../utils/security';

// In-flight request deduplication map
const pendingAiRequests = new Map();

/**
 * Gets the active Gemini API key from environment or user localStorage
 * @returns {string}
 */
export const getGeminiApiKey = () => {
  const customKey = localStorage.getItem('newscryst_custom_gemini_key');
  if (customKey && customKey.trim()) {
    return customKey.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
};

/**
 * Saves a user-provided Gemini API key locally
 * @param {string} key
 */
export const saveGeminiApiKey = (key) => {
  if (!key) {
    localStorage.removeItem('newscryst_custom_gemini_key');
  } else {
    localStorage.setItem('newscryst_custom_gemini_key', key.trim());
  }
};

/**
 * Computes estimated reading time
 * @param {string} text
 * @returns {string}
 */
export const estimateReadTime = (text = '') => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

/**
 * Computes estimated reading minutes as a raw number for filtering
 * @param {string} text
 * @returns {number}
 */
export const getReadTimeMinutes = (text = '') => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

/**
 * Sentiment detector without emojis or punctuation slop
 * @param {string} text
 * @returns {{ label: string, color: string }}
 */
export const detectTone = (text = '') => {
  const lower = text.toLowerCase();
  
  const positiveTerms = ['breakthrough', 'record', 'gain', 'growth', 'surge', 'success', 'triumph', 'cure', 'boost', 'promising', 'win', 'rally', 'hope', 'innovat'];
  const urgentTerms = ['crisis', 'warning', 'alert', 'threat', 'plunge', 'disaster', 'crash', 'deadly', 'emergency', 'fall', 'investigation', 'danger', 'drop', 'slump'];
  
  let posCount = 0;
  let urgCount = 0;

  positiveTerms.forEach(term => { if (lower.includes(term)) posCount++; });
  urgentTerms.forEach(term => { if (lower.includes(term)) urgCount++; });

  if (posCount > urgCount && posCount > 0) {
    return { label: 'Positive', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
  }
  if (urgCount > posCount && urgCount > 0) {
    return { label: 'Urgent', color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' };
  }
  return { label: 'Neutral', color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800' };
};

/**
 * Client-Side Semantic Summarizer (Zero API Calls)
 * Extracts direct journalistic sentences without emojis, prefixes, or dashes.
 * @param {object} article
 * @returns {object}
 */
const generateLocalSmartSummary = (article) => {
  const title = sanitizeText(article.title || '');
  const description = sanitizeText(article.description || '');
  const fullText = `${title}. ${description}`;
  const tone = detectTone(fullText);
  const readTime = estimateReadTime(fullText);

  // Split into real sentences
  const rawSentences = description
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim().replace(/^[-*•\s]+/, ''))
    .filter(s => s.length > 15);

  let point1 = '';
  let point2 = '';
  let point3 = '';

  if (rawSentences.length >= 3) {
    point1 = rawSentences[0];
    point2 = rawSentences[1];
    point3 = rawSentences[2];
  } else if (rawSentences.length === 2) {
    point1 = rawSentences[0];
    point2 = rawSentences[1];
    point3 = 'Further official statements and developments remain under review.';
  } else if (rawSentences.length === 1) {
    point1 = title;
    point2 = rawSentences[0];
    point3 = 'Coverage continues across primary news distribution channels.';
  } else {
    point1 = title;
    point2 = description || 'Reporting on this development continues to evolve.';
    point3 = 'Relevant authorities and correspondents are assessing current outcomes.';
  }

  // Ensure clean sentences without dashes or bullet markers
  const cleanPoints = [point1, point2, point3].map(p => p.replace(/^[-*•#\d.]+\s*/, '').trim());

  return {
    takeaways: cleanPoints,
    summaryText: cleanPoints.join('. '),
    tone,
    readTime,
    engine: 'Local Summarizer',
    isCached: false,
    timestamp: Date.now(),
  };
};

/**
 * Cloud Gemini Summarizer
 * Instructed explicitly: factual, clean, no emojis, no dashes, no bullet icons.
 * @param {object} article
 * @param {string} apiKey
 * @returns {Promise<object>}
 */
const fetchGeminiSummary = async (article, apiKey) => {
  const title = sanitizeText(article.title || '');
  const description = sanitizeText(article.description || '');
  const prompt = `Summarize this news article into exactly 3 concise factual sentences.
Do not use bullet points. Do not use dashes or hyphens. Do not use emojis. Do not use conversational filler or introductions.
Return each sentence on its own line.

Headline: ${title}
Details: ${description}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 180,
        temperature: 0.1,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Gemini API Error (${response.status})`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  const sentences = rawText
    .split('\n')
    .map(line => line.replace(/^[-*•#\d.]+\s*/, '').replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}]/gu, '').trim())
    .filter(line => line.length > 10)
    .slice(0, 3);

  if (sentences.length === 0) {
    throw new Error('Summary response was empty');
  }

  const fullText = `${title}. ${description}`;
  const tone = detectTone(fullText);
  const readTime = estimateReadTime(fullText);

  return {
    takeaways: sentences,
    summaryText: sentences.join('. '),
    tone,
    readTime,
    engine: 'Gemini 1.5 Flash',
    isCached: false,
    timestamp: Date.now(),
  };
};

/**
 * Requests an AI Summary for an article with 24-hour cache and in-flight deduplication.
 * @param {object} article
 * @returns {Promise<object>}
 */
export const getArticleAiSummary = async (article) => {
  if (!article || (!article.title && !article.url)) {
    throw new Error('Invalid article object');
  }

  const cacheKey = buildCacheKey('ai_summary', article.url || article.title);

  // Check cache first
  const cached = getCacheItem(cacheKey);
  if (cached && cached.data) {
    return {
      ...cached.data,
      isCached: true,
      cachedAt: cached.cachedAt,
    };
  }

  // Deduplicate in-flight calls
  if (pendingAiRequests.has(cacheKey)) {
    return pendingAiRequests.get(cacheKey);
  }

  const task = (async () => {
    try {
      const apiKey = getGeminiApiKey();
      let summaryData;

      if (apiKey) {
        try {
          summaryData = await fetchGeminiSummary(article, apiKey);
        } catch (apiErr) {
          console.warn('[AIService] Cloud API unavailable, using local summarizer:', apiErr.message);
          summaryData = generateLocalSmartSummary(article);
        }
      } else {
        summaryData = generateLocalSmartSummary(article);
      }

      setCacheItem(cacheKey, summaryData, CACHE_TTL.AI_SUMMARY);
      return summaryData;
    } finally {
      pendingAiRequests.delete(cacheKey);
    }
  })();

  pendingAiRequests.set(cacheKey, task);
  return task;
};

/**
 * Generates or retrieves a single batch digest for a category.
 * Clean journalistic briefing, no emojis, no dashes.
 * @param {string} topic
 * @param {Array<object>} articles
 * @returns {Promise<object>}
 */
export const getCategoryAiDigest = async (topic, articles = []) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const cleanTopic = (topic || 'general').toLowerCase();
  const cacheKey = buildCacheKey('ai_digest', cleanTopic);

  const cached = getCacheItem(cacheKey);
  if (cached && cached.data) {
    return {
      ...cached.data,
      isCached: true,
      cachedAt: cached.cachedAt,
    };
  }

  if (pendingAiRequests.has(cacheKey)) {
    return pendingAiRequests.get(cacheKey);
  }

  const task = (async () => {
    try {
      const topHeadlines = articles
        .slice(0, 4)
        .map((a, i) => `${i + 1}. ${sanitizeText(a.title)}`)
        .join('\n');

      const apiKey = getGeminiApiKey();
      let digestData;

      if (apiKey) {
        try {
          const prompt = `Synthesize today's primary news in ${cleanTopic} into two clear factual sentences.
Do not use bullet points. Do not use dashes or hyphens. Do not use emojis.
Headlines:\n${topHeadlines}`;

          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
          
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: 120, temperature: 0.1 },
            }),
          });

          if (response.ok) {
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text
              ?.replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}]/gu, '')
              .replace(/^[-*•#\s]+/, '')
              .trim();
            if (text) {
              digestData = {
                topic: cleanTopic,
                briefing: text,
                headlineCount: Math.min(articles.length, 4),
                engine: 'Gemini 1.5 Flash',
                isCached: false,
                timestamp: Date.now(),
              };
            }
          }
        } catch (err) {
          console.warn('[AIService] Cloud digest call failed, using local synthesis:', err);
        }
      }

      // Local synthesis fallback
      if (!digestData) {
        const topStory = articles[0]?.title ? sanitizeText(articles[0].title) : '';
        const secondStory = articles[1]?.title ? sanitizeText(articles[1].title) : '';
        digestData = {
          topic: cleanTopic,
          briefing: `Primary reporting focuses on ${topStory}. Concurrently, reporting highlights developments in ${secondStory}.`,
          headlineCount: Math.min(articles.length, 4),
          engine: 'Local Synthesis',
          isCached: false,
          timestamp: Date.now(),
        };
      }

      setCacheItem(cacheKey, digestData, CACHE_TTL.AI_DIGEST);
      return digestData;
    } finally {
      pendingAiRequests.delete(cacheKey);
    }
  })();

  pendingAiRequests.set(cacheKey, task);
  return task;
};

/**
 * Text-to-Speech audio reader using browser Web Speech API
 */
export const speechReader = {
  speak: (text, rate = 1.0, onEnd, onError) => {
    if (!('speechSynthesis' in window)) {
      if (onError) onError('Speech synthesis not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const clean = sanitizeText(text)
      .replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}]/gu, '')
      .replace(/[-*•#]/g, '');

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = Math.max(0.7, Math.min(2.0, Number(rate) || 1.0));
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;

    window.speechSynthesis.speak(utterance);
  },

  stop: () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  isSpeaking: () => {
    return 'speechSynthesis' in window && window.speechSynthesis.speaking;
  },
};

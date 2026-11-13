/**
 * High-Performance Multi-Tier Caching Service for NewsCryst
 * Combines in-memory cache and localStorage with custom TTLs and storage safety.
 */

// Memory Cache Map (Fastest, zero serialization overhead)
const memoryCache = new Map();

// Default TTL configurations (in milliseconds)
export const CACHE_TTL = {
  NEWS_CATEGORY: 15 * 60 * 1000,    // 15 Minutes for category feeds
  NEWS_SEARCH: 15 * 60 * 1000,      // 15 Minutes for search results
  AI_SUMMARY: 24 * 60 * 60 * 1000,  // 24 Hours for individual article summaries
  AI_DIGEST: 60 * 60 * 1000,        // 1 Hour for category AI daily digests
};

const CACHE_PREFIX = 'newscryst_cache_';

/**
 * Generates a clean cache key
 * @param {string} namespace
 * @param {string} id
 * @returns {string}
 */
export const buildCacheKey = (namespace, id) => {
  const sanitizedId = String(id).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  return `${CACHE_PREFIX}${namespace}_${sanitizedId}`;
};

/**
 * Stores data into both memory and persistent localStorage with an expiration timestamp
 * @param {string} key
 * @param {any} data
 * @param {number} ttlMs
 */
export const setCacheItem = (key, data, ttlMs = CACHE_TTL.NEWS_CATEGORY) => {
  const entry = {
    timestamp: Date.now(),
    expiresAt: Date.now() + ttlMs,
    data,
  };

  // 1. Store in memory
  memoryCache.set(key, entry);

  // 2. Store in localStorage
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (err) {
    console.warn('[CacheService] Storage quota exceeded or blocked. Evicting old items...', err);
    evictOldCacheEntries();
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch {
      // Memory cache is still intact
    }
  }
};

/**
 * Retrieves cached data if still valid. Returns null if expired or missing.
 * @param {string} key
 * @returns {any|null}
 */
export const getCacheItem = (key) => {
  const now = Date.now();

  // 1. Check memory cache first
  if (memoryCache.has(key)) {
    const memEntry = memoryCache.get(key);
    if (now < memEntry.expiresAt) {
      return { data: memEntry.data, source: 'memory', cachedAt: memEntry.timestamp };
    }
    memoryCache.delete(key);
  }

  // 2. Fall back to localStorage
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const diskEntry = JSON.parse(raw);
    if (diskEntry && diskEntry.expiresAt && now < diskEntry.expiresAt) {
      // Re-populate memory cache for instant future access
      memoryCache.set(key, diskEntry);
      return { data: diskEntry.data, source: 'disk', cachedAt: diskEntry.timestamp };
    }

    // Expired item cleanup
    localStorage.removeItem(key);
  } catch (err) {
    console.warn('[CacheService] Error reading cache key:', key, err);
  }

  return null;
};

/**
 * Removes all expired cache items from localStorage
 */
export const evictOldCacheEntries = () => {
  const now = Date.now();
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          if (item && item.expiresAt && now >= item.expiresAt) {
            keysToRemove.push(key);
          }
        } catch {
          keysToRemove.push(key);
        }
      }
    }
    keysToRemove.forEach((k) => {
      localStorage.removeItem(k);
      memoryCache.delete(k);
    });
  } catch (err) {
    console.warn('[CacheService] Eviction failed:', err);
  }
};

/**
 * Clears all NewsCryst caches (keeps user favorites and dark mode settings)
 */
export const clearAppCache = () => {
  memoryCache.clear();
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    return keysToRemove.length;
  } catch (err) {
    console.warn('[CacheService] Clear cache failed:', err);
    return 0;
  }
};

/**
 * Returns estimated size of cached data in kilobytes (KB)
 * @returns {number}
 */
export const getCacheSizeKb = () => {
  let totalBytes = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        const val = localStorage.getItem(key);
        totalBytes += (key.length + (val ? val.length : 0)) * 2; // UTF-16 approx
      }
    }
  } catch {
    // ignore
  }
  return Math.round((totalBytes / 1024) * 10) / 10;
};


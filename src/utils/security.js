/**
 * Security and Sanitization Utilities for NewsCryst
 * Ensures link safety, protocol protection, and safe text handling.
 */

// Allowed URL schemes for external links
const SAFE_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * Validates whether a URL is safe to open/link to.
 * Blocks javascript:, vbscript:, data: and other unsafe protocols.
 * @param {string} urlString
 * @returns {boolean}
 */
export const isSafeUrl = (urlString) => {
  if (!urlString || typeof urlString !== 'string') return false;
  
  const trimmed = urlString.trim();
  if (!trimmed) return false;

  // Relative URLs starting with '/' are considered safe for internal assets
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true;
  }

  try {
    const parsed = new URL(trimmed, window.location.origin);
    return SAFE_PROTOCOLS.has(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Returns safe attributes for external links
 * @param {string} target
 * @returns {object}
 */
export const getSafeLinkProps = (target = '_blank') => ({
  target,
  rel: 'noopener noreferrer nofollow',
});

/**
 * Strips potentially dangerous tags/scripts from plain text strings
 * @param {string} input
 * @returns {string}
 */
export const sanitizeText = (input) => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

/**
 * Safe image URL resolver with fallback
 * @param {string} url
 * @param {string} fallbackImage
 * @returns {string}
 */
export const getSafeImageUrl = (url, fallbackImage) => {
  if (!url || !isSafeUrl(url)) {
    return fallbackImage;
  }
  return url;
};


// Server-side proxy for Currents API. The key lives only in Netlify's
// environment (CURRENTS_API_KEY) and is never shipped to the browser.
const ENDPOINTS = {
  latest: 'https://api.currentsapi.services/v1/latest-news',
  search: 'https://api.currentsapi.services/v1/search',
};

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  const apiKey = process.env.CURRENTS_API_KEY;
  if (!apiKey) {
    return json(500, { message: 'News service is not configured on the server.' });
  }

  const { type = 'latest', category, keywords } = event.queryStringParameters || {};
  const endpoint = ENDPOINTS[type];
  if (!endpoint) return json(400, { message: 'Invalid request type.' });

  const params = new URLSearchParams({ language: 'en' });
  if (type === 'search') {
    if (!keywords) return json(400, { message: 'Missing keywords.' });
    params.set('keywords', keywords.slice(0, 200));
  } else {
    params.set('category', (category || 'general').slice(0, 50));
  }
  params.set('apiKey', apiKey);

  try {
    const upstream = await fetch(`${endpoint}?${params}`);
    const data = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      return json(upstream.status, { message: data?.message || `Upstream error (${upstream.status})` });
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
      body: JSON.stringify({ news: data?.news || [] }),
    };
  } catch {
    return json(502, { message: 'Could not reach the news provider.' });
  }
};

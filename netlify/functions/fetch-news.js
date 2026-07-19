const https = require('https');

exports.handler = async function(event, context) {
  const { category, q } = event.queryStringParameters || {};
  const API_KEY = process.env.VITE_NEWS_API;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API key is not configured on the server." }),
    };
  }

  let url = '';
  if (q) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=publishedAt&language=en&pageSize=50&apiKey=${API_KEY}`;
  } else {
    const queryCategory = category || 'general';
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(queryCategory)}&apiKey=${API_KEY}`;
  }

  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'NewsCryst/1.0 (Netlify Function)' } }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: data
        });
      });
    }).on('error', (err) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ message: "Failed to fetch news", error: err.message })
      });
    });
  });
};

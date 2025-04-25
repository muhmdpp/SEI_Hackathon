const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com',
    changeOrigin: true,
    headers: {
      'x-rapidapi-key': '2ca41326admshe54f412f607b0f2p124fbcjsn4edd60c8b068',
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  })
);

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});
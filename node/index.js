'use strict';

const http = require('http');
const https = require('https');
const { URL } = require('url');

const LD_JSON_RE =
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;

function fail(message) {
  console.error(message);
  process.exit(1);
}

function extractLDJson(urlString) {
  let parsedUrl;
  try {
    parsedUrl = new URL(urlString);
  } catch {
    fail(`Invalid URL: ${urlString}`);
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    fail(`Unsupported URL scheme: ${parsedUrl.protocol}`);
  }

  const client = parsedUrl.protocol === 'https:' ? https : http;
  let finished = false;

  const req = client.get(urlString, (res) => {
    if (res.statusCode && res.statusCode >= 400) {
      res.resume();
      fail(`HTTP ${res.statusCode} ${res.statusMessage || ''}`.trim());
    }

    let buffer = '';

    res.on('data', (chunk) => {
      if (finished) {
        return;
      }
      buffer += chunk.toString('utf8');
      const match = buffer.match(LD_JSON_RE);
      if (match) {
        try {
          const data = JSON.parse(match[1].trim());
          finished = true;
          console.log(JSON.stringify(data, null, 2));
        } catch (err) {
          fail(`Invalid JSON in ld+json script: ${err.message}`);
        }
        res.destroy();
      }
    });

    res.on('end', () => {
      if (finished) {
        return;
      }
      fail('No application/ld+json script block found in the response.');
    });

    res.on('error', (err) => {
      if (finished) {
        return;
      }
      fail(err.message);
    });
  });

  req.on('error', (err) => {
    fail(err.message);
  });
}

const urlArg = process.argv[2];
if (!urlArg) {
  console.error('Usage: node index.js <url>');
  process.exit(1);
}

extractLDJson(urlArg);

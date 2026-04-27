# Extract JSON-LD from any webpage

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18%2B-339933.svg)
![Python](https://img.shields.io/badge/python-3.9%2B-blue.svg)

> Instantly extract and inspect [JSON-LD](https://json-ld.org/) structured data from any webpage.

## 📘 What is JSON-LD?
**JSON-LD (JavaScript Object Notation for Linked Data)** is a format websites use to provide a "behind-the-scenes" summary to search engines. While invisible to visitors, it tells Google and Bing exactly what a page is about:
*   **Content Type:** Is this an Article, Product, or Event?
*   **Metadata:** Who is the author? What is the published date?
*   **Rich Results:** This data is what enables "Star Ratings," FAQ dropdowns, and Recipe cards in search results.

**Why this tool matters:** If your JSON-LD is broken or missing, search engines may struggle to index your content correctly. This tool lets you verify that data in seconds.

---

## ✨ Key Features
*   **High Speed:** Reads the webpage in chunks and stops as soon as the data is found—no need to wait for a full page download.
*   **Zero Dependencies:** Built entirely on the Node.js and Python standard libraries. No `pip install` or `npm install` required.
*   **Clean Output:** Automatically formats messy code into a human-readable JSON structure.

---

## Quick run (no clone)

You can extract JSON-LD without cloning this repository. Copy below script, replace `YOUR_URL`, and run it in a shell—handy for quick checks or wiring into scripts.

### Python

[View standalone Gist](https://gist.github.com/ysskrishna/95eef8f89e763bd165dade87f5a97db9)

```bash
python3 -c "
import urllib.request, json, re

url = 'YOUR_URL'

with urllib.request.urlopen(url) as res:
    buf = ''
    while True:
        chunk = res.read(4096).decode('utf-8', errors='ignore')
        if not chunk:
            break
        buf += chunk
        m = re.search(r'<script type=\"application/ld\+json\">([\s\S]*?)</script>', buf)
        if m:
            print(json.dumps(json.loads(m.group(1)), indent=2))
            break  # stop reading early, like res.destroy()
"
```

### Node.js

[View standalone Gist](https://gist.github.com/ysskrishna/cfe3d1a89ffa122e783c2fda4f5aedf7)

```bash
node -e "
const https = require('https');
const url = 'YOUR_URL';

https.get(url, res => {
  let buffer = '';
  res.on('data', chunk => {
    buffer += chunk;

    const match = buffer.match(/<script type=\"application\/ld\\+json\">([\\s\\S]*?)<\\/script>/);
    if (match) {
      console.log(JSON.stringify(JSON.parse(match[1]), null, 2));
      res.destroy(); // 🚀 stop downloading early
    }
  });
});
"
```

---

## Usage

### Node.js

```bash
node node/index.js <url>
```

### Python

```bash
python3 python/main.py <url>
```

Copy-paste with a real URL:

```bash
node node/index.js https://ysskrishna.vercel.app/blog/move-windows-between-monitors-macos-raycast
```

```bash
python3 python/main.py https://ysskrishna.vercel.app/blog/move-windows-between-monitors-macos-raycast
```


**Output (illustrative):**

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Move Windows Between Monitors on macOS Without Dragging",
  "url": "https://ysskrishna.vercel.app/blog/move-windows-between-monitors-macos-raycast",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ysskrishna.vercel.app/blog/move-windows-between-monitors-macos-raycast"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ysskrishna",
    "url": "https://ysskrishna.vercel.app"
  },
  "description": "Move the focused window between monitors on macOS with Raycast (Option + arrows), and use Control + arrows for Spaces. Setup notes and display quirks.",
  "datePublished": "2026-04-23T00:00:00.000Z",
  "image": [
    "https://picsum.photos/seed/a83def8901017977-56c36902a93f690/1200/630",
    "https://picsum.photos/seed/a83def8901017977-56c36902a93f690/1200/514"
  ],
  "author": {
    "@type": "Person",
    "name": "ysskrishna",
    "url": "https://ysskrishna.vercel.app",
    "image": "https://ysskrishna.vercel.app/media/blog/authors/ysskrishna/avatar.webp"
  }
}
```


---

## 🛠 Technical Details

### Who is this for?
*   **SEO Specialists:** Quickly audit Schema markup on any site.
*   **Developers:** Debug structured data output during local development.
*   **Content Teams:** Ensure that "Rich Result" data is correctly formatted before publishing.

### Behavior & Limitations
*   **First-Match Logic:** To stay fast, the tool extracts the **first** `application/ld+json` block it encounters. 
*   **Regex-Based:** Uses pattern matching rather than a heavy HTML parser to keep the tool lightweight.

## Requirements

- **Node.js** 18+ (uses built-in `http` / `https`), or
- **Python** 3.9+ (stdlib only)

## License

MIT © [Y. Siva Sai Krishna](https://github.com/ysskrishna) — see [LICENSE](LICENSE) for details.

---

<p align="left">
  <a href="https://github.com/ysskrishna">Author's GitHub</a> •
  <a href="https://linkedin.com/in/ysskrishna">Author's LinkedIn</a> •
  <a href="https://github.com/ysskrishna/extract-ld-json/issues">Report issues</a> •
  <a href="https://gist.github.com/ysskrishna/95eef8f89e763bd165dade87f5a97db9">Python (standalone)</a> •
  <a href="https://gist.github.com/ysskrishna/cfe3d1a89ffa122e783c2fda4f5aedf7">Node (standalone)</a>
</p>

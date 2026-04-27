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
  <a href="https://github.com/ysskrishna/extract-ld-json/issues">Report issues</a>
</p>

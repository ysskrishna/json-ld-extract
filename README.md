# Extract JSON-LD from any webpage

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18%2B-339933.svg)
![Python](https://img.shields.io/badge/python-3.9%2B-blue.svg)

> Instantly extract and inspect [JSON-LD](https://json-ld.org/) structured data from any webpage.

---

## Why this tool?

If you work with:

- SEO
- Schema markup
- Rich results
- Content audits

---

## What it does

- Connects to a live URL over HTTP(S)
- Extracts JSON-LD (`application/ld+json`)
- Prints clean, formatted JSON

All in **one command**.

**How it works:** the response is read in chunks. As soon as the **first** complete `application/ld+json` script block is found, the client **stops downloading** and pretty-prints that JSON to stdout—so you often avoid pulling the full HTML.

---

## Who is this for?

- SEO specialists inspecting structured data
- Content teams validating schema markup
- Developers debugging JSON-LD output
- Anyone doing quick website audits

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

## Features

- Extract JSON-LD from any live URL
- Clean, pretty-printed output
- Fast and lightweight
- No extra dependencies (stdlib only in both implementations)
- Works with Node.js and Python

---

## Use cases

- Validate structured data quickly
- Debug schema issues
- Inspect competitors’ markup
- Automate SEO checks in scripts

---

## Behavior

- Output is **one** JSON value: the **first** matching `application/ld+json` block. Pages with multiple JSON-LD blocks are not fully enumerated.
- Exits with a non-zero status and a message on stderr if: the URL is invalid, the request fails, no matching script is found, or the script body is not valid JSON.

---

## Limitations

- Matching uses a **regex**, not a full HTML parser; unusual markup around the script tag may break detection.
- Some sites block non-browser clients; you may need a custom `User-Agent` or other headers (not included here).
- The Node CLI supports only **http:** and **https:** URLs.

---

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

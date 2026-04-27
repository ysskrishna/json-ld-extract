# Extract LD+JSON from HTML

Small command-line utilities that **stream** a page over HTTP(S), stop as soon as they find the first `<script type="application/ld+json">` block, and print pretty-printed JSON to stdout.

Useful for quickly inspecting [JSON-LD](https://json-ld.org/) / structured data on a live URL without downloading the whole HTML first.

## Requirements

- **Node.js** 18+ (uses built-in `http` / `https`), or  
- **Python** 3.9+ (stdlib only)

## Usage

### Node

```bash
node node/index.js https://example.com/page
```

### Python

```bash
python3 python/main.py https://example.com/page
```

### Example script

```bash
chmod +x examples/demo.sh
./examples/demo.sh
# or: ./examples/demo.sh https://example.com
```

## Behavior

- Reads the response in chunks until the **first** `application/ld+json` script tag is complete, then **stops** the download early.
- Prints **one** JSON value (the first matching block). Pages with multiple LD+JSON blocks are not fully enumerated.
- Exits with a non-zero status and a message on stderr if: the URL is invalid, the request fails, no matching script is found, or the script body is not valid JSON.

## Limitations

- Matching is done with a **regex**, not a full HTML parser; unusual markup around the script tag may break detection.
- Some sites block non-browser clients; you may need a custom `User-Agent` or other headers (not included here).
- Only **http:** and **https:** URLs are supported in the Node CLI.

## License

MIT — see [LICENSE](LICENSE).

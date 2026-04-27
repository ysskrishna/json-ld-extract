#!/usr/bin/env bash
# Run both CLIs against the same URL (pass URL as first arg or use default).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
URL="${1:-https://ysskrishna.vercel.app/blog/move-windows-between-monitors-macos-raycast}"

echo "=== Node ==="
node "$ROOT/node/index.js" "$URL"

echo ""
echo "=== Python ==="
python3 "$ROOT/python/main.py" "$URL"

import json
import re
import sys
import urllib.error
import urllib.request

LD_JSON_RE = re.compile(
    r'<script type="application/ld\+json">([\s\S]*?)</script>'
)


def fail(message):
    print(message, file=sys.stderr)
    sys.exit(1)


def extract_ld_json(url):
    try:
        with urllib.request.urlopen(url) as res:
            buf = ''
            while True:
                chunk = res.read(4096)
                if not chunk:
                    break
                buf += chunk.decode('utf-8', errors='ignore')
                m = LD_JSON_RE.search(buf)
                if m:
                    try:
                        parsed = json.loads(m.group(1).strip())
                    except json.JSONDecodeError as e:
                        fail(f'Invalid JSON in ld+json script: {e}')
                    print(json.dumps(parsed, indent=2))
                    return
    except urllib.error.HTTPError as e:
        fail(f'HTTP {e.code} {e.reason}')
    except urllib.error.URLError as e:
        reason = e.reason
        fail(str(reason) if reason else str(e))
    fail('No application/ld+json script block found in the response.')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python main.py <url>', file=sys.stderr)
        sys.exit(1)
    extract_ld_json(sys.argv[1])

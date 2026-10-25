"""Local panel for picking a day's cover and removing photos.

Usage:  python tools/photo_panel.py <trip-id> <day>      e.g.  python tools/photo_panel.py nagoya 2
Then open http://localhost:8766/
  Right-click a photo  -> make it the day's cover (trips.js)
  Left-click a photo   -> remove it: moved to "<repo> - removed duplicates/<Trip> (removed in panel)/", never deleted
  復原 (undo)          -> puts the last removed photo back
Nothing is committed; review the changes, then commit and push.
"""
import io
import json
import os
import shutil
import sys
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from PIL import Image, ImageOps

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRIP_ID, DAY = sys.argv[1], int(sys.argv[2])
PORT = 8766
IMAGE_EXT = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif')
thumbs = {}
removed = []  # (photo path, where it went), for undo


def load_trips():
    src = open(os.path.join(REPO, 'trips.js'), encoding='utf-8', newline='').read()
    head, body = src.split('window.TRIPS = ', 1)
    return head, json.loads(body.rstrip().rstrip(';'))


def save_trips(head, trips):
    text = head + 'window.TRIPS = ' + json.dumps(trips, ensure_ascii=False, indent=2) + ';\n'
    open(os.path.join(REPO, 'trips.js'), 'w', encoding='utf-8', newline='').write(text.replace('\r\n', '\n').replace('\n', '\r\n'))


def the_day(trips):
    trip = next(t for t in trips if t['id'] == TRIP_ID)
    return trip, trip['days'][DAY - 1]


def day_folder():
    _, trips = load_trips()
    trip, _ = the_day(trips)
    return f"{trip['folder']}/Day{DAY}"


def photos():
    folder = day_folder()
    files = [f for f in os.listdir(os.path.join(REPO, folder)) if f.lower().endswith(IMAGE_EXT)]
    return [f'{folder}/{f}' for f in sorted(files)]


def thumbnail(path):
    if path not in thumbs:
        im = ImageOps.exif_transpose(Image.open(os.path.join(REPO, path))).convert('RGB')
        im.thumbnail((480, 480))
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=82)
        thumbs[path] = buf.getvalue()
    return thumbs[path]


def state():
    _, trips = load_trips()
    trip, day = the_day(trips)
    return {
        'title': f"{trip['name']} · 第 {DAY} 天 · {day.get('title', '')}",
        'cover': day.get('cover'),
        'whole': bool(day.get('coverWhole')),
        'photos': photos(),
        'canUndo': bool(removed),
    }


def set_cover(path):
    head, trips = load_trips()
    _, day = the_day(trips)
    items = [(k, v) for k, v in day.items() if k not in ('coverPosition', 'coverWhole')]
    day.clear()
    for k, v in items:
        day[k] = path if k == 'cover' else v
    save_trips(head, trips)


def set_whole(on):
    head, trips = load_trips()
    _, day = the_day(trips)
    items = [(k, v) for k, v in day.items() if k != 'coverWhole']
    day.clear()
    for k, v in items:
        day[k] = v
        if k == 'cover' and on:
            day['coverWhole'] = True
    save_trips(head, trips)


def remove(path):
    head, trips = load_trips()
    trip, day = the_day(trips)
    if day.get('cover') == path:
        return '這張是封面，請先右鍵選別張當封面。'
    dest_dir = os.path.join(os.path.dirname(REPO), os.path.basename(REPO) + ' - removed duplicates', f"{os.path.basename(trip['folder'])} (removed in panel)")
    os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, f'Day{DAY}_' + os.path.basename(path))
    shutil.move(os.path.join(REPO, path), dest)
    removed.append((path, dest))
    # Drop it from the itinerary and captions if trips.js mentions it.
    trip['captions'] = {k: v for k, v in trip.get('captions', {}).items() if k != path}
    for item in day.get('timeline', []):
        if 'photos' in item:
            item['photos'] = [p for p in item['photos'] if p.get('src') != path]
            if not item['photos']:
                del item['photos']
    save_trips(head, trips)
    return None


def undo():
    if removed:
        path, dest = removed.pop()
        shutil.move(dest, os.path.join(REPO, path))


PAGE = r'''<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><title>選封面 · 刪照片</title>
<style>
  :root { --accent: #0E7490; --ink: #13232B; --muted: #5B6B73; --bg: #FAFAF7; --line: #E3E7E5; }
  body { margin: 0; font-family: "Noto Sans TC", system-ui, sans-serif; background: var(--bg); color: var(--ink); }
  header { position: sticky; top: 0; z-index: 2; background: var(--bg); border-bottom: 1px solid var(--line); padding: 14px 24px; display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
  h1 { font-size: 1.1rem; margin: 0; }
  .help { color: var(--muted); font-size: .9rem; }
  .help b { color: var(--ink); }
  button { font: inherit; padding: 6px 14px; border-radius: 8px; border: 1px solid var(--line); background: #fff; cursor: pointer; }
  button:disabled { opacity: .4; cursor: default; }
  label { font-size: .9rem; display: flex; gap: 6px; align-items: center; }
  #msg { color: #B42318; font-size: .9rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; padding: 20px 24px 60px; }
  figure { margin: 0; position: relative; border-radius: 8px; overflow: hidden; background: #fff; border: 3px solid transparent; cursor: pointer; }
  figure img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; background: #EEF3F2; }
  figure:hover { border-color: #F04438; }
  figure:hover::after { content: "左鍵：刪除"; position: absolute; left: 6px; bottom: 30px; background: #F04438; color: #fff; font-size: .75rem; padding: 2px 8px; border-radius: 6px; }
  figure.cover { border-color: var(--accent); cursor: default; }
  figure.cover::after { content: "封面"; position: absolute; left: 6px; top: 6px; background: var(--accent); color: #fff; font-size: .8rem; font-weight: 700; padding: 2px 10px; border-radius: 6px; bottom: auto; }
  figcaption { font-size: .75rem; color: var(--muted); padding: 4px 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style></head>
<body>
<header>
  <h1 id="title"></h1>
  <span class="help"><b>右鍵</b>設為封面 · <b>左鍵</b>刪除（移到 removed duplicates 資料夾）</span>
  <label><input type="checkbox" id="whole">封面整張顯示（不裁切）</label>
  <button id="undo">復原刪除</button>
  <span id="count" class="help"></span>
  <span id="msg"></span>
</header>
<div class="grid" id="grid"></div>
<script>
const grid = document.getElementById('grid');
async function call(action, body) {
  const r = await fetch('/api/' + action, { method: 'POST', body: JSON.stringify(body || {}) });
  draw(await r.json());
}
function draw(s) {
  document.getElementById('title').textContent = s.title;
  document.getElementById('whole').checked = s.whole;
  document.getElementById('undo').disabled = !s.canUndo;
  document.getElementById('count').textContent = s.photos.length + ' 張';
  document.getElementById('msg').textContent = s.error || '';
  grid.innerHTML = s.photos.map(p => `<figure data-path="${p}" class="${p === s.cover ? 'cover' : ''}"><img loading="lazy" src="/thumb?p=${encodeURIComponent(p)}"><figcaption>${p.split('/').pop()}</figcaption></figure>`).join('');
}
grid.addEventListener('contextmenu', e => {
  const f = e.target.closest('figure'); if (!f) return;
  e.preventDefault(); call('cover', { path: f.dataset.path });
});
grid.addEventListener('click', e => {
  const f = e.target.closest('figure'); if (!f || f.classList.contains('cover')) return;
  call('remove', { path: f.dataset.path });
});
document.getElementById('undo').onclick = () => call('undo');
document.getElementById('whole').onchange = e => call('whole', { on: e.target.checked });
call('state');
</script></body></html>'''


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def send(self, body, kind):
        self.send_response(200)
        self.send_header('Content-Type', kind)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        url = urllib.parse.urlparse(self.path)
        if url.path == '/thumb':
            path = urllib.parse.parse_qs(url.query)['p'][0]
            if path in photos():
                return self.send(thumbnail(path), 'image/jpeg')
            self.send_error(404)
        else:
            self.send(PAGE.encode('utf-8'), 'text/html; charset=utf-8')

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers.get('Content-Length', 0))) or b'{}')
        action = self.path.rsplit('/', 1)[-1]
        error = None
        path = body.get('path')
        if action in ('cover', 'remove') and path not in photos():
            error = '找不到這張照片。'
        elif action == 'cover':
            set_cover(path)
        elif action == 'remove':
            error = remove(path)
        elif action == 'undo':
            undo()
        elif action == 'whole':
            set_whole(bool(body.get('on')))
        result = state()
        if error:
            result['error'] = error
        self.send(json.dumps(result, ensure_ascii=False).encode('utf-8'), 'application/json')


if __name__ == '__main__':
    print(f'Open http://localhost:{PORT}/  ({TRIP_ID} day {DAY})')
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()

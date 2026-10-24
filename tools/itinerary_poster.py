"""Build the illustrated itinerary poster for a trip's Schedule page from trips.js.

Usage:  python tools/itinerary_poster.py <out_dir> <trip-id>      (writes <out_dir>/<trip-id>.html)
Render: msedge --headless=new --force-device-scale-factor=1.5 --window-size=1600,<height>
        --screenshot=<png> file:///<out_dir>/<trip-id>.html   (height = data-h on <body> after load)
Then save as Pictures/<Trip>/Schedule/<trip-id>-itinerary.jpg (JPEG q90).
"""
import os
import re
import sys
import json
import html

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1]
TRIP = sys.argv[2]

src = open(os.path.join(REPO, 'trips.js'), encoding='utf-8').read()
trips = json.loads(src.split('window.TRIPS = ', 1)[1].rstrip().rstrip(';'))
trip = next(t for t in trips if t['id'] == TRIP)

ICONS = [
    ('✈', '✈️'), ('萬座毛', '🌊'), ('外人住宅', '🏘️'), ('波上宮', '⛩️'), ('滑翔傘', '🪂'), ('夕陽', '🌅'), ('拉麵', '🍜'), ('燒肉', '🥩'), ('國際通', '🛍️'), ('Outlet', '🛍️'), ('沖繩麵', '🍜'), ('機場', '🛬'), ('入住', '🏨'), ('Airbnb', '🏡'), ('取車', '🚗'), ('開車', '🚗'), ('驅車', '🚗'),
    ('企鵝', '🐧'), ('無尾熊', '🐨'), ('蒸汽火車', '🚂'), ('景觀鐵道', '🚠'), ('名鐵', '🚃'),
    ('教堂', '⛪'), ('大學', '🎓'), ('博物館', '🏛️'), ('歌劇院', '🎭'), ('港灣大橋', '🌉'), ('賭場', '🎰'),
    ('煙火', '🎆'), ('植物園', '🎆'), ('動物園', '🦒'), ('月神公園', '🎡'), ('魚市場', '🐟'),
    ('門徒岩', '🪨'), ('峽谷', '🪨'), ('大洋路', '🛣️'), ('國家公園', '🌳'), ('三姊妹', '⛰️'), ('上高地', '🏔️'),
    ('合掌村', '🏡'), ('老街', '🏮'), ('町並', '🏮'), ('海灘', '🏖️'), ('花園', '🌳'), ('公園', '🌳'),
    ('咖啡', '☕'), ('Costco', '🛒'), ('逛街', '🛍️'), ('Mall', '🛍️'), ('商圈', '🛍️'), ('購物', '🛍️'),
    ('壽司', '🍣'), ('そば', '🍜'), ('蛋糕', '🍰'), ('甜點', '🍰'), ('可頌', '🥐'), ('パン', '🥐'), ('早午餐', '🥞'),
    ('早餐', '🍳'), ('午餐', '🍱'), ('晚餐', '🍽️'), ('喝一杯', '🍸'), ('返回', '🚌'), ('回', '🚌'), ('出發', '🚐'),
    ('漫遊', '🚶'), ('散步', '🚶'),
]


def icon(item):
    text = item['time'] + ' ' + clean(item['text'])
    for key, emoji in ICONS:
        if key in text:
            return emoji
    return '📍'


def clean(text):
    text = text.split('\n')[0]
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'（[^）]*到機場[^）]*）', '', text)
    return text.strip()


def short_time(t):
    return re.sub(r'^\d+月\d+日 ', '', t)


COLORS = ['#e0574f', '#f0a23b', '#4aa96c', '#3b8fd0', '#8e6cc9', '#e07ab0']
days = trip['days']
cols = min(len(days), 6)  # one row for short trips, rows of 6 for long ones
cards = []
for i, day in enumerate(days):
    color = COLORS[i % len(COLORS)]
    items = ''.join(
        f'<li><span class="ic">{icon(it)}</span><span><b>{html.escape(short_time(it["time"]))}</b>{html.escape(clean(it["text"]))}</span></li>'
        for it in day['timeline'])
    title = re.sub(r'^\S+\s', '', day['title'])  # drop the leading emoji
    city = f'<span class="city">{html.escape(day["city"])}</span>' if day.get('city') else ''
    cards.append(f'''<section class="day"><header style="--c:{color}"><span class="pill">DAY {i + 1}</span>
      <span class="date">{html.escape(day.get("date", ""))}</span></header>
      <h2>{html.escape(title)}</h2>{city}<ul>{items}</ul></section>''')

length = f'{len(days)}天{len(days) - 1}夜'
flags = ''.join(f'<i style="background:{COLORS[k % len(COLORS)]}"></i>' for k in range(26))
page = f'''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&family=Noto+Sans+TC:wght@500;700;900&display=swap" rel="stylesheet">
<style>
* {{ box-sizing: border-box; }}
body {{ margin: 0; width: 1600px; background: #fbf6ec; font-family: "LXGW WenKai TC", "Noto Sans TC", sans-serif; color: #3a2f28; }}
.poster {{ padding: 0 36px 40px; background:
  radial-gradient(circle at 12% 18%, rgba(240,200,140,.18), transparent 40%),
  radial-gradient(circle at 88% 82%, rgba(120,180,220,.16), transparent 45%); }}
.bunting {{ display: flex; justify-content: space-between; height: 46px; margin: 0 -36px; padding: 0 10px; border-top: 3px solid #b9a07a; }}
.bunting i {{ width: 42px; height: 40px; clip-path: polygon(0 0, 100% 0, 50% 100%); opacity: .85; }}
h1 {{ text-align: center; margin: 6px 0 4px; font-family: "Noto Sans TC"; font-weight: 900; font-size: 64px; letter-spacing: 2px; }}
h1 .a {{ color: #e0574f; }} h1 .b {{ color: #3b8fd0; }} h1 .c {{ color: #3a2f28; font-size: 44px; margin-left: 14px; }}
.sub {{ text-align: center; font-size: 24px; color: #7a6a5c; margin: 0 0 26px; }}
.grid {{ display: grid; grid-template-columns: repeat({cols}, 1fr); gap: 18px; }}
.day {{ background: rgba(255,255,255,.72); border: 2px dashed #d9c7a8; border-radius: 18px; padding: 14px 14px 16px; }}
.day header {{ display: flex; align-items: center; justify-content: space-between; gap: 8px; }}
.pill {{ background: var(--c); color: #fff; font-family: "Noto Sans TC"; font-weight: 900; font-size: 20px; padding: 4px 14px; border-radius: 999px; letter-spacing: 1px; }}
.date {{ font-size: 18px; color: #8a7a6c; }}
.day h2 {{ font-size: 23px; margin: 12px 0 4px; line-height: 1.3; }}
.city {{ display: inline-block; font-size: 15px; background: #efe5d3; border-radius: 999px; padding: 1px 10px; color: #6a5a4c; }}
ul {{ list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 9px; }}
li {{ display: grid; grid-template-columns: 34px 1fr; gap: 6px; align-items: start; font-size: 18px; line-height: 1.35; }}
li .ic {{ font-size: 24px; line-height: 1.1; text-align: center; }}
li b {{ display: block; font-size: 15px; color: #b0704a; font-weight: 700; }}
.foot {{ text-align: right; margin-top: 18px; font-size: 18px; color: #9a8a7c; }}
</style></head><body><div class="poster" id="poster">
<div class="bunting">{flags}</div>
<h1><span class="a">{html.escape(trip["name"])}</span> <span class="b">{length}</span><span class="c">行程手冊</span></h1>
<p class="sub">{html.escape(trip.get("dates", ""))}{"　·　" + html.escape(trip["route"]) if trip.get("route") else ""}</p>
<div class="grid">{"".join(cards)}</div>
<p class="foot">Kasper ❤ Joanna</p>
</div><script>document.fonts.ready.then(()=>{{document.body.dataset.h=document.getElementById('poster').scrollHeight}})</script></body></html>'''
open(os.path.join(OUT, f'{TRIP}.html'), 'w', encoding='utf-8').write(page)
print(len(days), 'days')

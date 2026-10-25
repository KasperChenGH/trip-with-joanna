// Trip content. Every trip uses the same pages: overview (#/<id>), schedule (#/<id>/schedule) and one page per day (#/<id>/day/N).
// Photos in <folder>/DayN/ and itinerary files in <folder>/Schedule/ load automatically from the repo after a push.
// A day can be a number of empty days (days: 5) or a list of { date, city, title, cover, timeline: [{ time, text, photos }] }.
// `cover` is the photo of the day's main event, shown on its card in the trip overview.
// Itinerary text supports [label](https://link).
// `captions` { path: text } gives folder photos a Chinese caption when their file name is English.
// `cover` is the trip banner (landscape, 2560px). A cover that isn't our own photo needs `coverCredit` { text, href }; `coverPosition` (CSS object-position) adjusts its crop.
window.TRIPS = [
  {
    "id": "australia",
    "name": "澳洲",
    "en": "Australia",
    "folder": "Pictures/Australia",
    "country": "澳洲",
    "dates": "12月23日 – 1月3日",
    "cover": "Pictures/Australia/cover-twelve-apostles.jpg",
    "route": "台北 → 墨爾本 → 雪梨 → 布里斯本 → 台北",
    "links": [
      {
        "label": "企鵝遊行 + 無尾熊公園 + 蒸汽火車一日遊（KKday）",
        "href": "https://www.kkday.com/zh-tw/product/137696"
      },
      {
        "label": "攀登雪梨港灣大橋 BridgeClimb",
        "href": "https://www.bridgeclimb.com/climbs-prices/summit"
      }
    ],
    "captions": {
      "Pictures/Australia/Day6/maritime-museum.jpg": "澳洲國家海事博物館",
      "Pictures/Australia/Day7/blue-mountains.webp": "藍山",
      "Pictures/Australia/Day7/scenic-railway.jpg": "景觀鐵道",
      "Pictures/Australia/Schedule/australia-itinerary.jpg": "行程總覽"
    },
    "coverPosition": "center 25%",
    "days": [
      {
        "date": "12月23–24日",
        "city": "墨爾本",
        "title": "🎄 抵達墨爾本 · 市區漫遊",
        "cover": "Pictures/Australia/Day1/state-library-victoria.jpg",
        "timeline": [
          {
            "time": "12月23日 晚上 11:45",
            "text": "搭機 台北 ✈︎ 墨爾本 · 行李 23kg × 2"
          },
          {
            "time": "中午 12:05",
            "text": "抵達墨爾本機場 T2"
          },
          {
            "time": "下午",
            "text": "先到 Airbnb，再去市中心的 Kumo Desserts Melbourne 吃午餐"
          },
          {
            "time": "下午 5:00",
            "text": "墨爾本市區漫遊",
            "photos": [
              {
                "src": "Pictures/Australia/Day1/state-library-victoria.jpg",
                "alt": "維多利亞州立圖書館",
                "caption": "維多利亞州立圖書館"
              },
              {
                "src": "Pictures/Australia/Day1/yarra-river.jpg",
                "alt": "亞拉河",
                "caption": "亞拉河"
              },
              {
                "src": "Pictures/Australia/Day1/skydeck.jpg",
                "alt": "墨爾本 Skydeck 觀景台",
                "caption": "墨爾本 Skydeck 觀景台"
              }
            ]
          }
        ]
      },
      {
        "date": "12月25日",
        "city": "墨爾本",
        "title": "🎅 聖誕節市區散步",
        "cover": "Pictures/Australia/Day2/st-kilda-beach.webp",
        "timeline": [
          {
            "time": "上午 8:00",
            "text": "在 Degraves Street 吃早餐 — 必吃 Lune Croissanterie 可頌 🥐",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/coffee-laneway.jpg",
                "alt": "咖啡巷",
                "caption": "咖啡巷"
              },
              {
                "src": "Pictures/Australia/Day2/lune-croissanterie.jpg",
                "alt": "Lune Croissanterie 可頌",
                "caption": "Lune Croissanterie 可頌"
              }
            ]
          },
          {
            "time": "上午 10:00",
            "text": "聖保羅大教堂（彩繪玻璃超美！）",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/st-pauls-cathedral.jpg",
                "alt": "聖保羅大教堂",
                "caption": "聖保羅大教堂"
              }
            ]
          },
          {
            "time": "上午 11:00",
            "text": "墨爾本大學",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/university-of-melbourne.jpg",
                "alt": "墨爾本大學",
                "caption": "墨爾本大學"
              }
            ]
          },
          {
            "time": "中午 12:00",
            "text": "Bourke Street Mall 逛街、吃午餐",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/bourke-street-mall.webp",
                "alt": "Bourke Street Mall",
                "caption": "Bourke Street Mall"
              }
            ]
          },
          {
            "time": "下午 4:00",
            "text": "卡爾頓花園",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/carlton-gardens.jpg",
                "alt": "卡爾頓花園與皇家展覽館",
                "caption": "卡爾頓花園與皇家展覽館"
              }
            ]
          },
          {
            "time": "下午 5:00",
            "text": "聖基爾達海灘",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/st-kilda-beach.webp",
                "alt": "聖基爾達海灘",
                "caption": "聖基爾達的夕陽與聖誕帽"
              }
            ]
          },
          {
            "time": "晚上 6:30",
            "text": "市區吃晚餐，早點休息準備明天的行程"
          }
        ]
      },
      {
        "date": "12月26日",
        "city": "墨爾本",
        "title": "🐧 企鵝遊行與蒸汽火車",
        "cover": "Pictures/Australia/Day3/penguin-parade.jpg",
        "timeline": [
          {
            "time": "上午 10:30",
            "text": "從墨爾本君悅酒店出發"
          },
          {
            "time": "中午 12:45",
            "text": "普芬比利蒸汽火車 Puffing Billy",
            "photos": [
              {
                "src": "Pictures/Australia/Day3/puffing-billy.png",
                "alt": "普芬比利蒸汽火車",
                "caption": "普芬比利蒸汽火車"
              }
            ]
          },
          {
            "time": "下午 2:00",
            "text": "Maru 無尾熊動物園"
          },
          {
            "time": "下午 5:10",
            "text": "菲利普島企鵝遊行",
            "photos": [
              {
                "src": "Pictures/Australia/Day3/penguin-parade.jpg",
                "alt": "企鵝上岸回家",
                "caption": "企鵝回家囉"
              }
            ]
          },
          {
            "time": "晚上 9:30",
            "text": "返回墨爾本\n            企鵝遊行 + 無尾熊公園 + 蒸汽火車一日遊：$4,388 · [KKday](https://www.kkday.com/zh-tw/product/137696)"
          }
        ]
      },
      {
        "date": "12月27日",
        "city": "墨爾本",
        "title": "🏞️ 大洋路與十二門徒岩",
        "cover": "Pictures/Australia/Day4/twelve-apostles.jpg",
        "timeline": [
          {
            "time": "上午 7:30",
            "text": "出發前往托基與肯尼特河",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/great-ocean-road.webp",
                "alt": "大洋路",
                "caption": "大洋路"
              }
            ]
          },
          {
            "time": "中午 12:30",
            "text": "在阿波羅灣吃午餐"
          },
          {
            "time": "下午 1:30",
            "text": "奧特威國家公園",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/great-otway-national-park.jpg",
                "alt": "奧特威國家公園",
                "caption": "奧特威國家公園"
              },
              {
                "src": "Pictures/Australia/Day4/wild-koala.png",
                "alt": "樹上的野生無尾熊",
                "caption": "野生無尾熊！"
              }
            ]
          },
          {
            "time": "下午 4:00",
            "text": "十二門徒岩",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/twelve-apostles.jpg",
                "alt": "十二門徒岩",
                "caption": "十二門徒岩"
              }
            ]
          },
          {
            "time": "下午 5:30",
            "text": "洛克阿德峽谷",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/loch-ard-gorge.jpg",
                "alt": "洛克阿德峽谷",
                "caption": "洛克阿德峽谷"
              }
            ]
          },
          {
            "time": "晚上 6:30",
            "text": "返回墨爾本"
          }
        ]
      },
      {
        "date": "12月28日",
        "city": "雪梨",
        "title": "🏛️ 雪梨港與歌劇院",
        "cover": "Pictures/Australia/Day5/opera-house.webp",
        "timeline": [
          {
            "time": "上午 7:00",
            "text": "搭機 墨爾本 ✈︎ 雪梨（上午 5:30 前到機場 · [航廈地圖](https://maps.app.goo.gl/RkHfqvoCXJ3j8sVP6))"
          },
          {
            "time": "上午 8:25",
            "text": "抵達雪梨機場"
          },
          {
            "time": "上午 10:00",
            "text": "在 Bills Surry Hills 吃早午餐",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/bills-surry-hills.jpg",
                "alt": "Bills Surry Hills",
                "caption": "Bills 早午餐"
              }
            ]
          },
          {
            "time": "上午 11:00",
            "text": "雪梨歌劇院散步",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/opera-house.webp",
                "alt": "雪梨歌劇院",
                "caption": "雪梨歌劇院"
              }
            ]
          },
          {
            "time": "下午 2:00",
            "text": "逛街、喝 Toby's Estate Coffee（25 Martin Place）",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/tobys-estate.webp",
                "alt": "Toby's Estate 咖啡",
                "caption": "Toby's Estate 咖啡"
              },
              {
                "src": "Pictures/Australia/Day5/tobys-estate-food.webp",
                "alt": "Toby's Estate 的餐點",
                "caption": "Toby's Estate 的餐點"
              }
            ]
          },
          {
            "time": "晚上 7:35",
            "text": "攀登雪梨港灣大橋 BridgeClimb",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/bridge-climb.jpg",
                "alt": "攀登雪梨港灣大橋",
                "caption": "攀登港灣大橋"
              }
            ]
          }
        ]
      },
      {
        "date": "12月29日",
        "city": "雪梨",
        "title": "🐟 雪梨市中心",
        "cover": "Pictures/Australia/Day6/university-of-sydney.jpg",
        "timeline": [
          {
            "time": "上午 8:30",
            "text": "雪梨大學與海德公園",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/university-of-sydney.jpg",
                "alt": "雪梨大學",
                "caption": "雪梨大學"
              },
              {
                "src": "Pictures/Australia/Day6/hyde-park.webp",
                "alt": "海德公園",
                "caption": "海德公園"
              }
            ]
          },
          {
            "time": "上午 11:30",
            "text": "在 Regent Place 吃午餐（Betty's Burgers）和甜點（Gelato Mochi）",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/regent-place.jpg",
                "alt": "Regent Place",
                "caption": "Regent Place"
              }
            ]
          },
          {
            "time": "下午 1:30",
            "text": "雪梨博物館",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/sydney-museum.jpg",
                "alt": "雪梨博物館",
                "caption": "雪梨博物館"
              }
            ]
          },
          {
            "time": "下午 4:00",
            "text": "Pitt Street Mall 與斯特蘭德拱廊",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/pitt-street-mall.jpg",
                "alt": "Pitt Street Mall",
                "caption": "Pitt Street Mall"
              },
              {
                "src": "Pictures/Australia/Day6/strand-arcade.jpg",
                "alt": "斯特蘭德拱廊",
                "caption": "斯特蘭德拱廊"
              }
            ]
          },
          {
            "time": "晚上 6:15",
            "text": "Epicurean 自助餐",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/epicurean-restaurant.jpg",
                "alt": "Epicurean 餐廳"
              },
              {
                "src": "Pictures/Australia/Day6/epicurean-buffet.jpg",
                "alt": "Epicurean 自助餐"
              }
            ]
          },
          {
            "time": "晚上 8:30",
            "text": "皇冠賭場",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/crown-sydney.jpg",
                "alt": "雪梨皇冠酒店"
              }
            ]
          }
        ]
      },
      {
        "date": "12月30日",
        "city": "雪梨",
        "title": "🏞️ 藍山",
        "cover": "Pictures/Australia/Day7/three-sisters.jpeg",
        "timeline": [
          {
            "time": "上午 7:30",
            "text": "從 68 Harbour Street 出發"
          },
          {
            "time": "上午",
            "text": "回音谷三姊妹岩",
            "photos": [
              {
                "src": "Pictures/Australia/Day7/three-sisters.jpeg",
                "alt": "三姊妹岩",
                "caption": "三姊妹岩"
              }
            ]
          },
          {
            "time": "下午",
            "text": "卡通巴景觀鐵道",
            "photos": [
              {
                "src": "Pictures/Australia/Day7/scenic-world.jpg",
                "alt": "卡通巴景觀世界",
                "caption": "景觀鐵道"
              }
            ]
          },
          {
            "time": "晚上 6:00",
            "text": "搭船或巴士回雪梨市中心"
          }
        ]
      },
      {
        "date": "12月31日",
        "city": "雪梨",
        "title": "🎆 跨年煙火",
        "cover": "Pictures/Australia/Day8/new-years-eve-fireworks.avif",
        "timeline": [
          {
            "time": "上午 8:30",
            "text": "到皇家植物園卡位，等跨年煙火",
            "photos": [
              {
                "src": "Pictures/Australia/Day8/new-years-eve-fireworks.avif",
                "alt": "雪梨港跨年煙火",
                "caption": "新年快樂！"
              }
            ]
          }
        ]
      },
      {
        "date": "1月1日",
        "city": "雪梨",
        "title": "🎡 雪梨魚市場與月神公園",
        "cover": "Pictures/Australia/Day9/luna-park.avif",
        "timeline": [
          {
            "time": "中午 12:30",
            "text": "在雪梨魚市場吃午餐",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/sydney-fish-market.webp",
                "alt": "雪梨魚市場"
              }
            ]
          },
          {
            "time": "下午 1:30",
            "text": "甜點吃西瓜蛋糕",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/watermelon-cake.webp",
                "alt": "草莓西瓜蛋糕"
              }
            ]
          },
          {
            "time": "下午 3:30",
            "text": "月神公園",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/luna-park.avif",
                "alt": "雪梨月神公園"
              }
            ]
          },
          {
            "time": "晚上 6:00",
            "text": "在 Haymarket 的 12 Miller Street 吃晚餐",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/12-miller-street.jpg",
                "alt": "Haymarket 晚餐"
              }
            ]
          },
          {
            "time": "晚上 7:30",
            "text": "有空去 PS40 喝一杯"
          }
        ]
      },
      {
        "date": "1月2日",
        "city": "雪梨",
        "title": "🏖️ DFO Homebush 與邦代海灘",
        "cover": "Pictures/Australia/Day10/bondi-beach.jpg",
        "timeline": [
          {
            "time": "上午 8:30",
            "text": "在 DFO Homebush 吃早餐、逛街",
            "photos": [
              {
                "src": "Pictures/Australia/Day10/dfo-homebush.jpg",
                "alt": "DFO Homebush"
              }
            ]
          },
          {
            "time": "中午 12:30",
            "text": "邦代海灘",
            "photos": [
              {
                "src": "Pictures/Australia/Day10/bondi-beach.jpg",
                "alt": "邦代海灘",
                "caption": "邦代海灘"
              }
            ]
          },
          {
            "time": "下午 3:30",
            "text": "Westfield Bondi Junction 購物中心",
            "photos": [
              {
                "src": "Pictures/Australia/Day10/westfield-bondi-junction.jpg",
                "alt": "Westfield Bondi Junction 購物中心"
              }
            ]
          }
        ]
      },
      {
        "date": "1月3日",
        "city": "雪梨",
        "title": "✈️ 回家",
        "timeline": [
          {
            "time": "晚上 6:00",
            "text": "雪梨 ✈︎ 布里斯本（下午 4:30 前到機場）"
          },
          {
            "time": "晚上 10:35",
            "text": "布里斯本 ✈︎ 台灣"
          }
        ]
      }
    ]
  },
  {
    "id": "okinawa",
    "name": "沖繩",
    "en": "Okinawa",
    "folder": "Pictures/Okinawa",
    "country": "日本",
    "cover": "Pictures/Okinawa/cover-kouri-bridge.jpg",
    "coverCredit": {
      "text": "古宇利大橋 · Takuya ASADA · CC BY 2.0",
      "href": "https://commons.wikimedia.org/wiki/File:Kouri_Bridge_(15130568259).jpg"
    },
    "captions": {
      "Pictures/Okinawa/Schedule/okinawa-itinerary.jpg": "行程總覽"
    },
    "dates": "4月7日 – 4月11日",
    "days": [
      {
        "date": "4月7日",
        "title": "✈️ 抵達那霸 · 暖暮拉麵",
        "cover": "Pictures/Okinawa/Day1/LINE_ALBUM_47沖繩day1_261024_12.jpg",
        "timeline": [
          {
            "time": "晚上",
            "text": "抵達沖繩那霸機場"
          },
          {
            "time": "入住",
            "text": "La'gent Hotel Okinawa Naha"
          },
          {
            "time": "晚餐",
            "text": "暖暮拉麵 那霸牧志店"
          }
        ]
      },
      {
        "date": "4月8日",
        "title": "⛩️ 國際通 · 波上宮",
        "cover": "Pictures/Okinawa/Day2/LINE_ALBUM_48沖繩day2_261024_23.jpg",
        "coverPosition": "center 100%",
        "timeline": [
          {
            "time": "上午",
            "text": "國際通邊逛邊吃"
          },
          {
            "time": "午餐",
            "text": "沖繩麵 EIBUN"
          },
          {
            "time": "下午",
            "text": "那霸滑翔傘體驗"
          },
          {
            "time": "傍晚",
            "text": "波上宮"
          },
          {
            "time": "晚餐",
            "text": "燒肉 琉球之牛 那霸國際通"
          }
        ]
      },
      {
        "date": "4月9日",
        "title": "🌅 瀨長島夕陽",
        "cover": "Pictures/Okinawa/Day3/LINE_ALBUM_49沖繩day3_261024_33.jpg",
        "timeline": [
          {
            "time": "早餐",
            "text": "Pork Tamago Onigiri 牧志市場"
          },
          {
            "time": "購物",
            "text": "沖繩 ASHIBINAA Outlet"
          },
          {
            "time": "午後",
            "text": "糸滿魚市場買海鮮"
          },
          {
            "time": "傍晚",
            "text": "瀨長島看夕陽、吃幸福鬆餅"
          },
          {
            "time": "晚餐",
            "text": "琉球新麵 通堂 小祿本店"
          }
        ]
      },
      {
        "date": "4月10日",
        "title": "🌊 萬座毛 · 古宇利島",
        "cover": "Pictures/Okinawa/Day4/LINE_ALBUM_410沖繩day4_261024_49.jpg",
        "timeline": [
          {
            "time": "早餐",
            "text": "THE TACORICE HOUS"
          },
          {
            "time": "上午",
            "text": "萬座毛"
          },
          {
            "time": "午餐",
            "text": "あぐー豚と寿司の島居酒屋 まーさん"
          },
          {
            "time": "下午",
            "text": "古宇利島 Tinu 海灘 ティーヌ浜"
          },
          {
            "time": "晚餐",
            "text": "Kushiyaki Can"
          }
        ]
      },
      {
        "date": "4月11日",
        "title": "🍔 港川外人住宅 · A&W",
        "cover": "Pictures/Okinawa/Day5/LINE_ALBUM_411沖繩day5_261024_3.jpg",
        "coverPosition": "center 70%",
        "timeline": [
          {
            "time": "早餐",
            "text": "福助玉子燒"
          },
          {
            "time": "上午",
            "text": "港川外人住宅、Okinawa Cerrado Coffee"
          },
          {
            "time": "午餐",
            "text": "迴轉壽司市場 美浜店"
          },
          {
            "time": "晚餐",
            "text": "A&W Makiminato"
          },
          {
            "time": "回家",
            "text": "✈️ 沖繩 → 台灣"
          }
        ]
      }
    ]
  },
  {
    "id": "nagoya",
    "name": "名古屋",
    "en": "Nagoya",
    "folder": "Pictures/Nagoya",
    "country": "日本",
    "dates": "9月25日 – 9月30日",
    "route": "中部機場 → 美濃 → 下呂溫泉合掌村 → 飛驒高山 → 上高地 → 名古屋",
    "cover": "Pictures/Nagoya/cover-kamikochi.jpg",
    "coverCredit": {
      "text": "上高地 河童橋 · くろふね · CC BY-SA 4.0",
      "href": "https://commons.wikimedia.org/wiki/File:上高地_07.jpg"
    },
    "captions": {
      "Pictures/Nagoya/Schedule/nagoya-itinerary.jpg": "行程總覽",
      "Pictures/Nagoya/Schedule/岐阜飛驒高山上高地名古屋_六天五夜行程手冊_含葷素餐廳版.pdf": "完整行程手冊（含葷素餐廳）"
    },
    "coverPosition": "center 35%",
    "days": [
      {
        "date": "9月25日",
        "title": "✈️ 抵達中部機場 → 美濃",
        "cover": "Pictures/Nagoya/Day1/LINE_ALBUM_925名古屋day1_261025_2.jpg",
        "timeline": [
          {
            "time": "晚上 9:00",
            "text": "抵達中部國際機場 Centrair，取車"
          },
          {
            "time": "晚上 9:40",
            "text": "開車前往美濃，約 1.5 小時"
          },
          {
            "time": "晚上 11:00",
            "text": "入住 Fairfield by Marriott Gifu Mino"
          }
        ]
      },
      {
        "date": "9月26日",
        "title": "🏡 下呂溫泉合掌村 · 飛驒高山",
        "cover": "Pictures/Nagoya/Day2/LINE_ALBUM_926名古屋day2_261025_25.jpg",
        "timeline": [
          {
            "time": "上午 9:30",
            "text": "下呂溫泉合掌村"
          },
          {
            "time": "午餐",
            "text": "圍爐裏"
          },
          {
            "time": "下午 3:00",
            "text": "飛驒高山 古い町並・三町老街"
          },
          {
            "time": "晚餐",
            "text": "中橋 WAKACHIYA ／ 平安樂"
          }
        ]
      },
      {
        "date": "9月27日",
        "title": "🏔️ 上高地一日遊",
        "cover": "Pictures/Nagoya/Day3/LINE_ALBUM_927名古屋day3_261025_56.jpg",
        "timeline": [
          {
            "time": "全天",
            "text": "上高地：河童橋・明神池・大正池"
          },
          {
            "time": "晚餐",
            "text": "味藏天國 ／ 飛驒そば 小舟"
          }
        ]
      },
      {
        "date": "9月28日",
        "title": "🛍️ 回名古屋 · 榮商圈",
        "cover": "Pictures/Nagoya/Day4/LINE_ALBUM_928名古屋day4_261025_1.jpg",
        "timeline": [
          {
            "time": "上午",
            "text": "驅車返回名古屋"
          },
          {
            "time": "午餐",
            "text": "うな富士 ／ 奏樹庵"
          },
          {
            "time": "下午 3:40",
            "text": "分隊：A 隊 Costco、B 隊大須 + 市區"
          },
          {
            "time": "晚餐",
            "text": "A：Costco 美食廣場　B：北のマルコ ／ 千亀"
          }
        ]
      },
      {
        "date": "9月29日",
        "title": "🚃 名古屋車站商圈",
        "cover": "Pictures/Nagoya/Day5/LINE_ALBUM_929名古屋day5_261025_1.jpg",
        "timeline": [
          {
            "time": "早餐",
            "text": "つばめパン & Milk"
          },
          {
            "time": "白天",
            "text": "搭名鐵前往名古屋車站商圈逛街"
          },
          {
            "time": "午餐",
            "text": "美登利壽司 ／ 杏ズ"
          },
          {
            "time": "晚餐",
            "text": "獅子丸 ／ Grains"
          }
        ]
      },
      {
        "date": "9月30日",
        "title": "✈️ 賦歸台灣",
        "cover": "Pictures/Nagoya/Day6/LINE_ALBUM_930名古屋day6_261025_2.jpg",
        "timeline": [
          {
            "time": "中午 12:00",
            "text": "中部國際機場班機回台灣"
          }
        ]
      }
    ]
  }
];

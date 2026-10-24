// Trip content. Every trip uses the same pages: overview (#/<id>), schedule (#/<id>/schedule) and one page per day (#/<id>/day/N).
// Photos in <folder>/DayN/ and itinerary files in <folder>/Schedule/ load automatically from the repo after a push.
// A day can be a number of empty days (days: 5) or a list of { date, city, title, cover, timeline: [{ time, text, photos }] }.
// `cover` is the photo of the day's main event, shown on its card in the trip overview.
// Itinerary text supports [label](https://link).
// `cover` is the trip banner (landscape, 2560px). A cover that isn't our own photo needs `coverCredit` { text, href }.
window.TRIPS = [
  {
    "id": "australia",
    "name": "澳洲",
    "en": "Australia",
    "folder": "Pictures/Australia",
    "country": "Australia",
    "dates": "Dec 23 – Jan 3",
    "cover": "Pictures/Australia/cover-twelve-apostles.jpg",
    "route": "台北 → Melbourne → Sydney → Brisbane → 台北",
    "links": [
      {
        "label": "Penguin Parade + Koala Park + Train (KKday)",
        "href": "https://www.kkday.com/zh-tw/product/137696"
      },
      {
        "label": "Sydney Harbour BridgeClimb",
        "href": "https://www.bridgeclimb.com/climbs-prices/summit"
      }
    ],
    "days": [
      {
        "date": "Dec 23–24",
        "city": "Melbourne 墨爾本",
        "title": "🎄 Arrival & Melbourne City",
        "cover": "Pictures/Australia/Day1/state-library-victoria.jpg",
        "timeline": [
          {
            "time": "Dec 23, 11:45 PM",
            "text": "Flight 台北 ✈︎ 墨爾本 · Luggage 23kg × 2",
            "photos": [
              {
                "src": "Pictures/Australia/Day1/flight-taipei-melbourne.png",
                "alt": "Flight ticket Taipei to Melbourne"
              }
            ]
          },
          {
            "time": "12:05 PM",
            "text": "Arrive at Melbourne T2"
          },
          {
            "time": "Afternoon",
            "text": "Airbnb, then the city center for lunch at Kumo Desserts Melbourne"
          },
          {
            "time": "5:00 PM",
            "text": "Wander around Melbourne",
            "photos": [
              {
                "src": "Pictures/Australia/Day1/state-library-victoria.jpg",
                "alt": "State Library Victoria",
                "caption": "State Library Victoria"
              },
              {
                "src": "Pictures/Australia/Day1/yarra-river.jpg",
                "alt": "Yarra River",
                "caption": "Yarra River"
              },
              {
                "src": "Pictures/Australia/Day1/skydeck.jpg",
                "alt": "Melbourne Skydeck",
                "caption": "Melbourne Skydeck"
              }
            ]
          }
        ]
      },
      {
        "date": "Dec 25",
        "city": "Melbourne 墨爾本",
        "title": "🎅 Christmas City Day",
        "cover": "Pictures/Australia/Day2/st-kilda-beach.webp",
        "timeline": [
          {
            "time": "8:00 AM",
            "text": "Brekky on Degraves Street — must try Lune Croissanterie 🥐",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/coffee-laneway.jpg",
                "alt": "Coffee laneway",
                "caption": "Coffee laneway"
              },
              {
                "src": "Pictures/Australia/Day2/lune-croissanterie.jpg",
                "alt": "Lune Croissanterie",
                "caption": "Lune Croissanterie"
              }
            ]
          },
          {
            "time": "10:00 AM",
            "text": "St Paul's Cathedral (the stained glass!)",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/st-pauls-cathedral.jpg",
                "alt": "St Paul's Cathedral",
                "caption": "St Paul's Cathedral"
              }
            ]
          },
          {
            "time": "11:00 AM",
            "text": "University of Melbourne",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/university-of-melbourne.jpg",
                "alt": "University of Melbourne",
                "caption": "University of Melbourne"
              }
            ]
          },
          {
            "time": "12:00 PM",
            "text": "Bourke Street Mall shopping & lunch",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/bourke-street-mall.webp",
                "alt": "Bourke Street Mall",
                "caption": "Bourke Street Mall"
              }
            ]
          },
          {
            "time": "4:00 PM",
            "text": "Carlton Gardens",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/carlton-gardens.jpg",
                "alt": "Carlton Gardens and the Royal Exhibition Building",
                "caption": "Carlton Gardens & Royal Exhibition Building"
              }
            ]
          },
          {
            "time": "5:00 PM",
            "text": "St Kilda Beach",
            "photos": [
              {
                "src": "Pictures/Australia/Day2/st-kilda-beach.webp",
                "alt": "St Kilda Beach",
                "caption": "Sunset and Christmas hats at St Kilda"
              }
            ]
          },
          {
            "time": "6:30 PM",
            "text": "Dinner in the city, early night before tomorrow's tour"
          }
        ]
      },
      {
        "date": "Dec 26",
        "city": "Melbourne 墨爾本",
        "title": "🐧 Penguins & Steam Train",
        "cover": "Pictures/Australia/Day3/penguin-parade.jpg",
        "timeline": [
          {
            "time": "10:30 AM",
            "text": "Depart from Grand Hyatt Melbourne"
          },
          {
            "time": "12:45 PM",
            "text": "Puffing Billy steam train",
            "photos": [
              {
                "src": "Pictures/Australia/Day3/puffing-billy.png",
                "alt": "Puffing Billy steam train",
                "caption": "Puffing Billy"
              }
            ]
          },
          {
            "time": "2:00 PM",
            "text": "Maru Koala & Animal Park"
          },
          {
            "time": "5:10 PM",
            "text": "Penguin Parade at Phillip Island",
            "photos": [
              {
                "src": "Pictures/Australia/Day3/penguin-parade.jpg",
                "alt": "Penguins returning to the beach",
                "caption": "Penguins coming home"
              }
            ]
          },
          {
            "time": "9:30 PM",
            "text": "Back to Melbourne\n            Penguin Parade + Koala Park + Train tour: $4,388 · [KKday](https://www.kkday.com/zh-tw/product/137696)"
          }
        ]
      },
      {
        "date": "Dec 27",
        "city": "Melbourne 墨爾本",
        "title": "🏞️ Great Ocean Road & 12 Apostles",
        "cover": "Pictures/Australia/Day4/twelve-apostles.jpg",
        "timeline": [
          {
            "time": "7:30 AM",
            "text": "Head toward Torquay and Kennett River",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/great-ocean-road.webp",
                "alt": "Great Ocean Road",
                "caption": "Great Ocean Road"
              }
            ]
          },
          {
            "time": "12:30 PM",
            "text": "Lunch at Apollo Bay"
          },
          {
            "time": "1:30 PM",
            "text": "Great Otway National Park",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/great-otway-national-park.jpg",
                "alt": "Great Otway National Park",
                "caption": "Great Otway National Park"
              },
              {
                "src": "Pictures/Australia/Day4/wild-koala.png",
                "alt": "Wild koala in a tree",
                "caption": "A wild koala!"
              }
            ]
          },
          {
            "time": "4:00 PM",
            "text": "The Twelve Apostles",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/twelve-apostles.jpg",
                "alt": "The Twelve Apostles",
                "caption": "The Twelve Apostles"
              }
            ]
          },
          {
            "time": "5:30 PM",
            "text": "Loch Ard Gorge",
            "photos": [
              {
                "src": "Pictures/Australia/Day4/loch-ard-gorge.jpg",
                "alt": "Loch Ard Gorge",
                "caption": "Loch Ard Gorge"
              }
            ]
          },
          {
            "time": "6:30 PM",
            "text": "Back to Melbourne"
          }
        ]
      },
      {
        "date": "Dec 28",
        "city": "Sydney 雪梨",
        "title": "🏛️ Sydney Harbour & Opera House",
        "cover": "Pictures/Australia/Day5/opera-house.webp",
        "timeline": [
          {
            "time": "7:00 AM",
            "text": "Fly Melbourne ✈︎ Sydney (at the airport by 5:30 AM · [terminal map](https://maps.app.goo.gl/RkHfqvoCXJ3j8sVP6))",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/flight-melbourne-sydney.png",
                "alt": "Flight ticket Melbourne to Sydney"
              }
            ]
          },
          {
            "time": "8:25 AM",
            "text": "Arrive at Sydney Airport"
          },
          {
            "time": "10:00 AM",
            "text": "Brunch at Bills Surry Hills",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/bills-surry-hills.jpg",
                "alt": "Bills Surry Hills",
                "caption": "Bills"
              }
            ]
          },
          {
            "time": "11:00 AM",
            "text": "Walk around the Sydney Opera House",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/opera-house.webp",
                "alt": "Sydney Opera House",
                "caption": "Sydney Opera House"
              }
            ]
          },
          {
            "time": "2:00 PM",
            "text": "Shopping and Toby's Estate Coffee, 25 Martin Place",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/tobys-estate.webp",
                "alt": "Toby's Estate Coffee",
                "caption": "Toby's Estate"
              },
              {
                "src": "Pictures/Australia/Day5/tobys-estate-food.webp",
                "alt": "Food at Toby's Estate",
                "caption": "Toby's Estate food"
              }
            ]
          },
          {
            "time": "7:35 PM",
            "text": "Sydney Harbour BridgeClimb",
            "photos": [
              {
                "src": "Pictures/Australia/Day5/bridge-climb.jpg",
                "alt": "Sydney Harbour Bridge climb",
                "caption": "BridgeClimb"
              }
            ]
          }
        ]
      },
      {
        "date": "Dec 29",
        "city": "Sydney 雪梨",
        "title": "🐟 Sydney Central",
        "cover": "Pictures/Australia/Day6/university-of-sydney.jpg",
        "timeline": [
          {
            "time": "8:30 AM",
            "text": "University of Sydney and Hyde Park",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/university-of-sydney.jpg",
                "alt": "University of Sydney",
                "caption": "University of Sydney"
              },
              {
                "src": "Pictures/Australia/Day6/hyde-park.webp",
                "alt": "Hyde Park",
                "caption": "Hyde Park"
              }
            ]
          },
          {
            "time": "11:30 AM",
            "text": "Lunch (Betty's Burgers) and dessert (Gelato Mochi) at Regent Place",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/regent-place.jpg",
                "alt": "Regent Place",
                "caption": "Regent Place"
              }
            ]
          },
          {
            "time": "1:30 PM",
            "text": "Sydney museum",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/sydney-museum.jpg",
                "alt": "Sydney museum",
                "caption": "Sydney museum"
              }
            ]
          },
          {
            "time": "4:00 PM",
            "text": "Pitt Street Mall and The Strand Arcade",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/pitt-street-mall.jpg",
                "alt": "Pitt Street Mall",
                "caption": "Pitt Street Mall"
              },
              {
                "src": "Pictures/Australia/Day6/strand-arcade.jpg",
                "alt": "The Strand Arcade",
                "caption": "The Strand Arcade"
              }
            ]
          },
          {
            "time": "6:15 PM",
            "text": "Epicurean buffet",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/epicurean-restaurant.jpg",
                "alt": "Epicurean restaurant"
              },
              {
                "src": "Pictures/Australia/Day6/epicurean-buffet.jpg",
                "alt": "Epicurean buffet"
              }
            ]
          },
          {
            "time": "8:30 PM",
            "text": "Crown Casino",
            "photos": [
              {
                "src": "Pictures/Australia/Day6/crown-sydney.jpg",
                "alt": "Crown Sydney"
              }
            ]
          }
        ]
      },
      {
        "date": "Dec 30",
        "city": "Sydney 雪梨",
        "title": "🏞️ Blue Mountains",
        "cover": "Pictures/Australia/Day7/three-sisters.jpeg",
        "timeline": [
          {
            "time": "7:30 AM",
            "text": "Leave from 68 Harbour Street"
          },
          {
            "time": "Morning",
            "text": "Three Sisters at Echo Point",
            "photos": [
              {
                "src": "Pictures/Australia/Day7/three-sisters.jpeg",
                "alt": "The Three Sisters",
                "caption": "The Three Sisters"
              }
            ]
          },
          {
            "time": "Afternoon",
            "text": "Katoomba Scenic Railway",
            "photos": [
              {
                "src": "Pictures/Australia/Day7/scenic-world.jpg",
                "alt": "Scenic World Katoomba",
                "caption": "Scenic Railway"
              }
            ]
          },
          {
            "time": "6:00 PM",
            "text": "Back to Sydney Central by boat or bus"
          }
        ]
      },
      {
        "date": "Dec 31",
        "city": "Sydney 雪梨",
        "title": "🎆 New Year's Eve Fireworks",
        "cover": "Pictures/Australia/Day8/new-years-eve-fireworks.avif",
        "timeline": [
          {
            "time": "8:30 AM",
            "text": "Claim a spot at the Royal Botanic Garden and wait for the fireworks",
            "photos": [
              {
                "src": "Pictures/Australia/Day8/new-years-eve-fireworks.avif",
                "alt": "New Year's Eve fireworks over Sydney Harbour",
                "caption": "Happy New Year!"
              }
            ]
          }
        ]
      },
      {
        "date": "Jan 1",
        "city": "Sydney 雪梨",
        "title": "🦘 Taronga Zoo & Luna Park",
        "cover": "Pictures/Australia/Day9/taronga-zoo.jpg",
        "timeline": [
          {
            "time": "8:30 AM",
            "text": "Taronga Zoo (ticket $950, koala photo $290)",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/taronga-zoo.jpg",
                "alt": "Taronga Zoo with the Opera House behind",
                "caption": "Taronga Zoo, with the Opera House across the water"
              }
            ]
          },
          {
            "time": "12:30 PM",
            "text": "Lunch at Sydney Fish Market",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/sydney-fish-market.webp",
                "alt": "Sydney Fish Market"
              }
            ]
          },
          {
            "time": "1:30 PM",
            "text": "Watermelon cake for dessert",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/watermelon-cake.webp",
                "alt": "Strawberry watermelon cake"
              }
            ]
          },
          {
            "time": "3:30 PM",
            "text": "Luna Park",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/luna-park.avif",
                "alt": "Luna Park Sydney"
              }
            ]
          },
          {
            "time": "6:00 PM",
            "text": "Dinner at 12 Miller Street, Haymarket",
            "photos": [
              {
                "src": "Pictures/Australia/Day9/12-miller-street.jpg",
                "alt": "Dinner at Haymarket"
              }
            ]
          },
          {
            "time": "7:30 PM",
            "text": "Maybe drinks at PS40"
          }
        ]
      },
      {
        "date": "Jan 2",
        "city": "Sydney 雪梨",
        "title": "🏖️ DFO Homebush & Bondi Beach",
        "cover": "Pictures/Australia/Day10/bondi-beach.jpg",
        "timeline": [
          {
            "time": "8:30 AM",
            "text": "Breakfast and shopping at DFO Homebush",
            "photos": [
              {
                "src": "Pictures/Australia/Day10/dfo-homebush.jpg",
                "alt": "DFO Homebush"
              }
            ]
          },
          {
            "time": "12:30 PM",
            "text": "Bondi Beach",
            "photos": [
              {
                "src": "Pictures/Australia/Day10/bondi-beach.jpg",
                "alt": "Bondi Beach",
                "caption": "Bondi Beach"
              }
            ]
          },
          {
            "time": "3:30 PM",
            "text": "Westfield Bondi Junction",
            "photos": [
              {
                "src": "Pictures/Australia/Day10/westfield-bondi-junction.jpg",
                "alt": "Westfield Bondi Junction"
              }
            ]
          }
        ]
      },
      {
        "date": "Jan 3",
        "city": "Sydney 雪梨",
        "title": "✈️ Flying Home",
        "timeline": [
          {
            "time": "6:00 PM",
            "text": "Sydney ✈︎ Brisbane (at the airport by 4:30 PM)",
            "photos": [
              {
                "src": "Pictures/Australia/Day11/flight-sydney-brisbane.png",
                "alt": "Flight ticket Sydney to Brisbane"
              }
            ]
          },
          {
            "time": "10:35 PM",
            "text": "Brisbane ✈︎ Taiwan",
            "photos": [
              {
                "src": "Pictures/Australia/Day11/flight-brisbane-taipei.png",
                "alt": "Flight ticket Brisbane to Taiwan"
              }
            ]
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
    "country": "Japan 日本",
    "cover": "Pictures/Okinawa/cover-kouri-bridge.jpg",
    "coverCredit": {
      "text": "Kouri Bridge · Takuya ASADA · CC BY 2.0",
      "href": "https://commons.wikimedia.org/wiki/File:Kouri_Bridge_(15130568259).jpg"
    },
    "days": [
      {
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
        "title": "⛩️ 國際通 · 波上宮",
        "cover": "Pictures/Okinawa/Day2/LINE_ALBUM_48沖繩day2_261024_55.jpg",
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
        "title": "🤿 青之洞窟 · 古宇利島",
        "cover": "Pictures/Okinawa/Day4/LINE_ALBUM_410沖繩day4_261024_49.jpg",
        "timeline": [
          {
            "time": "早餐",
            "text": "THE TACORICE HOUS"
          },
          {
            "time": "上午",
            "text": "逛青之洞窟"
          },
          {
            "time": "中午",
            "text": "恩納村青之洞窟浮潛 & 深潛體驗"
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
        "title": "🍔 美國村 · A&W",
        "cover": "Pictures/Okinawa/Day5/LINE_ALBUM_411沖繩day5_261024_11.jpg",
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
            "time": "下午",
            "text": "美國村、Blue Seal Depot Island"
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
    "country": "Japan 日本",
    "dates": "Sep 25 – Sep 30",
    "route": "中部機場 → 美濃 → 白川鄉 → 飛驒高山 → 上高地 → 名古屋",
    "cover": "Pictures/Nagoya/cover-shirakawa-go.jpg",
    "coverCredit": {
      "text": "Shirakawa-go · Alexkom000 · CC BY 4.0",
      "href": "https://commons.wikimedia.org/wiki/File:2024-10-26_Shirakawa-go_02.jpg"
    },
    "days": [
      {
        "date": "Sep 25",
        "title": "✈️ 抵達中部機場 → 美濃",
        "timeline": [
          {
            "time": "9:00 PM",
            "text": "抵達中部國際機場 Centrair，取車"
          },
          {
            "time": "9:40 PM",
            "text": "開車前往美濃，約 1.5 小時"
          },
          {
            "time": "11:00 PM",
            "text": "入住 Fairfield by Marriott Gifu Mino"
          }
        ]
      },
      {
        "date": "Sep 26",
        "title": "🏡 白川鄉合掌村 · 飛驒高山",
        "timeline": [
          {
            "time": "9:30 AM",
            "text": "白川鄉合掌村"
          },
          {
            "time": "午餐",
            "text": "圍爐裏"
          },
          {
            "time": "3:00 PM",
            "text": "飛驒高山 古い町並・三町老街"
          },
          {
            "time": "晚餐",
            "text": "中橋 WAKACHIYA ／ 平安樂"
          }
        ]
      },
      {
        "date": "Sep 27",
        "title": "🏔️ 上高地一日遊",
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
        "date": "Sep 28",
        "title": "🛍️ 回名古屋 · 榮商圈",
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
            "time": "3:40 PM",
            "text": "分隊：A 隊 Costco、B 隊大須 + 市區"
          },
          {
            "time": "晚餐",
            "text": "A：Costco 美食廣場　B：北のマルコ ／ 千亀"
          }
        ]
      },
      {
        "date": "Sep 29",
        "title": "🚃 名古屋車站商圈",
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
        "date": "Sep 30",
        "title": "✈️ 賦歸台灣",
        "timeline": [
          {
            "time": "12:00 PM",
            "text": "中部國際機場班機回台灣"
          }
        ]
      }
    ]
  }
];

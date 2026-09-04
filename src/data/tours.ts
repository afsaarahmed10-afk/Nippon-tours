import heroFujiAsset from "@/assets/hero-fuji.jpg";
const heroFuji = heroFujiAsset;
import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
const tokyoImg = tokyoImgAsset;
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;
import hiroshimaImgAsset from "@/assets/dest-hiroshima.jpg";
const hiroshimaImg = hiroshimaImgAsset;
import sakuraImgAsset from "@/assets/tour-sakura.jpg";
const sakuraImg = sakuraImgAsset;
import foodImgAsset from "@/assets/tour-food.jpg";
const foodImg = foodImgAsset;
import ryokanImgAsset from "@/assets/tour-ryokan.jpg";
const ryokanImg = ryokanImgAsset;
import autumnImgAsset from "@/assets/tour-autumn.jpg";
const autumnImg = autumnImgAsset;
import type { Locale } from "@/i18n";

export type TourCategory = "Private" | "Group" | "Luxury" | "Seasonal";

interface TourTranslatable {
  title: string;
  groupSize: string;
  summary: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  includes: string[];
}

export interface Tour extends TourTranslatable {
  slug: string;
  category: TourCategory;
  days: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  ja: TourTranslatable;
}

export const TOURS: Tour[] = [
  {
    slug: "private-japan-golden-route",
    title: "Private Japan Golden Route — 7 Days",
    category: "Private",
    days: 7,
    price: 2450,
    groupSize: "Private (1–8 guests)",
    rating: 4.9,
    reviews: 312,
    summary: "Tokyo, Hakone, Kyoto and Osaka with your own licensed guide, first-class rail, and doors that open only for private guests. Japan's essential route, done properly.",
    image: heroFuji,
    highlights: [
      "Dedicated licensed guide throughout",
      "Green Car (first class) shinkansen travel",
      "One night in a Hakone onsen ryokan with kaiseki dinner",
      "Private tea ceremony and maiko dinner in Kyoto",
      "All hotels 4–5 star, hand-picked for location",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Tokyo — icons and hidden lanes", desc: "Senso-ji at opening time, Tsukiji breakfast, Shibuya at dusk, and an izakaya evening in Shinjuku with your guide." },
      { day: "Day 3", title: "Hakone — Fuji and hot springs", desc: "Lake Ashi cruise, ropeway over the volcanic valley, then check in to your ryokan for kaiseki and a private open-air bath." },
      { day: "Days 4–5", title: "Kyoto — a thousand years in two days", desc: "Fushimi Inari before the crowds, Arashiyama bamboo grove, Gion at twilight, and a private dinner with a maiko." },
      { day: "Day 6", title: "Nara & Osaka — deer and Dotonbori", desc: "Todai-ji's Great Buddha and bowing deer, then Osaka's neon canal and a street-food crawl." },
      { day: "Day 7", title: "Departure", desc: "Private transfer to Kansai or a shinkansen back to Tokyo — with a farewell gift from your guide." },
    ],
    includes: ["6 nights accommodation", "Private licensed guide", "All rail travel incl. shinkansen", "Ryokan kaiseki dinner & breakfast", "24/7 WhatsApp support"],
    ja: {
      title: "プライベート・ジャパン ゴールデンルート — 7日間",
      groupSize: "プライベート（1〜8名）",
      summary: "東京・箱根・京都・大阪を専属の国家資格ガイドとファーストクラスの新幹線で巡る、プライベートゲストだけに開かれた特別な旅。日本の王道ルートを、本物の贅沢とともに。",
      highlights: [
        "国家資格を持つ専属ガイドが全日程に同行",
        "新幹線グリーン車（ファーストクラス）での移動",
        "箱根の温泉旅館で懐石ディナー付き1泊",
        "京都でのプライベート茶道体験と舞妓ディナー",
        "立地にこだわり厳選した4〜5つ星ホテルのみ",
      ],
      itinerary: [
        { day: "1〜2日目", title: "東京 — 定番スポットと隠れた路地", desc: "開門直後の浅草寺、築地での朝食、夕暮れの渋谷、そしてガイドと巡る新宿の居酒屋の夜。" },
        { day: "3日目", title: "箱根 — 富士山と温泉", desc: "芦ノ湖クルーズ、火山の谷を渡るロープウェイ、その後は旅館にチェックインし懐石料理と貸切露天風呂を。" },
        { day: "4〜5日目", title: "京都 — 二日間で辿る千年の歴史", desc: "人が集まる前の伏見稲荷、嵐山の竹林、黄昏の祇園、そして舞妓とのプライベートディナー。" },
        { day: "6日目", title: "奈良・大阪 — 鹿と道頓堀", desc: "東大寺の大仏とお辞儀する鹿、その後は大阪のネオン輝く運河沿いで屋台グルメ巡り。" },
        { day: "7日目", title: "出発", desc: "関西空港へのプライベート送迎、または新幹線で東京へ——ガイドからの餞別とともに。" },
      ],
      includes: ["6泊分の宿泊", "専属の国家資格ガイド", "新幹線を含む全ての鉄道移動", "旅館での懐石ディナー＆朝食", "24時間WhatsAppサポート"],
    },
  },
  {
    slug: "tokyo-private-city-tour",
    title: "Tokyo Private City Tour — Full Day",
    category: "Private",
    days: 1,
    price: 180,
    groupSize: "Private (1–6 guests)",
    rating: 4.9,
    reviews: 486,
    summary: "Eight hours, one local expert, your Tokyo. Mix the icons with the neighbourhoods that match your interests — food, art, anime, gardens, or all of it.",
    image: tokyoImg,
    highlights: [
      "Fully customised route built around you",
      "Skip-the-line entries arranged in advance",
      "Local restaurant picks (no tourist traps)",
      "Effortless train navigation with your guide",
      "Ideal first-day orientation for any Japan trip",
    ],
    itinerary: [
      { day: "Morning", title: "Old Tokyo", desc: "Senso-ji temple, Asakusa's craft streets and a river view coffee — or a sushi breakfast at Tsukiji." },
      { day: "Midday", title: "Your Tokyo", desc: "Choose your flavour: TeamLab art, Harajuku fashion, Akihabara anime, or Meiji Shrine's forest." },
      { day: "Evening", title: "Neon hour", desc: "Shibuya Crossing at dusk, a hidden rooftop view, and an izakaya recommendation for dinner." },
    ],
    includes: ["8 hours with licensed guide", "Personalised itinerary", "Restaurant reservations", "Transit guidance", "Photo spots cheat sheet"],
    ja: {
      title: "東京プライベート市内観光 — 1日ツアー",
      groupSize: "プライベート（1〜6名）",
      summary: "8時間、地元専門家とふたりだけの東京。定番の名所と、あなたの興味に合わせたエリア——グルメ、アート、アニメ、庭園、あるいはその全部——を自由に組み合わせます。",
      highlights: [
        "お客様に合わせた完全オーダーメイドのルート",
        "事前手配による行列スキップ入場",
        "観光客向けではない地元おすすめレストラン",
        "ガイド同行で電車移動もストレスフリー",
        "日本旅行の初日オリエンテーションに最適",
      ],
      itinerary: [
        { day: "午前", title: "下町・東京", desc: "浅草寺、浅草の工芸品ストリート、川辺のカフェ——あるいは築地での寿司の朝食。" },
        { day: "昼", title: "あなただけの東京", desc: "チームラボのアート、原宿のファッション、秋葉原のアニメ、明治神宮の森からお好みで。" },
        { day: "夕方", title: "ネオンアワー", desc: "夕暮れの渋谷スクランブル交差点、隠れた屋上ビュー、そしてディナーには居酒屋をご提案。" },
      ],
      includes: ["国家資格ガイドと過ごす8時間", "パーソナライズされた旅程", "レストラン予約", "交通案内", "撮影スポットまとめ"],
    },
  },
  {
    slug: "kyoto-cultural-day-tour",
    title: "Kyoto Culture & Temples — Small Group Day Tour",
    category: "Group",
    days: 1,
    price: 95,
    groupSize: "Max 12 guests",
    rating: 4.8,
    reviews: 651,
    summary: "Fushimi Inari, Kinkaku-ji, the bamboo grove and Gion in one perfectly-paced day — with a guide who knows when the crowds move and how to avoid them.",
    image: kyotoImg,
    highlights: [
      "The four essential Kyoto sights in one day",
      "Timed routing to dodge the biggest crowds",
      "Matcha break in a traditional teahouse",
      "Small group capped at 12 for a personal feel",
      "Gion walking finale with geiko district stories",
    ],
    itinerary: [
      { day: "Morning", title: "Fushimi Inari & Golden Pavilion", desc: "Early climb through the torii tunnels, then Kinkaku-ji shimmering over its mirror pond." },
      { day: "Midday", title: "Arashiyama", desc: "Bamboo grove, Tenryu-ji zen garden, and a riverside lunch stop." },
      { day: "Afternoon", title: "Higashiyama & Gion", desc: "Kiyomizu-dera's wooden stage, cobbled Sannenzaka lanes, and Gion as the lanterns come on." },
    ],
    includes: ["Licensed English-speaking guide", "All temple entry fees", "Matcha & sweet break", "Transit between sights", "Small group guarantee"],
    ja: {
      title: "京都文化と寺院めぐり — 少人数制日帰りツアー",
      groupSize: "最大12名",
      summary: "伏見稲荷、金閣寺、竹林、そして祇園を、完璧なペース配分で1日に凝縮。混雑のタイミングを知り尽くしたガイドが、賢く回避しながらご案内します。",
      highlights: [
        "京都必見の4大スポットを1日で網羅",
        "最大の混雑を避けるタイムドルーティング",
        "伝統的な茶室での抹茶休憩",
        "最大12名の少人数制でアットホームな雰囲気",
        "祇園の花街の物語とともに歩く締めくくり",
      ],
      itinerary: [
        { day: "午前", title: "伏見稲荷と金閣寺", desc: "早朝に鳥居のトンネルを登り、その後は鏡のような池に輝く金閣寺へ。" },
        { day: "昼", title: "嵐山", desc: "竹林、天龍寺の禅庭、そして川沿いでのランチ休憩。" },
        { day: "午後", title: "東山・祇園", desc: "清水寺の舞台、石畳の産寧坂、そして灯りがともり始める祇園の街並み。" },
      ],
      includes: ["英語対応の国家資格ガイド", "全寺院の拝観料", "抹茶とお菓子の休憩", "観光地間の交通費", "少人数制保証"],
    },
  },
  {
    slug: "luxury-ryokan-escape",
    title: "Luxury Ryokan & Onsen Escape — 5 Days",
    category: "Luxury",
    days: 5,
    price: 4900,
    groupSize: "Private (2–4 guests)",
    rating: 5.0,
    reviews: 128,
    summary: "Three of Japan's finest ryokan — Hakone, Kyoto and the alps — linked by private drivers. Private open-air baths, ten-course kaiseki, and absolutely no schedule stress.",
    image: ryokanImg,
    highlights: [
      "Hand-picked luxury ryokan with private onsen baths",
      "Ten-course kaiseki dinners each evening",
      "Private car and driver between destinations",
      "In-room massage and tea master session",
      "Fuji-view suite in Hakone (weather willing)",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Hakone", desc: "A lakeside ryokan with your own steaming rotenburo, Fuji on the horizon, and dinner served in-room by your personal attendant." },
      { day: "Days 3–4", title: "Kyoto", desc: "A restored machiya ryokan in the temple district — private garden, morning zazen, evening geiko performance." },
      { day: "Day 5", title: "Farewell", desc: "A slow morning, a final soak, and a private transfer to your next destination or airport." },
    ],
    includes: ["4 nights luxury ryokan", "All kaiseki dinners & breakfasts", "Private driver throughout", "Onsen etiquette concierge", "Priority late checkout"],
    ja: {
      title: "高級旅館・温泉の旅 — 5日間",
      groupSize: "プライベート（2〜4名）",
      summary: "箱根、京都、そしてアルプス山間——日本屈指の名旅館3軒を専属ドライバーでつなぐ旅。貸切露天風呂、十品の懐石料理、そしてスケジュールに追われないゆったりとした時間。",
      highlights: [
        "貸切温泉付きの厳選された高級旅館",
        "毎晩十品の懐石ディナー",
        "目的地間は専属車とドライバーで移動",
        "客室でのマッサージと茶匠による茶道体験",
        "天候次第で富士山ビューの箱根の客室も",
      ],
      itinerary: [
        { day: "1〜2日目", title: "箱根", desc: "湖畔の旅館で、自分専用の湯けむり立つ露天風呂と地平線に浮かぶ富士山、そして専属係による部屋出しのディナー。" },
        { day: "3〜4日目", title: "京都", desc: "寺院エリアに佇む町家を改装した旅館——専用庭園、朝の坐禅、夜の芸妓の舞。" },
        { day: "5日目", title: "旅の終わりに", desc: "ゆったりとした朝、最後の入浴、そして次の目的地や空港へのプライベート送迎。" },
      ],
      includes: ["高級旅館4泊", "全ての懐石ディナー＆朝食", "全行程専属ドライバー付き", "温泉マナーのコンシェルジュ", "優先レイトチェックアウト"],
    },
  },
  {
    slug: "cherry-blossom-tour",
    title: "Cherry Blossom Japan — 8 Days",
    category: "Seasonal",
    days: 8,
    price: 2950,
    groupSize: "Max 12 guests",
    rating: 4.9,
    reviews: 274,
    summary: "Sakura season, engineered. We track the blossom front daily and adjust your route so you stand under peak bloom in Tokyo, Kyoto and beyond — with hanami picnics included.",
    image: sakuraImg,
    highlights: [
      "Daily blossom-front tracking with route flexibility",
      "Private hanami picnic under the trees",
      "Evening illuminated sakura viewings",
      "Philosopher's Path and Maruyama Park at peak",
      "Booked a year ahead — guaranteed availability",
    ],
    itinerary: [
      { day: "Days 1–3", title: "Tokyo in bloom", desc: "Ueno Park, Meguro River's pink canyon, and chidorigafuchi rowboats beneath falling petals." },
      { day: "Days 4–6", title: "Kyoto's sakura icons", desc: "Philosopher's Path, Maruyama's famous weeping cherry lit at night, and a hanami picnic with local delicacies." },
      { day: "Days 7–8", title: "Osaka finale", desc: "Osaka Castle ringed in blossom, a farewell dinner in Dotonbori, and departure day flexibility." },
    ],
    includes: ["7 nights 4-star hotels", "Expert sakura-tracking guide", "Hanami picnic & night illuminations", "All rail travel", "Peak-season hotel guarantee"],
    ja: {
      title: "桜の日本 — 8日間",
      groupSize: "最大12名",
      summary: "桜のシーズンを緻密に計算した旅。毎日開花状況を追跡しルートを調整することで、東京・京都をはじめ各地の満開のタイミングに立ち会えます。お花見ピクニック付き。",
      highlights: [
        "毎日の開花前線トラッキングとルート柔軟対応",
        "桜の下でのプライベートお花見ピクニック",
        "夜桜ライトアップ鑑賞",
        "満開時期の哲学の道と円山公園",
        "1年前からの予約で空き枠を確保",
      ],
      itinerary: [
        { day: "1〜3日目", title: "満開の東京", desc: "上野公園、目黒川のピンクの回廊、そして舞い散る花びらの下、千鳥ヶ淵での貸しボート。" },
        { day: "4〜6日目", title: "京都の桜の名所", desc: "哲学の道、夜にライトアップされる円山公園の名高い枝垂れ桜、そして地元の名物とともにお花見ピクニック。" },
        { day: "7〜8日目", title: "大阪でのフィナーレ", desc: "桜に囲まれた大阪城、道頓堀での送別ディナー、そして出発日は柔軟に対応。" },
      ],
      includes: ["4つ星ホテル7泊", "桜追跡の専門ガイド", "お花見ピクニック＆夜桜ライトアップ", "全ての鉄道移動", "繁忙期ホテル確約"],
    },
  },
  {
    slug: "autumn-colours-tour",
    title: "Autumn Colours of Japan — 7 Days",
    category: "Seasonal",
    days: 7,
    price: 2750,
    groupSize: "Max 12 guests",
    rating: 4.9,
    reviews: 198,
    summary: "November in Japan is a slow-burning firework. Crimson maples over Kyoto temples, golden ginkgo avenues in Tokyo, and alpine villages wrapped in mist.",
    image: autumnImg,
    highlights: [
      "Kyoto's top foliage temples at optimal hours",
      "Night 'momiji' illuminations",
      "Alpine day in Takayama & Shirakawa-go",
      "Onsen evening among autumn mountains",
      "Foliage-front tracking, route adjusted daily",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Tokyo gold", desc: "Ginkgo avenues, Rikugien garden's night illumination, and city icons between the leaves." },
      { day: "Days 3–4", title: "Alpine fire", desc: "Takayama's old town and Shirakawa-go's thatched roofs against blazing hillsides — plus an onsen night." },
      { day: "Days 5–7", title: "Kyoto crimson", desc: "Tofuku-ji's maple valley, Eikan-do lit after dark, and Arashiyama in full colour." },
    ],
    includes: ["6 nights accommodation incl. onsen stay", "Foliage-expert guide", "Night illumination entries", "All rail travel", "24/7 support"],
    ja: {
      title: "日本の紅葉 — 7日間",
      groupSize: "最大12名",
      summary: "11月の日本は、ゆっくりと燃え上がる花火のよう。京都の寺院を彩る真紅のもみじ、東京の黄金のイチョウ並木、そして霧に包まれた山あいの村々を巡ります。",
      highlights: [
        "最適な時間帯に訪れる京都屈指の紅葉名所",
        "夜のもみじライトアップ鑑賞",
        "高山・白川郷でのアルプス日帰り観光",
        "紅葉の山々に囲まれた温泉の夜",
        "紅葉前線を追跡し毎日ルートを調整",
      ],
      itinerary: [
        { day: "1〜2日目", title: "黄金の東京", desc: "イチョウ並木、六義園の夜間ライトアップ、そして紅葉の合間に見る街のランドマーク。" },
        { day: "3〜4日目", title: "アルプスの紅蓮", desc: "高山の古い町並みと、燃えるような山肌を背にした白川郷の茅葺き屋根——そして温泉の夜。" },
        { day: "5〜7日目", title: "京都の紅", desc: "東福寺の紅葉の渓谷、日没後にライトアップされる永観堂、そして真っ赤に染まる嵐山。" },
      ],
      includes: ["温泉宿泊を含む6泊分の宿泊", "紅葉に精通したガイド", "夜間ライトアップ入場料", "全ての鉄道移動", "24時間サポート"],
    },
  },
  {
    slug: "japan-food-odyssey",
    title: "Japan Food Odyssey — 6 Days",
    category: "Group",
    days: 6,
    price: 2150,
    groupSize: "Max 10 guests",
    rating: 4.9,
    reviews: 342,
    summary: "Eat your way from Tokyo's sushi counters to Osaka's street griddles: markets, izakayas, a knife town, a sake brewery, and a sushi class with a third-generation chef.",
    image: foodImg,
    highlights: [
      "12+ curated tastings, markets and meals",
      "Hands-on sushi-making masterclass",
      "Sakai knife workshop visit",
      "Sake brewery tour and guided tasting",
      "Osaka street-food finale in Dotonbori",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Tokyo — depth of flavour", desc: "Tsukiji breakfast crawl, ramen tasting flight, and a Michelin-listed izakaya evening." },
      { day: "Days 3–4", title: "Kyoto — refinement", desc: "Nishiki Market, tofu kaiseki lunch, tea ceremony, and Fushimi sake district tastings." },
      { day: "Days 5–6", title: "Osaka — joy", desc: "Sushi class, Kuromon Market, then the great Dotonbori crawl: takoyaki, kushikatsu, okonomiyaki." },
    ],
    includes: ["5 nights accommodation", "All listed tastings & classes", "Foodie guide throughout", "Rail travel", "Dietary adaptations available"],
    ja: {
      title: "日本グルメの旅 — 6日間",
      groupSize: "最大10名",
      summary: "東京の寿司カウンターから大阪の鉄板グルメまで、食べ尽くす旅。市場、居酒屋、刃物の町、酒蔵、そして三代目職人による寿司教室まで。",
      highlights: [
        "厳選された12以上の試食・市場・食事体験",
        "実践形式の寿司握りマスタークラス",
        "堺の刃物工房訪問",
        "酒蔵見学とガイド付き利き酒",
        "道頓堀での大阪屋台グルメフィナーレ",
      ],
      itinerary: [
        { day: "1〜2日目", title: "東京 — 味の奥深さ", desc: "築地での朝食巡り、ラーメン食べ比べ、そしてミシュラン掲載の居酒屋での夜。" },
        { day: "3〜4日目", title: "京都 — 洗練の味", desc: "錦市場、湯豆腐懐石ランチ、茶道体験、そして伏見の酒蔵での利き酒。" },
        { day: "5〜6日目", title: "大阪 — 食の歓び", desc: "寿司教室、黒門市場、そして道頓堀グルメ巡りの真骨頂——たこ焼き、串カツ、お好み焼き。" },
      ],
      includes: ["5泊分の宿泊", "掲載の全試食・体験教室", "全行程フードガイド同行", "鉄道移動", "食事制限への対応可能"],
    },
  },
  {
    slug: "hiroshima-miyajima-day-trip",
    title: "Hiroshima & Miyajima — Guided Day Trip",
    category: "Group",
    days: 1,
    price: 145,
    groupSize: "Max 12 guests",
    rating: 4.8,
    reviews: 289,
    summary: "From Osaka or Kyoto by shinkansen: the Peace Memorial told with care, okonomiyaki for lunch, and the floating torii of Miyajima timed to the tide.",
    image: hiroshimaImg,
    highlights: [
      "Round-trip shinkansen from Osaka/Kyoto",
      "Peace Memorial Park with expert local context",
      "Hiroshima-style okonomiyaki lunch",
      "Miyajima ferry and Itsukushima Shrine",
      "Tide-timed torii viewing",
    ],
    itinerary: [
      { day: "Morning", title: "Peace Memorial", desc: "The park, the dome and the museum — history handled with honesty and grace." },
      { day: "Midday", title: "Okonomiyaki lunch", desc: "Counter seats at a local favourite, layers griddled before your eyes." },
      { day: "Afternoon", title: "Miyajima", desc: "Ferry across, deer on the shore, and the great torii floating (or walkable) by tide." },
    ],
    includes: ["Shinkansen round trip", "Licensed guide", "Okonomiyaki lunch", "Ferry & entry fees", "Tide-optimised schedule"],
    ja: {
      title: "広島・宮島 — ガイド付き日帰りツアー",
      groupSize: "最大12名",
      summary: "大阪または京都から新幹線で日帰り。丁寧に語られる平和記念公園、ランチにはお好み焼き、そして潮の時刻に合わせて訪れる宮島の海に浮かぶ大鳥居。",
      highlights: [
        "大阪／京都からの新幹線往復",
        "地元専門ガイドによる平和記念公園の解説",
        "広島風お好み焼きのランチ",
        "宮島行きフェリーと厳島神社",
        "潮見表に合わせた鳥居観賞",
      ],
      itinerary: [
        { day: "午前", title: "平和記念公園", desc: "公園、原爆ドーム、そして資料館——誠実さと品格をもって伝えられる歴史。" },
        { day: "昼", title: "お好み焼きランチ", desc: "地元で人気のカウンター席で、目の前で焼き上げる幾層ものお好み焼きを。" },
        { day: "午後", title: "宮島", desc: "フェリーで渡り、浜辺の鹿と出会い、潮の満ち引きで浮かぶ（あるいは歩いて渡れる）大鳥居を眺めます。" },
      ],
      includes: ["新幹線往復", "国家資格ガイド", "お好み焼きランチ", "フェリー代・拝観料", "潮見に合わせた最適スケジュール"],
    },
  },
];

export const getTour = (slug: string) => TOURS.find((t) => t.slug === slug);
export const toursByCategory = (cat: TourCategory) => TOURS.filter((t) => t.category === cat);

export function localizeTour(tour: Tour, locale: Locale): Tour {
  if (locale === "en") return tour;
  return { ...tour, ...tour.ja };
}

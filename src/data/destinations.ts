import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
const tokyoImg = tokyoImgAsset;
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;
import osakaImgAsset from "@/assets/dest-osaka.jpg";
const osakaImg = osakaImgAsset;
import hakoneImgAsset from "@/assets/dest-hakone.jpg";
const hakoneImg = hakoneImgAsset;
import hiroshimaImgAsset from "@/assets/dest-hiroshima.jpg";
const hiroshimaImg = hiroshimaImgAsset;
import takayamaImgAsset from "@/assets/dest-takayama.jpg";
const takayamaImg = takayamaImgAsset;
import type { Locale } from "@/i18n";

interface DestinationTranslatable {
  name: string;
  region: string;
  tagline: string;
  description: string[];
  highlights: string[];
  thingsToDo: { title: string; desc: string }[];
  bestTime: string;
  weather: string;
  travelTips: string[];
  faqs: { q: string; a: string }[];
}

export interface Destination extends DestinationTranslatable {
  slug: string;
  image: string;
  relatedTours: string[];
  ja: DestinationTranslatable;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "tokyo",
    name: "Tokyo",
    region: "Kanto",
    tagline: "Where neon-lit futures meet quiet shrine gardens",
    description: [
      "Tokyo is not one city but a hundred villages stitched together by the world's best trains. One moment you're beneath the giant screens of Shibuya Crossing; ten minutes later you're alone on a lantern-lit lane in Yanaka where cats outnumber tourists.",
      "Our Tokyo experiences skip the queues and go where locals go — dawn at the tuna auction, a craft beer in a four-seat Golden Gai bar, sunset from a hidden rooftop above Shinjuku.",
    ],
    image: tokyoImg,
    highlights: ["Shibuya Crossing at dusk", "Senso-ji Temple, Asakusa", "Tsukiji Outer Market breakfast", "TeamLab digital art", "Golden Gai nightlife", "Meiji Shrine forest walk"],
    thingsToDo: [
      { title: "Sushi breakfast at Tsukiji", desc: "Eat where the chefs eat — omakase counters that open at 6am." },
      { title: "Shibuya Sky at sunset", desc: "The best 360° view of the world's largest metropolis." },
      { title: "Old Tokyo walking tour", desc: "Yanaka's temples, alleys and family-run craft shops." },
      { title: "Akihabara pop culture dive", desc: "Retro arcades, anime floors and themed cafés with a local otaku guide." },
      { title: "Tea ceremony in Hamarikyu", desc: "Matcha in a 350-year-old teahouse on a tidal pond." },
      { title: "Izakaya hopping in Shinjuku", desc: "Yakitori, highballs and stories in Omoide Yokocho's smoky lanes." },
    ],
    bestTime: "March–May for cherry blossoms and mild days; October–November for crisp air and autumn colour.",
    weather: "Hot, humid summers (Jul–Aug, 30°C+), mild springs and autumns, cool dry winters that rarely see snow.",
    travelTips: [
      "Get a Suica/Pasmo card on arrival — it works on every train, bus and convenience store.",
      "Restaurants are small; let us reserve dinner spots at least a week ahead.",
      "Stay near the Yamanote Line (Shinjuku, Shibuya, Tokyo Station) for effortless access.",
      "Carry some cash — many of the best tiny restaurants are still cash-only.",
    ],
    faqs: [
      { q: "How many days do I need in Tokyo?", a: "Three full days covers the icons comfortably; five lets you add day trips to Nikko, Kamakura or Mt Fuji." },
      { q: "Is Tokyo walkable?", a: "Individual neighbourhoods are very walkable, but you'll use trains between them — expect 15,000+ steps a day regardless!" },
      { q: "Is Tokyo good for kids?", a: "Wonderful — TeamLab, Ghibli Museum, themed cafés and the world's safest streets make it a family favourite." },
    ],
    relatedTours: ["tokyo-private-city-tour", "private-japan-golden-route", "japan-food-odyssey"],
    ja: {
      name: "東京",
      region: "関東",
      tagline: "ネオン輝く未来都市と、静かな神社の杜が同居する街",
      description: [
        "東京はひとつの都市ではなく、世界最高峰の鉄道網で結ばれた百の町の集合体です。渋谷スクランブル交差点の巨大スクリーンの下にいたかと思えば、10分後には猫の方が観光客より多い谷中の提灯路地にひとり佇んでいる——そんな街です。",
        "私たちの東京体験は行列をスキップし、地元の人が行く場所へご案内します。早朝のマグロ競り、4席しかないゴールデン街のクラフトビール店、新宿の隠れた屋上から眺める夕焼け。",
      ],
      highlights: ["夕暮れの渋谷スクランブル交差点", "浅草・浅草寺", "築地場外市場での朝食", "チームラボのデジタルアート", "ゴールデン街のナイトライフ", "明治神宮の森の散策"],
      thingsToDo: [
        { title: "築地で寿司の朝食", desc: "職人が通う店で——朝6時開店のおまかせカウンターへ。" },
        { title: "夕暮れの渋谷スカイ", desc: "世界最大級のメトロポリスを360度見渡す絶景スポット。" },
        { title: "下町・東京の街歩き", desc: "谷中の寺院、路地、家族経営の工芸品店を巡ります。" },
        { title: "秋葉原ポップカルチャー探訪", desc: "レトロなゲームセンターやアニメフロアを、地元オタクガイドと一緒に。" },
        { title: "浜離宮での茶道体験", desc: "潮入の池を望む350年の歴史ある茶室で抹茶を。" },
        { title: "新宿の居酒屋はしご", desc: "思い出横丁の煙たい路地で焼き鳥とハイボール、そして物語を。" },
      ],
      bestTime: "桜と穏やかな気候の3〜5月、澄んだ空気と紅葉の10〜11月がおすすめです。",
      weather: "夏（7〜8月）は高温多湿で30℃超え、春秋は温暖、冬は乾燥して積雪はまれです。",
      travelTips: [
        "到着したらSuica／PASMOカードを入手しましょう——電車もバスもコンビニも全て使えます。",
        "人気店は席数が少ないため、遅くとも1週間前までにご予約ください。",
        "山手線沿線（新宿・渋谷・東京駅）に宿泊すると移動が快適です。",
        "現金も少し持ち歩きましょう——名店の多くは今も現金のみの場合があります。",
      ],
      faqs: [
        { q: "東京には何日必要ですか？", a: "定番スポットを無理なく回るなら3日間。日光・鎌倉・富士山への日帰り旅を加えるなら5日間がおすすめです。" },
        { q: "東京は歩いて回れますか？", a: "各エリア内は非常に歩きやすいですが、エリア間の移動には電車を使います。1日15,000歩以上歩くことも珍しくありません。" },
        { q: "子供連れでも楽しめますか？", a: "もちろんです——チームラボやジブリ美術館、テーマカフェ、そして世界屈指の治安の良さで、ご家族に人気のエリアです。" },
      ],
    },
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    region: "Kansai",
    tagline: "A thousand years of Japan, preserved in wood and silence",
    description: [
      "Kyoto was Japan's capital for over a millennium, and it shows: 1,600 temples, 400 shrines, and entire districts where geiko still hurry to evening appointments past wooden machiya townhouses.",
      "The secret to Kyoto is timing. Our guides take you to Fushimi Inari before the crowds wake, to Arashiyama's bamboo grove at golden hour, and to moss gardens most visitors never hear about.",
    ],
    image: kyotoImg,
    highlights: ["Fushimi Inari's 10,000 torii gates", "Kinkaku-ji Golden Pavilion", "Arashiyama Bamboo Grove", "Gion geisha district", "Kiyomizu-dera at sunset", "Private tea ceremony"],
    thingsToDo: [
      { title: "Dawn at Fushimi Inari", desc: "Climb through vermillion gates with only foxes for company." },
      { title: "Kaiseki dinner in Gion", desc: "Japan's haute cuisine in a centuries-old townhouse." },
      { title: "Zen meditation with a monk", desc: "A private zazen session at a working temple." },
      { title: "Kimono stroll in Higashiyama", desc: "Cobbled lanes, five-storey pagodas and photo-perfect corners." },
      { title: "Sake tasting in Fushimi", desc: "Kyoto's historic brewing district, glass by glass." },
      { title: "Philosopher's Path walk", desc: "A canal-side stroll linking temples beneath cherry trees." },
    ],
    bestTime: "Late March–April for sakura; November for the most spectacular autumn foliage in Japan.",
    weather: "A basin climate: hot summers, cold winters with occasional light snow that turns temples magical.",
    travelTips: [
      "Book peak-season Kyoto hotels 6+ months ahead — the city sells out.",
      "Temples open early; the first two hours of the day are the quietest.",
      "Buses get crowded — we plan routes mixing trains, taxis and walking.",
      "Respect photo rules in Gion; private alleys are off-limits.",
    ],
    faqs: [
      { q: "Can I see a real geisha?", a: "Yes — respectfully. We arrange private dinners with maiko (apprentice geisha), which is the authentic and ethical way to experience this culture." },
      { q: "How many temples should I visit per day?", a: "Two or three, well-chosen and unhurried, beats a checklist of eight. Quality over quantity is the Kyoto way." },
      { q: "Is Kyoto doable as a Tokyo day trip?", a: "Technically yes by shinkansen, but Kyoto deserves at least two nights — evenings in Gion are the best part." },
    ],
    relatedTours: ["kyoto-cultural-day-tour", "private-japan-golden-route", "cherry-blossom-tour"],
    ja: {
      name: "京都",
      region: "関西",
      tagline: "木造建築と静寂に守られた、千年の日本",
      description: [
        "京都は千年以上にわたり都であり続けた街——1,600の寺院、400の神社、そして今なお木造の町家が並ぶ路地を芸妓が急ぎ足で行き交うエリアが残っています。",
        "京都を楽しむ秘訣はタイミングです。私たちのガイドは、人が集まる前の伏見稲荷、黄金時間の嵐山竹林、そしてほとんどの旅行者が知らない苔庭へご案内します。",
      ],
      highlights: ["伏見稲荷大社・千本鳥居", "金閣寺", "嵐山の竹林", "祇園の花街", "夕暮れの清水寺", "プライベート茶道体験"],
      thingsToDo: [
        { title: "夜明けの伏見稲荷", desc: "朱色の鳥居をくぐりながら、狐だけを道連れに山を登ります。" },
        { title: "祇園での懐石ディナー", desc: "数百年の歴史を持つ町家で味わう、日本の高級料理。" },
        { title: "僧侶と行う禅体験", desc: "現役の寺院でのプライベート坐禅セッション。" },
        { title: "東山界隈の着物散策", desc: "石畳の路地、五重塔、絵になる路地裏を着物で歩く。" },
        { title: "伏見の日本酒利き酒", desc: "京都屈指の酒蔵街を、一杯ずつ味わいながら巡ります。" },
        { title: "哲学の道散歩", desc: "桜並木の下、寺院をつなぐ運河沿いの散歩道。" },
      ],
      bestTime: "桜のシーズンは3月下旬〜4月、日本屈指の紅葉が見られる11月が特におすすめです。",
      weather: "盆地特有の気候で、夏は暑く、冬は寒さの中でときおり雪が積もり、寺院を幻想的な景色に変えます。",
      travelTips: [
        "繁忙期のホテルは半年以上前の予約が必須です——京都はすぐに満室になります。",
        "寺院は朝早くから開門します。開門直後の2時間が最も静かです。",
        "バスは混雑しがちなので、電車・タクシー・徒歩を組み合わせたルートをご提案します。",
        "祇園では撮影マナーを守りましょう——私道への立ち入りは禁止されています。",
      ],
      faqs: [
        { q: "本物の芸妓に会えますか？", a: "はい、マナーを守ればもちろん可能です。舞妓（見習いの芸妓）とのプライベートディナーを手配いたします。これが最も本格的かつ礼儀に適った体験方法です。" },
        { q: "1日に何ヶ所くらい寺院を回るべきですか？", a: "厳選した2〜3ヶ所をゆっくり巡る方が、慌ただしく8ヶ所を回るより満足度が高いです。量より質が京都流です。" },
        { q: "東京から日帰りで行けますか？", a: "新幹線を使えば技術的には可能ですが、京都は最低でも2泊の価値があります——祇園の夜こそが最大の魅力です。" },
      ],
    },
  },
  {
    slug: "osaka",
    name: "Osaka",
    region: "Kansai",
    tagline: "Japan's kitchen — loud, warm, and absurdly delicious",
    description: [
      "Osakans have a saying: kuidaore — 'eat yourself into ruin'. This is Japan's street-food capital, where takoyaki sizzles on every corner and the neon of Dotonbori reflects in the canal like liquid fireworks.",
      "Beyond the food, Osaka is Japan at its friendliest. Comedians on every shopping street, a magnificent castle, and the perfect base for day trips to Nara's bowing deer and Himeji's white castle.",
    ],
    image: osakaImg,
    highlights: ["Dotonbori neon canal", "Osaka Castle", "Kuromon Ichiba Market", "Shinsekai retro district", "Umeda Sky Building", "Day trip to Nara"],
    thingsToDo: [
      { title: "Street food crawl in Dotonbori", desc: "Takoyaki, kushikatsu and okonomiyaki with a local foodie guide." },
      { title: "Kuromon Market tasting walk", desc: "Wagyu skewers, uni spoons and the sweetest strawberries alive." },
      { title: "Osaka Castle & gardens", desc: "Samurai history inside Japan's most dramatic fortress." },
      { title: "Nara deer & giant Buddha", desc: "A 45-minute train to 1,300 years of history." },
      { title: "Sushi-making class", desc: "Roll your own lunch with a third-generation chef." },
      { title: "Shinsekai by night", desc: "Retro arcades and deep-fried everything under Tsutenkaku Tower." },
    ],
    bestTime: "Spring and autumn for comfortable weather; food is spectacular year-round.",
    weather: "Similar to Tokyo but slightly warmer — hot humid summers, mild winters.",
    travelTips: [
      "Stay in Namba for nightlife and food, Umeda for shopping and transport.",
      "The Osaka Amazing Pass covers most attractions plus unlimited transit.",
      "Osakans stand on the right side of escalators — opposite to Tokyo!",
      "Come hungry. Portions are generous and prices lower than Tokyo.",
    ],
    faqs: [
      { q: "Osaka or Tokyo for food?", a: "Osaka for street food, comfort food and value; Tokyo for the world's highest concentration of Michelin stars. Ideally: both." },
      { q: "Is Universal Studios Japan worth it?", a: "For Nintendo World alone, yes — we can arrange express passes so you skip the 2-hour queues." },
      { q: "How long should I stay in Osaka?", a: "Two nights for the city plus one more if you're adding Nara or Himeji day trips." },
    ],
    relatedTours: ["japan-food-odyssey", "private-japan-golden-route", "hiroshima-miyajima-day-trip"],
    ja: {
      name: "大阪",
      region: "関西",
      tagline: "日本の台所——にぎやかで温かく、とんでもなく美味しい",
      description: [
        "大阪には「食い倒れ」という言葉があります。ここは日本の屋台グルメの聖地。街角のあちこちでたこ焼きが焼かれ、道頓堀のネオンが運河に映り込み、まるで液体の花火のように輝きます。",
        "グルメだけではなく、大阪は日本一フレンドリーな街でもあります。商店街のいたるところにお笑い芸人、壮麗な大阪城、そして奈良の鹿や姫路城への日帰り旅の拠点としても最適です。",
      ],
      highlights: ["道頓堀のネオン運河", "大阪城", "黒門市場", "レトロな新世界エリア", "梅田スカイビル", "奈良への日帰り旅"],
      thingsToDo: [
        { title: "道頓堀のグルメ食べ歩き", desc: "地元のグルメガイドと一緒に、たこ焼き・串カツ・お好み焼きを堪能。" },
        { title: "黒門市場の食べ歩き", desc: "和牛串、ウニのひと口、そしてこの上なく甘いいちごを。" },
        { title: "大阪城と庭園", desc: "日本屈指の壮大な城の中に眠る、侍の歴史を辿ります。" },
        { title: "奈良の鹿と大仏", desc: "電車でわずか45分、1,300年の歴史へ。" },
        { title: "寿司握り体験", desc: "三代続く職人と一緒に、自分でにぎるランチタイム。" },
        { title: "夜の新世界散策", desc: "通天閣の下で、レトロなゲームセンターと揚げ物グルメを。" },
      ],
      bestTime: "快適な気候の春・秋がベストシーズン。グルメは一年を通して楽しめます。",
      weather: "東京と似ていますがやや温暖——夏は高温多湿、冬は穏やかです。",
      travelTips: [
        "ナイトライフとグルメなら難波、ショッピングと交通の便なら梅田に宿泊するのがおすすめです。",
        "大阪周遊パスなら主要観光地に加え交通機関も乗り放題でお得です。",
        "大阪ではエスカレーターの右側に立ちます——東京とは逆です！",
        "空腹で臨みましょう。ボリューム満点で東京より価格も抑えめです。",
      ],
      faqs: [
        { q: "グルメなら大阪と東京どちらがいいですか？", a: "屋台グルメ・庶民の味・コストパフォーマンスなら大阪、世界最多のミシュラン星付き店なら東京。理想は両方訪れることです。" },
        { q: "ユニバーサル・スタジオ・ジャパンは行く価値がありますか？", a: "スーパー・ニンテンドー・ワールドだけでも訪れる価値があります。2時間待ちを避けるエクスプレスパスの手配も可能です。" },
        { q: "大阪には何泊すべきですか？", a: "市内観光なら2泊、奈良や姫路への日帰り旅を加えるならもう1泊追加するのがおすすめです。" },
      ],
    },
  },
  {
    slug: "hakone",
    name: "Hakone",
    region: "Kanagawa",
    tagline: "Steaming onsen, sacred lakes, and Mount Fuji at your window",
    description: [
      "Just 90 minutes from Tokyo, Hakone is where Japan slows down. Volcanic hot springs feed hundreds of onsen baths, a pirate ship crosses Lake Ashi beneath a red torii gate, and — on clear mornings — Mount Fuji fills the horizon.",
      "This is where we book our most-loved ryokan stays: tatami rooms, kaiseki dinners served in-room, and private open-air baths under the stars.",
    ],
    image: hakoneImg,
    highlights: ["Lake Ashi & Hakone Shrine torii", "Private onsen ryokan stays", "Hakone Ropeway over Owakudani", "Open-Air Sculpture Museum", "Mount Fuji viewpoints", "Traditional kaiseki dinners"],
    thingsToDo: [
      { title: "Stay in a luxury ryokan", desc: "Tatami, yukata, kaiseki and your own steaming rotenburo bath." },
      { title: "Cruise Lake Ashi", desc: "Cross the caldera lake with Fuji rising behind the torii gate." },
      { title: "Ride the ropeway over Owakudani", desc: "Volcanic vents, black eggs, and sweeping mountain views." },
      { title: "Open-Air Museum", desc: "Picasso and Moore sculptures scattered across mountain gardens." },
      { title: "Old Tokaido Highway walk", desc: "Cedar-lined stones walked by samurai for 400 years." },
      { title: "Hakone Shrine at dawn", desc: "Mist, cedar giants and the lakeside torii before the crowds." },
    ],
    bestTime: "November for autumn leaves over the lake; winter for the clearest Fuji views from a hot bath.",
    weather: "Cooler than Tokyo year-round; mornings offer the best chance of a cloud-free Fuji.",
    travelTips: [
      "Fuji hides often — build two chances to see it into your itinerary.",
      "The Hakone Free Pass covers the full loop: train, cable car, ropeway and boat.",
      "Tattoos are fine in private baths; we'll book rooms with your own onsen.",
      "One night minimum, two nights ideal — the point of Hakone is to slow down.",
    ],
    faqs: [
      { q: "Will I definitely see Mount Fuji?", a: "No one can promise it — Fuji is famously shy. Winter mornings give the best odds, and we design itineraries with multiple viewpoints to maximise your chances." },
      { q: "What if I've never used an onsen?", a: "We'll walk you through the etiquette — it's simpler than you fear, and a private in-room bath is a pressure-free way to start." },
      { q: "Is Hakone doable as a day trip?", a: "Yes, but you'd miss the best part: the evening ryokan experience with kaiseki dinner and a starlit bath." },
    ],
    relatedTours: ["luxury-ryokan-escape", "private-japan-golden-route", "cherry-blossom-tour"],
    ja: {
      name: "箱根",
      region: "神奈川",
      tagline: "湯けむり漂う温泉と神秘の湖、そして窓辺に富士山",
      description: [
        "東京からわずか90分、箱根は日本のスピードがゆるやかになる場所です。火山の恵みが数百もの温泉を満たし、赤い鳥居のもとを海賊船が芦ノ湖を渡り、晴れた朝には富士山が地平線いっぱいに広がります。",
        "私たちが特にお気に入りの旅館をご用意するのがこの箱根です。畳の部屋、部屋出しの懐石料理、そして星空の下でのプライベート露天風呂。",
      ],
      highlights: ["芦ノ湖と箱根神社の鳥居", "貸切温泉旅館滞在", "大涌谷を渡る箱根ロープウェイ", "彫刻の森美術館", "富士山ビュースポット", "伝統の懐石ディナー"],
      thingsToDo: [
        { title: "高級旅館に宿泊", desc: "畳、浴衣、懐石料理、そして自分だけの湯けむり立つ露天風呂。" },
        { title: "芦ノ湖クルーズ", desc: "鳥居の向こうにそびえる富士山を眺めながら、カルデラ湖を渡ります。" },
        { title: "大涌谷ロープウェイ", desc: "火山の噴気孔、黒たまご、そして雄大な山々の眺望。" },
        { title: "彫刻の森美術館", desc: "山の庭園に点在するピカソやムーアの彫刻作品。" },
        { title: "旧東海道の石畳を歩く", desc: "400年間、侍たちが歩いた杉並木の石畳道。" },
        { title: "夜明けの箱根神社", desc: "霧と巨大な杉、そして人が集まる前の湖畔の鳥居。" },
      ],
      bestTime: "湖畔の紅葉が美しい11月、露天風呂から澄んだ富士山が見える冬がおすすめです。",
      weather: "一年を通して東京より涼しく、雲のない富士山が見られる可能性が最も高いのは早朝です。",
      travelTips: [
        "富士山は姿を隠すことも多いので、旅程には見るチャンスを複数組み込んでおきましょう。",
        "箱根フリーパスなら、電車・ケーブルカー・ロープウェイ・船を含む周遊ルートを網羅できます。",
        "タトゥーがあっても貸切風呂なら問題ありません——専用温泉付きのお部屋を手配いたします。",
        "最低1泊、理想は2泊——箱根の魅力はゆっくりと過ごすことにあります。",
      ],
      faqs: [
        { q: "富士山は必ず見られますか？", a: "残念ながら誰にも保証はできません——富士山は気まぐれで有名です。冬の朝が最も可能性が高く、複数のビュースポットを組み込んだ旅程で確率を最大化します。" },
        { q: "温泉に入ったことがないのですが大丈夫ですか？", a: "マナーは丁寧にご案内しますのでご安心ください。思っているより簡単です。まずはプレッシャーのない客室専用の貸切風呂から始めるのもおすすめです。" },
        { q: "箱根は日帰りでも楽しめますか？", a: "可能ですが、最大の魅力である夜の旅館体験——懐石ディナーと満点の星空の下の入浴——を逃してしまいます。" },
      ],
    },
  },
  {
    slug: "hiroshima",
    name: "Hiroshima & Miyajima",
    region: "Chugoku",
    tagline: "A story of peace, and an island where torii float on the sea",
    description: [
      "Hiroshima moves every traveller who visits. The Peace Memorial Park and Museum tell their story with grace rather than anger — and around them thrives a warm, green, defiantly optimistic city famous for its own style of okonomiyaki.",
      "A short ferry away, Miyajima island's great torii gate rises from the tide before Itsukushima Shrine. Stay past sunset when the day-trippers leave, and the island belongs to you and the deer.",
    ],
    image: hiroshimaImg,
    highlights: ["Peace Memorial Park & Museum", "Itsukushima floating torii", "Miyajima ferry crossing", "Hiroshima-style okonomiyaki", "Mount Misen hike", "Shukkei-en Garden"],
    thingsToDo: [
      { title: "Peace Memorial with a local guide", desc: "Context, stories and space to reflect, handled with care." },
      { title: "Miyajima at high tide", desc: "Watch the great torii float — then stay for the sunset silhouette." },
      { title: "Okonomiyaki counter lunch", desc: "Layered, griddled, and utterly different from Osaka's version." },
      { title: "Mount Misen ropeway & hike", desc: "Panoramas across the Seto Inland Sea's scattered islands." },
      { title: "Oyster tasting", desc: "Miyajima's grilled oysters are the island's other great icon." },
      { title: "Shukkei-en stroll", desc: "A pocket landscape garden of bridges, koi and tea houses." },
    ],
    bestTime: "Spring and autumn; oyster season peaks January–February.",
    weather: "Mild, sunny climate on the Seto Inland Sea — one of Japan's driest regions.",
    travelTips: [
      "Check the tide tables — the torii floats at high tide and can be walked to at low tide.",
      "The shinkansen from Kyoto takes 100 minutes; from Osaka just 85.",
      "Consider a night on Miyajima itself for the magical evening quiet.",
      "The Peace Museum is powerful; allow emotional space in your day after visiting.",
    ],
    faqs: [
      { q: "Is Hiroshima appropriate for children?", a: "Yes — the Peace Park is a place of hope, and guides adapt the story sensitively for younger visitors. Miyajima's deer and cable car are a joy for kids." },
      { q: "Day trip or overnight?", a: "A day trip from Osaka/Kyoto works, but an overnight with an evening on Miyajima is one of Japan's great experiences." },
      { q: "High tide or low tide for the torii?", a: "Both are beautiful: floating at high tide, walkable at low tide. We plan your visit around the tables." },
    ],
    relatedTours: ["hiroshima-miyajima-day-trip", "private-japan-golden-route", "japan-food-odyssey"],
    ja: {
      name: "広島・宮島",
      region: "中国地方",
      tagline: "平和への祈りと、海に浮かぶ鳥居の島",
      description: [
        "広島を訪れる旅行者は誰もが心を動かされます。平和記念公園と資料館は、怒りではなく静かな品格でその物語を伝え、その周囲には独自のお好み焼きで知られる、温かく緑豊かで前向きな街が広がっています。",
        "フェリーで少し行けば、厳島神社の大鳥居が潮の中からそびえる宮島があります。日帰り客が去った日没後まで滞在すれば、島は鹿とあなただけのものになります。",
      ],
      highlights: ["平和記念公園と資料館", "厳島神社の海に浮かぶ大鳥居", "宮島へのフェリー", "広島風お好み焼き", "弥山登山", "縮景園"],
      thingsToDo: [
        { title: "地元ガイドと巡る平和記念公園", desc: "背景・物語、そして静かに向き合う時間を、丁寧にご案内します。" },
        { title: "満潮時の宮島", desc: "海に浮かぶ大鳥居を眺め、夕暮れのシルエットまで滞在します。" },
        { title: "お好み焼きカウンターでのランチ", desc: "層状に焼き上げる、大阪とはまったく異なる広島スタイル。" },
        { title: "弥山ロープウェイ＆登山", desc: "瀬戸内海に点在する島々を見渡すパノラマ絶景。" },
        { title: "牡蠣の食べ比べ", desc: "宮島名物、焼き牡蠣を心ゆくまで。" },
        { title: "縮景園の散策", desc: "橋、鯉、茶室が織りなす箱庭のような回遊式庭園。" },
      ],
      bestTime: "春・秋がおすすめ。牡蠣のシーズンは1〜2月がピークです。",
      weather: "瀬戸内海に面した温暖で晴天の多い気候——日本でも屈指の降水量の少ない地域です。",
      travelTips: [
        "潮見表を確認しましょう——鳥居は満潮時に海に浮かび、干潮時には歩いて近づけます。",
        "京都からの新幹線で約100分、大阪からはわずか85分です。",
        "幻想的な夜の静けさを味わうため、宮島での宿泊もおすすめです。",
        "平和記念資料館は心に深く残ります。訪問後は感情を整理する時間を旅程に組み込みましょう。",
      ],
      faqs: [
        { q: "子供連れでも訪れて大丈夫ですか？", a: "はい——平和記念公園は希望を伝える場所であり、ガイドは年少の訪問者にも配慮して物語をお伝えします。宮島の鹿やロープウェイもお子様に大人気です。" },
        { q: "日帰りと宿泊、どちらがいいですか？", a: "大阪・京都からの日帰りも可能ですが、宮島での宿泊を含む旅程は、日本屈指の体験のひとつです。" },
        { q: "鳥居は満潮と干潮どちらで見るのがいいですか？", a: "どちらも美しいです——満潮時は海に浮かび、干潮時は歩いて近づけます。潮見表に合わせて訪問プランを組みます。" },
      ],
    },
  },
  {
    slug: "takayama",
    name: "Takayama & the Japanese Alps",
    region: "Gifu",
    tagline: "Edo-era streets, thatched villages, and mountain air",
    description: [
      "In the folds of the Japanese Alps, Takayama preserves an old Japan that the big cities have largely lost: dark-timbered merchant houses, morning markets along the river, sake breweries marked by cedar balls hanging over their doors.",
      "Nearby, the UNESCO-listed village of Shirakawa-go raises its steep thatched roofs against the mountains — buried in snow in winter, ringed by green rice paddies in summer.",
    ],
    image: takayamaImg,
    highlights: ["Sanmachi old town streets", "Shirakawa-go thatched village", "Miyagawa morning market", "Hida beef sushi", "Sake brewery tastings", "Festival float museum"],
    thingsToDo: [
      { title: "Old town sake crawl", desc: "Six centuries-old breweries within three wooden streets." },
      { title: "Shirakawa-go day trip", desc: "Gassho-zukuri farmhouses and the viewpoint above the valley." },
      { title: "Hida beef everything", desc: "Sushi, skewers and steak — Japan's secret rival to Kobe." },
      { title: "Morning market stroll", desc: "Pickles, crafts and mountain vegetables along the Miyagawa river." },
      { title: "Festival float museum", desc: "Gilded yatai floats from one of Japan's three great festivals." },
      { title: "Hida folk village", desc: "An open-air museum of relocated alpine farmhouses." },
    ],
    bestTime: "April for the spring festival; January–February for snow-covered Shirakawa-go.",
    weather: "Mountain climate — expect snow December to March and cool, crisp evenings year-round.",
    travelTips: [
      "The scenic Hida Limited Express from Nagoya is part of the experience — sit on the right side northbound.",
      "Shirakawa-go's winter light-up nights sell out months ahead; ask us early.",
      "Takayama pairs perfectly with Kanazawa for a 2-3 day alpine route.",
      "Try the street-food Hida beef sushi served on a rice cracker.",
    ],
    faqs: [
      { q: "Is Takayama worth adding to a first trip?", a: "If you have 10+ days, absolutely — it adds a rural, alpine dimension that Tokyo–Kyoto–Osaka can't give you." },
      { q: "Can I visit Shirakawa-go without a car?", a: "Yes — regular buses run from Takayama in 50 minutes, and we can arrange a private driver for flexibility." },
      { q: "When is the Takayama Festival?", a: "Twice a year: mid-April and early October. It's spectacular — and accommodation books out nearly a year ahead." },
    ],
    relatedTours: ["private-japan-golden-route", "autumn-colours-tour", "luxury-ryokan-escape"],
    ja: {
      name: "高山・日本アルプス",
      region: "岐阜",
      tagline: "江戸時代の町並みと茅葺きの村、澄んだ山の空気",
      description: [
        "日本アルプスの懐に抱かれた高山には、大都市がすでに失ってしまった古き良き日本の姿が残っています。黒く重厚な商家、川沿いの朝市、軒先に杉玉を吊るした造り酒屋。",
        "近郊には世界遺産の白川郷があり、急勾配の茅葺き屋根が山々を背に立ち並びます。冬は雪に埋もれ、夏は青々とした田んぼに囲まれます。",
      ],
      highlights: ["三町の古い町並み", "白川郷の合掌造り集落", "宮川の朝市", "飛騨牛寿司", "酒蔵の利き酒", "高山祭屋台会館"],
      thingsToDo: [
        { title: "古い町並みの酒蔵めぐり", desc: "木造の三本の通りに軒を連ねる、数百年の歴史を持つ酒蔵。" },
        { title: "白川郷への日帰り旅", desc: "合掌造りの家々と、谷を見下ろす展望台。" },
        { title: "飛騨牛づくし", desc: "寿司、串焼き、ステーキ——神戸牛に並ぶ日本の隠れた名品。" },
        { title: "朝市散策", desc: "宮川沿いに並ぶ漬物、工芸品、山の幸を巡ります。" },
        { title: "高山祭屋台会館", desc: "日本三大祭のひとつを彩る、豪華絢爛な屋台を展示。" },
        { title: "飛騨の里", desc: "移築された山間の古民家が並ぶ野外博物館。" },
      ],
      bestTime: "春祭りが行われる4月、白川郷が雪化粧する1〜2月がおすすめです。",
      weather: "山岳気候——12月から3月にかけて積雪があり、一年を通して夜は冷え込みます。",
      travelTips: [
        "名古屋からの特急「ひだ」の車窓も旅の一部です——北上時は進行方向右側の席がおすすめです。",
        "白川郷の冬季ライトアップは数ヶ月前に予約が埋まるため、早めにご相談ください。",
        "高山は金沢と組み合わせて2〜3日のアルプス周遊ルートにするのが最適です。",
        "せんべいに挟んだ飛騨牛寿司の食べ歩きもぜひお試しください。",
      ],
      faqs: [
        { q: "初めての日本旅行に高山を加える価値はありますか？", a: "10日以上の旅程であれば間違いなくおすすめです。東京・京都・大阪では味わえない、山あいの農村的な魅力が加わります。" },
        { q: "車がなくても白川郷に行けますか？", a: "はい——高山から定期バスで50分ほどです。自由度を高めるための貸切ドライバーの手配も可能です。" },
        { q: "高山祭はいつ開催されますか？", a: "年に2回、4月中旬と10月上旬に開催されます。非常に見応えがあり、宿泊施設はほぼ1年前から予約で埋まります。" },
      ],
    },
  },
];

export const getDestination = (slug: string) => DESTINATIONS.find((d) => d.slug === slug);

export function localizeDestination(d: Destination, locale: Locale): Destination {
  if (locale === "en") return d;
  return { ...d, ...d.ja };
}

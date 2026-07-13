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
export interface Destination {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string[];
  image: string;
  highlights: string[];
  thingsToDo: { title: string; desc: string }[];
  bestTime: string;
  weather: string;
  travelTips: string[];
  faqs: { q: string; a: string }[];
  relatedTours: string[];
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
  },
];

export const getDestination = (slug: string) => DESTINATIONS.find((d) => d.slug === slug);

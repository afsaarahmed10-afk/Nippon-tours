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
export type TourCategory = "Private" | "Group" | "Luxury" | "Seasonal";

export interface Tour {
  slug: string;
  title: string;
  category: TourCategory;
  days: number;
  price: number;
  groupSize: string;
  rating: number;
  reviews: number;
  summary: string;
  image: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  includes: string[];
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
  },
];

export const getTour = (slug: string) => TOURS.find((t) => t.slug === slug);
export const toursByCategory = (cat: TourCategory) => TOURS.filter((t) => t.category === cat);

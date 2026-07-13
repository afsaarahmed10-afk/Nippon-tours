import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;
import foodImgAsset from "@/assets/tour-food.jpg";
const foodImg = foodImgAsset;
import takayamaImgAsset from "@/assets/dest-takayama.jpg";
const takayamaImg = takayamaImgAsset;
import sakuraImgAsset from "@/assets/tour-sakura.jpg";
const sakuraImg = sakuraImgAsset;
import ryokanImgAsset from "@/assets/tour-ryokan.jpg";
const ryokanImg = ryokanImgAsset;
import osakaImgAsset from "@/assets/dest-osaka.jpg";
const osakaImg = osakaImgAsset;
export const BLOG_CATEGORIES = [
  "Culture",
  "Food",
  "Guides",
  "Hidden Gems",
  "Festivals",
  "Seasonal Travel",
  "Luxury",
  "Transportation",
] as const;

export interface Post {
  slug: string;
  title: string;
  category: (typeof BLOG_CATEGORIES)[number];
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
  sections: { h2: string; body: string[] }[];
}

export const POSTS: Post[] = [
  {
    slug: "etiquette-rules-locals-wish-you-knew",
    title: "12 Japanese Etiquette Rules Locals Wish You Knew",
    category: "Culture",
    date: "2026-06-18",
    excerpt: "From chopstick taboos to onsen manners — the small courtesies that unlock a warmer welcome everywhere in Japan.",
    image: kyotoImg,
    readTime: "6 min read",
    sections: [
      {
        h2: "The ones that really matter",
        body: [
          "Don't stick chopsticks upright in rice (it echoes a funeral rite) and never pass food chopstick-to-chopstick. Queue precisely — for trains, elevators, everything. Keep phone calls off trains entirely; texting is fine, talking is not. And carry a small bag for your rubbish, because public bins are famously rare.",
          "In onsen: wash thoroughly before entering the bath, keep your small towel out of the water, and ease in quietly. Nobody is looking at you — the bath is a place of collective, comfortable silence.",
        ],
      },
      {
        h2: "The ones that earn smiles",
        body: [
          "Hand cash and cards with two hands or use the small tray by the till. Say 'gochisousama deshita' after a meal — watch the chef light up. Take shoes off decisively where floors change level, and step out of them facing the door like you've done it forever.",
          "None of this is a test. Japanese people forgive visitors almost everything — but the traveller who tries earns a different, warmer Japan. Our guides coach you through all of it naturally on day one.",
        ],
      },
    ],
  },
  {
    slug: "tokyo-ramen-guide",
    title: "A Ramen Lover's Guide to Tokyo: 7 Bowls Worth Flying For",
    category: "Food",
    date: "2026-05-30",
    excerpt: "Shoyu, tonkotsu, tsukemen and the 4am bowl that changed our founder's life — where to slurp in the ramen capital of Earth.",
    image: foodImg,
    readTime: "7 min read",
    sections: [
      {
        h2: "How to order like you've been before",
        body: [
          "Most great ramen shops use a ticket machine by the door: pay, press, hand the ticket over the counter. Slurping is correct — it cools the noodles and signals enjoyment. Finish within 20 minutes-ish; ramen shops are theatres of turnover, and lingering over an empty bowl is the only real faux pas.",
        ],
      },
      {
        h2: "The bowls to hunt",
        body: [
          "Start with a refined Tokyo shoyu (clear soy broth, springy noodles) in Ginza. Go rich with a tonkotsu in Shinjuku after midnight. Try tsukemen — thick noodles dipped into an intense separate broth — in Ikebukuro, where the style was born. Finish with a miso bowl loaded with corn and butter, Sapporo-style, when the weather turns.",
          "On our Food Odyssey tour we do a ramen 'tasting flight' — three half bowls, three styles, one afternoon. It ruins supermarket ramen for life. You've been warned.",
        ],
      },
    ],
  },
  {
    slug: "hidden-gems-kansai",
    title: "Beyond Kyoto: 8 Hidden Gems of the Kansai Region",
    category: "Hidden Gems",
    date: "2026-05-12",
    excerpt: "Tea fields of Wazuka, the cliff temple of Mount Shosha, Kurashiki's canal quarter — Kansai beyond the crowds.",
    image: takayamaImg,
    readTime: "6 min read",
    sections: [
      {
        h2: "An hour from the crowds",
        body: [
          "Wazuka's tea terraces roll like green corduroy 40 minutes from Uji, and you can pick and steam leaves with the farmers. Mount Shosha near Himeji hides Engyo-ji, the mountaintop temple from The Last Samurai, reached by ropeway and forest path. Omihachiman's moat district floats you past Edo-era storehouses in a hand-poled boat.",
        ],
      },
      {
        h2: "Worth a detour",
        body: [
          "Kurashiki's Bikan quarter is a canal-side dream of white walls and willows. Yoshino in spring is a whole mountain of cherry trees — 30,000 of them. Koyasan lets you sleep in a temple and join the monks' 6am service; the Okunoin cemetery walk at dusk, lanterns among 200,000 mossy graves, may be the most atmospheric hour in Japan.",
          "These places don't fit a checklist trip. They fit a custom one — which is rather the point of what we do.",
        ],
      },
    ],
  },
  {
    slug: "japan-festival-calendar",
    title: "Japan's Greatest Festivals: A Month-by-Month Matsuri Calendar",
    category: "Festivals",
    date: "2026-04-22",
    excerpt: "Fire-lit mountains, six-tonne floats, dancing streets — time your trip to Japan's most spectacular matsuri.",
    image: osakaImg,
    readTime: "8 min read",
    sections: [
      {
        h2: "The big three",
        body: [
          "Kyoto's Gion Matsuri (July) parades nine-metre floats through the old capital all month. Osaka's Tenjin Matsuri (late July) ends with a river procession of fire-lit boats and fireworks. Tokyo's Kanda Matsuri (May, odd years) floods the streets around Akihabara with a hundred portable shrines.",
        ],
      },
      {
        h2: "The connoisseur's picks",
        body: [
          "Aomori's Nebuta (early August) is the most visually stunning: colossal illuminated warriors rolling through the night while dancers chant. Takayama's spring and autumn festivals bring gilded floats and marionettes to a mountain town — intimate, ancient, unmissable. Nagasaki Kunchi (October) mixes dragon dances with 400 years of international port culture.",
          "Festival dates fix hotel prices months out. If a matsuri is on your list, tell us early and we'll lock rooms before the surge.",
        ],
      },
    ],
  },
  {
    slug: "first-ryokan-stay-guide",
    title: "Your First Ryokan Stay: What to Expect (and Love)",
    category: "Luxury",
    date: "2026-03-28",
    excerpt: "Kaiseki, futons, yukata and the art of doing nothing beautifully — a first-timer's guide to Japan's traditional inns.",
    image: ryokanImg,
    readTime: "5 min read",
    sections: [
      {
        h2: "The rhythm of a ryokan evening",
        body: [
          "Arrive by late afternoon — that's not a rule so much as advice, because the evening is the point. Tea and a sweet appear as you settle in. You change into your yukata (left side over right), soak in the onsen before dinner, then return to a room transformed: course after course of kaiseki, each dish a small seasonal argument for being alive.",
          "While you eat breakfast the next morning, your futon vanishes. It's a little like being cared for by extremely polite magicians.",
        ],
      },
      {
        h2: "Choosing well",
        body: [
          "The gap between an ordinary ryokan and a great one is enormous, and photos online rarely tell the truth. We've slept in, eaten at and inspected the ones we book — from Hakone lakeside classics to Kyoto machiya conversions. Tell us your budget and we'll place you where the experience matches the price.",
        ],
      },
    ],
  },
  {
    slug: "sakura-forecast-explained",
    title: "How the Cherry Blossom Forecast Works (and How We Use It)",
    category: "Seasonal Travel",
    date: "2026-02-14",
    excerpt: "Kaika, mankai and the blossom front — how sakura forecasting works and how flexible routing gets you under peak bloom.",
    image: sakuraImg,
    readTime: "5 min read",
    sections: [
      {
        h2: "Kaika, mankai and the moving front",
        body: [
          "Japanese forecasters track two dates per city: kaika (first blossoms) and mankai (full bloom), which follows five to seven days later. The 'blossom front' moves north over six weeks — Fukuoka and Tokyo usually in late March, Kyoto in early April, Sapporo not until May. Peak viewing lasts barely a week per city, and one warm weekend can shift everything.",
        ],
      },
      {
        h2: "How we engineer serendipity",
        body: [
          "You can't control the bloom, but you can plan for its uncertainty. Our sakura tours keep two days deliberately flexible: if Kyoto peaks early, we swap days with Osaka; if Tokyo runs late, we chase blossoms to a river valley an hour away. Guests think they got lucky. Luck had help.",
          "Booking tip: aim for March 25–April 5 in the Tokyo–Kyoto corridor and reserve hotels by November. Or let us hold the room and do the worrying.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

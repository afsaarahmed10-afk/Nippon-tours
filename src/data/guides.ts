import sakuraImgAsset from "@/assets/tour-sakura.jpg";
const sakuraImg = sakuraImgAsset;
import heroFujiAsset from "@/assets/hero-fuji.jpg";
const heroFuji = heroFujiAsset;
import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
const tokyoImg = tokyoImgAsset;
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
const kyotoImg = kyotoImgAsset;
import takayamaImgAsset from "@/assets/dest-takayama.jpg";
const takayamaImg = takayamaImgAsset;
import foodImgAsset from "@/assets/tour-food.jpg";
const foodImg = foodImgAsset;
export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  readTime: string;
  image: string;
  sections: { h2: string; body: string[] }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "best-time-to-visit-japan",
    title: "Best Time to Visit Japan: A Month-by-Month Guide",
    metaTitle: "Best Time to Visit Japan (Month-by-Month) — Nippon Tours",
    description: "Cherry blossoms, autumn leaves, festivals and snow — when to visit Japan for the experience you want, month by month.",
    readTime: "8 min read",
    image: sakuraImg,
    sections: [
      {
        h2: "The short answer",
        body: [
          "Late March to early April (cherry blossoms) and November (autumn leaves) are Japan's most spectacular — and most crowded — windows. May and October offer nearly as much beauty with fewer people. Winter means snow monkeys, powder skiing and the clearest Mount Fuji views; summer brings festivals and fireworks, but also heat and humidity.",
        ],
      },
      {
        h2: "Spring (March–May): sakura season",
        body: [
          "The blossom front sweeps from Kyushu in late March to Hokkaido in early May. Tokyo and Kyoto typically peak in the last week of March through the first week of April — but it shifts every year, which is why our seasonal tours track the forecast daily and keep routing flexible.",
          "Book hotels 4–6 months ahead for sakura season. May, after Golden Week, is one of Japan's best-kept secrets: perfect weather, green landscapes and thinner crowds.",
        ],
      },
      {
        h2: "Summer (June–August): festivals and fireworks",
        body: [
          "June brings the rainy season (and glowing hydrangea temples). July and August are hot and humid, but reward you with Japan's great festivals — Kyoto's Gion Matsuri, Aomori's Nebuta — plus fireworks over rivers and beer gardens on rooftops. Head to Hokkaido or the Japanese Alps to escape the heat.",
        ],
      },
      {
        h2: "Autumn (September–November): the crimson wave",
        body: [
          "Autumn colour flows in reverse — north to south — peaking in Tokyo and Kyoto in mid-to-late November. Kyoto's temple gardens under crimson maples are arguably more beautiful than sakura season, and evening illuminations turn them surreal.",
        ],
      },
      {
        h2: "Winter (December–February): snow and clarity",
        body: [
          "Crisp blue skies give winter the best Mount Fuji visibility of the year. Add snow monkeys bathing in Nagano's hot springs, world-class powder in Hokkaido, and Shirakawa-go's thatched village under deep snow — plus the lowest hotel prices outside New Year.",
        ],
      },
      {
        h2: "Our recommendation",
        body: [
          "First trip? Aim for late March–early April or November if you can book early enough; otherwise May or October. Tell us your dates and we'll design around whatever Japan is doing that month — every season here has a masterpiece to show you.",
        ],
      },
    ],
  },
  {
    slug: "japan-visa-guide",
    title: "Japan Visa Guide: Who Needs One and How to Apply",
    metaTitle: "Japan Visa Guide 2026: Requirements & Visa-Free Entry — Nippon Tours",
    description: "Check if you need a visa for Japan, how the visa-free program works, and what documents to prepare before your trip.",
    readTime: "6 min read",
    image: heroFuji,
    sections: [
      {
        h2: "Visa-free entry: most travellers qualify",
        body: [
          "Citizens of 70+ countries and regions — including the United States, United Kingdom, EU member states, Canada, Australia, New Zealand and Singapore — can enter Japan without a visa for short-term tourism, typically up to 90 days. You'll simply need a passport valid for the duration of your stay and an onward or return ticket.",
        ],
      },
      {
        h2: "Visit Japan Web: do this before you fly",
        body: [
          "Japan streamlines arrival through Visit Japan Web, where you pre-register your immigration and customs details and receive QR codes to scan on arrival. It's free, takes about 15 minutes, and can save you a long queue at the airport. We send all our guests a step-by-step walkthrough before departure.",
        ],
      },
      {
        h2: "If you do need a visa",
        body: [
          "Travellers from countries outside the exemption list apply through their nearest Japanese embassy or consulate. You'll generally need a passport, application form, photo, proof of funds, flight itinerary and a day-by-day schedule of your stay — which we provide for all confirmed bookings, along with hotel confirmations.",
          "Processing usually takes 5–10 working days, but apply at least a month ahead to be safe.",
        ],
      },
      {
        h2: "How we help",
        body: [
          "Every Nippon Tours booking includes the documents consulates ask for: a detailed itinerary, accommodation list and booking confirmation. Unsure about your situation? Message us your nationality and travel dates and we'll confirm exactly what you need — it's part of the free consultation.",
        ],
      },
    ],
  },
  {
    slug: "jr-pass-guide",
    title: "JR Pass Guide: Is It Still Worth It?",
    metaTitle: "JR Pass Guide 2026: Prices, Rules & Alternatives — Nippon Tours",
    description: "How the Japan Rail Pass works after the price increase, when it saves money, and the regional passes that often beat it.",
    readTime: "7 min read",
    image: takayamaImg,
    sections: [
      {
        h2: "What the JR Pass is",
        body: [
          "The Japan Rail Pass gives unlimited travel on JR trains nationwide — including most shinkansen — for 7, 14 or 21 consecutive days. Since the 2023 price rise (7 days now ¥50,000), it's no longer the automatic bargain it once was, and whether it pays off depends entirely on your route.",
        ],
      },
      {
        h2: "When it's worth it",
        body: [
          "Rule of thumb: a Tokyo–Kyoto round trip alone costs about ¥28,000. If your 7-day window includes Tokyo → Kyoto → Hiroshima → Tokyo, or extensive travel to the Alps or Tohoku, the pass usually wins. A simple one-way Golden Route (Tokyo → Hakone → Kyoto → Osaka) is almost always cheaper with individual tickets.",
        ],
      },
      {
        h2: "Regional passes: the smarter buy",
        body: [
          "Regional passes are often outstanding value: the JR Kansai Wide Pass, Hokuriku Arch Pass and Tokyo Wide Pass cover popular circuits for a fraction of the national pass price. Many are only available to foreign visitors and can include areas the national pass covers awkwardly.",
        ],
      },
      {
        h2: "Let us do the maths",
        body: [
          "When you book with us, we cost out your exact route both ways — pass versus point-to-point — and simply book whichever is cheaper. Rail logistics, seat reservations and luggage forwarding are all handled, so you never queue at a ticket machine wondering if you've overpaid.",
        ],
      },
    ],
  },
  {
    slug: "7-day-japan-itinerary",
    title: "The Perfect 7-Day Japan Itinerary for First-Timers",
    metaTitle: "7-Day Japan Itinerary: Tokyo, Hakone, Kyoto & Osaka — Nippon Tours",
    description: "A proven one-week Japan route: Tokyo's energy, Hakone's onsen, Kyoto's temples and Osaka's food — day by day.",
    readTime: "10 min read",
    image: kyotoImg,
    sections: [
      {
        h2: "The route at a glance",
        body: [
          "Tokyo (3 nights) → Hakone (1 night) → Kyoto (2 nights) → Osaka (1 night). This 'Golden Route' exists for a reason: maximum contrast — futuristic capital, hot-spring mountains, ancient temples, street-food chaos — with minimal backtracking, all connected by comfortable trains.",
        ],
      },
      {
        h2: "Days 1–3: Tokyo",
        body: [
          "Day 1: land, drop bags, and ease in with Asakusa's Senso-ji temple and a riverside dinner. Day 2: the classics — Meiji Shrine, Harajuku, Shibuya Crossing at dusk. Day 3: your choice of deep-dive: TeamLab's digital art, a Tsukiji sushi breakfast, or a day trip to Kamakura's Great Buddha.",
        ],
      },
      {
        h2: "Day 4: Hakone",
        body: [
          "Ninety minutes from Tokyo, swap skyscrapers for steam. Do the classic loop — pirate ship across Lake Ashi, ropeway over the volcanic valley — then check into a ryokan for the night every guest calls their favourite: kaiseki dinner, yukata robes, and an open-air onsen under the stars.",
        ],
      },
      {
        h2: "Days 5–6: Kyoto",
        body: [
          "Day 5: Fushimi Inari's torii gates early (7am changes everything), then Kiyomizu-dera and the lantern-lit lanes of Gion. Day 6: Arashiyama's bamboo grove, the Golden Pavilion, and a tea ceremony — with an evening stroll along Pontocho alley.",
        ],
      },
      {
        h2: "Day 7: Osaka",
        body: [
          "Thirty minutes by train and a world apart. Osaka Castle in the morning, Kuromon Market for lunch, then the full Dotonbori experience by neon light. Fly out of Kansai Airport, or shinkansen back to Tokyo in under three hours.",
        ],
      },
      {
        h2: "Make it yours",
        body: [
          "This skeleton flexes beautifully: add Nara's deer as a half-day, swap Osaka for Hiroshima and Miyajima, or stretch to 10 days with Takayama and the Alps. Tell us what excites you and we'll shape it — that's exactly what our free consultation is for.",
        ],
      },
    ],
  },
  {
    slug: "things-to-do-in-japan",
    title: "25 Unforgettable Things to Do in Japan",
    metaTitle: "25 Best Things to Do in Japan (2026) — Nippon Tours",
    description: "From sushi breakfasts and onsen nights to snow monkeys and island torii — the experiences that define a trip to Japan.",
    readTime: "9 min read",
    image: tokyoImg,
    sections: [
      {
        h2: "The icons (worth every bit of the hype)",
        body: [
          "Stand in the middle of Shibuya Crossing. Walk the 10,000 torii of Fushimi Inari at dawn. Watch Mount Fuji appear behind Hakone's lake torii. Ride the shinkansen at 285 km/h with an ekiben lunch box. See the floating gate of Miyajima at high tide. These are famous because they're genuinely extraordinary.",
        ],
      },
      {
        h2: "The rituals",
        body: [
          "Sleep on tatami in a ryokan and let an attendant serve kaiseki in your room. Soak in an open-air onsen while snow falls. Sit through a real tea ceremony and understand why every movement matters. Make a wish at a shrine — bow twice, clap twice, bow once.",
        ],
      },
      {
        h2: "The flavours",
        body: [
          "Eat a sushi breakfast at Tsukiji. Slurp ramen at a vending-machine counter shop. Try Hida beef sushi on a rice cracker in Takayama, okonomiyaki in Hiroshima, takoyaki in Osaka. Do a sake tasting in a 300-year-old brewery. Trust a chef with omakase at least once.",
        ],
      },
      {
        h2: "The seasonal one-offs",
        body: [
          "Picnic under peak cherry blossoms. Watch snow monkeys bathe in Nagano's hot springs. See Kyoto's maple gardens lit at night in November. Dance at a summer matsuri in a yukata as fireworks crack over the river.",
        ],
      },
      {
        h2: "The ones nobody tells you about",
        body: [
          "Send your luggage ahead by takkyubin and travel with a daypack. Visit a sento (neighbourhood bathhouse) with a local. Browse a depachika food hall until you can't decide. Stay up in Golden Gai's four-seat bars talking to strangers. Ride a local line with no destination at all.",
          "Want all of this woven into one trip? That's our job — tell us which of these made your heart beat faster and we'll build around them.",
        ],
      },
    ],
  },
  {
    slug: "japan-budget-guide",
    title: "Japan Trip Cost: A Realistic Budget Guide",
    metaTitle: "How Much Does a Japan Trip Cost? Budget Guide — Nippon Tours",
    description: "Real numbers for hotels, food, transport and tours in Japan — plus where to save and where it's worth spending more.",
    readTime: "8 min read",
    image: foodImg,
    sections: [
      {
        h2: "The headline numbers",
        body: [
          "Per person per day, excluding flights: budget travellers manage on ¥12,000–18,000 (≈ $80–120), mid-range comfort runs ¥25,000–40,000 (≈ $170–270), and premium travel with 4–5 star hotels and private guiding starts around ¥60,000 (≈ $400). The weak yen has made Japan better value than most of Western Europe.",
        ],
      },
      {
        h2: "Where Japan is surprisingly cheap",
        body: [
          "Food is the great bargain: a superb ramen is ¥1,000, a convenience-store breakfast ¥500, and even quality sushi sets are ¥2,000–3,000. City transit is inexpensive, museums rarely exceed ¥2,000, and temples charge ¥300–600. Free things — shrines, gardens, entire neighbourhoods — fill half a good itinerary.",
        ],
      },
      {
        h2: "Where it's worth spending",
        body: [
          "One ryokan night with kaiseki dinner (¥30,000–80,000 per person) will outshine five ordinary hotel nights in your memory. A private guide on day one pays for itself in navigation confidence for the rest of the trip. Peak-season Kyoto hotels are expensive because they're worth it — location determines how much of Kyoto you actually see.",
        ],
      },
      {
        h2: "How we keep pricing honest",
        body: [
          "Every Nippon Tours quote is itemised — hotels, rail, guides, experiences — with no hidden margins on top. Tell us your total budget in the free consultation and we'll show you exactly what it buys, and where a small shift creates outsized value.",
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

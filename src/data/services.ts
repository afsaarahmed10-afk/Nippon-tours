// Marketing content for service pages. Copy-only, no schema/DB —
// admin manages tours/destinations/blog separately.
import heroFujiAsset from "@/assets/hero-fuji.jpg";
import ryokanImgAsset from "@/assets/tour-ryokan.jpg";
import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
import kyotoImgAsset from "@/assets/dest-kyoto.jpg";
import foodImgAsset from "@/assets/tour-food.jpg";
import autumnImgAsset from "@/assets/tour-autumn.jpg";
import sakuraImgAsset from "@/assets/tour-sakura.jpg";
import guideTeamAsset from "@/assets/guide-team.jpg";
import hakoneAsset from "@/assets/dest-hakone.jpg";
import takayamaAsset from "@/assets/dest-takayama.jpg";

export interface ServicePage {
  slug: string;
  category:
    | "Travel"
    | "Business"
    | "Transport"
    | "Concierge";
  name: string;
  short: string;          // used in nav / cards
  hero: string;
  headline: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  includes: string[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
}

export const SERVICES: ServicePage[] = [
  {
    slug: "fit-travel",
    category: "Travel",
    name: "FIT (Free Independent Travellers)",
    short: "FIT Travel",
    hero: heroFujiAsset,
    headline: "Independent travel, expertly supported",
    intro: "For self-driven travellers who want the freedom of independent exploration with a licensed Japanese operator on call — hotels, rail passes, activities and 24/7 backup, without the group.",
    benefits: [
      { title: "Curated bookings", desc: "Hotels, ryokan, restaurants and experiences we've personally vetted — booked at operator rates." },
      { title: "Rail & transfer logistics", desc: "JR Pass, IC cards, shinkansen reservations, luggage forwarding and airport transfers arranged end-to-end." },
      { title: "24/7 in-country support", desc: "One WhatsApp thread, one team. Missed train, sudden closure, restaurant change — we fix it in real time." },
    ],
    includes: [
      "Personalised itinerary planning",
      "Accommodation reservations",
      "Rail pass & seat reservations",
      "Activity & restaurant bookings",
      "Airport meet-and-greet options",
      "24/7 WhatsApp concierge",
    ],
    faqs: [
      { q: "Do FIT travellers get a guide?", a: "Only when you want one — we can arrange licensed guides for specific days or cities and leave the rest completely independent." },
      { q: "Can you book Japan rail passes?", a: "Yes — JR Pass, regional passes and shinkansen seat reservations, all delivered to your first hotel or e-ticketed." },
    ],
    seoTitle: "FIT Japan Travel — Independent Travellers | Nippon Tours",
    seoDescription: "Independent Japan travel with licensed operator support — hotels, rail, transfers and 24/7 concierge for self-driven travellers.",
  },
  {
    slug: "mice",
    category: "Business",
    name: "MICE (Meetings, Incentives, Conferences, Events)",
    short: "MICE",
    hero: tokyoImgAsset,
    headline: "MICE programmes staged flawlessly in Japan",
    intro: "Meetings, incentives, conferences and events for 20 to 2,000 delegates. Venue sourcing, DMC logistics, gala dinners, cultural experiences and airport-to-podium ground handling.",
    benefits: [
      { title: "Full DMC handling", desc: "Airport, hotels, ground transport, badges, interpreters, AV, F&B — one accountable partner across every touchpoint." },
      { title: "Signature venues", desc: "Access to ryokan buyouts, temple dinners, teamLab reserves, Tokyo skyline rooftops and heritage machiya." },
      { title: "Multilingual staff", desc: "English, Japanese, Mandarin and Korean on-site coordinators for every event day." },
    ],
    includes: [
      "Venue sourcing & contracting",
      "Delegate registration support",
      "Group airport transfers & coaches",
      "Gala dinners & cultural programmes",
      "Interpreters & signage",
      "On-site production management",
    ],
    faqs: [
      { q: "What group sizes do you handle?", a: "From board offsites of 20 delegates to conferences and incentive programmes for 2,000+ people." },
      { q: "Can you handle sourcing and RFPs?", a: "Yes — we run venue and hotel RFPs across every major Japanese city and negotiate on your behalf." },
    ],
    seoTitle: "Japan MICE & Event DMC | Nippon Tours",
    seoDescription: "Japan MICE specialists — meetings, incentives, conferences and events, staged with full DMC ground handling from 20 to 2,000 delegates.",
  },
  {
    slug: "corporate-travel",
    category: "Business",
    name: "Corporate Travel",
    short: "Corporate Travel",
    hero: tokyoImgAsset,
    headline: "Corporate Japan travel, quietly reliable",
    intro: "Executive travel programmes, roadshows and site visits for global companies and delegations. Discreet drivers, business hotels, translators and same-day rebooking when plans move.",
    benefits: [
      { title: "Discreet ground handling", desc: "Suited English-speaking drivers, black executive vehicles and airport fast-track where available." },
      { title: "Business-grade hotels", desc: "Negotiated rates at The Peninsula, Aman, Palace, Park Hyatt and select business towers nationwide." },
      { title: "Meeting & roadshow support", desc: "Boardroom bookings, interpreters, printing and same-day itinerary changes handled by one account manager." },
    ],
    includes: [
      "Executive airport transfers",
      "Business-class hotel bookings",
      "Interpreters & translators",
      "Meeting-room & catering support",
      "Dedicated account manager",
      "24/7 emergency line",
    ],
    faqs: [
      { q: "Do you invoice corporate clients?", a: "Yes — we invoice in JPY, USD or EUR against a purchase order, with itemised statements suitable for expense reporting." },
      { q: "Can you handle last-minute changes?", a: "Absolutely. Rebooking a flight, rerouting a driver or moving a hotel same-day is a normal part of every corporate programme." },
    ],
    seoTitle: "Corporate Travel in Japan | Nippon Tours",
    seoDescription: "Executive corporate travel across Japan — private drivers, business hotels, interpreters and dedicated account management with 24/7 rebooking.",
  },
  {
    slug: "educational-tours",
    category: "Travel",
    name: "Educational Tours",
    short: "Educational Tours",
    hero: kyotoImgAsset,
    headline: "Educational tours across Japan",
    intro: "School, university and study-tour programmes with academic themes: history, architecture, sustainability, robotics, culinary arts and language immersion — designed with your faculty and delivered with licensed guides.",
    benefits: [
      { title: "Academic-grade programmes", desc: "Syllabus alignment with university faculties, corporate visits (Toyota, Sony, JAXA) and museum curator-led sessions." },
      { title: "Safety-first operations", desc: "Registered operator, insured coaches, roll-calls, dedicated tour leaders and 24/7 duty officer." },
      { title: "Homestays & workshops", desc: "Optional homestays, tea ceremony, calligraphy, wagashi and language exchange with local students." },
    ],
    includes: [
      "Curriculum-aligned itinerary design",
      "Group flight & rail booking",
      "Insured coaches with roll-call",
      "Licensed academic guides",
      "Homestay & campus visits",
      "24/7 in-country duty officer",
    ],
    faqs: [
      { q: "What group sizes do you accept?", a: "We run educational programmes from 15 students through to full-year groups of 200+ with sub-group leaders." },
      { q: "Do you provide risk assessments?", a: "Yes — full written risk assessments, incident-response protocols and travel insurance recommendations for your institution." },
    ],
    seoTitle: "Japan Educational Tours for Schools & Universities | Nippon Tours",
    seoDescription: "Educational tours across Japan — academic itineraries, safety-first operations, homestays and university visits for schools, colleges and universities.",
  },
  {
    slug: "family-tours",
    category: "Travel",
    name: "Family Tours",
    short: "Family Tours",
    hero: sakuraImgAsset,
    headline: "Japan family holidays, planned to your pace",
    intro: "Multi-generational trips with kids, teenagers or grandparents in tow. Family-sized rooms, connecting suites, kid-friendly guides and days built around your family's real rhythm.",
    benefits: [
      { title: "Family-sized rooms", desc: "Ryokan family rooms, connecting suites and apartments — no more four bodies in one Tokyo box." },
      { title: "Guides kids love", desc: "Sushi-making classes, ninja academies, Ghibli-inspired days and Studio Miyazaki morning starts." },
      { title: "Flexible days", desc: "Nap-friendly starts, kid-tested restaurants, private drivers for tired legs and rain-day plan Bs on standby." },
    ],
    includes: [
      "Family accommodation sourcing",
      "Kid-friendly private guides",
      "Stroller & car-seat provisioning",
      "Themed experiences (Ghibli, ninjas, sushi)",
      "Private drivers for long transfers",
      "24/7 family concierge",
    ],
    faqs: [
      { q: "Do you plan for kids of all ages?", a: "Yes — from toddler-friendly parks and interactive museums to teenage-approved anime pilgrimages and Universal Studios Japan." },
      { q: "Can grandparents keep up?", a: "We routinely design step-free days with private cars, elevators and generous rest, alongside more active family sessions." },
    ],
    seoTitle: "Japan Family Tours — Multi-generational Holidays | Nippon Tours",
    seoDescription: "Family Japan holidays planned to your pace — family-sized rooms, kid-friendly guides, flexible days and 24/7 family concierge.",
  },
  {
    slug: "airport-transfers",
    category: "Transport",
    name: "Airport Transfers",
    short: "Airport Transfers",
    hero: tokyoImgAsset,
    headline: "Airport transfers across every Japanese hub",
    intro: "Meet-and-greet, private cars and vans at Haneda, Narita, Kansai, Chubu, Fukuoka, New Chitose and every regional airport. English-speaking drivers, luggage-first vehicles, on-time or you don't pay.",
    benefits: [
      { title: "Meet-and-greet", desc: "A named greeter meets you inside arrivals with your name card — no scanning the crowd after a 12-hour flight." },
      { title: "Luggage-first vehicles", desc: "Alphard, Elgrand and Hiace vehicles that actually fit 4 travellers with 8 suitcases without playing Tetris." },
      { title: "Fixed pricing", desc: "One published price per route — no meter surprises, no peak-hour surges, no baggage add-ons." },
    ],
    includes: [
      "Meet-and-greet inside arrivals",
      "English-speaking driver",
      "Free flight tracking & 60-min wait",
      "Bottled water & Wi-Fi in vehicle",
      "Child seats on request",
      "Fixed pricing per route",
    ],
    faqs: [
      { q: "What if my flight is delayed?", a: "We track your flight in real time and hold the driver at no extra charge for up to 60 minutes past actual landing." },
      { q: "Which airports do you cover?", a: "Every major Japanese hub — Haneda, Narita, Kansai, Chubu, Fukuoka, New Chitose, Naha and regional airports on request." },
    ],
    seoTitle: "Japan Airport Transfers — Haneda, Narita, Kansai | Nippon Tours",
    seoDescription: "Private airport transfers across Japan — meet-and-greet, English-speaking drivers, luggage-first vehicles and fixed pricing per route.",
  },
  {
    slug: "chauffeur-services",
    category: "Transport",
    name: "Chauffeur Services",
    short: "Chauffeur Services",
    hero: ryokanImgAsset,
    headline: "Private chauffeur services in Japan",
    intro: "Hourly, daily and multi-day chauffeur services with English-speaking drivers and executive vehicles. Business meetings, city touring, luxury shopping days and inter-city drives.",
    benefits: [
      { title: "Executive vehicles", desc: "Alphard, Century, S-Class and Elgrand — always immaculate, always with a suited driver." },
      { title: "English-speaking drivers", desc: "Trained drivers who navigate Japan's addresses, quirks and quiet etiquette so you don't have to." },
      { title: "Flexible packages", desc: "Book by the hour for shopping in Ginza, by the day for Hakone, or multi-day across the Golden Route." },
    ],
    includes: [
      "Executive vehicle & driver",
      "Fuel, tolls, parking",
      "Bottled water & Wi-Fi",
      "Luggage handling",
      "Flexible route planning",
      "24/7 dispatch",
    ],
    faqs: [
      { q: "Can drivers guide us?", a: "Drivers are not licensed guides — for guiding we pair them with a licensed national guide. Many guests book both together." },
      { q: "Do you have hourly minimums?", a: "Yes — a 3-hour minimum for hourly bookings, or a 10-hour day for full-day charters." },
    ],
    seoTitle: "Private Chauffeur Services in Japan | Nippon Tours",
    seoDescription: "Executive chauffeur services across Japan — English-speaking drivers, Alphard and S-Class vehicles, hourly and daily packages.",
  },
  {
    slug: "car-rental",
    category: "Transport",
    name: "Car Rental",
    short: "Car Rental",
    hero: hakoneAsset,
    headline: "Self-drive car rental across Japan",
    intro: "Self-drive rentals with English GPS, insurance and 24/7 roadside assistance. Compact cars for Kyushu backroads, family SUVs for Hokkaido and premium sedans for the Golden Route.",
    benefits: [
      { title: "English GPS & signage help", desc: "Every car set up in English, plus a printed cheat-sheet for petrol stations, tolls and rural signage." },
      { title: "Full insurance included", desc: "Zero-excess damage waiver on every vehicle — drive without worrying about kerbs or narrow country lanes." },
      { title: "One-way across regions", desc: "Pick up in Tokyo, drop in Osaka. Fukuoka to Kagoshima. Sapporo to Otaru. We handle the drop fee negotiation." },
    ],
    includes: [
      "Full insurance & CDW",
      "English GPS & road signage guide",
      "Unlimited kilometres",
      "24/7 English roadside help",
      "Child seats on request",
      "International Driving Permit guidance",
    ],
    faqs: [
      { q: "Do I need an International Driving Permit?", a: "Yes — most non-Japanese licence holders need a 1949 Geneva Convention IDP, obtained in your home country before travel." },
      { q: "Can I rent one-way?", a: "Yes — most inter-city one-ways are available with a modest drop fee we quote upfront." },
    ],
    seoTitle: "Japan Self-Drive Car Rental | Nippon Tours",
    seoDescription: "Self-drive car rental across Japan — English GPS, full insurance, 24/7 roadside support and one-way rentals between regions.",
  },
  {
    slug: "hotel-reservations",
    category: "Concierge",
    name: "Hotel Reservations",
    short: "Hotel Reservations",
    hero: ryokanImgAsset,
    headline: "Hotel & ryokan reservations across Japan",
    intro: "From Tokyo's Aman and Bulgari to a private-onsen ryokan in Hakone. We hold operator relationships, negotiate rates, secure upgrades and place you in the right room, not just the right hotel.",
    benefits: [
      { title: "The right room, not the right hotel", desc: "We know which side of the corridor overlooks the courtyard and which suite has the balcony that faces Fuji." },
      { title: "Negotiated rates & upgrades", desc: "Operator rates at 400+ properties, plus complimentary upgrades and amenities where possible." },
      { title: "Ryokan curation", desc: "Real onsen, real kaiseki, real hospitality — never the tourist-menu shortcuts." },
    ],
    includes: [
      "Hotel & ryokan selection",
      "Operator-rate bookings",
      "Room-view guidance",
      "Kaiseki dining reservations",
      "Special-occasion arrangements",
      "Amenities & upgrade requests",
    ],
    faqs: [
      { q: "Can you book non-tour hotel stays?", a: "Yes — hotel-only bookings are welcome, especially for repeat guests and referrals." },
      { q: "Do you charge markup on hotels?", a: "We disclose our booking fee upfront — usually a flat per-night handling fee, offset by upgrades and amenities we secure." },
    ],
    seoTitle: "Hotel & Ryokan Reservations in Japan | Nippon Tours",
    seoDescription: "Hotel and ryokan reservations across Japan — operator rates, upgrades and curated ryokan with real onsen and kaiseki.",
  },
  {
    slug: "restaurant-reservations",
    category: "Concierge",
    name: "Restaurant Reservations",
    short: "Restaurant Reservations",
    hero: foodImgAsset,
    headline: "Restaurant reservations only insiders can secure",
    intro: "Michelin sushi, kaiseki counters, hidden yakitori and Kyoto tea-houses that don't take foreign bookings — we hold the phone numbers and the relationships.",
    benefits: [
      { title: "Reserved for members only", desc: "Counter seats at 3-Michelin sushi, kappo tables in Gion and yakitori masters who reserve for locals only." },
      { title: "Dietary sensitivity", desc: "Vegetarian, vegan, halal, gluten-free and allergy-aware kaiseki briefed to the chef in advance." },
      { title: "Table timing", desc: "We choreograph your dinner around the temple you're watching sunset from, not the other way around." },
    ],
    includes: [
      "Reservation & confirmation",
      "Dietary briefing to chef",
      "Menu translation on request",
      "Transport arrangement",
      "Same-day change support",
    ],
    faqs: [
      { q: "Can you get us into 3-Michelin sushi?", a: "Sometimes — availability is tight and demands months of notice. We're honest about what's achievable when you enquire." },
      { q: "Do you charge for restaurant bookings?", a: "There's a modest concierge fee per booking, higher for hard-to-secure counters. Disclosed upfront." },
    ],
    seoTitle: "Japan Restaurant Reservations & Concierge | Nippon Tours",
    seoDescription: "Restaurant reservations across Japan — Michelin sushi, kaiseki counters, hidden yakitori and Kyoto tea-houses secured by local insiders.",
  },
  {
    slug: "custom-itineraries",
    category: "Travel",
    name: "Custom Itineraries",
    short: "Custom Itineraries",
    hero: takayamaAsset,
    headline: "Fully custom Japan itineraries",
    intro: "Not a package. A tailor-made itinerary designed around your dates, pace, budget and obsessions — proposed within 48 hours and refined until it's yours.",
    benefits: [
      { title: "Designed around you", desc: "We ask ten real questions, then design an itinerary specific to your interests — food, art, hiking, anime, sake, spirituality." },
      { title: "Free proposal", desc: "First draft within 48 hours at no cost. Two rounds of revisions included before you commit." },
      { title: "Transparent quoting", desc: "Every hotel, guide day, transfer and activity itemised. You know exactly what you're paying for." },
    ],
    includes: [
      "Discovery consultation",
      "Draft itinerary within 48 hours",
      "Two revision rounds",
      "Line-item quotation",
      "Booking & payment handling",
      "24/7 in-country support",
    ],
    faqs: [
      { q: "Is the proposal really free?", a: "Yes — the first draft and two revision rounds are entirely free, with no obligation to book." },
      { q: "How long does planning take?", a: "First draft within 48 hours; most guests confirm within 2–3 weeks after refinement." },
    ],
    seoTitle: "Custom Japan Itineraries — Tailor-Made | Nippon Tours",
    seoDescription: "Fully custom Japan itineraries designed around your dates, pace, budget and interests. Free proposal within 48 hours.",
  },
  {
    slug: "concierge-services",
    category: "Concierge",
    name: "Concierge Services",
    short: "Concierge",
    hero: guideTeamAsset,
    headline: "In-country concierge, on WhatsApp",
    intro: "One WhatsApp thread, one team, entire trip. Restaurant swaps, doctor visits, tailored surprises, sudden weather Plan Bs — all handled in real time by a Japan-based team.",
    benefits: [
      { title: "24/7 WhatsApp", desc: "One number, human responses within minutes during your entire stay in Japan." },
      { title: "Surprise & delight", desc: "Birthday cakes at your ryokan, cherry-blossom picnic sets, hidden late-night bars, tickets that just opened up." },
      { title: "Problem-solving", desc: "Lost luggage, missed shinkansen, pharmacy runs, English-speaking doctor — solved same-day." },
    ],
    includes: [
      "Dedicated concierge manager",
      "24/7 WhatsApp response",
      "Restaurant & activity changes",
      "Special occasion planning",
      "Medical & practical help",
      "Post-trip follow-up",
    ],
    faqs: [
      { q: "Is concierge included with tours?", a: "Yes — every booked itinerary comes with in-country concierge for the full duration of your Japan trip." },
      { q: "Can non-tour guests hire concierge?", a: "Yes — standalone concierge packages are available by the day or week for independent travellers." },
    ],
    seoTitle: "Japan Concierge Services — 24/7 WhatsApp | Nippon Tours",
    seoDescription: "In-country Japan concierge on WhatsApp — restaurant swaps, surprise planning, medical help and problem-solving 24/7.",
  },
  {
    slug: "local-experiences",
    category: "Concierge",
    name: "Local Experiences",
    short: "Local Experiences",
    hero: autumnImgAsset,
    headline: "Local experiences money can't usually buy",
    intro: "Tea ceremonies in private machiya, sword-forging with a master, sushi mornings at Toyosu, sake tastings with brewery owners. Real access via a decade of Japanese relationships.",
    benefits: [
      { title: "Real teachers, not performers", desc: "Working craftsmen, licensed sommeliers, temple monks — not costume actors on repeat." },
      { title: "Private or small group", desc: "Most experiences are private; a few small-group sessions when the setting invites conversation." },
      { title: "Photography friendly", desc: "Personal photography permitted at almost every session — a lasting souvenir with the maker." },
    ],
    includes: [
      "Experience booking & confirmation",
      "Private transport option",
      "Interpretation as needed",
      "Materials & tools included",
      "Certificate or gift where relevant",
    ],
    faqs: [
      { q: "Can experiences be added to a tour?", a: "Yes — they're a natural fit for any tour or custom itinerary and can be inserted on any day." },
      { q: "Are they suitable for children?", a: "Many are family-friendly (calligraphy, wagashi, ninja). We flag age recommendations for each experience." },
    ],
    seoTitle: "Japan Local Experiences & Cultural Access | Nippon Tours",
    seoDescription: "Private Japan cultural experiences — tea ceremony, sword forging, sushi mornings, sake tastings with real masters and makers.",
  },
  {
    slug: "group-tours",
    category: "Travel",
    name: "Group Tours",
    short: "Group Tours",
    hero: kyotoImgAsset,
    headline: "Small-group Japan tours",
    intro: "Fixed-date departures for 8–12 like-minded travellers led by our senior guides. See the icons together, keep the intimacy of a small group.",
    benefits: [
      { title: "Small groups only", desc: "Capped at 12 guests so vans stay comfortable and restaurants don't need special-event bookings." },
      { title: "Senior guides", desc: "Only our most experienced licensed guides lead group departures — a big difference in a big group." },
      { title: "Fixed set price", desc: "One transparent price per person, no single-supplement traps for solo travellers we can pair." },
    ],
    includes: [
      "Licensed English-speaking guide",
      "All hotels & most meals",
      "Private coach & rail",
      "Entry fees & experiences",
      "24/7 tour leader on WhatsApp",
    ],
    faqs: [
      { q: "How large are your groups?", a: "Maximum 12 guests per departure — most trips run with 8–10." },
      { q: "Are single travellers welcome?", a: "Very — most departures include solo travellers. We can help pair for room-share to avoid the single supplement." },
    ],
    seoTitle: "Small Group Japan Tours | Nippon Tours",
    seoDescription: "Small-group Japan tours capped at 12 guests, led by senior licensed guides on fixed departures with all-inclusive pricing.",
  },
];

export const SERVICES_BY_CATEGORY: Record<string, ServicePage[]> = SERVICES.reduce(
  (acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  },
  {} as Record<string, ServicePage[]>,
);

export function serviceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}

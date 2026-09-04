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
import type { Locale } from "@/i18n";

interface ServiceTranslatable {
  name: string;
  short: string;
  headline: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  includes: string[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
}

export interface ServicePage extends ServiceTranslatable {
  slug: string;
  category:
    | "Travel"
    | "Business"
    | "Transport"
    | "Concierge";
  hero: string;
  ja: ServiceTranslatable;
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
    ja: {
      name: "FIT（個人自由旅行）",
      short: "FIT個人旅行",
      headline: "自由な旅を、確かなサポートで",
      intro: "グループに縛られず、自分だけのペースで日本を旅したい方へ。ホテル、鉄道パス、アクティビティの手配から24時間体制のサポートまで、正規免許を持つ日本の旅行会社が控えています。",
      benefits: [
        { title: "厳選された予約手配", desc: "私たちが実際に足を運んで確かめたホテル・旅館・レストラン・体験を、オペレーター料金でご予約します。" },
        { title: "鉄道・送迎の手配", desc: "JRパス、ICカード、新幹線の座席予約、荷物の配送、空港送迎までワンストップで手配します。" },
        { title: "24時間の現地サポート", desc: "WhatsAppひとつでチームとつながります。乗り遅れ、急な休業、レストランの変更にもリアルタイムで対応します。" },
      ],
      includes: [
        "パーソナライズされた旅程プランニング",
        "宿泊予約",
        "鉄道パス・座席予約",
        "アクティビティ・レストラン予約",
        "空港出迎えオプション",
        "24時間WhatsAppコンシェルジュ",
      ],
      faqs: [
        { q: "FIT旅行者にもガイドはつきますか？", a: "ご希望の場合のみ手配可能です。特定の日や都市に限定して免許ガイドを手配し、それ以外は完全に自由に旅していただけます。" },
        { q: "日本の鉄道パスの予約はできますか？", a: "はい——JRパス、地域パス、新幹線の座席予約まで、最初のホテルへお届けするか、eチケットにて発行します。" },
      ],
      seoTitle: "FIT個人旅行（日本）——自由な旅をサポート | Nippon Tours",
      seoDescription: "正規免許を持つ日本の旅行会社によるFIT個人旅行サポート——ホテル、鉄道、送迎、24時間コンシェルジュ。",
    },
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
    ja: {
      name: "MICE（会議・報奨・コンベンション・イベント）",
      short: "MICE",
      headline: "日本で実現する、完璧なMICEプログラム",
      intro: "20名から2,000名規模の会議、報奨旅行、コンベンション、イベントに対応。会場手配、DMCロジスティクス、ガラディナー、文化体験、空港からステージまでの地上手配をすべて担います。",
      benefits: [
        { title: "フルDMC対応", desc: "空港、ホテル、地上輸送、バッジ、通訳、AV、飲食まで——すべての接点をひとつの責任あるパートナーが管理します。" },
        { title: "特別な会場へのアクセス", desc: "旅館の貸切、寺院でのディナー、チームラボの特別利用、東京の絶景ルーフトップ、歴史ある町家など。" },
        { title: "多言語対応スタッフ", desc: "英語・日本語・中国語・韓国語に対応した現地コーディネーターがイベント当日を支えます。" },
      ],
      includes: [
        "会場手配・契約交渉",
        "参加者登録サポート",
        "団体空港送迎・バス手配",
        "ガラディナー・文化プログラム",
        "通訳・サイン計画",
        "現地プロダクション管理",
      ],
      faqs: [
        { q: "対応可能な人数規模は？", a: "20名の役員合宿から、2,000名以上のコンベンションや報奨旅行プログラムまで対応します。" },
        { q: "会場選定やRFP対応も可能ですか？", a: "はい——日本国内の主要都市で会場・ホテルのRFPを実施し、お客様に代わって交渉します。" },
      ],
      seoTitle: "日本のMICE・イベントDMC | Nippon Tours",
      seoDescription: "日本のMICE専門会社——20名から2,000名規模の会議・報奨旅行・コンベンション・イベントをフルDMC対応で実現。",
    },
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
    ja: {
      name: "コーポレートトラベル",
      short: "コーポレートトラベル",
      headline: "静かに信頼できる、日本での企業出張",
      intro: "グローバル企業や訪日団のための役員出張プログラム、ロードショー、視察対応。控えめなドライバー、ビジネスホテル、通訳、予定変更時の当日再手配まで対応します。",
      benefits: [
        { title: "控えめな地上手配", desc: "英語対応のスーツ姿のドライバー、黒塗りの役員車両、空港でのファストトラック（利用可能な場合）。" },
        { title: "ビジネスグレードのホテル", desc: "ペニンシュラ、アマン、パレスホテル、パークハイアットなど全国のビジネスタワーとの交渉済みレート。" },
        { title: "会議・ロードショー支援", desc: "会議室の予約、通訳、印刷手配、当日の旅程変更まで、専任のアカウントマネージャーが対応します。" },
      ],
      includes: [
        "役員空港送迎",
        "ビジネスクラスホテル予約",
        "通訳・翻訳手配",
        "会議室・ケータリング手配",
        "専任アカウントマネージャー",
        "24時間緊急対応ライン",
      ],
      faqs: [
        { q: "法人向けの請求書発行は可能ですか？", a: "はい——発注書に基づき日本円・米ドル・ユーロでご請求可能で、経費精算用の明細書も発行します。" },
        { q: "直前の変更にも対応できますか？", a: "もちろんです。フライトの再手配、ドライバーの変更、当日のホテル変更は企業プログラムでは日常的な対応です。" },
      ],
      seoTitle: "日本での法人出張・コーポレートトラベル | Nippon Tours",
      seoDescription: "日本全国での役員出張手配——専用ドライバー、ビジネスホテル、通訳、専任アカウントマネージャーによる24時間対応。",
    },
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
    ja: {
      name: "教育旅行",
      short: "教育旅行",
      headline: "日本全国をめぐる教育旅行",
      intro: "歴史・建築・サステナビリティ・ロボット工学・料理・語学研修など、学術テーマに沿った学校・大学・スタディツアー向けプログラム。教員の皆様と共に設計し、免許ガイドが案内します。",
      benefits: [
        { title: "学術水準のプログラム", desc: "大学の教育課程に沿った内容、企業訪問（トヨタ、ソニー、JAXA）、学芸員によるミュージアムセッションを実施。" },
        { title: "安全第一の運営", desc: "正規登録された旅行会社、保険付きコーチ、点呼確認、専任ツアーリーダー、24時間対応の当直担当者。" },
        { title: "ホームステイ・ワークショップ", desc: "希望に応じてホームステイ、茶道、書道、和菓子作り、現地学生との交流を実施します。" },
      ],
      includes: [
        "カリキュラムに沿った旅程設計",
        "団体航空券・鉄道予約",
        "保険付きコーチ・点呼確認",
        "免許を持つ学術ガイド",
        "ホームステイ・キャンパス訪問",
        "24時間現地当直担当者",
      ],
      faqs: [
        { q: "対応可能な団体規模は？", a: "15名の少人数から、サブグループリーダーを配置した200名以上の通年グループまで対応します。" },
        { q: "リスクアセスメントの提供は可能ですか？", a: "はい——貴校向けに詳細なリスクアセスメント、緊急時対応プロトコル、旅行保険のご案内を書面でご用意します。" },
      ],
      seoTitle: "学校・大学向け日本教育旅行 | Nippon Tours",
      seoDescription: "日本全国での教育旅行——学術的な旅程設計、安全第一の運営、ホームステイと大学訪問を学校・大学向けに提供。",
    },
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
    ja: {
      name: "ファミリーツアー",
      short: "ファミリーツアー",
      headline: "ご家族のペースに合わせた日本旅行",
      intro: "お子様連れ、ティーンエイジャー、祖父母世代まで、多世代での旅を。ファミリー向けの部屋、コネクティングスイート、子供に人気のガイドと、ご家族本来のリズムに合わせた旅程をご用意します。",
      benefits: [
        { title: "ファミリー向けの客室", desc: "旅館のファミリールーム、コネクティングスイート、アパートメントなど——東京の狭い部屋に家族4人という心配はありません。" },
        { title: "子供が夢中になるガイド", desc: "寿司作り教室、忍者アカデミー、ジブリにインスパイアされた一日、スタジオジブリ美術館の朝一番の入場など。" },
        { title: "柔軟なスケジュール", desc: "お昼寝に配慮した出発時間、子供も食べやすいレストラン、疲れた足のための専用ドライバー、雨天時のプランBも常に用意します。" },
      ],
      includes: [
        "ファミリー向け宿泊手配",
        "子供に人気の専属ガイド",
        "ベビーカー・チャイルドシート手配",
        "テーマ体験（ジブリ、忍者、寿司など）",
        "長距離移動用の専用ドライバー",
        "24時間ファミリーコンシェルジュ",
      ],
      faqs: [
        { q: "どの年齢層のお子様にも対応できますか？", a: "はい——幼児向けの公園や体験型ミュージアムから、ティーンエイジャーに人気のアニメ聖地巡礼やユニバーサル・スタジオ・ジャパンまで幅広く対応します。" },
        { q: "祖父母も無理なく参加できますか？", a: "専用車やエレベーターを使い、休憩を多めに取った段差の少ない旅程を、活動的な家族向けセッションと組み合わせて設計します。" },
      ],
      seoTitle: "日本ファミリーツアー——多世代旅行 | Nippon Tours",
      seoDescription: "ご家族のペースに合わせた日本旅行——ファミリー向け客室、子供に人気のガイド、柔軟な日程、24時間ファミリーコンシェルジュ。",
    },
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
    ja: {
      name: "空港送迎",
      short: "空港送迎",
      headline: "日本全国の空港に対応する送迎サービス",
      intro: "羽田、成田、関西、中部、福岡、新千歳をはじめ、各地方空港での出迎え・専用車・バン手配。英語対応ドライバー、荷物優先設計の車両で、時間厳守——遅れた場合は料金をいただきません。",
      benefits: [
        { title: "到着ロビーでのお出迎え", desc: "お名前を書いたプレートを持ったスタッフが到着ロビー内でお出迎え。12時間のフライトの後に人混みを探す必要はありません。" },
        { title: "荷物に優れた車両", desc: "アルファード、エルグランド、ハイエースなど、4名様とスーツケース8個がきちんと収まる車両をご用意します。" },
        { title: "明瞭な料金設定", desc: "ルートごとに一律料金——メーターの心配も、ピーク料金も、荷物追加料金もありません。" },
      ],
      includes: [
        "到着ロビー内でのお出迎え",
        "英語対応ドライバー",
        "フライト追跡・60分間の無料待機",
        "車内にペットボトル水・Wi-Fiを完備",
        "チャイルドシート対応可能",
        "ルートごとの明瞭な料金",
      ],
      faqs: [
        { q: "フライトが遅延した場合は？", a: "フライトはリアルタイムで追跡し、実際の着陸後60分間まで追加料金なしでドライバーが待機します。" },
        { q: "どの空港に対応していますか？", a: "羽田、成田、関西、中部、福岡、新千歳、那覇をはじめ、日本国内の主要空港すべて、ご要望に応じて地方空港にも対応します。" },
      ],
      seoTitle: "日本の空港送迎——羽田・成田・関西 | Nippon Tours",
      seoDescription: "日本全国の空港送迎サービス——出迎え、英語対応ドライバー、荷物優先設計の車両、ルートごとの明瞭な料金。",
    },
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
    ja: {
      name: "専属ドライバーサービス",
      short: "専属ドライバー",
      headline: "日本国内の専属ドライバーサービス",
      intro: "英語対応ドライバーと役員クラスの車両による、時間単位・日単位・複数日にわたる専属ドライバーサービス。ビジネスミーティング、市内観光、ラグジュアリーなショッピング、都市間の移動まで対応します。",
      benefits: [
        { title: "役員クラスの車両", desc: "アルファード、センチュリー、Sクラス、エルグランドなど——常に清潔で、常にスーツ姿のドライバーが対応します。" },
        { title: "英語対応ドライバー", desc: "日本の住所や独特な慣習、静かなマナーを熟知したドライバーが、面倒な手続きをすべて代わりに行います。" },
        { title: "柔軟なパッケージ", desc: "銀座でのショッピングは時間単位、箱根へは1日単位、ゴールデンルートは複数日単位でご予約いただけます。" },
      ],
      includes: [
        "役員クラスの車両とドライバー",
        "燃料・高速料金・駐車料金込み",
        "ペットボトル水・Wi-Fi完備",
        "荷物のお取り扱い",
        "柔軟なルート設計",
        "24時間配車対応",
      ],
      faqs: [
        { q: "ドライバーはガイドも兼ねますか？", a: "ドライバーは免許ガイドではありません。ガイドが必要な場合は免許を持つ全国通訳案内士を同乗させます。両方をご一緒にご予約されるお客様も多くいらっしゃいます。" },
        { q: "最低利用時間はありますか？", a: "はい——時間単位のご予約は3時間から、終日貸切は10時間からとなります。" },
      ],
      seoTitle: "日本の専属ドライバーサービス | Nippon Tours",
      seoDescription: "日本全国の専属ドライバーサービス——英語対応ドライバー、アルファードやSクラスなどの車両、時間単位・日単位のパッケージ。",
    },
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
    ja: {
      name: "レンタカー",
      short: "レンタカー",
      headline: "日本全国でのセルフドライブ・レンタカー",
      intro: "英語対応カーナビ、保険、24時間対応のロードサービス付きレンタカー。九州の田舎道にはコンパクトカー、北海道にはファミリー向けSUV、ゴールデンルートには上質なセダンをご用意します。",
      benefits: [
        { title: "英語ナビ・案内サポート", desc: "すべての車両を英語仕様に設定し、ガソリンスタンドや料金所、地方の標識に関する印刷ガイドも同梱します。" },
        { title: "充実の保険を標準装備", desc: "全車両に免責ゼロの車両保険を付帯——縁石や狭い田舎道を気にせず運転いただけます。" },
        { title: "地域をまたぐ乗り捨て", desc: "東京で借りて大阪で返却、福岡から鹿児島へ、札幌から小樽へ。乗り捨て料金の交渉も代行します。" },
      ],
      includes: [
        "全車両保険・免責補償込み",
        "英語ナビ・標識ガイド",
        "走行距離無制限",
        "24時間英語ロードサービス",
        "チャイルドシート対応可能",
        "国際運転免許証に関するご案内",
      ],
      faqs: [
        { q: "国際運転免許証は必要ですか？", a: "はい——日本以外で取得された運転免許証をお持ちの多くの方は、渡航前にご自国で1949年ジュネーブ条約に基づく国際運転免許証を取得する必要があります。" },
        { q: "乗り捨てはできますか？", a: "はい——都市間の乗り捨ては多くの場合可能で、事前に明示する少額の乗り捨て料金がかかります。" },
      ],
      seoTitle: "日本のセルフドライブ・レンタカー | Nippon Tours",
      seoDescription: "日本全国のセルフドライブ・レンタカー——英語ナビ、充実の保険、24時間英語ロードサービス、地域をまたぐ乗り捨て対応。",
    },
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
    ja: {
      name: "ホテル予約",
      short: "ホテル予約",
      headline: "日本全国のホテル・旅館予約",
      intro: "東京のアマンやブルガリから、箱根の露天風呂付き旅館まで。オペレーターとしての取引関係を活かし、料金交渉やアップグレードの手配を行い、「良いホテル」ではなく「あなたに合った部屋」をご提案します。",
      benefits: [
        { title: "ホテルではなく、部屋を選ぶ", desc: "中庭を望む側の部屋、富士山の見えるバルコニー付きスイートなど、私たちは細部まで把握しています。" },
        { title: "交渉レート・アップグレード", desc: "400以上の施設でオペレーター料金を利用でき、可能な場合は無料アップグレードやアメニティもご用意します。" },
        { title: "厳選された旅館", desc: "本物の温泉、本物の会席料理、本物のおもてなし——観光客向けの簡略化されたものではありません。" },
      ],
      includes: [
        "ホテル・旅館の選定",
        "オペレーター料金での予約",
        "部屋からの眺めに関するご案内",
        "会席料理のご予約",
        "特別な記念日のアレンジ",
        "アメニティ・アップグレードのリクエスト",
      ],
      faqs: [
        { q: "ツアーを伴わないホテル予約のみでも対応可能ですか？", a: "はい——ホテル単独のご予約も承っております。特にリピーターやご紹介のお客様に人気です。" },
        { q: "ホテル予約に手数料はかかりますか？", a: "事前に明示した手数料体系をご案内しています——通常は1泊あたりの定額手数料で、アップグレードやアメニティの手配によって十分に見合う価値をご提供します。" },
      ],
      seoTitle: "日本のホテル・旅館予約 | Nippon Tours",
      seoDescription: "日本全国のホテル・旅館予約——オペレーター料金、アップグレード、本物の温泉と会席料理が楽しめる旅館の厳選。",
    },
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
    ja: {
      name: "レストラン予約",
      short: "レストラン予約",
      headline: "インサイダーだからこそ叶う、レストラン予約",
      intro: "ミシュラン星付きの寿司店、会席料理のカウンター、隠れ家的な焼き鳥屋、外国人の予約を受け付けない京都の茶屋まで——私たちだからこそ持つ電話番号と関係性があります。",
      benefits: [
        { title: "会員限定の特別な席", desc: "ミシュラン三ツ星寿司店のカウンター席、祇園の割烹の個室、常連のみを受け入れる焼き鳥の名店など。" },
        { title: "食事制限への配慮", desc: "ベジタリアン、ヴィーガン、ハラール、グルテンフリー、アレルギー対応の会席料理を事前にシェフへ詳細に伝えます。" },
        { title: "タイミングの演出", desc: "夕陽を眺める寺院の時間に合わせて、ディナーのタイミングを組み立てます——その逆ではありません。" },
      ],
      includes: [
        "ご予約・確認対応",
        "食事制限に関するシェフへの事前説明",
        "ご要望に応じたメニュー翻訳",
        "交通手段の手配",
        "当日の変更サポート",
      ],
      faqs: [
        { q: "ミシュラン三ツ星の寿司店を予約できますか？", a: "可能な場合があります——ただし空席は非常に限られており、数ヶ月前からの予約が必要です。お問い合わせいただいた際に実現可能性を正直にお伝えします。" },
        { q: "レストラン予約に料金はかかりますか？", a: "予約ごとに少額のコンシェルジュ料金をいただいております。予約が難しいカウンター席の場合はやや高くなりますが、事前にご案内します。" },
      ],
      seoTitle: "日本のレストラン予約・コンシェルジュ | Nippon Tours",
      seoDescription: "日本全国のレストラン予約——ミシュラン寿司店、会席料理のカウンター、隠れ家焼き鳥、京都の茶屋を現地インサイダーが手配。",
    },
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
    ja: {
      name: "オーダーメイド旅程",
      short: "オーダーメイド旅程",
      headline: "完全オーダーメイドの日本旅程",
      intro: "パッケージツアーではありません。ご希望の日程、ペース、ご予算、こだわりに合わせて設計するオーダーメイドの旅程を、48時間以内にご提案し、ご納得いただくまで調整します。",
      benefits: [
        { title: "あなたのための設計", desc: "10の質問を通してご要望を伺い、食、アート、ハイキング、アニメ、日本酒、精神文化など、興味に沿った旅程を設計します。" },
        { title: "無料の提案", desc: "初回のご提案は48時間以内・無料。ご予約前に2回まで無料で修正いただけます。" },
        { title: "明瞭な見積もり", desc: "ホテル、ガイド利用日、送迎、アクティビティのすべてを明細化。何にいくらお支払いいただくのか一目瞭然です。" },
      ],
      includes: [
        "ヒアリング面談",
        "48時間以内の旅程案作成",
        "2回までの修正対応",
        "明細付きお見積もり",
        "予約・お支払い手続きの代行",
        "24時間現地サポート",
      ],
      faqs: [
        { q: "提案は本当に無料ですか？", a: "はい——初回のご提案と2回までの修正はすべて無料で、ご予約の義務は一切ありません。" },
        { q: "旅程作成にはどのくらい時間がかかりますか？", a: "初回案は48時間以内にご提案し、多くのお客様は調整を経て2〜3週間以内にご確定いただいています。" },
      ],
      seoTitle: "完全オーダーメイドの日本旅程 | Nippon Tours",
      seoDescription: "ご希望の日程、ペース、ご予算、こだわりに合わせて設計する完全オーダーメイドの日本旅程。48時間以内に無料でご提案します。",
    },
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
    ja: {
      name: "コンシェルジュサービス",
      short: "コンシェルジュ",
      headline: "WhatsAppひとつで完結する現地コンシェルジュ",
      intro: "1つのWhatsAppスレッド、1つのチームで、旅の全てをサポート。レストランの変更、体調不良時の対応、サプライズの演出、急な天候変化への対応まで——日本在住のチームがリアルタイムで対応します。",
      benefits: [
        { title: "24時間WhatsApp対応", desc: "1つの番号で、滞在中いつでも数分以内に人による返信をお届けします。" },
        { title: "サプライズ・特別演出", desc: "旅館でのバースデーケーキ、桜の下でのピクニックセット、隠れた深夜バー、突然空いたチケットの手配まで。" },
        { title: "問題解決力", desc: "荷物の紛失、新幹線の乗り遅れ、薬局への同行、英語対応可能な医師の手配まで——当日中に解決します。" },
      ],
      includes: [
        "専任コンシェルジュマネージャー",
        "24時間WhatsApp対応",
        "レストラン・アクティビティの変更",
        "特別な記念日の演出",
        "医療・実務面でのサポート",
        "旅行後のフォローアップ",
      ],
      faqs: [
        { q: "コンシェルジュはツアーに含まれていますか？", a: "はい——ご予約いただいたすべての旅程には、日本ご滞在中を通した現地コンシェルジュが含まれます。" },
        { q: "ツアーを伴わない方でもコンシェルジュを利用できますか？", a: "はい——個人旅行の方向けに、日単位・週単位でのスタンドアロンのコンシェルジュパッケージもご用意しています。" },
      ],
      seoTitle: "日本のコンシェルジュサービス——24時間WhatsApp対応 | Nippon Tours",
      seoDescription: "WhatsAppで完結する日本現地コンシェルジュ——レストラン変更、サプライズ演出、医療サポート、問題解決を24時間対応。",
    },
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
    ja: {
      name: "ローカル体験",
      short: "ローカル体験",
      headline: "お金では簡単に手に入らない、本物のローカル体験",
      intro: "町家での茶道体験、刀鍛冶職人との刀作り、豊洲での寿司体験、蔵元との日本酒テイスティングなど。10年にわたる日本国内の人脈だからこそ実現する本物のアクセスです。",
      benefits: [
        { title: "本物の職人・専門家", desc: "現役の職人、資格を持つソムリエ、寺院の僧侶など——演出された案内役ではありません。" },
        { title: "プライベートまたは少人数制", desc: "多くの体験はプライベートで実施し、会話が生まれる少人数制のセッションもご用意しています。" },
        { title: "撮影歓迎", desc: "ほぼすべてのセッションで個人的な撮影が可能です——作り手との思い出を写真に残せます。" },
      ],
      includes: [
        "体験予約・確認対応",
        "専用送迎オプション",
        "必要に応じた通訳",
        "材料・道具込み",
        "該当する場合は修了証・記念品",
      ],
      faqs: [
        { q: "ツアーに体験を追加できますか？", a: "はい——どのツアーやオーダーメイド旅程にも自然に組み込むことができ、ご希望の日に挿入可能です。" },
        { q: "子供でも参加できますか？", a: "多くの体験（書道、和菓子作り、忍者体験など）はファミリー向けです。各体験の推奨年齢をご案内しています。" },
      ],
      seoTitle: "日本のローカル体験・文化アクセス | Nippon Tours",
      seoDescription: "日本でのプライベート文化体験——茶道、刀鍛冶、寿司体験、日本酒テイスティングを本物の職人・専門家とともに。",
    },
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
    ja: {
      name: "グループツアー",
      short: "グループツアー",
      headline: "少人数制の日本グループツアー",
      intro: "8〜12名の少人数グループによる、確定日程のツアー。シニアガイドが同行し、名所を巡りながらも少人数ならではの親密さを大切にします。",
      benefits: [
        { title: "少人数制へのこだわり", desc: "最大12名までに限定し、車両は快適さを保ち、レストランでも特別な団体予約を必要としません。" },
        { title: "経験豊富なシニアガイド", desc: "グループツアーを率いるのは、最も経験豊富な免許ガイドのみ——大人数のツアーだからこそ大きな違いを生みます。" },
        { title: "明瞭な固定料金", desc: "お一人様あたりの透明な料金設定で、ペアリング可能な場合はソロ旅行者向けの追加料金も回避できます。" },
      ],
      includes: [
        "英語対応の免許ガイド",
        "全宿泊・大半の食事込み",
        "専用コーチ・鉄道利用",
        "入場料・体験費用込み",
        "24時間WhatsApp対応のツアーリーダー",
      ],
      faqs: [
        { q: "グループの規模はどのくらいですか？", a: "1回のツアーにつき最大12名まで——多くのツアーは8〜10名で催行されます。" },
        { q: "一人旅の方も参加できますか？", a: "もちろんです——多くのツアーに一人旅の方が参加されています。相部屋のペアリングも可能で、シングル追加料金を避けられます。" },
      ],
      seoTitle: "少人数制の日本グループツアー | Nippon Tours",
      seoDescription: "最大12名までの少人数制日本グループツアー——経験豊富なシニアガイドが同行し、確定日程・すべて込みの料金でご案内。",
    },
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

export function localizeService(s: ServicePage, locale: Locale): ServicePage {
  if (locale === "en") return s;
  return { ...s, ...s.ja };
}

export const CATEGORY_LABEL: Record<Locale, Record<ServicePage["category"], string>> = {
  en: { Travel: "Travel", Business: "Business", Transport: "Transport", Concierge: "Concierge" },
  ja: { Travel: "旅行", Business: "ビジネス", Transport: "交通", Concierge: "コンシェルジュ" },
};

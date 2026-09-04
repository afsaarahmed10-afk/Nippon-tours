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
import type { Locale } from "@/i18n";

interface GuideTranslatable {
  title: string;
  metaTitle: string;
  description: string;
  readTime: string;
  sections: { h2: string; body: string[] }[];
}

export interface Guide extends GuideTranslatable {
  slug: string;
  image: string;
  ja: GuideTranslatable;
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
    ja: {
      title: "日本を訪れるベストシーズン：月別完全ガイド",
      metaTitle: "日本旅行のベストシーズン（月別）— Nippon Tours",
      description: "桜、紅葉、祭り、雪——理想の体験に合わせて、日本を訪れるべき時期を月ごとにご紹介します。",
      readTime: "8分で読めます",
      sections: [
        {
          h2: "結論から言うと",
          body: [
            "3月下旬〜4月上旬（桜）と11月（紅葉）は日本で最も美しく、同時に最も混雑する時期です。5月と10月はそれに劣らぬ美しさがありながら人出は控えめ。冬はスノーモンキー、パウダースノー、そして最も澄んだ富士山の眺めが楽しめ、夏は祭りと花火の季節ですが、暑さと湿気も伴います。",
          ],
        },
        {
          h2: "春（3〜5月）：桜のシーズン",
          body: [
            "開花前線は3月下旬の九州から、5月上旬の北海道まで北上していきます。東京・京都では例年3月最終週から4月第1週がピークですが、毎年変動するため、私たちの季節ツアーでは予報を毎日追跡し、ルートを柔軟に調整しています。",
            "桜シーズンのホテルは4〜6ヶ月前の予約が必要です。ゴールデンウィーク明けの5月は、実は日本旅行の隠れた穴場——快適な気候、緑豊かな景色、そして人出も少なめです。",
          ],
        },
        {
          h2: "夏（6〜8月）：祭りと花火",
          body: [
            "6月は梅雨の季節（紫陽花に彩られた寺院も見どころです）。7〜8月は高温多湿ですが、京都の祇園祭や青森のねぶた祭りといった日本の大きな祭り、川辺の花火大会、屋上ビアガーデンなど見返りも大きい季節です。暑さを避けるなら北海道や日本アルプスへ。",
          ],
        },
        {
          h2: "秋（9〜11月）：紅葉の波",
          body: [
            "紅葉前線は桜とは逆に北から南へ流れ、東京・京都では11月中旬から下旬にピークを迎えます。真紅のもみじに彩られた京都の寺院庭園は、桜の季節にも劣らぬ美しさとも言われ、夜のライトアップはさらに幻想的な景色を作り出します。",
          ],
        },
        {
          h2: "冬（12〜2月）：雪と澄んだ空気",
          body: [
            "冬は空気が澄み渡り、一年で最も富士山がくっきり見える季節です。長野の温泉で入浴するスノーモンキー、北海道の世界屈指のパウダースノー、深い雪に包まれた白川郷の茅葺き集落、そして年末年始を除けば最も宿泊費が抑えられる時期でもあります。",
          ],
        },
        {
          h2: "私たちのおすすめ",
          body: [
            "初めての日本旅行なら、早めに予約できるのであれば3月下旬〜4月上旬か11月がおすすめ。難しければ5月か10月を。ご希望の日程をお聞かせいただければ、その月の日本が見せる表情に合わせて旅程をデザインします——どの季節にも、それぞれの傑作が待っています。",
          ],
        },
      ],
    },
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
    ja: {
      title: "日本のビザガイド：必要な人と申請方法",
      metaTitle: "日本ビザガイド2026：必要条件とビザ免除制度 — Nippon Tours",
      description: "日本にビザが必要かどうかの確認方法、ビザ免除制度の仕組み、そして渡航前に準備すべき書類をご案内します。",
      readTime: "6分で読めます",
      sections: [
        {
          h2: "ビザ免除入国：ほとんどの旅行者が対象",
          body: [
            "アメリカ、イギリス、EU加盟国、カナダ、オーストラリア、ニュージーランド、シンガポールなど70以上の国と地域の国籍を持つ方は、短期観光目的であればビザなしで日本に入国できます（通常最大90日間）。必要なのは滞在期間をカバーする有効なパスポートと、出国便または帰国便の航空券のみです。",
          ],
        },
        {
          h2: "Visit Japan Web：出発前にやっておくこと",
          body: [
            "日本では「Visit Japan Web」を通じて入国審査と税関手続きを事前登録でき、到着時に読み取るQRコードが発行されます。無料で所要時間は約15分。空港での長い待ち時間を短縮できます。私たちは出発前に、すべてのお客様へステップごとの手順書をお送りしています。",
          ],
        },
        {
          h2: "ビザが必要な場合",
          body: [
            "免除対象国以外の国籍の方は、最寄りの日本大使館・領事館を通じて申請します。一般的にはパスポート、申請書、写真、資力証明、航空券の予約情報、そして日程表が必要です——これらは確定済みのご予約であれば、ホテル確認書とあわせて私たちがご用意いたします。",
            "審査には通常5〜10営業日かかりますが、念のため出発の最低1ヶ月前までに申請することをおすすめします。",
          ],
        },
        {
          h2: "私たちがサポートできること",
          body: [
            "Nippon Toursでのご予約には、領事館が求める書類——詳細な旅程表、宿泊先リスト、予約確認書——がすべて含まれます。ご自身の状況が不安な方は、国籍と旅行日程をお知らせください。必要なものを正確にご案内いたします。これも無料相談の一部です。",
          ],
        },
      ],
    },
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
    ja: {
      title: "JRパス完全ガイド：今でも元は取れる？",
      metaTitle: "JRパスガイド2026：料金・ルール・代替手段 — Nippon Tours",
      description: "値上げ後のジャパンレールパスの仕組み、元が取れるケース、そしてしばしばそれを上回る地方パスをご紹介します。",
      readTime: "7分で読めます",
      sections: [
        {
          h2: "JRパスとは",
          body: [
            "ジャパンレールパスは、新幹線を含む全国のJR線が7日・14日・21日間乗り放題になるパスです。2023年の値上げ（7日間で現在50,000円）以降、以前ほど「必ずお得」とは言えなくなり、元が取れるかどうかはルート次第です。",
          ],
        },
        {
          h2: "元が取れるケース",
          body: [
            "目安として、東京—京都の往復だけで約28,000円かかります。7日間の旅程に東京→京都→広島→東京の移動や、アルプス・東北方面への長距離移動が含まれるなら、パスの方がお得になることがほとんどです。一方、片道のみのゴールデンルート（東京→箱根→京都→大阪）であれば、個別に切符を購入した方が安くなるケースがほとんどです。",
          ],
        },
        {
          h2: "地方パス：より賢い選択肢",
          body: [
            "地方限定のパスは、非常にお得なことがよくあります。JR関西ワイドパス、北陸アーチパス、東京ワイドパスなどは、人気のルートを全国パスよりずっと安くカバーします。多くは外国人旅行者限定で、全国パスではカバーしにくいエリアも含まれることがあります。",
          ],
        },
        {
          h2: "計算はお任せください",
          body: [
            "私たちにご予約いただくと、パス利用と個別切符購入の両方でルート全体のコストを計算し、より安い方を手配します。乗車手配、座席予約、荷物の配送手配もすべて対応するため、券売機の前で払いすぎを心配する必要はありません。",
          ],
        },
      ],
    },
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
    ja: {
      title: "初めての日本旅行に最適な7日間モデルコース",
      metaTitle: "7日間の日本旅行モデルコース：東京・箱根・京都・大阪 — Nippon Tours",
      description: "実績あるゴールデンルート——東京の活気、箱根の温泉、京都の寺院、大阪のグルメ——を日ごとにご紹介します。",
      readTime: "10分で読めます",
      sections: [
        {
          h2: "旅程の全体像",
          body: [
            "東京（3泊）→箱根（1泊）→京都（2泊）→大阪（1泊）。この「ゴールデンルート」が定番と呼ばれるのには理由があります——未来的な首都、温泉が湧く山々、古き良き寺院、活気あふれる屋台グルメと、最大限のコントラストを、快適な鉄道移動で無駄なく巡ることができます。",
          ],
        },
        {
          h2: "1〜3日目：東京",
          body: [
            "1日目：到着後、荷物を置いてまずは浅草寺と川辺のディナーでゆったりと。2日目：定番の明治神宮、原宿、そして夕暮れの渋谷スクランブル交差点。3日目：チームラボのデジタルアート、築地での寿司の朝食、鎌倉の大仏への日帰り旅——お好みのテーマでじっくりと。",
          ],
        },
        {
          h2: "4日目：箱根",
          body: [
            "東京から90分、摩天楼を湯けむりに交換する日。芦ノ湖を渡る海賊船、火山の谷を越えるロープウェイという定番ルートを楽しんだ後は、多くのお客様がお気に入りと語る旅館での一夜へ——懐石ディナー、浴衣、そして星空の下の露天風呂。",
          ],
        },
        {
          h2: "5〜6日目：京都",
          body: [
            "5日目：早朝（午前7時は別世界です）の伏見稲荷の鳥居、その後は清水寺と提灯灯る祇園の路地。6日目：嵐山の竹林、金閣寺、茶道体験——そして夜は先斗町の路地を散策。",
          ],
        },
        {
          h2: "7日目：大阪",
          body: [
            "電車でわずか30分、まったく異なる世界へ。午前中は大阪城、ランチは黒門市場、そして夜はネオン輝く道頓堀を満喫。関西空港から出発するか、新幹線で3時間以内に東京へ戻ることもできます。",
          ],
        },
        {
          h2: "あなただけの旅程に",
          body: [
            "この骨格は自在にアレンジできます。半日で奈良の鹿を加える、大阪を広島・宮島に差し替える、あるいは高山とアルプスを加えて10日間に伸ばすことも。心惹かれることをお聞かせいただければ、私たちが形にします——それこそが無料相談の目的です。",
          ],
        },
      ],
    },
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
    ja: {
      title: "日本で体験したい忘れられない25のこと",
      metaTitle: "日本で体験すべき25の名スポット・体験（2026）— Nippon Tours",
      description: "寿司の朝食や温泉の夜から、スノーモンキーや海に浮かぶ鳥居まで——日本旅行を特別なものにする体験の数々をご紹介します。",
      readTime: "9分で読めます",
      sections: [
        {
          h2: "定番の名所（評判に違わぬ体験）",
          body: [
            "渋谷スクランブル交差点の真ん中に立つ。夜明けの伏見稲荷、1万本の鳥居をくぐる。箱根の湖に立つ鳥居の向こうに富士山が現れる瞬間を見る。時速285kmの新幹線で駅弁を味わう。満潮時に浮かぶ宮島の大鳥居を眺める。これらが有名なのは、本当に特別な体験だからです。",
          ],
        },
        {
          h2: "作法と儀式",
          body: [
            "旅館の畳の上で眠り、係の方に部屋で懐石料理をサーブしてもらう。雪が降る中、露天風呂に浸かる。本格的な茶道に静かに向き合い、一つひとつの所作の意味を知る。神社でお願い事をする——二礼二拍手一礼。",
          ],
        },
        {
          h2: "味わい",
          body: [
            "築地で寿司の朝食を。券売機のカウンター店でラーメンをすする。高山でせんべいに挟んだ飛騨牛寿司、広島でお好み焼き、大阪でたこ焼きを試す。300年の歴史を持つ酒蔵で利き酒を。少なくとも一度は職人にすべてを任せるおまかせを体験する。",
          ],
        },
        {
          h2: "季節ならではの一期一会",
          body: [
            "満開の桜の下でピクニックを。長野の温泉で入浴するスノーモンキーを眺める。11月、夜にライトアップされた京都の紅葉庭園を見る。夏祭りで浴衣を着て踊り、川面に響く花火の音を聞く。",
          ],
        },
        {
          h2: "誰も教えてくれない小さな発見",
          body: [
            "宅急便で荷物を先に送り、デイパックひとつで身軽に移動する。地元の人と一緒に銭湯（近所の公衆浴場）へ。デパ地下の食品売り場を、決めきれないほど見て回る。ゴールデン街の4席だけのバーで夜更けまで見知らぬ人と語らう。行き先を決めずにローカル線に乗る。",
            "これら全てをひとつの旅に織り込みたいですか？それが私たちの仕事です——どれに心惹かれたか教えてください。それを軸に旅程を組み立てます。",
          ],
        },
      ],
    },
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
    ja: {
      title: "日本旅行の費用：現実的な予算ガイド",
      metaTitle: "日本旅行にかかる費用は？予算ガイド — Nippon Tours",
      description: "日本旅行のホテル・食事・交通・ツアーにかかる実際の費用と、節約すべきところ、お金をかける価値があるところをご紹介します。",
      readTime: "8分で読めます",
      sections: [
        {
          h2: "大まかな費用感",
          body: [
            "航空券を除く、1人1日あたりの費用の目安：節約旅行なら12,000〜18,000円（約80〜120ドル）、快適な中価格帯なら25,000〜40,000円（約170〜270ドル）、4〜5つ星ホテルとプライベートガイドを含むプレミアムな旅なら60,000円（約400ドル）程度からです。円安の影響で、日本は西ヨーロッパの多くの国よりお得に旅行できるようになっています。",
          ],
        },
        {
          h2: "意外と安く楽しめること",
          body: [
            "食事は特にお得です。絶品のラーメンが1,000円、コンビニの朝食が500円、質の良い寿司セットでも2,000〜3,000円ほど。市内交通は安価で、美術館・博物館の入場料は2,000円を超えることはまれ、寺院の拝観料は300〜600円ほどです。神社仏閣、庭園、街歩きなど無料の楽しみも旅程の半分を占められます。",
          ],
        },
        {
          h2: "お金をかける価値があること",
          body: [
            "懐石ディナー付きの旅館での一泊（1人30,000〜80,000円）は、平凡なホテル5泊分よりも記憶に残ります。初日にプライベートガイドを付ければ、その後の旅全体の移動の安心感につながり、十分に元が取れます。繁忙期の京都のホテルが高いのはそれだけの価値があるから——立地こそが京都をどれだけ堪能できるかを左右します。",
          ],
        },
        {
          h2: "私たちが料金を明朗にしている理由",
          body: [
            "Nippon Toursのお見積りはすべて内訳を明示しています——ホテル、鉄道、ガイド、体験——隠れたマージンは一切ありません。無料相談でご予算の総額をお聞かせいただければ、それで何が実現できるか、そしてどこに少し予算を回せば大きな価値が生まれるかを具体的にご案内します。",
          ],
        },
      ],
    },
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

export function localizeGuide(guide: Guide, locale: Locale): Guide {
  if (locale === "en") return guide;
  return { ...guide, ...guide.ja };
}

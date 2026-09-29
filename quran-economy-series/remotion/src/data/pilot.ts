// Every word that appears on screen or is spoken in the pilot lives here.
// Edit this file to change the script; scene components only handle layout and motion.
// Qur'an text: Uthmani script (QuranEnc via quran-json@3.1.2). Urdu translation: Maududi (Tanzil).

export const FPS = 30;

export type BadgeKind = 'text' | 'tafsir' | 'modern' | 'claim';

export const BADGE_LABELS: Record<BadgeKind, string> = {
  text: 'قرآنی متن',
  tafsir: 'تفسیری رائے',
  modern: 'عصری اطلاق',
  claim: 'تحقیق طلب دعویٰ',
};

export type NarrationLine = {from: number; to: number; text: string};

export type SceneSpec = {
  id: string;
  durationInFrames: number;
  badges: BadgeKind[];
  source: string;
  narration: NarrationLine[]; // seconds, relative to scene start
};

export const SCENES = {
  food: {
    id: 'E3.S1',
    durationInFrames: 9.5 * FPS,
    badges: ['text'],
    source: 'عبس 80:24 · ترجمہ: مودودی',
    narration: [
      {from: 0.4, to: 4.6, text: 'ہم دن میں کئی بار کھانا کھاتے ہیں، مگر کم ہی سوچتے ہیں کہ یہ نوالہ ہم تک پہنچا کیسے۔'},
      {from: 4.8, to: 9.2, text: 'قرآن کہتا ہے: انسان ذرا اپنی خوراک کو دیکھے۔'},
    ],
  },
  rizq: {
    id: 'E3.S2',
    durationInFrames: 13 * FPS,
    badges: ['text', 'tafsir'],
    source: 'ہود 11:6 · لسان العرب (رزق) · ترجمہ: مودودی',
    narration: [
      {from: 0.3, to: 7.2, text: 'عربی میں رزق ہر اس چیز کو کہتے ہیں جو زندگی قائم رکھنے کے لیے عطا کی جائے: غذا، مال، اور علم و ہدایت بھی۔'},
      {from: 7.4, to: 12.6, text: 'اور قرآن یاد دلاتا ہے کہ ہر جاندار کا رزق اللہ کے ذمے ہے۔'},
    ],
  },
  chain: {
    id: 'E3.S3',
    durationInFrames: 25 * FPS,
    badges: ['text', 'modern'],
    source: 'عبس 80:25–32 · ق 50:9–11 · آگے کی کڑیاں: عصری اطلاق',
    narration: [
      {from: 0.3, to: 6.4, text: 'سورۂ عبس اس سفر کی پہلی کڑیاں خود گنواتی ہے: ہم نے خوب پانی برسایا، پھر زمین کو پھاڑا،'},
      {from: 6.5, to: 11.0, text: 'پھر غلہ، پھل اور چارہ اگایا، تمہارے لیے اور تمہارے مویشیوں کے لیے۔ یہاں تک قرآن کا متن ہے۔'},
      {from: 11.2, to: 18.2, text: 'آج اس کے آگے پروسیسنگ اور ترسیل کی کڑیاں جڑ گئی ہیں۔ سامان ایک سمت چلتا ہے، اور پیسہ دوسری سمت۔'},
      {from: 18.4, to: 24.6, text: 'رزق کو "سپلائی چین" کہنا ایک مفید مثال ہے، لفظ کا معنی نہیں۔'},
    ],
  },
  map: {
    id: 'E3.S4',
    durationInFrames: 21 * FPS,
    badges: ['claim'],
    source: 'FAO Information Note (2022) · IFPRI (2022) · نقشہ: Natural Earth',
    narration: [
      {from: 0.3, to: 5.4, text: 'کہا جاتا ہے کہ جو غذا کی زنجیر پر قابو رکھے، وہ دوسری قوموں پر غالب آتا ہے۔'},
      {from: 5.6, to: 12.4, text: 'جنگ سے پہلے روس اور یوکرین مل کر دنیا کی تقریباً تیس فیصد گندم برآمد کرتے تھے،'},
      {from: 12.5, to: 16.4, text: 'اور 2022 کی جنگ نے عالمی غذائی قیمتیں ریکارڈ سطح پر پہنچا دیں۔'},
      {from: 16.6, to: 20.7, text: 'یہ غلبہ نہیں، مگر اثر و رسوخ ضرور ہے۔'},
    ],
  },
  close: {
    id: 'E3.S4b',
    durationInFrames: 17 * FPS,
    badges: ['text'],
    source: 'قریش 106:3–4 · ترجمہ: مودودی',
    narration: [
      {from: 0.3, to: 4.0, text: 'شاید اسی لیے قرآن نے قریش کو یاد دلایا:'},
      {from: 4.1, to: 10.2, text: 'اس رب کی عبادت کرو جس نے انہیں بھوک سے بچا کر کھانا دیا، اور خوف سے بچا کر امن دیا۔'},
      {from: 10.4, to: 13.6, text: 'رزق اور امن، ساتھ ساتھ۔'},
    ],
  },
} satisfies Record<string, SceneSpec>;

export const SCENE_ORDER = ['food', 'rizq', 'chain', 'map', 'close'] as const;

// Frames of overlap for the ink wipe between consecutive scenes.
export const TRANSITION = 14;

export const TOTAL_FRAMES =
  SCENE_ORDER.reduce((sum, k) => sum + SCENES[k].durationInFrames, 0) -
  TRANSITION * (SCENE_ORDER.length - 1);

// ---- On-screen text ---------------------------------------------------------

export const TEXT = {
  seriesTag: 'رزق سے ریاست تک · قسط 3 · پائلٹ',
  food: {
    heading: 'رزق',
    ayah: 'فَلۡيَنظُرِ ٱلۡإِنسَٰنُ إِلَىٰ طَعَامِهِۦٓ',
    translation: 'پھر ذرا انسان اپنی خوراک کو دیکھے',
  },
  rizq: {
    word: 'رِزۡق',
    gloss: 'زندگی قائم رکھنے کے لیے جو کچھ عطا ہو',
    senses: ['غذا', 'مال', 'علم و ہدایت'],
    ayah: 'وَمَا مِن دَآبَّةٖ فِي ٱلۡأَرۡضِ إِلَّا عَلَى ٱللَّهِ رِزۡقُهَا',
    translation: 'زمین میں چلنے والا کوئی جاندار ایسا نہیں جس کا رزق اللہ کے ذمے نہ ہو',
  },
  chain: {
    heading: 'بارش سے پلیٹ تک',
    quranicTag: 'قرآن میں مذکور · عبس 80:25–32',
    modernTag: 'عصری اطلاق',
    quranic: ['بارش', 'فصل', 'مویشیوں کا چارہ'],
    modern: ['کٹائی اور پروسیسنگ', 'ترسیل', 'آپ کی پلیٹ'],
    ayah: 'أَنَّا صَبَبۡنَا ٱلۡمَآءَ صَبّٗا ۝ ثُمَّ شَقَقۡنَا ٱلۡأَرۡضَ شَقّٗا ۝ فَأَنۢبَتۡنَا فِيهَا حَبّٗا',
    ayahTail: 'مَّتَٰعٗا لَّكُمۡ وَلِأَنۡعَٰمِكُمۡ',
    ayahTailTranslation: 'تمہارے لیے اور تمہارے مویشیوں کے لیے سامانِ زیست',
    goodsLabel: 'سامان',
    moneyLabel: 'رقم',
    note: 'رزق = سپلائی چین؟ مفید مثال، لفظ کا معنی نہیں',
  },
  map: {
    heading: 'غذا کی زنجیر پر کس کا قابو؟',
    claim: 'دعویٰ: غذائی سپلائی چین پر قابو = دوسری قوموں پر غلبہ',
    stat: 'عالمی گندم برآمدات میں روس اور یوکرین کا حصہ',
    statValue: 30,
    statNote: 'تقریباً، جنگ سے پہلے (2021)',
    verdictStruck: 'غلبہ',
    verdict: 'اثر و رسوخ',
    schematic: 'علامتی خاکہ: راستے اصل مقدار نہیں دکھاتے',
    labels: {
      russia: 'روس',
      ukraine: 'یوکرین',
      blackSea: 'بحیرۂ اسود',
      northAfrica: 'شمالی افریقہ',
      middleEast: 'مشرقِ وسطیٰ',
    },
  },
  close: {
    ayah: 'ٱلَّذِيٓ أَطۡعَمَهُم مِّن جُوعٖ وَءَامَنَهُم مِّنۡ خَوۡفِۭ',
    translation: 'جس نے انہیں بھوک سے بچا کر کھانے کو دیا اور خوف سے بچا کر امن عطا کیا',
    pillars: ['رزق', 'امن'],
    pillarWords: ['أَطۡعَمَهُم مِّن جُوعٖ', 'ءَامَنَهُم مِّنۡ خَوۡفِۭ'],
    next: 'اگلی کڑی: ثمرہ، پھل جو وقت لیتا ہے',
    credit: 'نعمان علی خان کے لیکچرز سے ماخوذ نوٹس پر مبنی تحقیقی جائزہ',
  },
};

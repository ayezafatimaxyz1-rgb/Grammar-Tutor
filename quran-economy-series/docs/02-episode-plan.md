# Part 2: Eight-Episode Outline, Scene and Narration Plan

**Series title:** رزق سے ریاست تک: قرآن کا معاشی زاویہ
**Format:** 8 episodes, 6 to 8 minutes each, 1920×1080, 30 fps. Urdu narration, one voice, calm explanatory register.
**Credit line (every episode):** "نعمان علی خان کے لیکچرز سے ماخوذ نوٹس پر مبنی تحقیقی جائزہ۔ تفسیری آراء اور عصری اطلاقات الگ نشان زد ہیں۔"

## Visual grammar (applies to every scene)

| Element | Rule |
|---|---|
| **Qur'anic world** | Warm paper `#F3E9D2`, ink `#2B2118`, gold `#B8892D`. Arabic in *Amiri Quran*, Urdu in *Noto Nastaliq Urdu*. Gold hairline frames, no ornament clutter. |
| **Present-day world** | Navy `#0E1B2C`, teal `#2FB5A8`, pale ice `#D9ECEF`, coral `#E8795A` for warnings. Diagrams, maps and flows only. |
| **Transitions** | Paper "turns" to navy with a 12 frame ink wipe when moving from text to application; the reverse when returning. |
| **Badges** (top right, every scene) | `قرآنی متن` gold · `تفسیری رائے` sepia · `عصری اطلاق` teal · `تحقیق طلب دعویٰ` coral. Several badges may appear together. |
| **Source strip** (bottom left) | Sūrah name + number:verse in Latin digits, translation credit ("ترجمہ: مودودی"). |
| **Headings** | Max 7 words. Kinetic: 18 frame rise + opacity, no bounce, no spin. |
| **Layout** | One idea per frame. Max 2 text blocks on screen. Arabic line max 60% width. 120 px safe margins. |
| **Maps** | Built from Natural Earth geodata (`world-atlas`), labelled in Urdu by hand, never AI-generated. Flows drawn as great-circle arcs; goods = gold dots, money = teal dots moving the opposite way. |

**Coverage:** every inventory ID from Part 1 appears in at least one scene's "Covers" line. Run `python3 docs/coverage.py` to verify.

---

# Episode 1 · دین اور دنیا: ایک ہی نقشہ
*Covers pages 1 to 3. Runtime ≈ 6:30.*
**Logline:** کیا مذہب صرف مسجد تک محدود ہے؟ قرآن زمین کو قید خانہ نہیں، امانت اور نعمت کہتا ہے۔

### E1.S1 · Cold open · 0:30 · Navy → Paper
- **Covers:** P01.1, P01.2, P01.5
- **Badge:** عصری اطلاق
- **Visual:** Night-time world map (Natural Earth) with thin teal shipping lanes pulsing. Camera slowly pulls back; the navy dissolves into warm paper and the same coastlines become ink lines. Title rises.
- **On screen:** `قرآن اور عالمی معیشت` → subtitle `ایک تحقیقی سلسلہ`
- **Narration:** ہر روز دنیا کے سمندروں میں ہزاروں جہاز اناج، تیل اور سامان لے کر چلتے ہیں۔ پیسہ ایک طرف بہتا ہے اور سامان دوسری طرف۔ سوال یہ ہے کہ کیا قرآن کے پاس اس نظام کے بارے میں کہنے کو کچھ ہے؟ یہ سلسلہ اسی سوال کا جواب تلاش کرتا ہے، احتیاط کے ساتھ، اور یہ بتاتے ہوئے کہ کون سی بات قرآن کا متن ہے اور کون سی ہماری تعبیر۔
- **Source:** Visual framing only.

### E1.S2 · How to watch this series · 0:40 · Paper
- **Covers:** P01.3, P01.4
- **Badge:** (legend of all four badges)
- **Visual:** Four badges slide in one by one, each with a one-line explanation. Then a small card: "ماخذ: نعمان علی خان کے لیکچرز پر مبنی نوٹس" with an honest note.
- **On screen:** `قرآنی متن` · `تفسیری رائے` · `عصری اطلاق` · `تحقیق طلب دعویٰ`
- **Narration:** یہ سلسلہ نعمان علی خان کے لیکچرز سے تیار کیے گئے نوٹس پر مبنی ہے۔ مگر ہم نے ہر آیت کو عربی متن، معتبر ترجمے اور تفسیر سے ملا کر دیکھا ہے۔ اسکرین پر آپ کو چار نشان نظر آئیں گے۔ سنہرا نشان یعنی قرآن کا براہ راست متن۔ بھورا نشان یعنی علماء کی تفسیری رائے۔ فیروزی نشان یعنی آج کی دنیا پر اطلاق۔ اور مرجانی نشان یعنی ایسا دعویٰ جس کے لیے ثبوت درکار ہے۔ اصل نوٹس میں جہاں غلطی تھی، ہم وہاں رک کر اس کی درستی بتائیں گے۔
- **Source:** Audit Part 1. The "Approved by Divine Design" stamps from the source are deliberately not reproduced.

### E1.S3 · The misconception · 0:45 · Paper → Navy split
- **Covers:** P02.1, P02.3
- **Badge:** تحقیق طلب دعویٰ
- **Visual:** Screen splits vertically. Left: a mosque arch in ink line. Right: a navy office tower drawn in teal line. A thin crack runs between them. Heading rises.
- **On screen:** `ایک بڑی غلط فہمی: دین اور دنیا کی تفریق`
- **Narration:** بہت سے لوگ یہ سمجھتے ہیں کہ دین کا تعلق صرف نماز، روزے اور عبادات سے ہے، اور کاروبار، ملازمت اور معیشت "دنیا" کے کام ہیں جن کا دین سے کوئی واسطہ نہیں۔ یہ سوچ عام ہے، مگر کیا قرآن بھی یہی کہتا ہے؟
- **Source:** Characterisation of a common attitude (not a survey result).

### E1.S4 · Friday: leave trade, then return to it · 1:00 · Paper
- **Covers:** P02.2, P02.4
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** 62:9 in Arabic writes on in gold; the word `ٱلۡبَيۡعَ` glows. A small market-stall icon fades out. Then 62:10 writes on; `فَٱنتَشِرُواْ فِي ٱلۡأَرۡضِ` glows and the stall returns, now with footpaths radiating outward.
- **On screen (Arabic):** `وَذَرُواْ ٱلۡبَيۡعَ` / `فَٱنتَشِرُواْ فِي ٱلۡأَرۡضِ وَٱبۡتَغُواْ مِن فَضۡلِ ٱللَّهِ`
- **On screen (Urdu):** `خرید و فروخت چھوڑ دو` / `زمین میں پھیل جاؤ اور اللہ کا فضل تلاش کرو`
- **Narration:** سورۃ الجمعہ کی دو آیتیں دیکھیے۔ پہلی میں حکم ہے کہ جب جمعے کی اذان ہو تو خرید و فروخت چھوڑ دو اور اللہ کے ذکر کی طرف دوڑو۔ اور اگلی ہی آیت میں کہا گیا کہ جب نماز پوری ہو جائے تو زمین میں پھیل جاؤ اور اللہ کا فضل تلاش کرو۔ ایک ہی مقام پر بازار چھوڑنے کا حکم بھی ہے اور بازار لوٹنے کی ترغیب بھی۔ یہاں دین اور دنیا دو الگ خانے نہیں، ایک ہی دن کی دو ترتیبیں ہیں۔ علماء اسی بنیاد پر کہتے ہیں کہ نیت درست ہو تو روزی کمانا بھی عبادت کا حصہ بن جاتا ہے۔
- **Source:** Al-Jumuʿah 62:9 to 10; ترجمہ: مودودی. Interpretation: general scholarly position.

### E1.S5 · Who forbade the good things? · 0:50 · Paper
- **Covers:** P02.5, P02.6, P02.7
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** 7:32 on paper. `زِينَةَ ٱللَّهِ` and `ٱلطَّيِّبَٰتِ مِنَ ٱلرِّزۡقِ` underline in gold. Then a small cave outline fades to a town skyline, not to mock retreat but to show the Qur'an's orientation toward society.
- **On screen (Arabic):** `قُلۡ مَنۡ حَرَّمَ زِينَةَ ٱللَّهِ ٱلَّتِيٓ أَخۡرَجَ لِعِبَادِهِۦ وَٱلطَّيِّبَٰتِ مِنَ ٱلرِّزۡقِ`
- **On screen (Urdu):** `کس نے اللہ کی اس زینت کو حرام کیا جو اس نے اپنے بندوں کے لیے نکالی، اور پاک رزق کو؟`
- **Narration:** قرآن ان لوگوں سے سوال کرتا ہے جو اللہ کی پیدا کی ہوئی زینت اور پاکیزہ رزق کو اپنے اوپر حرام کر لیتے ہیں۔ سورۃ الحدید میں رہبانیت کا ذکر ہے کہ لوگوں نے اسے خود ایجاد کیا، اللہ نے اسے فرض نہیں کیا تھا۔ اور صحیح بخاری میں ہے کہ نبی کریم ﷺ نے ان صحابہ کو روکا جو ہمیشہ روزہ رکھنے اور شادی نہ کرنے کا ارادہ رکھتے تھے۔ اسی لیے یہ سلسلہ قرآن کو صرف عقائد اور فقہ کی کتاب کے طور پر نہیں، معاشی نظر سے بھی پڑھنے کی کوشش ہے۔
- **Source:** Al-Aʿrāf 7:32; Al-Ḥadīd 57:27; Bukhari 5063. ⚠️ Correction: the popular phrase "لا رہبانیۃ فی الاسلام" is not quoted as a hadith.

### E1.S6 · Genesis, quoted fairly · 0:55 · Paper (muted grey tone)
- **Covers:** P03.1, P03.2, P03.3, P03.4, P03.5
- **Badge:** تحقیق طلب دعویٰ (with a small "درستی" tab)
- **Visual:** Heading. A neutral grey card quotes Genesis 3:17 to 19 in Urdu. The source slide's three claims appear as ghost text, and two are struck through with a thin coral line and replaced with the accurate wording.
- **On screen:** `تخلیق کا نظریہ: زمین قید خانہ یا نعمت؟` / card: `پیدائش 3:17–19: "زمین تیرے سبب لعنتی ہوئی… تو پسینے سے روٹی کھائے گا"` / struck: `بیماریاں اس لعنت کا نتیجہ` · `انسان دنیا میں قیدی ہے`
- **Narration:** معاشی سوچ کی بنیاد اس بات پر ہے کہ ہم اس دنیا کو کیسے دیکھتے ہیں۔ اصل نوٹس میں کہا گیا تھا کہ بائبل کے مطابق زمین پر آنا ہی سزا اور لعنت ہے، اور انسان یہاں قیدی ہے۔ یہ بات اس طرح درست نہیں۔ کتاب پیدائش میں لعنت زمین پر آتی ہے اور انسان کو محنت اور پسینے سے روزی کمانے کا کہا جاتا ہے۔ بیماریوں کا ذکر وہاں نہیں، اور باغ کی نگہداشت کا کام تو گناہ سے پہلے ہی سونپا گیا تھا۔ "دنیا قید خانہ ہے" کا جملہ بائبل کا نہیں۔ مسیحی روایت میں بھی اس پر مختلف آراء ہیں، اس لیے ہم موازنہ احتیاط سے کریں گے۔
- **Source:** Genesis 1:28, 2:15, 3:16 to 19. ⚠️ Corrects P03.3 to P03.5.

### E1.S7 · Descent with provision · 1:00 · Paper
- **Covers:** P03.6, P03.7, P03.8
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** A single gold line descends from the top of frame and lands on a horizon; seeds, water and wheat sprout along it. 2:36 and 7:10 appear in sequence.
- **On screen (Arabic):** `وَلَكُمۡ فِي ٱلۡأَرۡضِ مُسۡتَقَرّٞ وَمَتَٰعٌ إِلَىٰ حِينٖ` / `وَجَعَلۡنَا لَكُمۡ فِيهَا مَعَٰيِشَۗ قَلِيلٗا مَّا تَشۡكُرُونَ`
- **On screen (Urdu):** `زمین میں تمہارے لیے ٹھکانا اور ایک مدت تک سامانِ زیست ہے` / `ہم نے تمہارے لیے یہاں سامانِ زیست فراہم کیا، مگر تم کم ہی شکر کرتے ہو`
- **Narration:** قرآن جب حضرت آدم کے زمین پر اترنے کا ذکر کرتا ہے تو ساتھ ہی کہتا ہے: زمین میں تمہارے لیے ٹھکانا ہے اور ایک مدت تک سامانِ زندگی۔ اس سے پہلے آدم کی توبہ قبول ہو چکی تھی، اور فرشتوں سے کہا جا چکا تھا کہ میں زمین میں خلیفہ بنانے والا ہوں۔ سورۃ الاعراف میں ارشاد ہے کہ ہم نے تمہیں زمین میں بسایا اور تمہارے لیے یہاں معیشت کے ذرائع رکھ دیے۔ یہ آیت شکر کی یاد دہانی پر ختم ہوتی ہے۔ یعنی زمین کے وسائل نعمت ہیں، اور ان کا درست استعمال شکر کا حصہ ہے۔
- **Source:** Al-Baqarah 2:30, 2:36 to 37; Al-Aʿrāf 7:10; ترجمہ: مودودی.

### E1.S8 · Khalīfah and cultivating the earth · 0:50 · Paper → Navy
- **Covers:** P03.9
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** 11:61 appears; the word `وَٱسۡتَعۡمَرَكُمۡ` glows. Ink-wipe into navy: a quiet montage diagram of fields, workshops and roads drawn as teal lines. End on episode card.
- **On screen (Arabic):** `هُوَ أَنشَأَكُم مِّنَ ٱلۡأَرۡضِ وَٱسۡتَعۡمَرَكُمۡ فِيهَا`
- **On screen (Urdu):** `اسی نے تمہیں زمین سے پیدا کیا اور اس میں تمہیں آباد کیا` / end card: `اگلی قسط: امن اور رزق`
- **Narration:** حضرت صالح کی زبان سے قرآن کہتا ہے: اسی نے تمہیں زمین سے پیدا کیا اور اس میں تمہیں آباد کیا۔ عربی لفظ "استعمرکم" میں آباد کرنے اور تعمیر کی ذمہ داری دونوں کا مفہوم ہے۔ بہت سے علماء خلافت کے تصور کو بھی اسی ذمہ داری سے جوڑتے ہیں، اگرچہ خلیفہ کے معنی پر مفسرین میں اختلاف ہے۔ اس نظر سے دنیا کو معاشی طور پر آباد کرنا ترکِ دین نہیں، بلکہ امانت کی ادائیگی ہے۔ اگلی قسط میں ہم ایک بنجر وادی کی طرف چلیں گے، جہاں ایک دعا نے ایک شہر کی معیشت کی بنیاد رکھی۔
- **Source:** Hūd 11:61; Al-Baqarah 2:30. Interpretation of *khalīfah* flagged as debated.

---

# Episode 2 · امن اور رزق: ایک بنجر وادی کی دعا
*Covers page 4. Runtime ≈ 6:00.*
**Logline:** ابراہیمؑ نے ایک بے آب و گیاہ وادی کے لیے دو چیزیں مانگیں: امن اور رزق۔ یہی دو ستون آج بھی ریاستوں کو قائم رکھتے ہیں۔

### E2.S1 · The valley · 0:45 · Paper
- **Covers:** P04.1, P04.2
- **Badge:** قرآنی متن
- **Visual:** Accurate relief sketch of the Ḥijāz (Natural Earth + hillshade), ink on paper, no labels except `مکہ`. Wind lines cross empty land. 14:37 writes on.
- **On screen (Arabic):** `رَّبَّنَآ إِنِّيٓ أَسۡكَنتُ مِن ذُرِّيَّتِي بِوَادٍ غَيۡرِ ذِي زَرۡعٍ عِندَ بَيۡتِكَ ٱلۡمُحَرَّمِ`
- **On screen (Urdu):** `میں نے اپنی اولاد کے ایک حصے کو ایک بے آب و گیاہ وادی میں تیرے محترم گھر کے پاس بسایا ہے`
- **Narration:** سوچیے ایک ایسی وادی جہاں نہ کھیتی ہے نہ پانی کا کوئی نظام۔ حضرت ابراہیمؑ اپنی اولاد کو یہاں بساتے ہیں اور دعا کرتے ہیں۔ قرآن اس دعا کو دو جگہ نقل کرتا ہے، اور دونوں میں ایک ہی ترتیب ہے۔
- **Source:** Ibrāhīm 14:37; ترجمہ: مودودی.

### E2.S2 · Two requests · 1:00 · Paper
- **Covers:** P04.3, P04.4
- **Badge:** قرآنی متن · عصری اطلاق
- **Visual:** 2:126 writes on. Two gold words lift off the verse: `ءَامِنٗا` and `ٱلثَّمَرَٰتِ`, each settling into a circle. Then the second half of the verse (Allah's reply) appears in smaller type.
- **On screen (Arabic):** `رَبِّ ٱجۡعَلۡ هَٰذَا بَلَدًا ءَامِنٗا وَٱرۡزُقۡ أَهۡلَهُۥ مِنَ ٱلثَّمَرَٰتِ`
- **On screen (Urdu):** `اے میرے رب، اس شہر کو امن کا شہر بنا دے اور اس کے باشندوں کو پھلوں کا رزق دے` / small: `جو نہ مانے گا، دنیا کا سامان میں اسے بھی دوں گا`
- **Narration:** سورۃ البقرہ میں ابراہیمؑ کی دعا ہے: اے میرے رب، اس شہر کو امن والا بنا دے، اور اس کے رہنے والوں کو پھلوں کا رزق دے۔ پہلی چیز امن، دوسری رزق۔ آج کی زبان میں ہم انہیں قومی سلامتی اور معاشی خوشحالی کہیں گے، مگر یہ ہماری اصطلاح ہے، آیت کی نہیں۔ ایک اور بات قابل غور ہے۔ ابراہیمؑ نے رزق ایمان والوں کے لیے مانگا، اور اللہ نے جواب دیا کہ دنیا کا سامان میں انکار کرنے والوں کو بھی دوں گا۔ رزق کا دروازہ سب کے لیے کھلا ہے۔
- **Source:** Al-Baqarah 2:126; ترجمہ: مودودی.

### E2.S3 · The overlap · 0:50 · Navy
- **Covers:** P04.5, P04.6, P04.7
- **Badge:** عصری اطلاق · تحقیق طلب دعویٰ
- **Visual:** Two circles (navy "امن", teal "خوشحالی") slide together; the overlap fills and reads `ریاست کی بقا`. Two short arrows show failure modes on either side.
- **On screen:** `امن` · `خوشحالی` · `ریاست کی بقا` / `معیشت کے بغیر سلامتی: نظام کمزور` · `سلامتی کے بغیر معیشت: سرمایہ غیر محفوظ`
- **Narration:** اس دعا سے ایک اصول نکلتا ہے۔ اگر معیشت نہ ہو تو سلامتی کا نظام دیر تک قائم نہیں رہتا، اور اگر سلامتی نہ ہو تو کوئی سرمایہ لگانے کو تیار نہیں ہوتا۔ عالمی بینک کی دو ہزار گیارہ کی رپورٹ بھی یہی بتاتی ہے کہ تنازعات والے ممالک میں غربت کم کرنے کی رفتار سب سے سست رہی۔ یہ قرآن سے براہ راست حکم نہیں، بلکہ اس دعا کی ترتیب سے نکلنے والا ایک سبق ہے۔
- **Source:** World Bank, *World Development Report 2011*. 🔍 Verify the exact finding wording before VO lock.

### E2.S4 · Quraysh: the two journeys · 1:10 · Paper map
- **Covers:** P04.9, P04.10
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** Accurate map of Arabia, Red Sea and Levant. Two gold arcs draw from Makkah: south to Yemen labelled `سردیوں کا سفر`, north to Shām (Bosra/Gaza) labelled `گرمیوں کا سفر`. Caravans as small gold dots. No other routes.
- **On screen (Arabic):** `لِإِيلَٰفِ قُرَيۡشٍ ۝ إِۦلَٰفِهِمۡ رِحۡلَةَ ٱلشِّتَآءِ وَٱلصَّيۡفِ`
- **On screen (Urdu):** `قریش کو مانوس کرنے کے لیے، سردی اور گرمی کے سفروں سے`
- **Narration:** دعا کا اثر تاریخ میں نظر آتا ہے۔ سورۃ قریش دو تجارتی سفروں کا ذکر کرتی ہے: سردی کا سفر اور گرمی کا سفر۔ ابن کثیر اور طبری جیسے مفسرین کے مطابق سردیوں میں قافلے یمن جاتے تھے اور گرمیوں میں شام۔ اصل نوٹس کے نقشے میں شام کو دو جگہ دکھایا گیا تھا، ایک بار ایران کے اوپر، اور راستے یورپ اور افریقہ تک پھیلا دیے گئے تھے۔ قرآن اور تفسیر صرف یمن اور شام کا ذکر کرتے ہیں، اس لیے ہمارا نقشہ یہیں تک ہے۔
- **Source:** Quraysh 106:1 to 2; Ibn Kathīr, al-Ṭabarī on 106. ⚠️ Corrects P04.10 map.

### E2.S5 · How big was Makkan trade? · 0:55 · Navy
- **Covers:** P04.8
- **Badge:** تحقیق طلب دعویٰ
- **Visual:** A scale bar animates between two labels: `علاقائی قافلہ` ↔ `عالمی پائپ لائن`. A marker hovers near the regional end with a shaded "debate" band. Two book spines appear: Crone 1987 and a counter-view.
- **On screen:** `مکہ: عالمی تجارتی پائپ لائن؟` / `تاریخ دانوں میں اختلاف`
- **Narration:** نوٹس میں کہا گیا کہ مکہ ایک عالمی تجارتی پائپ لائن اور شاہراہ کا پڑاؤ بن گیا۔ یہ بات مبالغہ ہے۔ قریش کی تجارت ضرور تھی، قرآن خود اس کی گواہی دیتا ہے، مگر اس کا حجم کتنا تھا، اس پر مؤرخین میں اختلاف ہے۔ پیٹریشیا کرون نے انیس سو ستاسی میں لکھا کہ یہ زیادہ تر علاقائی تجارت تھی، چمڑے اور کپڑے جیسی چیزوں کی۔ دوسرے محققین اسے زیادہ وسیع سمجھتے ہیں۔ ہم اسے ایک اہم قافلہ مرکز کہیں گے، اور بحث کو کھلا چھوڑیں گے۔
- **Source:** Patricia Crone, *Meccan Trade and the Rise of Islam* (1987). ⚠️ Corrects P04.8.

### E2.S6 · Food and safety in one verse · 0:50 · Paper
- **Covers:** P04.9
- **Badge:** قرآنی متن
- **Visual:** 106:3 to 4. The words `أَطۡعَمَهُم مِّن جُوعٖ` and `ءَامَنَهُم مِّنۡ خَوۡفِۭ` light up and swing into the two Venn circles from S3, now in gold on paper. End card.
- **On screen (Arabic):** `ٱلَّذِيٓ أَطۡعَمَهُم مِّن جُوعٖ وَءَامَنَهُم مِّنۡ خَوۡفِۭ`
- **On screen (Urdu):** `جس نے انہیں بھوک سے بچا کر کھانے کو دیا اور خوف سے بچا کر امن عطا کیا` / end card: `اگلی قسط: قرآن کی معاشی لغت`
- **Narration:** اور سورت کا اختتام دیکھیے: اس گھر کے رب کی عبادت کرو، جس نے انہیں بھوک سے بچا کر کھانا دیا اور خوف سے بچا کر امن دیا۔ ابراہیمؑ کی دعا کے دونوں حصے، رزق اور امن، یہاں پورے ہوتے نظر آتے ہیں۔ اور ان کا شکر عبادت کی صورت میں مانگا گیا ہے۔ اگلی قسط میں ہم ان الفاظ کو قریب سے دیکھیں گے جن سے قرآن معیشت کی بات کرتا ہے: رزق، ثمرہ، فضل اور متاع۔
- **Source:** Quraysh 106:3 to 4; ترجمہ: مودودی.

---

# Episode 3 · قرآن کی معاشی لغت
*Covers pages 5 to 6. Runtime ≈ 7:00. **The 60 to 90 second pilot is built from E3.S1 to S4 (see Part 3).***
**Logline:** چار الفاظ، چار تصورات: رزق، ثمرہ، فضل، متاع۔ ان کے اصل معنی کیا ہیں، اور ہم ان سے آج کی معیشت کیسے سمجھ سکتے ہیں؟

### E3.S1 · Look at your food · 0:40 · Paper
- **Covers:** P05.1, P05.3
- **Badge:** قرآنی متن
- **Visual:** A simple ink plate with a piece of bread in the centre of warm paper. 80:24 writes on above it in gold.
- **On screen (Arabic):** `فَلۡيَنظُرِ ٱلۡإِنسَٰنُ إِلَىٰ طَعَامِهِۦٓ`
- **On screen (Urdu):** `پھر ذرا انسان اپنی خوراک کو دیکھے`
- **Narration:** ہم دن میں کئی بار کھانا کھاتے ہیں، مگر کم ہی سوچتے ہیں کہ یہ نوالہ ہم تک پہنچا کیسے۔ قرآن ہمیں یہی دعوت دیتا ہے: انسان ذرا اپنی خوراک کو دیکھے۔
- **Source:** ʿAbasa 80:24; ترجمہ: مودودی.

### E3.S2 · The word rizq · 0:40 · Paper
- **Covers:** P05.2, P05.3
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** رِزۡق in large gold Amiri. Three small labels orbit it: `غذا` `مال` `علم و ہدایت`. 11:6 appears beneath.
- **On screen (Arabic):** `وَمَا مِن دَآبَّةٖ فِي ٱلۡأَرۡضِ إِلَّا عَلَى ٱللَّهِ رِزۡقُهَا`
- **On screen (Urdu):** `زمین میں چلنے والا کوئی جاندار ایسا نہیں جس کا رزق اللہ کے ذمے نہ ہو`
- **Narration:** عربی میں رزق ہر اس چیز کو کہتے ہیں جو زندگی کو قائم رکھنے کے لیے عطا کی جائے۔ قرآن اسے سب سے زیادہ کھانے اور مال کے لیے استعمال کرتا ہے، اور بعض جگہ علم اور ہدایت جیسی نعمتوں کے لیے بھی۔ اور وہ یہ یاد دلاتا ہے کہ ہر جاندار کا رزق اللہ کے ذمے ہے۔
- **Source:** Hūd 11:6; Lisān al-ʿArab (رزق). ⚠️ Corrects emphasis of P05.3.

### E3.S3 · From rain to plate · 0:55 · Paper → Navy
- **Covers:** P05.4
- **Badge:** قرآنی متن · عصری اطلاق
- **Visual:** Horizontal chain, right to left (Urdu reading order): rain → crops → fodder in gold on paper, each ticked with the verse number. Ink-wipe to navy; the chain continues: harvest/processing → transport → plate in teal. Gold dots (goods) travel right to left; teal dots (money) travel left to right underneath.
- **On screen:** gold: `بارش` `فصل` `مویشیوں کا چارہ` (tag `عبس 80:25–32`) / teal: `کٹائی اور پروسیسنگ` `ترسیل` `آپ کی پلیٹ` (tag `عصری اطلاق`) / flow labels: `سامان ←` `→ رقم`
- **Narration:** سورۃ عبس اس سفر کا آغاز خود بیان کرتی ہے: ہم نے خوب پانی برسایا، پھر زمین کو پھاڑا، پھر اس میں غلہ، انگور، زیتون، کھجور اور چارہ اگایا، تمہارے لیے اور تمہارے مویشیوں کے لیے۔ یہاں تک قرآن کا متن ہے۔ آج اس کے آگے کٹائی، پروسیسنگ اور ترسیل کی کڑیاں جڑ گئی ہیں، اور سامان ایک سمت میں چلتا ہے تو پیسہ دوسری سمت میں۔ بعض مقررین رزق کو "سپلائی چین" کہتے ہیں۔ یہ ایک مفید مثال ہے، لفظ کا معنی نہیں۔
- **Source:** ʿAbasa 80:25 to 32; Qāf 50:9 to 11. ⚠️ Corrects P05.2 (analogy, not meaning).

### E3.S4 · Who controls the chain? · 0:50 · Navy map
- **Covers:** P05.5
- **Badge:** تحقیق طلب دعویٰ
- **Visual:** Accurate map, Black Sea centred. Russia and Ukraine shaded teal. Gold arcs fan out to North Africa and the Middle East (schematic, labelled `علامتی خاکہ`). A counter shows `≈ 30%` with source. Then a coral stamp `غلبہ؟` is corrected to `اثر و رسوخ`.
- **On screen:** `عالمی گندم برآمدات میں روس اور یوکرین کا حصہ` `30%` `تقریباً، جنگ سے پہلے (2021)` · `ماخذ: FAO / IFPRI، 2022` · struck `غلبہ` → `اثر و رسوخ`
- **Narration:** نوٹس میں ایک دعویٰ ہے: جو ممالک غذائی سپلائی چین پر قابو رکھتے ہیں، وہ دوسری قوموں پر غلبہ پاتے ہیں۔ اس کے حق میں شواہد موجود ہیں۔ جنگ سے پہلے روس اور یوکرین مل کر دنیا کی تقریباً تیس فیصد گندم برآمد کرتے تھے، اور دو ہزار بائیس کی جنگ نے عالمی غذائی قیمتیں ریکارڈ سطح پر پہنچا دیں۔ مگر "غلبہ" بڑا لفظ ہے۔ درست بات یہ ہے کہ غذا پر قابو اثر و رسوخ دیتا ہے۔ اور یہی وجہ ہے کہ قرآن نے بھوک سے نجات اور خوف سے امن کو ایک ساتھ ذکر کیا۔
- **Source:** FAO (2022) *Information Note: The importance of Ukraine and the Russian Federation for global agricultural markets*; IFPRI (2022). 🔍 Confirm the ~30% figure and year in the FAO note before VO lock. Quraysh 106:4.

### E3.S5 · Thamarah: fruit that takes time · 1:00 · Paper
- **Covers:** P05.6, P05.7, P05.8
- **Badge:** قرآنی متن · تفسیری رائے · عصری اطلاق
- **Visual:** A seed on a timeline grows into a tree in five stages (ink). 18:34 and 18:42 appear. The garden in 18:42 collapses on its trellises, drawn gently.
- **On screen (Arabic):** `وَكَانَ لَهُۥ ثَمَرٞ` / `فَأَصۡبَحَ يُقَلِّبُ كَفَّيۡهِ عَلَىٰ مَآ أَنفَقَ فِيهَا`
- **On screen (Urdu):** `ثمرہ: لفظی معنی پھل` / `بعض مفسرین: 18:34 میں "ثمر" سے مراد مال و دولت`
- **Narration:** ثمرہ کا لفظی معنی پھل ہے۔ نوٹس میں کہا گیا کہ قرآن میں اس کا مطلب سرمایہ کاری ہے۔ یہ عمومی طور پر درست نہیں۔ البتہ سورۃ الکہف میں باغ والے شخص کے بارے میں "وکان لہ ثمر" آیا ہے، اور ابن عباس اور مجاہد جیسے مفسرین سے منقول ہے کہ یہاں ثمر سے مراد ہر طرح کا مال ہے۔ اور جب اس کا باغ برباد ہوا تو قرآن کہتا ہے کہ وہ اپنے ہاتھ ملتا رہ گیا اس پر جو اس نے اس میں خرچ کیا تھا۔ یعنی باغ ایک سرمایہ تھا، جس میں محنت اور وقت لگا۔ کاروبار بھی ایسا ہی ہے: بیج، انتظار، پھر پھل۔
- **Source:** Al-Kahf 18:34, 18:42; al-Ṭabarī on 18:34. ⚠️ Corrects P05.7.

### E3.S6 · Faḍl: leave trade, seek bounty · 0:55 · Paper → Navy
- **Covers:** P06.1, P06.2, P06.3
- **Badge:** قرآنی متن · تفسیری رائے · عصری اطلاق
- **Visual:** فَضۡل in gold. Transition to navy: a clean bar chart with a dashed break-even line; bars above the line glow teal, labelled `اضافی منافع`. Small inset: 2:198 with a map dot for ʿUkāẓ.
- **On screen (Arabic):** `وَٱبۡتَغُواْ مِن فَضۡلِ ٱللَّهِ` / `لَيۡسَ عَلَيۡكُمۡ جُنَاحٌ أَن تَبۡتَغُواْ فَضۡلٗا مِّن رَّبِّكُمۡ`
- **On screen (Urdu):** `فضل: عطا، اضافہ، بخشش` / `تجارتی سیاق میں: منافع`
- **Narration:** فضل کا مطلب ہے عطا، زیادتی، وہ جو ضرورت سے بڑھ کر ملے۔ سورۃ الجمعہ میں نماز کے بعد اللہ کا فضل تلاش کرنے کا حکم ہے، اور سورۃ البقرہ میں حج کے دوران اللہ کا فضل تلاش کرنے کی اجازت۔ صحیح بخاری میں ابن عباس کی روایت ہے کہ عکاظ اور مجنہ جیسے بازاروں میں لوگ حج کے موسم میں تجارت سے ہچکچاتے تھے، تو یہ آیت نازل ہوئی۔ اسی لیے مفسرین تجارتی سیاق میں فضل کو منافع کے معنی میں لیتے ہیں۔ جدید زبان میں کہیں تو لاگت پوری ہونے کے بعد جو اضافہ ہو، وہ فضل ہے۔
- **Source:** Al-Jumuʿah 62:10; Al-Baqarah 2:198; Bukhari 2050.

### E3.S7 · Matāʿ: useful, pleasing, temporary · 1:00 · Paper → Navy
- **Covers:** P06.4, P06.5, P06.6, P06.7
- **Badge:** قرآنی متن · تفسیری رائے · عصری اطلاق
- **Visual:** مَتَاع in gold. A balance: gears (use) on one pan, a smile (enjoyment) on the other. Transition: line drawings of a phone and a car. Then 24:29 with `غَيۡرَ مَسۡكُونَةٖ` highlighted in coral-underline (restored words), next to a sketch of an old caravanserai.
- **On screen (Arabic):** `بُيُوتًا غَيۡرَ مَسۡكُونَةٖ فِيهَا مَتَٰعٞ لَّكُمۡ` / small: `وَمَا ٱلۡحَيَوٰةُ ٱلدُّنۡيَآ إِلَّا مَتَٰعُ ٱلۡغُرُورِ`
- **On screen (Urdu):** `ایسے گھر جو کسی کے رہنے کی جگہ نہ ہوں اور جن میں تمہارے فائدے کی کوئی چیز ہو` / `مفسرین: سرائے، دکانیں، عوامی عمارتیں`
- **Narration:** متاع وہ چیز ہے جو کام بھی آئے اور جس سے لطف بھی حاصل ہو، مگر ایک مدت کے لیے۔ آج کا فون یا گاڑی اس کی اچھی مثال ہیں۔ سورۃ النور میں ہے کہ ایسے گھروں میں داخل ہونے میں حرج نہیں جو کسی کی رہائش نہ ہوں اور جن میں تمہارا کوئی فائدہ ہو۔ نوٹس میں "رہائش نہ ہوں" کے الفاظ چھوٹ گئے تھے، جو اس آیت کی اصل شرط ہیں۔ مجاہد اور قتادہ نے اس سے سرائے اور دکانیں مراد لی ہیں۔ یعنی قرآن بازار کی جگہوں کو تسلیم کرتا ہے اور ان تک رسائی آسان کرتا ہے۔ اور ساتھ ہی یاد دلاتا ہے کہ دنیا کی زندگی دھوکے کا سامان بھی بن سکتی ہے۔
- **Source:** An-Nūr 24:29; Āl ʿImrān 3:185; al-Ṭabarī on 24:29. ⚠️ Corrects P06.6, softens P06.7.

---

# Episode 4 · تاجر، مسافر اور مجاہد
*Covers pages 7 to 8. Runtime ≈ 7:30.*
**Logline:** سورۃ المزمل میں تاجر اور مجاہد ایک ہی آیت میں کیوں آتے ہیں؟ اور قرآن حرکت، سفر اور تعمیر کو کیسے دیکھتا ہے؟

### E4.S1 · The night of worship · 0:45 · Paper
- **Covers:** P07.1, P07.2, P07.3
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** Deep indigo-paper night sky with a thin crescent; 73:2 writes on. Heading rises.
- **On screen (Arabic):** `قُمِ ٱلَّيۡلَ إِلَّا قَلِيلٗا`
- **On screen (Urdu):** `کاروباری ذہنیت: تجارت کا مقام`
- **Narration:** سورۃ المزمل رات کی طویل عبادت کے حکم سے شروع ہوتی ہے: رات کو قیام کرو، مگر تھوڑا۔ اور اسی سورت کی آخری آیت میں ایک حیرت انگیز بات ہے، جو تجارت کے مقام کو واضح کرتی ہے۔ ترمذی کی ایک روایت میں سچے امانت دار تاجر کو انبیاء، صدیقین اور شہداء کے ساتھ بتایا گیا ہے، اگرچہ محدثین نے اس کی سند پر کلام کیا ہے۔
- **Source:** Al-Muzzammil 73:1 to 4; Tirmidhī 1209 (🔍 grading varies).

### E4.S2 · Three groups, one verse · 1:10 · Paper
- **Covers:** P07.4, P07.5, P07.6
- **Badge:** قرآنی متن
- **Visual:** 73:20 excerpt. Three phrases lift into three columns with simple icons: bed, caravan, shield. Under the middle column the source slide's wording `اللہ کی راہ میں سفر` appears, is struck in coral, and replaced by `زمین میں سفر`.
- **On screen (Arabic):** `مَّرۡضَىٰ` / `يَضۡرِبُونَ فِي ٱلۡأَرۡضِ يَبۡتَغُونَ مِن فَضۡلِ ٱللَّهِ` / `يُقَٰتِلُونَ فِي سَبِيلِ ٱللَّهِ`
- **On screen (Urdu):** `مریض` · `اللہ کے فضل کی تلاش میں زمین میں سفر کرنے والے` · `اللہ کی راہ میں لڑنے والے`
- **Narration:** اللہ فرماتا ہے کہ وہ جانتا ہے تم میں کچھ بیمار ہوں گے، کچھ زمین میں سفر کریں گے اللہ کا فضل تلاش کرتے ہوئے، اور کچھ اللہ کی راہ میں جنگ کریں گے۔ ایک درستی ضروری ہے۔ نوٹس میں لکھا تھا کہ تاجر "اللہ کی راہ میں" سفر کرتے ہیں۔ آیت میں "فی سبیل اللہ" کے الفاظ جنگ کرنے والوں کے لیے ہیں۔ تاجروں کے لیے "فی الارض" ہے، یعنی زمین میں۔ مگر یہ بات اپنی جگہ اہم ہے کہ رات کی عبادت میں رعایت کے ذکر میں تاجر اور مجاہد ایک ساتھ آئے ہیں۔
- **Source:** Al-Muzzammil 73:20; ترجمہ: مودودی. ⚠️ Corrects P07.5.

### E4.S3 · What the early scholars drew from it · 1:00 · Paper
- **Covers:** P07.7, P07.8, P07.9
- **Badge:** تفسیری رائے
- **Visual:** Two quotation cards, sepia, each with name, source and a small "سند کی جانچ" tag. Card 1: Ibn Masʿūd. Card 2: ʿUmar.
- **On screen:** `ابن مسعودؓ: جو شخص مسلمانوں کے کسی شہر میں غلہ لا کر اس دن کے نرخ پر بیچے، اس کا مرتبہ شہداء جیسا ہے` / `عمرؓ: جہاد کے بعد مجھے سب سے زیادہ یہ پسند ہے کہ موت آئے تو میں پہاڑی راستوں میں اللہ کا فضل تلاش کر رہا ہوں` / `ماخذ: تفسیر قرطبی، سورۃ المزمل 20`
- **Narration:** امام قرطبی نے اس آیت کے تحت حضرت عبداللہ بن مسعود کا قول نقل کیا ہے کہ جو شخص مسلمانوں کے کسی شہر میں غلہ لا کر اس دن کے نرخ پر بیچے، اس کا مرتبہ اللہ کے ہاں شہیدوں جیسا ہے، پھر انہوں نے یہی آیت پڑھی۔ اور حضرت عمر سے منقول ہے کہ جہاد کے بعد انہیں سب سے زیادہ یہ پسند تھا کہ موت ایسی حالت میں آئے کہ وہ اللہ کا فضل تلاش کرتے ہوئے سفر میں ہوں۔ نوٹس میں اس قول کو ایک نامعلوم صحابی سے منسوب کیا گیا تھا۔ ان روایات کی سند پر محدثین کی تحقیق دیکھنا ضروری ہے، مگر یہ واضح ہے کہ سلف نے حلال تجارت کو کمتر نہیں سمجھا، بلکہ ایک بلند درجہ جانا۔
- **Source:** al-Qurṭubī on 73:20. 🔍 Grade both reports before VO lock; P07.9 attribution corrected to ʿUmar.

### E4.S4 · Walk its paths · 0:50 · Paper
- **Covers:** P08.1, P08.2, P08.3
- **Badge:** قرآنی متن
- **Visual:** A flat ink landscape unrolls like a carpet (بساط); footpaths draw across it. 71:19 to 20 and 67:15.
- **On screen (Arabic):** `وَٱللَّهُ جَعَلَ لَكُمُ ٱلۡأَرۡضَ بِسَاطٗا ۝ لِّتَسۡلُكُواْ مِنۡهَا سُبُلٗا فِجَاجٗا`
- **On screen (Urdu):** `اور اللہ نے زمین کو تمہارے لیے فرش کی طرح بچھا دیا، تاکہ تم اس کے کھلے راستوں میں چلو`
- **Narration:** قرآن جمود کی نہیں، حرکت کی ترغیب دیتا ہے۔ سورۃ الملک میں ہے: زمین کے کندھوں پر چلو پھرو اور اس کا رزق کھاؤ۔ اور حضرت نوحؑ اپنی قوم کو یاد دلاتے ہیں کہ اللہ نے زمین کو تمہارے لیے فرش کی طرح بچھایا تاکہ تم اس کے کھلے راستوں پر چلو۔
- **Source:** Nūḥ 71:19 to 20; Al-Mulk 67:15; ترجمہ: مودودی.

### E4.S5 · Nūḥ: a reminder, not a blueprint · 0:50 · Paper
- **Covers:** P08.4
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** The source slide's claim `نوحؑ نے انفراسٹرکچر کا خاکہ پیش کیا` appears and softens to grey. 71:10 to 12 appears: rain, wealth, children, gardens, rivers bloom as small ink icons.
- **On screen (Arabic):** `ٱسۡتَغۡفِرُواْ رَبَّكُمۡ … يُرۡسِلِ ٱلسَّمَآءَ عَلَيۡكُم مِّدۡرَارٗا ۝ وَيُمۡدِدۡكُم بِأَمۡوَٰلٖ وَبَنِينَ`
- **On screen (Urdu):** `اپنے رب سے معافی مانگو … وہ تم پر آسمان سے خوب بارشیں برسائے گا، تمہیں مال اور اولاد سے نوازے گا`
- **Narration:** نوٹس میں کہا گیا کہ نوحؑ نے قدیم دور میں انفراسٹرکچر اور عالمی معیشت کا خاکہ پیش کیا۔ آیت میں ایسا نہیں۔ نوحؑ اللہ کی نشانیاں یاد دلا رہے ہیں۔ مگر اسی سورت میں ایک واضح معاشی بات ہے: اپنے رب سے معافی مانگو، وہ تم پر خوب بارش برسائے گا، مال اور اولاد سے مدد دے گا، باغ اور نہریں دے گا۔ یہاں اخلاقی اصلاح اور معاشی خوشحالی کو جوڑا گیا ہے۔
- **Source:** Nūḥ 71:10 to 12. ⚠️ Corrects P08.4.

### E4.S6 · Dhul-Qarnayn: iron, copper, labour · 1:00 · Paper → Navy
- **Covers:** P08.5
- **Badge:** قرآنی متن · عصری اطلاق
- **Visual:** Two mountain walls in ink. Iron sheets stack between them, bellows glow, molten copper pours (restrained orange). A small coin bag offered and gently pushed back. Transition to navy: the same shape becomes a modern dam cross-section.
- **On screen (Arabic):** `مَا مَكَّنِّي فِيهِ رَبِّي خَيۡرٞ فَأَعِينُونِي بِقُوَّةٍ`
- **On screen (Urdu):** `جو کچھ میرے رب نے مجھے دے رکھا ہے وہ بہت ہے، تم بس محنت سے میری مدد کرو`
- **Narration:** ذوالقرنین کو اللہ نے ہر چیز کے اسباب دیے تھے۔ جب ایک قوم نے ان سے دیوار بنانے کے بدلے مال کی پیشکش کی تو انہوں نے انکار کیا اور کہا: میرے رب نے جو دیا ہے وہ بہتر ہے، تم محنت سے میری مدد کرو۔ پھر لوہے کی چادریں، دھونکنی اور پگھلا ہوا تانبا۔ یعنی مقامی لوگوں کی محنت، نئی ٹیکنالوجی، اور اپنے وسائل۔ یہ پسماندہ علاقے میں تعمیر کی ایک مثال ہے۔ نوٹس میں یہ بھی کہا گیا کہ انہوں نے تجارتی شراکت دار تلاش کیے، مگر یہ بات آیات میں نہیں ہے۔
- **Source:** Al-Kahf 18:84, 18:94 to 96. ⚠️ Corrects P08.5.

### E4.S7 · Ships, and studying abroad · 0:50 · Navy
- **Covers:** P08.6, P08.7
- **Badge:** قرآنی متن · عصری اطلاق
- **Visual:** 42:32 in gold on a dark sea; mountain-like sails. Then a navy world map with thin teal arcs of student flows (schematic, labelled `علامتی`).
- **On screen (Arabic):** `وَمِنۡ ءَايَٰتِهِ ٱلۡجَوَارِ فِي ٱلۡبَحۡرِ كَٱلۡأَعۡلَٰمِ`
- **On screen (Urdu):** `اور اس کی نشانیوں میں سے سمندر میں پہاڑوں جیسے جہاز ہیں` / `تعلیم کے لیے سفر: عصری اطلاق`
- **Narration:** قرآن سمندر میں پہاڑوں جیسے چلتے جہازوں کو اللہ کی نشانی کہتا ہے، اور سورۃ الروم میں کہتا ہے کہ یہ اس لیے ہیں کہ تم اس کا فضل تلاش کرو۔ اس سے یہ اطلاق نکالا جاتا ہے کہ بچوں کو ہنر اور اعلیٰ تعلیم کے لیے باہر بھیجنا دنیا پرستی نہیں، بلکہ ترقی کی ضرورت ہے۔ یہ ایک عصری اطلاق ہے، آیت کا براہ راست حکم نہیں۔
- **Source:** Ash-Shūrā 42:32; Ar-Rūm 30:46.

### E4.S8 · Ḥajj and trade · 1:00 · Paper → Navy
- **Covers:** P08.8, P08.9
- **Badge:** قرآنی متن · تفسیری رائے · عصری اطلاق
- **Visual:** Map of the Ḥijāz with three dots: ʿUkāẓ, Majannah, Dhul-Majāz (approximate, labelled `تقریبی مقام`). 2:198 writes on. Then navy: lines from many countries converging on Makkah.
- **On screen (Arabic):** `لَيۡسَ عَلَيۡكُمۡ جُنَاحٌ أَن تَبۡتَغُواْ فَضۡلٗا مِّن رَّبِّكُمۡ`
- **On screen (Urdu):** `اگر حج کے ساتھ ساتھ اپنے رب کا فضل بھی تلاش کرو تو کوئی مضائقہ نہیں`
- **Narration:** حج کے موسم میں تجارت کی اجازت قرآن میں صاف ہے۔ نوٹس میں حج کو دنیا کی سب سے بڑی بزنس کانفرنس کہا گیا ہے۔ یہ بات حج کے مقصد کو الٹ دیتی ہے۔ حج اول و آخر عبادت ہے۔ البتہ سورۃ الحج میں ہے کہ لوگ آئیں تاکہ اپنے لیے فوائد دیکھیں، اور کئی مفسرین نے ان فوائد میں دنیاوی فائدے بھی شامل کیے ہیں۔ تاریخ میں حج مسلم دنیا کے ملنے کی جگہ بھی رہا ہے۔ عبادت پہلے، تجارت اس کے ساتھ جائز۔
- **Source:** Al-Baqarah 2:198; Al-Ḥajj 22:28; Bukhari 2050. ⚠️ Softens P08.9.

---

# Episode 5 · صارف کا دل: خواہش، نمائش، توازن
*Covers pages 9 to 12. Runtime ≈ 8:00.*
**Logline:** جدید مارکیٹنگ انسان کی جن کمزوریوں کو استعمال کرتی ہے، قرآن نے ان کا نام لیا ہے۔ اور علاج بھی بتایا ہے: اعتدال اور نماز۔

### E5.S1 · Hasty by nature · 0:55 · Navy
- **Covers:** P09.1, P09.2, P09.3, P09.4
- **Badge:** قرآنی متن · تحقیق طلب دعویٰ
- **Visual:** A clean line-drawn head in teal. A checkout counter with small items glows; a thumbnail grid flickers. 75:20 and 17:11 appear in gold on a paper inset.
- **On screen (Arabic):** `كَلَّا بَلۡ تُحِبُّونَ ٱلۡعَاجِلَةَ` / `وَكَانَ ٱلۡإِنسَٰنُ عَجُولٗا`
- **On screen (Urdu):** `تم جلد ملنے والی چیز سے محبت رکھتے ہو` / `انسان بڑا جلد باز ہے`
- **Narration:** قرآن کہتا ہے کہ انسان جلد باز ہے، اور یہ کہ تم جلد ملنے والی چیز سے محبت کرتے ہو۔ سپر مارکیٹ کے کاؤنٹر پر رکھی چاکلیٹیں اور ویڈیو کے دلکش تھمب نیل اسی کمزوری سے فائدہ اٹھاتے ہیں۔ برطانیہ نے دو ہزار بائیس میں چیک آؤٹ کے قریب غیر صحت بخش اشیاء رکھنے پر پابندی اسی بنیاد پر لگائی۔ نوٹس میں سورۃ النساء کی آیت "انسان کمزور پیدا کیا گیا" بھی لائی گئی ہے؛ اس کا سیاق نکاح کے احکام میں آسانی ہے، اس لیے اسے یہاں تفسیری اطلاق سمجھیں۔
- **Source:** Al-Qiyāmah 75:20; Al-Isrā' 17:11; An-Nisā' 4:28 (context note). UK Food (Promotion and Placement) Regulations 2021, in force Oct 2022. 🔍

### E5.S2 · The inner void, and shuḥḥ · 1:00 · Navy → Paper
- **Covers:** P09.5, P09.6
- **Badge:** تفسیری رائے · قرآنی متن · عصری اطلاق
- **Visual:** A hollow circle in the chest of the line-drawn figure; ad tiles try to fill it and slide off. Paper inset with 13:28, then 59:9.
- **On screen (Arabic):** `أَلَا بِذِكۡرِ ٱللَّهِ تَطۡمَئِنُّ ٱلۡقُلُوبُ` / `وَمَن يُوقَ شُحَّ نَفۡسِهِۦ فَأُوْلَٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ`
- **On screen (Urdu):** `خبردار، اللہ کے ذکر ہی سے دلوں کو اطمینان ملتا ہے` / `اور جو اپنے نفس کے بخل سے بچا لیا گیا، وہی فلاح پانے والے ہیں`
- **Narration:** انسان کے اندر ایک خلا ہے، اور بہت سے اشتہار یہی وعدہ کرتے ہیں کہ یہ برانڈ آپ کو سکون دے گا۔ قرآن کہتا ہے کہ دلوں کا اطمینان اللہ کے ذکر میں ہے۔ اور ایک لفظ ہے "شُحّ"، یعنی ایسا لالچ اور بخل جس میں انسان کو اپنے سوا کسی کی پروا نہ ہو۔ قرآن کہتا ہے کہ جو اس سے بچا لیا گیا، وہی کامیاب ہے۔ آج کی صارفیت اسی نفسیات کو پروان چڑھاتی ہے: صرف اپنی ذات، اور ہر قیمت پر اپنا فائدہ۔
- **Source:** Ar-Raʿd 13:28 (interpretive link); Al-Ḥashr 59:9; At-Taghābun 64:16.

### E5.S3 · Mukhtāl: the imagined self · 1:00 · Navy
- **Covers:** P10.1, P10.2, P10.3, P10.4
- **Badge:** تفسیری رائے · عصری اطلاق · تحقیق طلب دعویٰ
- **Visual:** A figure before a mirror; the reflection is larger and wears a crown made of price tags. Root letters خ ی ل float between خیال and خیلاء.
- **On screen:** `مُخۡتَال` · `خ ی ل: خیال ↔ خیلاء` · `اپنی ایک خیالی تصویر`
- **Narration:** قرآن ایک جوڑا استعمال کرتا ہے: مختال اور فخور۔ مختال کی جڑ خ ی ل ہے، جس سے خیال بھی نکلا اور خیلاء یعنی تکبر بھی۔ اہلِ لغت اس تعلق کو بیان کرتے ہیں: مختال وہ ہے جو اپنی ایک خیالی تصویر بنا لے اور خود کو حقیقت سے بڑا سمجھے۔ آج فلٹر، دکھاوا اور نقلی سوشل میڈیا زندگی اسی کی شکلیں ہو سکتی ہیں۔ مسئلہ سنورنا نہیں، خود فریبی اور نمائش ہے۔ ماہرین سماجیات کے مطابق جن معاشروں میں دولت کا فرق زیادہ ہے، وہاں حیثیت کی دوڑ بھی زیادہ دیکھی گئی ہے، اگرچہ اس پر بحث جاری ہے۔
- **Source:** Lisān al-ʿArab (خ ی ل); Wilkinson & Pickett (2009); Walasek & Brown (2015). 🔍 ⚠️ P10.4 reframed.

### E5.S4 · Fakhūr, and Qārūn's parade · 1:10 · Navy → Paper
- **Covers:** P10.5, P10.6, P10.7
- **Badge:** قرآنی متن
- **Visual:** A plinth with a figure and a crowd holding up phones. Transition to paper: 28:79 then 28:80; the speaker label `وہ لوگ جنہیں علم دیا گیا تھا` appears clearly above 28:80. Finally the ground line gently closes (28:81), no spectacle.
- **On screen (Arabic):** `يَٰلَيۡتَ لَنَا مِثۡلَ مَآ أُوتِيَ قَٰرُونُ` / `وَقَالَ ٱلَّذِينَ أُوتُواْ ٱلۡعِلۡمَ وَيۡلَكُمۡ ثَوَابُ ٱللَّهِ خَيۡرٞ`
- **On screen (Urdu):** `کاش ہمیں بھی وہی ملتا جو قارون کو دیا گیا` / `علم والوں نے کہا: افسوس تمہارے حال پر، اللہ کا ثواب بہتر ہے`
- **Narration:** فخور وہ ہے جو اپنی بڑائی دوسروں پر جتائے۔ آج فالوورز کی تعداد اور مہنگے برانڈ کسی کی قیمت طے کرنے لگے ہیں۔ قرآن کہتا ہے: اللہ کسی مختال فخور کو پسند نہیں کرتا۔ اور قارون کا قصہ سناتا ہے۔ وہ اپنی پوری سج دھج کے ساتھ نکلا تو دنیا چاہنے والے بولے: کاش ہمیں بھی یہ ملتا۔ اور جنہیں علم دیا گیا تھا انہوں نے کہا: افسوس، اللہ کا ثواب بہتر ہے۔ نوٹس میں یہ جملہ براہ راست اللہ کا فرمان بتایا گیا تھا؛ دراصل یہ اہلِ علم کا قول ہے جسے قرآن نے نقل اور تسلیم کیا۔ پھر زمین نے قارون کو نگل لیا، اور کل کے حسرت کرنے والے شکر ادا کرنے لگے۔
- **Source:** Luqmān 31:18; Al-Ḥadīd 57:23; Al-Qaṣaṣ 28:79 to 82. ⚠️ Corrects P10.7.

### E5.S5 · Between two extremes · 1:10 · Navy
- **Covers:** P11.1, P11.2, P11.5, P11.6
- **Badge:** قرآنی متن · تحقیق طلب دعویٰ
- **Visual:** A horizontal ruler. Left end `قَتۡر`, right end `إِسۡرَاف`, a balance settles at the centre `قَوَام`. 25:67 writes on above in gold; 17:29 as a second line: a hand tied at the neck vs. an open hand.
- **On screen (Arabic):** `لَمۡ يُسۡرِفُواْ وَلَمۡ يَقۡتُرُواْ وَكَانَ بَيۡنَ ذَٰلِكَ قَوَامٗا`
- **On screen (Urdu):** `نہ فضول خرچی کرتے ہیں نہ بخل، بلکہ ان کا خرچ دونوں انتہاؤں کے درمیان اعتدال پر قائم رہتا ہے`
- **Narration:** رحمان کے بندوں کی ایک صفت یہ ہے کہ جب خرچ کرتے ہیں تو نہ اسراف کرتے ہیں نہ تنگی، بلکہ ان کا خرچ دونوں کے درمیان اعتدال پر ہوتا ہے۔ سورۃ بنی اسرائیل میں ہے: نہ ہاتھ گردن سے باندھ لو اور نہ بالکل کھلا چھوڑ دو۔ نوٹس کہتا ہے کہ معاشی بحران انتہائی بچت یا انتہائی خرچ سے آتے ہیں۔ ماہرین معاشیات کہیں گے کہ یہ دونوں بحران میں حصہ ڈال سکتے ہیں، مگر بحرانوں کی اور بھی وجوہات ہوتی ہیں، جیسے قرضوں کا بوجھ اور بینکاری کا بگاڑ۔
- **Source:** Al-Furqān 25:63, 25:67; Al-Isrā' 17:29. ⚠️ Softens P11.2, P11.6.

### E5.S6 · Qatr and isrāf in the real economy · 1:00 · Navy
- **Covers:** P11.3, P11.4, P11.7, P11.8
- **Badge:** تفسیری رائے · تحقیق طلب دعویٰ
- **Visual:** Left panel: shop shutters closing one by one as coins stop flowing (paradox of thrift loop diagram). Right panel: a demand curve shifting and a price gauge rising. Top: word card `قَتۡر = تنگی، بخل` with small note `قتیر: زرہ کی کڑیوں کے سر`.
- **On screen:** `قتر: تنگ کرنا، بخل` · `قتیر (الگ لفظ): زرہ کی کیلوں کے سر` · `بچت کا تضاد` · `طلب میں اضافہ ← مہنگائی کا دباؤ`
- **Narration:** نوٹس میں کہا گیا کہ "قتر" کا لفظی معنی لوہے کی وہ زرہ ہے جس سے تیر نہ گزر سکے۔ یہ درست نہیں۔ قتر کا معنی ہے تنگ کرنا اور بخل۔ عربی میں "قتیر" ایک الگ لفظ ہے، زرہ کی کیلوں کے سروں کے لیے، اور دونوں ایک ہی مادے سے ہیں۔ معاشی لحاظ سے، اگر مندی میں سب لوگ ایک ساتھ خرچ روک لیں تو کاروبار بند ہوتے ہیں اور نوکریاں جاتی ہیں؛ اسے بچت کا تضاد کہا جاتا ہے۔ اور اسراف طلب کو بڑھا کر قیمتوں پر دباؤ ڈال سکتا ہے، اور وسائل غیر ضروری چیزوں میں ضائع ہوتے ہیں۔ یہ سب حالات پر منحصر ہے، ہر وقت کا قانون نہیں۔
- **Source:** Lisān al-ʿArab (قتر, قتیر); Keynes (1936). Al-Aʿrāf 7:31. ⚠️ Corrects P11.3.

### E5.S7 · Prayer as recalibration · 1:10 · Navy (chart) → Paper
- **Covers:** P12.1, P12.2, P12.3, P12.4, P12.5
- **Badge:** قرآنی متن · تفسیری رائے · عصری اطلاق
- **Visual:** A teal wave labelled `دنیا کی دوڑ` drifts downward into noise (brand icons, tickers). Five short vertical gold ticks interrupt it through the day; after each tick the wave recentres. Label in corner: `علامتی خاکہ، ڈیٹا نہیں`. Paper inset: 24:37.
- **On screen (Arabic):** `رِجَالٞ لَّا تُلۡهِيهِمۡ تِجَٰرَةٞ وَلَا بَيۡعٌ عَن ذِكۡرِ ٱللَّهِ`
- **On screen (Urdu):** `ایسے لوگ جنہیں تجارت اور خرید و فروخت اللہ کی یاد سے غافل نہیں کرتی` / `نماز: توازن کی بحالی`
- **Narration:** دن بھر کی دوڑ میں انسان دولت، حیثیت اور برانڈز میں ڈوبتا جاتا ہے۔ پھر اذان ہوتی ہے، اور چند منٹ کے لیے وہ سب چھوڑ کر اللہ کے سامنے کھڑا ہو جاتا ہے۔ قرآن ایسے لوگوں کی تعریف کرتا ہے جنہیں تجارت اور خرید و فروخت اللہ کی یاد سے غافل نہیں کرتی۔ اور کہتا ہے کہ نماز بے حیائی اور برائی سے روکتی ہے۔ بعض مقررین نماز کو "چھوٹا حج" کہتے ہیں، یعنی روزانہ اپنی اصل حیثیت کو پہچاننے کا لمحہ۔ یہ ایک تشبیہ ہے۔ یہ خاکہ بھی علامتی ہے، کسی تحقیق کا ڈیٹا نہیں۔
- **Source:** An-Nūr 24:37; Al-ʿAnkabūt 29:45; Al-Jumuʿah 62:9. ⚠️ P12.4 labelled as schematic.

### E5.S8 · The Qur'anic consumer · 0:35 · Paper
- **Covers:** P12.6
- **Badge:** عصری اطلاق
- **Visual:** Three labels appear then step aside: `حلال فوڈ`, `سود سے پاک بینکاری`, and in the centre a figure outline filled with a calm gold gradient: `متوازن صارف`. End card.
- **On screen:** `اسلامی معیشت: صرف پراڈکٹس نہیں، شخصیت` / `اگلی قسط: بگاڑ کی جڑیں`
- **Narration:** اس حصے کا خلاصہ یہ ہے کہ اسلامی معیشت صرف حلال کھانے یا سود سے پاک بینکاری کا نام نہیں۔ اس کی بنیاد ایک ایسا انسان ہے جس کی شخصیت نماز اور شکر سے متوازن ہو۔ یہ اس سلسلے کا مرکزی خیال ہے، جسے ہم ایک رائے کے طور پر پیش کر رہے ہیں۔ اگلی قسط میں ہم دیکھیں گے کہ جب کاروبار میں دھوکہ اور معاشرے میں دولت کا ارتکاز بڑھ جائے تو کیا ہوتا ہے۔
- **Source:** Series thesis (opinion).

---

# Episode 6 · بگاڑ کی جڑیں: دھوکہ، ارتکاز، غفلت
*Covers pages 13 to 15. Runtime ≈ 8:00.*
**Logline:** قرآن صرف جرم سے نہیں روکتا، اس کی جڑ کو بھی پکڑتا ہے: کم تولنا، باطل طریقے سے مال کھانا، دولت کا چند ہاتھوں میں گھومنا، اور خریدی ہوئی غفلت۔

### E6.S1 · Bakhs: short-changing people · 1:00 · Paper → Navy
- **Covers:** P13.1, P13.2, P13.3
- **Badge:** قرآنی متن · عصری اطلاق
- **Visual:** An old balance scale in ink with one pan nudged. Transition: a navy loop diagram: phone on hold (clock), unanswered email, hidden fee line on a receipt, customer walking away.
- **On screen (Arabic):** `وَلَا تَبۡخَسُواْ ٱلنَّاسَ أَشۡيَآءَهُمۡ`
- **On screen (Urdu):** `لوگوں کو ان کی چیزوں میں گھاٹا نہ دو` / `طویل ہولڈ · جواب نہ دینا · پوشیدہ فیس`
- **Narration:** حضرت شعیبؑ نے اپنی قوم سے کہا: پورا ناپو اور تولو، اور لوگوں کو ان کی چیزوں میں گھاٹا نہ دو۔ عربی میں اس کے لیے لفظ ہے "بخس"۔ آج یہ صرف ترازو تک محدود نہیں۔ صارف کو گھنٹوں ہولڈ پر رکھنا، ای میل کا جواب نہ دینا، پوشیدہ فیسیں کاٹنا، تاکہ آدمی تھک کر اپنا حق مانگنا چھوڑ دے: یہ سب بخس کی جدید صورتیں ہیں۔ یہ مثالیں ہیں، کسی سروے کے اعداد نہیں۔
- **Source:** Hūd 11:85; Al-Aʿrāf 7:85; Ash-Shuʿarā' 26:183; Al-Muṭaffifīn 83:1 to 3.

### E6.S2 · 4:29 in full · 1:10 · Paper
- **Covers:** P13.4, P13.5
- **Badge:** قرآنی متن · تفسیری رائے · تحقیق طلب دعویٰ
- **Visual:** 4:29 writes on in full. The source slide's ellipsis `…` appears in coral where the middle clause was cut, then opens to reveal `إِلَّآ أَن تَكُونَ تِجَٰرَةً عَن تَرَاضٖ مِّنكُمۡ` in gold.
- **On screen (Arabic):** `لَا تَأۡكُلُوٓاْ أَمۡوَٰلَكُم بَيۡنَكُم بِٱلۡبَٰطِلِ إِلَّآ أَن تَكُونَ تِجَٰرَةً عَن تَرَاضٖ مِّنكُمۡۚ وَلَا تَقۡتُلُوٓاْ أَنفُسَكُمۡ`
- **On screen (Urdu):** `آپس میں ایک دوسرے کے مال باطل طریقوں سے نہ کھاؤ، لین دین آپس کی رضامندی سے ہونا چاہیے، اور اپنے آپ کو قتل نہ کرو`
- **Narration:** سورۃ النساء کی یہ آیت نوٹس میں ادھوری نقل ہوئی تھی۔ پوری آیت یوں ہے: ایک دوسرے کا مال باطل طریقے سے نہ کھاؤ، سوائے اس تجارت کے جو باہمی رضامندی سے ہو، اور اپنے آپ کو قتل نہ کرو۔ درمیان کا حصہ، یعنی باہمی رضامندی کی تجارت، معاشیات کی بنیاد ہے، اسے چھوڑنا نہیں چاہیے۔ امام طبری کے نزدیک "اپنے آپ کو قتل نہ کرو" کا مطلب ہے ایک دوسرے کو قتل نہ کرو۔ بعض مقررین اس ترتیب سے یہ نکتہ نکالتے ہیں کہ جب دھوکہ اور رشوت عام ہو جائے تو معاشرے میں غصہ بڑھتا ہے جو تشدد تک پہنچ سکتا ہے۔ یہ ایک تفسیری نکتہ ہے، اور اس کے سماجی پہلو پر تحقیق ملی جلی ہے۔
- **Source:** An-Nisā' 4:29; al-Ṭabarī on 4:29. ⚠️ Corrects P13.4.

### E6.S3 · Concentration at the top · 1:00 · Navy
- **Covers:** P14.1, P14.2, P14.3
- **Badge:** تحقیق طلب دعویٰ · قرآنی متن
- **Visual:** A clean stacked bar: global wealth share of top 10% vs bottom 50% (World Inequality Report 2022). Then a paper inset with 2:188, the phrase `وَتُدۡلُواْ بِهَآ إِلَى ٱلۡحُكَّامِ` underlined.
- **On screen:** `عالمی دولت: سب سے امیر 10٪ کے پاس ≈ 76٪، نچلے 50٪ کے پاس ≈ 2٪` · `ماخذ: World Inequality Report 2022` / Arabic: `وَتُدۡلُواْ بِهَآ إِلَى ٱلۡحُكَّامِ لِتَأۡكُلُواْ فَرِيقٗا مِّنۡ أَمۡوَٰلِ ٱلنَّاسِ`
- **Narration:** دنیا میں دولت کا ارتکاز ایک حقیقت ہے۔ ورلڈ ان ایکویلٹی رپورٹ دو ہزار بائیس کے مطابق دنیا کی سب سے امیر دس فیصد آبادی کے پاس تقریباً چھہتر فیصد دولت ہے، اور نچلی آدھی آبادی کے پاس صرف دو فیصد۔ نوٹس کہتا ہے کہ یہ طبقہ سیاست اور قانون کو خرید لیتا ہے۔ اس پر بحث ہے، مگر قرآن نے اس خطرے کا نام لیا ہے: اپنا مال حاکموں تک نہ پہنچاؤ تاکہ لوگوں کے مال کا کچھ حصہ ناجائز طور پر کھا سکو۔
- **Source:** World Inequality Report 2022 (Chancel, Piketty, Saez, Zucman). 🔍 Confirm figures. Al-Baqarah 2:188. Gilens & Page (2014) for policy capture, contested.

### E6.S4 · The cascade · 1:10 · Navy
- **Covers:** P14.4, P14.5, P14.6, P14.7
- **Badge:** تحقیق طلب دعویٰ · قرآنی متن
- **Visual:** Four steps cascade diagonally: `متوسط طبقے پر دباؤ` → `سود اور قرض` → `خاندانی دباؤ` → `جرم اور فرار`. Each step carries a small coral "ثبوت" tag with a source. Paper inset: 2:275 `وَأَحَلَّ ٱللَّهُ ٱلۡبَيۡعَ وَحَرَّمَ ٱلرِّبَوٰاْ`.
- **On screen:** step labels above / Arabic `وَأَحَلَّ ٱللَّهُ ٱلۡبَيۡعَ وَحَرَّمَ ٱلرِّبَوٰاْ` / Urdu `اللہ نے تجارت کو حلال اور سود کو حرام کیا`
- **Narration:** نوٹس ایک سلسلہ بیان کرتا ہے۔ پہلے متوسط طبقہ دباؤ میں آتا ہے؛ کئی ملکوں میں اس کے شواہد ہیں، اگرچہ ہر جگہ یکساں نہیں۔ پھر لوگ گزارے کے لیے قرض لیتے ہیں، اور سودی قرض کا جال پھیلتا ہے؛ قرآن نے تجارت کو حلال اور سود کو حرام کیا۔ پھر مالی دباؤ خاندانوں کو توڑتا ہے، اور لوگ جرم، نشے اور جوئے میں فرار ڈھونڈتے ہیں۔ ان میں سے کچھ کڑیوں پر مضبوط تحقیق ہے، جیسے "مایوسی کی اموات" پر کیس اور ڈیٹن کا کام۔ نوٹس میں جسم فروشی کے بڑھنے کا دعویٰ بھی ہے؛ اس کے لیے ہمیں قابل اعتماد ماخذ نہیں ملا، اس لیے ہم اسے شامل نہیں کر رہے۔
- **Source:** OECD (2019) *Under Pressure: The Squeezed Middle Class*; Case & Deaton (2020) *Deaths of Despair*; Al-Baqarah 2:275 to 279. ⚠️ P14.6 claim withheld pending evidence.

### E6.S5 · The Qur'an targets the root · 0:55 · Paper
- **Covers:** P14.8
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** A tree with the cascade's four fruits; the camera tilts down to its roots, where 59:7 writes on. Then 17:16 as a smaller second line.
- **On screen (Arabic):** `كَيۡ لَا يَكُونَ دُولَةَۢ بَيۡنَ ٱلۡأَغۡنِيَآءِ مِنكُمۡ`
- **On screen (Urdu):** `تاکہ وہ تمہارے مالداروں ہی کے درمیان گردش نہ کرتا رہے`
- **Narration:** قرآن نے ایک طرف چوری، جوئے اور بدکاری کو حرام کیا، تو دوسری طرف ان کی جڑ کو بھی نشانہ بنایا۔ مالِ فے کی تقسیم کا اصول بتاتے ہوئے فرمایا: تاکہ دولت تمہارے مالداروں ہی کے درمیان گردش نہ کرتی رہے۔ اور سورۃ بنی اسرائیل میں "مترفین" یعنی عیش پرست اشرافیہ کو بستیوں کی تباہی کا سبب بتایا۔
- **Source:** Al-Ḥashr 59:7; Al-Isrā' 17:16.

### E6.S6 · Pharaoh's method · 1:10 · Paper → Navy
- **Covers:** P15.1, P15.2, P15.3
- **Badge:** قرآنی متن · عصری اطلاق
- **Visual:** 28:4 on paper. `جَعَلَ أَهۡلَهَا شِيَعٗا` highlights first (divided into factions), then `يُذَبِّحُ أَبۡنَآءَهُمۡ`. Transition: a navy card reads `مقرر کی تشبیہ`, with the modern analogy in careful wording.
- **On screen (Arabic):** `إِنَّ فِرۡعَوۡنَ عَلَا فِي ٱلۡأَرۡضِ وَجَعَلَ أَهۡلَهَا شِيَعٗا … يُذَبِّحُ أَبۡنَآءَهُمۡ وَيَسۡتَحۡيِۦ نِسَآءَهُمۡ`
- **On screen (Urdu):** `فرعون نے زمین میں سرکشی کی اور اس کے باشندوں کو گروہوں میں بانٹ دیا… ان کے لڑکوں کو قتل کرتا اور لڑکیوں کو جیتا رہنے دیتا` / card: `تشبیہ، تفسیر نہیں`
- **Narration:** قرآن بتاتا ہے کہ فرعون نے اپنی قوم کو گروہوں میں بانٹ دیا، ایک گروہ کو کمزور رکھا، ان کے بیٹوں کو قتل کرتا اور بیٹیوں کو زندہ رہنے دیتا۔ مقرر اس سے ایک تشبیہ دیتے ہیں: کہ آج اسکرینوں اور فحش مواد کی لت نوجوانوں کی توانائی چھین رہی ہے، اور عورت کو تجارتی اشتہار بنا دیا گیا ہے۔ یہ ایک تشبیہ ہے، آیت کی تفسیر نہیں، اور یہ کہنا کہ کوئی منظم منصوبہ ایسا کر رہا ہے، ثبوت مانگتا ہے۔ البتہ فرعون کا پہلا حربہ، قوم کو تقسیم کرنا، آج بھی پہچانا جا سکتا ہے۔
- **Source:** Al-Qaṣaṣ 28:4; Al-Baqarah 2:49. ⚠️ P15.3 labelled as analogy.

### E6.S7 · Buying distraction · 1:05 · Paper → Navy
- **Covers:** P15.4, P15.5
- **Badge:** قرآنی متن · تفسیری رائے · تحقیق طلب دعویٰ
- **Visual:** 31:6 on paper; the verb `يَشۡتَرِي` glows. Sepia card: Ibn Masʿūd / al-Naḍr ibn al-Ḥārith. Transition to navy: an "attention economy" loop: user → engagement → ad revenue → more content → user.
- **On screen (Arabic):** `وَمِنَ ٱلنَّاسِ مَن يَشۡتَرِي لَهۡوَ ٱلۡحَدِيثِ لِيُضِلَّ عَن سَبِيلِ ٱللَّهِ`
- **On screen (Urdu):** `انسانوں میں کوئی ایسا بھی ہے جو دلفریب کلام خرید کر لاتا ہے تاکہ لوگوں کو اللہ کے راستے سے بھٹکا دے` / loop: `توجہ ← وقت ← اشتہار کی آمدنی`
- **Narration:** سورۃ لقمان میں ایسے شخص کا ذکر ہے جو "لہو الحدیث" خرید کر لاتا ہے تاکہ لوگوں کو اللہ کے راستے سے بھٹکائے۔ مفسرین کے مطابق نضر بن حارث فارس کے قصے اور گانے والی لونڈیاں خرید کر لاتا تھا تاکہ لوگ قرآن نہ سنیں۔ ابن مسعود نے اس سے گانا مراد لیا۔ آج کی توجہ کی معیشت میں بہت سی ایپس کی آمدنی اس پر ہے کہ ہم کتنا وقت ان پر گزارتے ہیں۔ یہ کاروباری ماڈل ایک حقیقت ہے۔ مگر یہ دعویٰ کہ اشرافیہ جان بوجھ کر عوام کو صنعت سے روکنے کے لیے ایسا کرتی ہے، ثبوت کا تقاضا کرتا ہے۔
- **Source:** Luqmān 31:6; al-Ṭabarī and Ibn Kathīr on 31:6. ⚠️ P15.5 intent claim flagged.

---

# Episode 7 · قرآنی حل: صدقہ، وراثت، نکاح
*Covers pages 16 to 18. Runtime ≈ 7:30.*
**Logline:** قرآن دولت کو گردش میں رکھنے کے لیے تین ادارے دیتا ہے: بااختیار بنانے والا صدقہ، لازمی وراثت، اور ذمہ دار خاندان۔

### E7.S1 · Feeding is not small · 0:55 · Paper
- **Covers:** P16.1, P16.2
- **Badge:** قرآنی متن
- **Visual:** 90:11 to 16 writes on as a mountain pass (العقبة) drawn as a steep ink path; each good deed is a step: freeing a neck, feeding on a day of hunger, a related orphan, a needy person in the dust.
- **On screen (Arabic):** `فَلَا ٱقۡتَحَمَ ٱلۡعَقَبَةَ … فَكُّ رَقَبَةٍ ۝ أَوۡ إِطۡعَٰمٞ فِي يَوۡمٖ ذِي مَسۡغَبَةٖ`
- **On screen (Urdu):** `کسی گردن کو غلامی سے چھڑانا، یا فاقے کے دن کسی قریبی یتیم یا خاک نشین مسکین کو کھانا کھلانا`
- **Narration:** نوٹس کہتا ہے کہ روایتی خیرات صرف کھانا کھلانا ہے، جو عارضی حل ہے۔ مگر پہلے یہ جان لیں کہ قرآن کھانا کھلانے کو چھوٹا کام نہیں سمجھتا۔ سورۃ البلد میں اسے ایک مشکل گھاٹی عبور کرنے کے برابر کہا گیا: کسی گردن کو آزاد کرانا، یا بھوک کے دن کسی یتیم یا خاک نشین مسکین کو کھانا کھلانا۔
- **Source:** Al-Balad 90:11 to 16; ترجمہ: مودودی.

### E7.S2 · Iṭʿām means feeding; empowerment is the next step · 1:05 · Paper → Navy
- **Covers:** P16.3, P16.4
- **Badge:** تفسیری رائے · عصری اطلاق
- **Visual:** Word card `إِطۡعَام = کھانا کھلانا` (the source slide's claim `ہنر سکھانا` is struck and moved to a teal "application" card). Navy diagram: bowl → tools → workshop → the person now feeding others (a closed loop). Paper inset 2:220.
- **On screen:** `اطعام: کھانا کھلانا` · `بااختیار بنانا: عصری اطلاق` / Arabic `قُلۡ إِصۡلَاحٞ لَّهُمۡ خَيۡرٞ` / Urdu `کہو: جس میں ان کی بھلائی ہو، وہی بہتر ہے`
- **Narration:** نوٹس میں کہا گیا کہ "اطعام" کا مطلب ہنر سکھانا ہے۔ یہ لفظ کا معنی نہیں؛ اطعام کا مطلب کھانا کھلانا ہی ہے۔ ہاں، بااختیار بنانا اس کا اگلا قدم ضرور ہے۔ یتیموں کے بارے میں قرآن کہتا ہے: جس میں ان کی اصلاح اور بھلائی ہو، وہی بہتر ہے۔ اور ابو داؤد کی ایک روایت ہے کہ نبی ﷺ نے ایک سوالی کا سامان بیچ کر اسے کلہاڑی دلوائی تاکہ وہ لکڑیاں کاٹ کر خود کمائے۔ یتیم کو تعلیم دینا اور مسکین کو کاروبار کا موقع دینا اسی روح کا اطلاق ہے۔
- **Source:** Al-Balad 90:14; Al-Baqarah 2:220; Abū Dāwūd 1641 (🔍 grading). ⚠️ Corrects P16.3.

### E7.S3 · Captives, debtors, and second chances · 0:50 · Paper → Navy
- **Covers:** P16.5
- **Badge:** قرآنی متن · عصری اطلاق
- **Visual:** 76:8 and a short excerpt of 9:60 (`وَفِي ٱلرِّقَابِ وَٱلۡغَٰرِمِينَ`). Navy: a simple path from a closed door to an open workshop.
- **On screen (Arabic):** `وَيُطۡعِمُونَ ٱلطَّعَامَ عَلَىٰ حُبِّهِۦ مِسۡكِينٗا وَيَتِيمٗا وَأَسِيرًا`
- **On screen (Urdu):** `اور اللہ کی محبت میں مسکین، یتیم اور قیدی کو کھانا کھلاتے ہیں` / `سابق قیدیوں کی بحالی: عصری اطلاق`
- **Narration:** قرآن نیک لوگوں کی صفت بتاتا ہے کہ وہ اللہ کی محبت میں مسکین، یتیم اور قیدی کو کھانا کھلاتے ہیں۔ یہاں قیدی سے مراد جنگی قیدی تھے۔ اور زکوٰۃ کے مصارف میں گردنیں آزاد کرانا اور قرض داروں کی مدد شامل ہے۔ آج اسی روح کو آگے بڑھاتے ہوئے، سزا کاٹ چکے لوگوں کو معاشرے کا فعال حصہ بنانا تاکہ وہ دوبارہ جرم کی طرف نہ جائیں، ایک عصری اطلاق ہے۔
- **Source:** Al-Insān 76:8; At-Tawbah 9:60.

### E7.S4 · Inheritance: wealth that must move · 1:10 · Navy → Paper
- **Covers:** P17.1, P17.2, P17.3, P17.4, P17.5
- **Badge:** قرآنی متن · تحقیق طلب دعویٰ
- **Visual:** Left: teal streams converge upward into one coin (concentration). Right: a single gold coin branches down into a family tree, shares splitting generation by generation. 4:7 writes on beneath, `نَصِيبٗا مَّفۡرُوضٗا` glowing.
- **On screen (Arabic):** `لِّلرِّجَالِ نَصِيبٞ مِّمَّا تَرَكَ ٱلۡوَٰلِدَانِ وَٱلۡأَقۡرَبُونَ وَلِلنِّسَآءِ نَصِيبٞ … نَصِيبٗا مَّفۡرُوضٗا`
- **On screen (Urdu):** `مردوں کے لیے بھی حصہ ہے اور عورتوں کے لیے بھی، خواہ تھوڑا ہو یا بہت، یہ حصہ مقرر ہے` / `وصیت: زیادہ سے زیادہ ایک تہائی`
- **Narration:** معیشت دانوں نے دکھایا ہے کہ وراثت میں ملی دولت نسل در نسل چند خاندانوں میں جمع رہ سکتی ہے۔ قرآن کا وراثت کا قانون اس کے برعکس سمت میں کام کرتا ہے۔ مردوں کا بھی حصہ ہے اور عورتوں کا بھی، تھوڑا ہو یا بہت، اور یہ حصہ مقرر ہے۔ صحیح بخاری کے مطابق وصیت ایک تہائی سے زیادہ نہیں ہو سکتی۔ یعنی باقی دولت لازماً کئی وارثوں میں بٹتی ہے۔ نوٹس کہتا ہے کہ قرآن "صرف ایک قانون" سے یہ اجارہ داری توڑتا ہے؛ درست یہ ہے کہ وراثت زکوٰۃ اور سود کی حرمت کے ساتھ مل کر کام کرتی ہے۔
- **Source:** An-Nisā' 4:7, 4:11 to 12, 4:176; Bukhari 2742; Piketty (2014). ⚠️ Corrects P17.4; garbled label P17.3 omitted.

### E7.S5 · A tendency, not a guarantee · 0:40 · Navy
- **Covers:** P17.6
- **Badge:** تحقیق طلب دعویٰ
- **Visual:** The family tree from S4; a few dotted bypass lines (trusts, companies, lifetime transfers) show wealth can route around it. Caption.
- **On screen:** `رجحان، ضمانت نہیں`
- **Narration:** کیا اس سے کوئی خاندان پوری دولت پر قابض نہیں ہو سکتا؟ یہ قانون اس سمت میں مضبوط دباؤ ڈالتا ہے، مگر تاریخ میں اوقاف، کمپنیوں اور زندگی میں کی گئی منتقلیوں کے ذریعے دولت جمع بھی رہی ہے۔ اسے ایک رجحان سمجھیں، ضمانت نہیں۔
- **Source:** ⚠️ Softens P17.6.

### E7.S6 · Maintenance, and the wife's own wealth · 1:00 · Paper
- **Covers:** P18.1, P18.2, P18.3
- **Badge:** قرآنی متن · تحقیق طلب دعویٰ
- **Visual:** Three rings (Venn) in gold on paper: `مالی ذمہ داری` `یتیموں کی کفالت` `سماجی ترقی`. The first ring brightens; 2:233 and 4:4 appear in sequence.
- **On screen (Arabic):** `وَعَلَى ٱلۡمَوۡلُودِ لَهُۥ رِزۡقُهُنَّ وَكِسۡوَتُهُنَّ بِٱلۡمَعۡرُوفِ`
- **On screen (Urdu):** `بچے کے باپ پر ان کا کھانا اور کپڑا معروف طریقے سے لازم ہے` / struck: `پہلی بار`
- **Narration:** قرآن گھر کے اخراجات کی ذمہ داری مرد پر رکھتا ہے: بچے کے باپ پر ماں کا کھانا اور لباس معروف طریقے سے لازم ہے۔ اور عورت کا اپنا مال، مہر اور کمائی اسی کی رہتی ہے۔ نوٹس میں کہا گیا کہ قرآن نے "پہلی بار" یہ ذمہ داری مرد پر ڈالی۔ یہ تاریخی طور پر درست نہیں؛ اس سے پہلے کے قوانین میں بھی شوہر پر نفقہ کی ذمہ داریاں تھیں۔ قرآن کی خصوصیت یہ ہے کہ اس نے اس ذمہ داری کے ساتھ عورت کی مالی خود مختاری کو بھی محفوظ رکھا۔
- **Source:** Al-Baqarah 2:233; An-Nisā' 4:4, 4:32, 4:34. ⚠️ Corrects P18.3.

### E7.S7 · 4:3 and the orphans · 1:05 · Paper
- **Covers:** P18.4
- **Badge:** قرآنی متن · تفسیری رائے · تحقیق طلب دعویٰ
- **Visual:** 4:3 writes on in full, including `فَإِنۡ خِفۡتُمۡ أَلَّا تَعۡدِلُواْ فَوَٰحِدَةً`. A sepia card: "حضرت عائشہؓ کی وضاحت، بخاری 4574". A second, lighter card: "بعد کی ایک رائے: بیواؤں اور یتیموں کی کفالت".
- **On screen (Arabic):** `وَإِنۡ خِفۡتُمۡ أَلَّا تُقۡسِطُواْ فِي ٱلۡيَتَٰمَىٰ فَٱنكِحُواْ مَا طَابَ لَكُم مِّنَ ٱلنِّسَآءِ مَثۡنَىٰ وَثُلَٰثَ وَرُبَٰعَۖ فَإِنۡ خِفۡتُمۡ أَلَّا تَعۡدِلُواْ فَوَٰحِدَةً`
- **On screen (Urdu):** `اگر تم یتیموں کے ساتھ بے انصافی سے ڈرتے ہو… لیکن اگر عدل نہ کر سکنے کا اندیشہ ہو تو پھر ایک ہی`
- **Narration:** یہ درست ہے کہ چار نکاحوں کی اجازت یتیموں کے ذکر کے ساتھ آئی ہے۔ مگر اس کی سب سے معتبر وضاحت حضرت عائشہ سے صحیح بخاری میں ہے: کچھ سرپرست اپنی زیر کفالت یتیم لڑکیوں سے ان کے مال کی خاطر، پورا مہر دیے بغیر، نکاح کرنا چاہتے تھے۔ انہیں کہا گیا کہ اگر انصاف نہ کر سکو تو دوسری عورتوں سے نکاح کرو۔ اور آیت خود کہتی ہے: اگر عدل نہ کر سکو تو ایک ہی۔ بیواؤں اور ان کے یتیم بچوں کی کفالت والی تعبیر بعد کی ایک رائے ہے۔ اور نوٹس کا یہ دعویٰ کہ اس سے جرائم ختم ہوتے ہیں، ثبوت کا محتاج ہے۔
- **Source:** An-Nisā' 4:3; Bukhari 4574. ⚠️ Corrects P18.4.

### E7.S8 · Marriage, freedom and mobility · 1:00 · Paper
- **Covers:** P18.5, P18.6
- **Badge:** قرآنی متن · تفسیری رائے · تحقیق طلب دعویٰ
- **Visual:** 24:32 writes on; `يُغۡنِهِمُ ٱللَّهُ مِن فَضۡلِهِۦ` glows. Two struck coral phrases from the source: `تاریخ میں پہلی بار` and `صرف ایک نسل میں`. End card.
- **On screen (Arabic):** `وَأَنكِحُواْ ٱلۡأَيَٰمَىٰ مِنكُمۡ وَٱلصَّٰلِحِينَ مِنۡ عِبَادِكُمۡ وَإِمَآئِكُمۡۚ إِن يَكُونُواْ فُقَرَآءَ يُغۡنِهِمُ ٱللَّهُ مِن فَضۡلِهِۦ`
- **On screen (Urdu):** `تم میں سے جو مجرد ہوں اور تمہارے غلام لونڈیوں میں سے جو صالح ہوں، ان کے نکاح کر دو؛ اگر وہ غریب ہوں تو اللہ اپنے فضل سے انہیں غنی کر دے گا` / end card `اگلی قسط: ولایت`
- **Narration:** قرآن کہتا ہے: اپنے میں سے بے نکاح لوگوں کا اور اپنے نیک غلاموں اور لونڈیوں کا نکاح کرا دو؛ اگر وہ غریب ہیں تو اللہ اپنے فضل سے انہیں غنی کر دے گا۔ یہ سماج کے سب سے نچلے طبقے کو خاندان اور عزت دینے کا راستہ تھا۔ فقہ میں یہ اصول بھی ہے کہ مالک سے لونڈی کی اولاد آزاد اور وارث ہے؛ یہ حدیث اور فقہ سے ہے، کسی آیت سے براہ راست نہیں۔ نوٹس کا یہ کہنا کہ یہ "تاریخ میں پہلی بار" ہوا، درست نہیں، اور "ایک ہی نسل میں برابری" کا دعویٰ بھی ثبوت کے بغیر ہے۔ سمت واضح ہے، مگر مبالغے کی ضرورت نہیں۔
- **Source:** An-Nūr 24:32; An-Nisā' 4:25; fiqh of *umm walad*; Code of Hammurabi §170 to 171 (counter-example). ⚠️ Corrects P18.5, P18.6.

---

# Episode 8 · ولایت: اتحاد کی معیشت
*Covers pages 19 to 21. Runtime ≈ 7:30.*
**Logline:** ولی کا لفظ اس گدی سے بھی جڑا ہے جو گھوڑے کی پیٹھ سے چپکی رہتی ہے۔ قرآن کہتا ہے کہ اگر اہلِ ایمان ایک دوسرے کے ولی نہ بنے تو زمین میں فتنہ ہوگا۔ یہ اتحاد آج کیسا دکھائی دے سکتا ہے؟

### E8.S1 · The saddle cloth · 1:00 · Paper
- **Covers:** P19.1, P19.2
- **Badge:** تفسیری رائے
- **Visual:** Fine ink drawing of a saddle with the cloth beneath highlighted in gold, labelled `وَلِیّہ`. The horse turns (simple line motion) and the cloth moves with it. Root card: `و ل ی: قرب`.
- **On screen:** `وَلایت: اٹوٹ قربت` · `و ل ی = قرب، نزدیکی` · `الوَلِیَّۃ: زین کے نیچے کی گدی (لسان العرب)`
- **Narration:** ولایت کا مادہ و، ل، ی ہے، اور اس کا بنیادی مطلب ہے قرب، نزدیکی۔ عربی لغت لسان العرب میں ایک لفظ "ولیّہ" بھی ملتا ہے: وہ گدی جو گھوڑے کی زین کے نیچے رکھی جاتی ہے اور اس کی پیٹھ سے چپکی رہتی ہے۔ گھوڑا جدھر مڑے، گدی بھی ادھر مڑتی ہے۔ نوٹس نے اسے لفظ کی اصل کہا؛ درست یہ ہے کہ یہ اسی مادے کا ایک خوبصورت استعمال ہے، جو ولایت کے مفہوم کو واضح کرتا ہے۔
- **Source:** Lisān al-ʿArab (ولي). ⚠️ Refines P19.2.

### E8.S2 · Those who disbelieve are allies of one another · 0:55 · Paper → Navy
- **Covers:** P19.3, P19.4
- **Badge:** قرآنی متن · عصری اطلاق · تحقیق طلب دعویٰ
- **Visual:** 8:73 first clause on paper. Transition to an accurate navy map: EU member states outlined in teal, NATO members in a thin outline; a few trade arcs. Label `مثال، تفسیر نہیں`.
- **On screen (Arabic):** `وَٱلَّذِينَ كَفَرُواْ بَعۡضُهُمۡ أَوۡلِيَآءُ بَعۡضٍ`
- **On screen (Urdu):** `جو لوگ منکرِ حق ہیں وہ ایک دوسرے کی حمایت کرتے ہیں` / `مشترکہ منڈی · مشترکہ دفاع`
- **Narration:** سورۃ الانفال میں ہے: جو لوگ انکار کرنے والے ہیں وہ ایک دوسرے کے ولی ہیں۔ مقرر اس آیت کو آج کی دنیا پر لاگو کرتے ہیں: کئی ملک ایک دوسرے کے وسائل، ٹیکنالوجی اور منڈیاں استعمال کرتے ہیں، اور ان کے مشترکہ دفاع اور آزاد تجارت کے معاہدے ہیں، جیسے یورپی یونین اور نیٹو۔ یہ مثالیں حقیقت ہیں، مگر انہیں اس آیت کا مصداق قرار دینا ایک عصری اطلاق ہے۔
- **Source:** Al-Anfāl 8:73 (first clause).

### E8.S3 · Madinah: the brotherhood pact · 1:10 · Paper
- **Covers:** P20.1, P20.2
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** Map of Madinah oasis (schematic, labelled). Two groups of dots (Muhājirūn in gold, Anṣār in sepia) pair up with thin lines. 8:72 writes on.
- **On screen (Arabic):** `وَٱلَّذِينَ ءَاوَواْ وَّنَصَرُوٓاْ أُوْلَٰٓئِكَ بَعۡضُهُمۡ أَوۡلِيَآءُ بَعۡضٖ`
- **On screen (Urdu):** `اور جن لوگوں نے جگہ دی اور مدد کی، وہی ایک دوسرے کے ولی ہیں` / `مؤاخات`
- **Narration:** مدینہ میں مہاجرین اور انصار الگ الگ پس منظر کے لوگ تھے۔ قرآن نے کہا کہ جنہوں نے ہجرت کی اور جنہوں نے پناہ دی اور مدد کی، وہ ایک دوسرے کے ولی ہیں۔ نبی ﷺ نے ان میں بھائی چارہ قائم کیا، جسے مؤاخات کہتے ہیں۔ شروع میں یہ رشتہ اتنا گہرا تھا کہ وہ ایک دوسرے کے وارث بھی بنتے تھے، بعد میں سورۃ الانفال کی آخری آیت نے وراثت کو خونی رشتوں تک محدود کر دیا۔ نوٹس نے اسے "شہریت دینا" کہا ہے؛ یہ آج کی اصطلاح ہے۔
- **Source:** Al-Anfāl 8:72, 8:75. Slide typo (repeated bracket) not reproduced.

### E8.S4 · The limits of wilāyah · 0:55 · Paper
- **Covers:** P20.3
- **Badge:** قرآنی متن
- **Visual:** The remainder of 8:72: two boundary lines draw: `ہجرت نہ کرنے والے` (no wilāyah obligation) and `معاہدہ` (help cannot breach a treaty).
- **On screen (Arabic):** `إِلَّا عَلَىٰ قَوۡمِۭ بَيۡنَكُمۡ وَبَيۡنَهُم مِّيثَٰقٞ`
- **On screen (Urdu):** `مگر کسی ایسی قوم کے خلاف نہیں جس سے تمہارا معاہدہ ہو`
- **Narration:** اسی آیت میں ولایت کی حدود بھی ہیں۔ جو ایمان لائے مگر ہجرت نہیں کی، ان سے ولایت کا وہ تعلق نہیں۔ اگر وہ دین کے معاملے میں مدد مانگیں تو مدد لازم ہے، مگر کسی ایسی قوم کے خلاف نہیں جس سے تمہارا معاہدہ ہو۔ یعنی اتحاد بھی عہد کی پابندی کے تابع ہے۔
- **Source:** Al-Anfāl 8:72; ترجمہ: مودودی.

### E8.S5 · A modern proposal · 1:00 · Navy map
- **Covers:** P20.4, P20.5, P20.6, P20.7
- **Badge:** عصری اطلاق
- **Visual:** Accurate navy map of OIC member states (outlined). Three icons appear sequentially: `کھلے ویزے`, `ٹیکنالوجی کا تبادلہ`, `مشترکہ منڈی`. Teal talent arcs and gold mineral arcs cross between regions (schematic).
- **On screen:** `عصری تجویز` · `کھلے ویزے` · `ٹیکنالوجی کا تبادلہ` · `مشترکہ منڈی`
- **Narration:** اس بنیاد پر مقرر کچھ عملی تجاویز دیتے ہیں۔ مسلم ممالک کے درمیان سرحدیں اور ویزے آسان ہوں تاکہ انسانی وسائل آزادانہ منتقل ہو سکیں۔ ایک ملک میں طبی ماہرین ہیں، دوسرے میں معدنیات؛ انہیں جوڑا جائے۔ اور باہر کے باصلاحیت لوگوں کو کاروبار اور شہریت کے مواقع دیے جائیں، تاکہ بہترین دماغ انہی ملکوں میں تبدیلی لائیں۔ یہ پالیسی کی تجاویز ہیں، قرآن کے احکام نہیں، اور ان پر بحث ہو سکتی ہے۔
- **Source:** Policy proposals (A).

### E8.S6 · 8:73, without a gloss · 1:00 · Paper
- **Covers:** P21.1, P21.2
- **Badge:** قرآنی متن · تفسیری رائے
- **Visual:** 8:73 full, clean, centred. The source slide's inserted bracket `(اتحاد اور معاشی بلاک)` appears inside the translation in coral, then lifts out and moves to a separate teal card labelled `مقرر کی تعبیر`.
- **On screen (Arabic):** `إِلَّا تَفۡعَلُوهُ تَكُن فِتۡنَةٞ فِي ٱلۡأَرۡضِ وَفَسَادٞ كَبِيرٞ`
- **On screen (Urdu):** `اگر تم یہ نہ کرو گے تو زمین میں فتنہ اور بڑا فساد برپا ہو گا` / teal card: `مقرر کی تعبیر: معاشی اتحاد`
- **Narration:** اب وہ آیت جسے نوٹس نے "حتمی تنبیہ" کہا ہے: اگر تم یہ نہ کرو گے تو زمین میں فتنہ اور بڑا فساد ہوگا۔ نوٹس نے ترجمے کے اندر "اتحاد اور معاشی بلاک" کے الفاظ ڈال دیے تھے۔ آیت کو ہم صاف رکھیں گے۔ ابن کثیر اور طبری کے مطابق "یہ" سے مراد ہے اہلِ ایمان کا ایک دوسرے کو ولی بنانا اور منکرین کو ولی نہ بنانا۔ اس میں معاشی تعاون کو شامل سمجھنا ایک جائز تعبیر ہو سکتی ہے، مگر یہ تعبیر ہے، متن نہیں۔
- **Source:** Al-Anfāl 8:73; Ibn Kathīr, al-Ṭabarī on 8:73. ⚠️ Corrects P21.2.

### E8.S7 · Economic strength and deterrence · 0:55 · Navy
- **Covers:** P21.3
- **Badge:** تحقیق طلب دعویٰ
- **Visual:** Two gauges: `فوجی طاقت` and `معاشی باہمی انحصار`. A network of trade lines thickens; a dashed line labelled `1914` appears as a counter-example.
- **On screen:** `معاشی طاقت بطور رکاوٹ؟` · `نظریہ: باہمی انحصار جنگ روکتا ہے` · `اعتراض: 1914`
- **Narration:** نوٹس کہتا ہے کہ جب تک معیشت کمزور ہے، دشمن صرف فوجی طاقت سے آپ کو دبا دے گا، اور اگر آپ کا معاشی بلاک دنیا کو بہترین ٹیکنالوجی دے رہا ہو تو دنیا حملے سے پہلے سوچے گی۔ بین الاقوامی تعلقات میں یہ ایک معروف نظریہ ہے کہ معاشی باہمی انحصار جنگ کو مہنگا بنا دیتا ہے۔ مگر اس پر اعتراض بھی ہے: پہلی عالمی جنگ سے پہلے یورپ کی معیشتیں گہرائی سے جڑی ہوئی تھیں، پھر بھی جنگ ہوئی۔
- **Source:** Liberal peace theory; Norman Angell, *The Great Illusion* (1910) and the 1914 counter-example.

### E8.S8 · Closing: build, and stay honest · 1:00 · Navy → Paper
- **Covers:** P21.4
- **Badge:** عصری اطلاق · قرآنی متن
- **Visual:** Navy: small icons of workshops, labs and start-ups light up across the OIC map. Ink-wipe back to paper, and the series' first verse returns: 62:10. Final credits with sources list.
- **On screen:** `عملی دعوت: تعمیر، تحقیق، مہارت` / Arabic `وَٱبۡتَغُواْ مِن فَضۡلِ ٱللَّهِ وَٱذۡكُرُواْ ٱللَّهَ كَثِيرٗا لَّعَلَّكُمۡ تُفۡلِحُونَ` / Urdu `اللہ کا فضل تلاش کرو اور اللہ کو کثرت سے یاد کرتے رہو، شاید کہ تمہیں فلاح نصیب ہو`
- **Narration:** مقرر کی آخری دعوت یہ ہے: نئے کاروبار بنائیں، تحقیق کے مراکز قائم کریں، اور مہارت کو فروغ دیں۔ نوٹس اسے عالمی فتنے کے خاتمے کا "واحد" قرآنی راستہ کہتا ہے؛ ہم اسے ایک راستہ کہیں گے، جس پر مقرر زور دیتے ہیں۔ اور یہ سلسلہ وہیں ختم ہوتا ہے جہاں سے شروع ہوا تھا: جب نماز پوری ہو جائے تو زمین میں پھیل جاؤ، اللہ کا فضل تلاش کرو، اور اللہ کو کثرت سے یاد کرتے رہو، تاکہ تم فلاح پاؤ۔ رزق کی تلاش اور اللہ کی یاد، ایک ساتھ۔
- **Source:** Al-Jumuʿah 62:10. ⚠️ Softens P21.4.

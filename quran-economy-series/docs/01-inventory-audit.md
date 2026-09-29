# Part 1: Source Inventory and Qur'anic Audit

**Source:** `Quranic_Economic_Blueprint.pdf`, 21 pages, 1376×768 pt. Every page is a single raster image (no text layer), exported from **Gemini Notebook**. Page 1 says the deck is "detailed notes based on a Nouman Ali Khan series". So this is an **AI generated summary of lectures**, not the lecturer's own words. The audit treats every claim as the deck's claim, not NAK's, unless it can be checked against his published lectures (which I could not access from this environment).

## How to read this document

Every inventoried point has an ID (`P05.3` = page 5, point 3). The episode plan in Part 2 cites these IDs, and `docs/coverage.py` checks that every ID is covered at least once.

| Code | Meaning | On screen badge (Urdu) |
|---|---|---|
| **T** | Direct text of the Qur'an (what the verse literally says) | `قرآنی متن` (gold) |
| **I** | Scholarly interpretation: classical tafsīr, lexicography, or recognised scholarly reading | `تفسیری رائے` (sepia) |
| **A** | Modern application: the deck's (or lecturer's) extension of the idea to today | `عصری اطلاق` (teal) |
| **E** | Empirical claim: a factual claim about history, economics or society that needs evidence | `تحقیق طلب دعویٰ` (coral) |

**Audit flags:** ⚠️ = inaccurate, misquoted, or overstated; 🔍 = plausible but needs a citation before broadcast; ✅ = checked and accurate.

**Reference texts used in the audit** (bundled in the npm package `quran-json@3.1.2`, sourced from Tanzil / QuranEnc):

* Arabic: Uthmani script (King Fahd Complex text via QuranEnc).
* English: Saheeh International.
* Urdu: Sayyid Abul A'la Maududi, *Tafhīm al-Qur'ān* translation.
* Tafsīr references cited from standard works: al-Ṭabarī (*Jāmiʿ al-Bayān*), Ibn Kathīr, al-Qurṭubī (*al-Jāmiʿ li-Aḥkām al-Qur'ān*), Maududi (*Tafhīm*), and Ibn Manẓūr (*Lisān al-ʿArab*) for lexicography. The live tafsīr sites (quran.com, tanzil.net, altafsir.com) were blocked from this container, so the tafsīr notes below are from these standard works as I know them. **Every tafsīr citation marked 🔍 should be checked page by page against a printed edition before broadcast.**

---

## Page 1: Title

| ID | Point | Code | Audit |
|---|---|---|---|
| P01.1 | Title: قرآن اور عالمی معیشت | A | Framing title. |
| P01.2 | Subtitle: مائیکرو اکنامکس سے میکرو پاور تک: معاشی استحکام کا الٰہی خاکہ | A | "Divine blueprint" is a framing claim; the series should present it as *a reading* of the Qur'an. |
| P01.3 | "Nouman Ali Khan کی سیریز پر مبنی تفصیلی نوٹس" | E | 🔍 Attribution. The deck is AI generated notes, so wording and examples may not be NAK's. Credit as "based on notes from lectures by Nouman Ali Khan" and do not put quotes in his mouth. |
| P01.4 | Decorative stamps "APPROVED BY: DIVINE DESIGN", "DATE: 2024", "PROJECT: ISLAMIC ECONOMICS BLUEPRINT" | E | ⚠️ The "Approved by Divine Design" stamp implies divine endorsement of a human study. **Do not reproduce.** |
| P01.5 | World map with gold trade lines and $ symbols | A | Visual only. Map labels in the image are garbled AI text ("SSS.A", "EDDB.65"). Rebuild the map from real geodata. |

## Page 2: A big misconception: separating dīn and dunyā

| ID | Point | Code | Audit |
|---|---|---|---|
| P02.1 | Heading: ایک بڑی غلط فہمی: دین اور دنیا کی تفریق | A | Thesis statement. |
| P02.2 | "The Qur'an does not reject the material world; it organises it." | I | Mainstream position; supported by 7:32, 28:77 (وَلَا تَنسَ نَصِيبَكَ مِنَ ٱلدُّنۡيَا), 62:10. |
| P02.3 | Common view: religion is limited to worship (prayer, fasting); business, livelihood and career are "dunyā" with no link to dīn | E | Characterisation of a popular attitude. Fair as a description of a mindset, but say "many people think", not "the common view is". |
| P02.4 | Qur'anic view: no separation between spirituality and materiality; earning, spending and doing business are also part of worship | I | Supported by 62:9–10 (leave trade for Jumuʿah, then return to seek Allah's bounty), 73:20, 2:198. "Part of worship" is an interpretive conclusion (intention based), not a verse wording. |
| P02.5 | The Qur'an should be studied not only for creed and fiqh (inheritance, divorce) but also through an economic lens | A | Methodological proposal. |
| P02.6 | "The Qur'an strongly criticises those who forbid themselves the lawful, good things Allah created (beauty, rizq)" | T | ✅ 7:32 قُلۡ مَنۡ حَرَّمَ زِينَةَ ٱللَّهِ ٱلَّتِيٓ أَخۡرَجَ لِعِبَادِهِۦ وَٱلطَّيِّبَٰتِ مِنَ ٱلرِّزۡقِ. Note: *zīnah* is "adornment" (dress/beauty), *ṭayyibāt min al-rizq* "good things of provision". Also 5:87. |
| P02.7 | "Cutting off from the world and sitting in caves is not Islam" | I | Supported by 57:27 (monasticism "they innovated it; We did not prescribe it") and the hadith "لا رهبانية في الإسلام" is weak in that wording; the sound hadith is the Prophet ﷺ rejecting celibacy/perpetual fasting ("فمن رغب عن سنتي فليس مني", Bukhari 5063). ⚠️ Do not quote "no monasticism in Islam" as a hadith. Note also the Prophet ﷺ himself retreated to Ḥirā', so say "permanent withdrawal from society", not "caves". |

## Page 3: The creation worldview: earth as prison or blessing?

| ID | Point | Code | Audit |
|---|---|---|---|
| P03.1 | Heading: تخلیق کا نظریہ: زمین ایک قید خانہ یا ایک نعمت؟ | A | |
| P03.2 | "Economic mindset starts from how we see this world" | I | Reasonable framing. |
| P03.3 | Biblical view: coming to earth is a punishment and a curse | E | ⚠️ **Oversimplified.** Genesis 3:17–19 says the *ground* is cursed "because of you" and man will eat "by the sweat of your brow"; it does not say that being on earth is itself a curse. Genesis 1:28 and 2:15 (tend and keep the garden, before the fall) present work and dominion positively. Christian traditions differ widely. |
| P03.4 | Biblical view: hard labour, diseases and agriculture are results of that curse | E | ⚠️ Toil and thorns: yes (Gen 3:17–19). Pain in childbirth: yes (3:16). "Diseases": not in Genesis 3. "Agriculture as a result of the curse": Adam already tends the garden in 2:15; toilsome farming is the result. |
| P03.5 | Biblical view: man is a prisoner in this world | E | ⚠️ Not a Genesis statement. The "world as prison" idea appears in some Christian and also Muslim ascetic writing (the hadith الدنيا سجن المؤمن, Muslim 2956, is itself Islamic). **Do not attribute this to "the Bible".** |
| P03.6 | Qur'anic view: being sent to earth is not a curse but a provision from Allah | T + I | ✅ 2:36 / 7:24: وَلَكُمۡ فِي ٱلۡأَرۡضِ مُسۡتَقَرّٞ وَمَتَٰعٌ إِلَىٰ حِينٖ ("a place of settlement and provision for a time"). 2:37 Adam is forgiven before descent. That this is "not a curse" is interpretation, but strongly grounded; 2:30 shows the earthly *khalīfah* was planned before the slip. |
| P03.7 | Earth contains abundant resources and blessings for humans | T | ✅ 7:10 وَجَعَلۡنَا لَكُمۡ فِيهَا مَعَٰيِشَ; 41:10 وَقَدَّرَ فِيهَآ أَقۡوَٰتَهَا. |
| P03.8 | Human purpose here: gratitude and using these blessings | T + I | ✅ 7:10 ends قَلِيلٗا مَّا تَشۡكُرُونَ; 14:37 لَعَلَّهُمۡ يَشۡكُرُونَ. Primary purpose in the Qur'an is worship (51:56); present gratitude and use as *part* of that. |
| P03.9 | Conclusion: developing the world economically and succeeding in it is part of being khalīfah on earth | I | 2:30 (khalīfah), 11:61 وَٱسۡتَعۡمَرَكُمۡ فِيهَا ("and settled you in it / asked you to cultivate it"). 11:61 is the stronger proof text; add it. Classical meaning of *khalīfah* is debated (successor of earlier beings, or vicegerent); keep "one reading". |

## Page 4: National security and economic prosperity

| ID | Point | Code | Audit |
|---|---|---|---|
| P04.1 | Heading: قومی سلامتی اور معاشی خوشحالی کا باہمی ربط | I | |
| P04.2 | Ibrāhīm (AS) in a barren valley asked for two things | T | ✅ 14:37 بِوَادٍ غَيۡرِ ذِي زَرۡعٍ; 2:126. |
| P04.3 | 1. "Make this city secure" (national security) | T + A | ✅ 2:126 رَبِّ ٱجۡعَلۡ هَٰذَا بَلَدًا ءَامِنٗا. "National security" is a modern gloss. |
| P04.4 | 2. "Provide its people with fruits" (economic prosperity) | T + A | ✅ 2:126 وَٱرۡزُقۡ أَهۡلَهُۥ مِنَ ٱلثَّمَرَٰتِ. Note the verse continues "whoever of them believes"; Allah replies He will also give the disbeliever enjoyment for a while. Include this: provision is not limited to believers. |
| P04.5 | Venn: امن ∩ خوشحالی = ریاست کی بقا | A | Visual thesis. |
| P04.6 | Without economy, security: the system cannot stand | E | 🔍 General political economy claim; reasonable, cite as principle not fact. |
| P04.7 | Without security, economy: investment and assets are not safe | E | 🔍 Well supported (World Bank *World Development Report 2011: Conflict, Security and Development*). |
| P04.8 | Makkah model: became a global trade pipeline and highway rest stop | E | ⚠️ **Overstated.** Qurayshi caravan trade is attested (106:2), but its scale is debated: Patricia Crone, *Meccan Trade and the Rise of Islam* (1987), argued it was regional (leather, clothing), not a spice "pipeline"; others (e.g. Mahmood Ibrahim, Gene Heck) argue for more. Say "a caravan hub" and note the debate. |
| P04.9 | The Qur'an formally recognised this economic route in Sūrat Quraysh | T | ✅ 106:1–4 لِإِيلَٰفِ قُرَيۡشٍ ... رِحۡلَةَ ٱلشِّتَآءِ وَٱلصَّيۡفِ ... ٱلَّذِيٓ أَطۡعَمَهُم مِّن جُوعٖ وَءَامَنَهُم مِّنۡ خَوۡفِۭ. Classical tafsīr (Ibn Kathīr, al-Ṭabarī): winter journey to Yemen, summer journey to Shām. Note 106:4 itself pairs food and security, which is the strongest proof for this whole page. |
| P04.10 | Map | E | ⚠️ **Map errors:** "شام" is labelled twice, once over Iran/Central Asia; "افریقہ" twice; a "یورپ" route goes to Greece. The Qur'an and tafsīr mention only Yemen and Shām. Rebuild: Makkah → Yemen (winter), Makkah → Shām/Bosra–Gaza (summer); anything further is labelled as "later/indirect links, debated". |

## Page 5: Qur'anic economic terms (1)

| ID | Point | Code | Audit |
|---|---|---|---|
| P05.1 | Heading: قرآنی معاشی اصطلاحات (حصہ اول): قرآن کی زبان میں چھپے معاشی تصورات | A | |
| P05.2 | **رِزْق = "The Supply Chain"** | A | ⚠️ Lexically *rizq* is "provision, what is given for sustenance" (Lisān: الرزق ما يُنتفع به). Qur'an attributes rizq to Allah (11:6, 51:58) and uses it for food (2:22, 50:11), wealth (2:3 "spend from what We provided"), and also non-material gifts (e.g. 11:88 رِزۡقًا حَسَنٗا, read by some as prophethood/knowledge). "Supply chain" is an **analogy**, not a meaning. |
| P05.3 | Meaning: "not only spiritual rizq but the food on your plate" | I | Correct in spirit, but the slide inverts the emphasis: the Qur'an's primary use of rizq is material; the spiritual sense is the extension. |
| P05.4 | Chain: بارش → فصلوں کی کاشت → جانوروں کی خوراک → کٹائی اور پروسیسنگ → ٹرانسپورٹ → آپ کی پلیٹ | T + A | ✅ First three links are Qur'anic: 80:24–32 فَلۡيَنظُرِ ٱلۡإِنسَٰنُ إِلَىٰ طَعَامِهِۦٓ ... أَنَّا صَبَبۡنَا ٱلۡمَآءَ صَبّٗا ... مَّتَٰعٗا لَّكُمۡ وَلِأَنۡعَٰمِكُمۡ (rain, crops, fodder for livestock); also 50:9–11 رِزۡقٗا لِّلۡعِبَادِ. Processing, transport and the plate are the modern extension (A). ⚠️ The slide's icons also misorder: its arrow chain reads right to left but the icons run left to right. |
| P05.5 | Insight: countries that control the agricultural and food supply chain dominate other nations | E | 🔍 **Needs evidence and softening.** Evidence of leverage exists (2022: Russia and Ukraine supplied roughly 30% of world wheat exports and the war sent prices to records, FAO/IFPRI 2022; export bans by India 2022). "Dominate" overstates; use "gain leverage". |
| P05.6 | **ثَمَرَة = "Investment & Maturity"** | A | Analogy. |
| P05.7 | Meaning: literally fruit, "but in the Qur'an it means investment" | I | ⚠️ **Overstated.** Literally fruit/produce. In 18:34 وَكَانَ لَهُۥ ثَمَرٞ some early authorities (Ibn ʿAbbās, Mujāhid, Qatādah per al-Ṭabarī; tied to the reading *thumur*) glossed it as wealth of all kinds; so "wealth/returns" is a *recognised reading of specific verses*, not the general Qur'anic meaning. |
| P05.8 | As planting an orchard involves labour, logistics and sales, business investment ripens over time into fruit (profit) | A | Fine as analogy. 18:42 (the owner "turning his hands over what he had spent on it") shows the Qur'an itself treats the garden as capital spent. |

## Page 6: Qur'anic economic terms (2)

| ID | Point | Code | Audit |
|---|---|---|---|
| P06.1 | Heading: (حصہ دوم) منافع، طلب اور صارفین کا برتاؤ | A | |
| P06.2 | **فَضْل = additional profit / bonus** (chart with break-even line) | I + A | *Faḍl* = bounty, surplus, grace. In trade contexts classical tafsīr reads "seeking Allah's faḍl" as trade/profit (2:198, per Ibn ʿAbbās in Bukhari 2050, 4519). "Bonus above break-even" is a modern analogy. |
| P06.3 | Sūrat al-Jumuʿah: "spread in the land and seek Allah's faḍl (business opportunities)" | T + I | ✅ 62:10 فَٱنتَشِرُواْ فِي ٱلۡأَرۡضِ وَٱبۡتَغُواْ مِن فَضۡلِ ٱللَّهِ. Add 62:9 (وَذَرُواْ ٱلۡبَيۡعَ): the same passage tells them to *leave trade* for prayer. The pairing is the point. |
| P06.4 | **مَتَاع = something used and enjoyed** | I | ✅ Lexically goods, provisions, anything enjoyed for a time (Lisān). Qur'an often pairs it with "for a time" (2:36). |
| P06.5 | Modern apps, cars and phones are the best examples of matāʿ; they work and their design attracts | A | Analogy. Note the Qur'an also uses *matāʿ* with a caution: 3:185 وَمَا ٱلۡحَيَوٰةُ ٱلدُّنۡيَآ إِلَّا مَتَٰعُ ٱلۡغُرُورِ. Show both sides. |
| P06.6 | An-Nūr 24:29: "no blame in entering houses (commercial buildings/shops) in which there is benefit (matāʿ) for you" | T + I | ⚠️ **Omission.** The verse says بُيُوتًا **غَيۡرَ مَسۡكُونَةٖ**, "houses *not inhabited*". The shops/inns reading is classical (Mujāhid, Qatādah, al-Ṭabarī: khāns, shops, public lodgings), so it is a sound interpretation, but the translation must include "uninhabited". |
| P06.7 | "This is Qur'anic endorsement of the importance of commercial centres" | A | Overreach: the verse is about permission to enter (after the rule of seeking permission, 24:27), not about importance. Say "the Qur'an assumes such spaces and eases access to them". |

## Page 7: Business mindset: jihād and trade on par

| ID | Point | Code | Audit |
|---|---|---|---|
| P07.1 | Heading: کاروباری ذہنیت: جہاد اور تجارت کا ہم پلہ ہونا | I | |
| P07.2 | In Islam business is not merely permissible but highly honourable | I | Supported by hadith (e.g. "the truthful, trustworthy merchant is with the prophets…", Tirmidhī 1209, graded ḥasan by some, weak by others 🔍). |
| P07.3 | Al-Muzzammil begins with commands of intense night worship | T | ✅ 73:1–4. |
| P07.4 | At the end Allah names three exempted groups: 1) the sick | T | ✅ 73:20 مَّرۡضَىٰ. |
| P07.5 | 2) those who travel **in the way of Allah** seeking faḍl (business) | T | ⚠️ **Misquoted.** The verse: يَضۡرِبُونَ فِي ٱلۡأَرۡضِ يَبۡتَغُونَ مِن فَضۡلِ ٱللَّهِ, "travelling **in the land**". "In the way of Allah" (فِي سَبِيلِ ٱللَّهِ) belongs to the third group (fighters). Correct in narration. |
| P07.6 | 3) those who fight in Allah's way (jihād) | T | ✅ يُقَٰتِلُونَ فِي سَبِيلِ ٱللَّهِ. |
| P07.7 | Mufassirūn and Companions: Allah placed travellers for lawful earning alongside mujāhidīn | I | 🔍 Al-Qurṭubī on 73:20 cites Ibn Masʿūd: whoever brings food to a Muslim town and sells it at the day's price has the rank of martyrs, then recited this verse. Chain should be checked. "Alongside" (mentioned together) is text; "equal rank" is interpretation. |
| P07.8 | Business is not a worldly obstacle but itself a high rank | I | Interpretive conclusion. |
| P07.9 | Famous Companion's saying: after martyrdom, the death I love most is on my mount carrying trade goods | I | 🔍 Attributed to **ʿUmar ibn al-Khaṭṭāb** (al-Qurṭubī on 73:20; Saʿīd ibn Manṣūr): "…than to come to it while I am between two mountain paths seeking of Allah's bounty". Name him and give the wording as reported; the slide's "on my mount with trade goods" is a paraphrase. Grade the chain before broadcast. |

## Page 8: Global links: infrastructure, research and travel

| ID | Point | Code | Audit |
|---|---|---|---|
| P08.1 | Heading: عالمی روابط: انفراسٹرکچر، تحقیق اور ہجرت برائے دنیا | A | |
| P08.2 | The Qur'an urges constant movement and progress rather than stagnation | I | Supported by 67:15 فَٱمۡشُواْ فِي مَنَاكِبِهَا وَكُلُواْ مِن رِّزۡقِهِۦ, 29:20 سِيرُواْ فِي ٱلۡأَرۡضِ. |
| P08.3 | Nūḥ (AS): "Allah made the earth a spread for you so you may walk its open roads" | T | ✅ 71:19–20 وَٱللَّهُ جَعَلَ لَكُمُ ٱلۡأَرۡضَ بِسَاطٗا ۝ لِّتَسۡلُكُواْ مِنۡهَا سُبُلٗا فِجَاجٗا. These are Nūḥ's words to his people. |
| P08.4 | Lesson: in ancient times Nūḥ presented a blueprint for infrastructure, travel and a global economy | A | ⚠️ **Overreach.** Nūḥ is reminding his people of Allah's signs, not proposing infrastructure. Better economic hook from the same sūrah: 71:10–12 (seek forgiveness → rain, wealth, children, gardens, rivers). |
| P08.5 | Dhul-Qarnayn and reinvestment: used vast resources to develop backward regions, new technology (the wall), and sought trade partners | T + A | Partly ✅: 18:84 (given means to everything); 18:94–96 people offer payment (خَرۡجًا), he declines ("what my Lord gave me is better") and asks for labour; iron and molten copper technology. ⚠️ "Sought trade partners" is **not in the text**. "Reinvestment in backward areas" is interpretation. |
| P08.6 | Youth travel for education: the Qur'an calls travel on ships a sign of Allah | T | ✅ 42:32 وَمِنۡ ءَايَٰتِهِ ٱلۡجَوَارِ فِي ٱلۡبَحۡرِ كَٱلۡأَعۡلَٰمِ; also 2:164, 30:46 (ships "that you may seek His bounty"). |
| P08.7 | Sending children abroad to learn skills and higher education is not "worldliness" but necessary for progress | A | Modern application. Could cite 9:122 (a group going out to gain understanding), which is about religious learning; label as analogy. |
| P08.8 | Ḥajj: no sin in seeking your Lord's faḍl (business) during Ḥajj | T + I | ✅ 2:198. Bukhari 2050: ʿUkāẓ, Majannah and Dhul-Majāz were pre-Islamic markets; Muslims hesitated to trade in Ḥajj season and this verse was revealed. |
| P08.9 | Ḥajj is the world's biggest business networking and trade convention | A | ⚠️ Overstated as description of Ḥajj's purpose (2:197, 22:27–28 put worship first; 22:28 لِّيَشۡهَدُواْ مَنَٰفِعَ لَهُمۡ does include worldly benefits in some tafsīr). Rephrase: "the Qur'an allows trade in Ḥajj; it has also historically been a meeting place of the Muslim world". |

## Page 9: Consumer psychology and weaknesses

| ID | Point | Code | Audit |
|---|---|---|---|
| P09.1 | Heading: صارف کی نفسیات اور خامیاں | A | |
| P09.2 | "The weaknesses modern marketing exploits were already described by the Qur'an" | I | Framing. |
| P09.3 | Weak willpower: man is weak by nature and runs toward instant pleasure | T | ✅ 4:28 وَخُلِقَ ٱلۡإِنسَٰنُ ضَعِيفٗا; 75:20 كَلَّا بَلۡ تُحِبُّونَ ٱلۡعَاجِلَةَ; 17:11 وَكَانَ ٱلۡإِنسَٰنُ عَجُولٗا. Note 4:28 in context is about Allah lightening marriage rules; applying it to consumption is interpretation. |
| P09.4 | Chocolates at supermarket counters and YouTube thumbnails exploit this | E | 🔍 Checkout placement driving impulse purchases is documented (e.g. UK ban on checkout HFSS placement, 2022, based on public health evidence). |
| P09.5 | Inner emptiness: ads target it so that brands give artificial comfort | I + E | No verse cited on the slide. Candidate: 13:28 أَلَا بِذِكۡرِ ٱللَّهِ تَطۡمَئِنُّ ٱلۡقُلُوبُ (label as interpretation). Marketing claim 🔍. |
| P09.6 | Extreme selfishness (شُحّ): caring for nobody but oneself; produces an industry that encourages self-love and saving money at all costs | T + A | ✅ 59:9 / 64:16 وَمَن يُوقَ شُحَّ نَفۡسِهِۦ فَأُوْلَٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ; 4:128 وَأُحۡضِرَتِ ٱلۡأَنفُسُ ٱلشُّحَّ. The "industry" link is application. |

## Page 10: The Qārūn complex: brand worship and false image

| ID | Point | Code | Audit |
|---|---|---|---|
| P10.1 | Heading: قارون کمپلیکس: برانڈز کی پوجا اور مصنوعی امیج | A | |
| P10.2 | Extreme wealth gaps produce "Qārūn psychology" in society | E + I | 🔍 Social science link between inequality and status consumption exists (e.g. Wilkinson & Pickett, *The Spirit Level*, 2009; Walasek & Brown 2015 on status-seeking search terms), contested. |
| P10.3 | **مُخْتَال**: building an imaginary, artificial image of oneself, bigger and better than reality | I | Root خ ي ل links *khayāl* (imagination) and *khuyalā'* (conceit); lexicographers connect them (Lisān). Recognised linguistic insight, keep as I. |
| P10.4 | Examples: heavy make-up, surgery, fake social-media life | A | ⚠️ Handle carefully: make-up and surgery are not in themselves *ikhtiyāl*; the point is self-deception and display. Avoid shaming appearance. |
| P10.5 | **فَخُور**: displaying one's supposed superiority to others; today follower counts and expensive brands set a person's value | I + A | ✅ Pair مُخۡتَالٖ فَخُورٍ appears in 4:36, 31:18, 57:23 (إِنَّ ٱللَّهَ لَا يُحِبُّ كُلَّ مُخۡتَالٖ فَخُورٍ). |
| P10.6 | Qur'anic cure, al-Qaṣaṣ: when Qārūn came out people said "would that we had the same" | T | ✅ 28:79. The slide's pen icon glyph after the quote is a stray artefact. |
| P10.7 | "The Qur'an rejected this brand worship and said Allah's reward is far better than these shiny things" | T | ⚠️ **Speaker misattributed.** In 28:80 the words are spoken by **"those who were given knowledge"** (ٱلَّذِينَ أُوتُواْ ٱلۡعِلۡمَ), which the Qur'an endorses; it is not a direct divine address. Also the ending: وَلَا يُلَقَّىٰهَآ إِلَّا ٱلصَّٰبِرُونَ. Then 28:81 the earth swallows him; 28:82 the same people retract. |

## Page 11: The Qur'anic spending formula: the middle path

| ID | Point | Code | Audit |
|---|---|---|---|
| P11.1 | Heading: خرچ کرنے کا قرآنی فارمولا: اعتدال کا راستہ | T | 25:67. |
| P11.2 | "Economic crises come from extreme saving or extreme spending" | E | ⚠️ **Oversimplified.** Excess saving in a downturn can deepen recession ("paradox of thrift", Keynes 1936) and excess credit-fuelled spending can feed bubbles, but crises have many causes (leverage, banking panics, policy). Say "can contribute to". |
| P11.3 | **قَتْر**: literally "iron chain mail that no arrow can pass" | I | ⚠️ **Etymology inaccurate.** *Qatr/iqtār* = to be stingy, to narrow (Lisān: التضييق). *Qatīr* separately means the rivet heads of chain mail (رؤوس مسامير الدرع), and *qatarah* is dust/gloom (80:41). A root link exists, but "the literal meaning of qatr is chain mail" is wrong. |
| P11.4 | When people hold money back, businesses close, jobs end, recession | E | 🔍 Paradox of thrift, standard macroeconomics; conditional (holds in demand-constrained downturns). |
| P11.5 | **قَوَام**: the servants of the Most Merciful neither waste nor are stingy but stay moderate between | T | ✅ 25:67 وَٱلَّذِينَ إِذَآ أَنفَقُواْ لَمۡ يُسۡرِفُواْ وَلَمۡ يَقۡتُرُواْ وَكَانَ بَيۡنَ ذَٰلِكَ قَوَامٗا (context 25:63 عِبَادُ ٱلرَّحۡمَٰنِ). Also 17:29. |
| P11.6 | "This keeps the market stable" | E | 🔍 Application; moderate spending supports stability but "market stable" is a macro claim. |
| P11.7 | **إِسْرَاف**: pouring money into unnecessary things | T | ✅ 7:31 وَلَا تُسۡرِفُوٓاْ; 17:26–27 تَبۡذِير. |
| P11.8 | This raises demand, inflation peaks, resources are wasted on luxuries | E | 🔍 Demand-pull inflation is real but household luxury spending alone rarely drives national inflation. Soften. |

## Page 12: Prayer: the ultimate psychological calibrator

| ID | Point | Code | Audit |
|---|---|---|---|
| P12.1 | Heading: نماز: حتمی نفسیاتی کیلیبریٹر | A | Metaphor. |
| P12.2 | Leaving the race of the material world and connecting to reality | I | 62:9 (leave trade for prayer), 29:45 (prayer restrains from indecency; remembrance of Allah is greater), 24:37 رِجَالٞ لَّا تُلۡهِيهِمۡ تِجَٰرَةٞ وَلَا بَيۡعٌ عَن ذِكۡرِ ٱللَّهِ. 24:37 is the ideal proof text; add it. |
| P12.3 | Prayer time: a few minutes cut off from the world before Allah, recognising one's real status ("Mini Hajj") | I + A | "Mini Hajj" is a lecturer's metaphor, not a term of the sources. |
| P12.4 | Chart: psychological state vs time; sinking into the race (wealth, status, brands) | A | ⚠️ The sine chart is **illustrative, not data**. Label it "علامتی خاکہ" on screen. |
| P12.5 | Returning to the world with balance and moderation | I | |
| P12.6 | Key insight: an Islamic economy is not just "halal food" or "interest-free banking"; it is producing a "Qur'anic consumer" whose personality is balanced by prayer and gratitude | I + A | Opinion of the deck. Present as the series' thesis. |

## Page 13: Business corruption and fraud

| ID | Point | Code | Audit |
|---|---|---|---|
| P13.1 | Heading: کاروباری بدعنوانی اور غبن: صارفین کو دھوکہ دینا معاشرے کو تباہی کی طرف لے جاتا ہے | I | |
| P13.2 | **بَخْس: "Exhausting the Consumer"**: "The Qur'an says: do not give people less of their things" | T | ✅ 11:85, 7:85, 26:183 وَلَا تَبۡخَسُواْ ٱلنَّاسَ أَشۡيَآءَهُمۡ (Shuʿayb to Madyan). Also 83:1–3. "Exhausting" is the deck's gloss; *bakhs* = diminishing, short-changing. |
| P13.3 | Customer service keeping people on hold 40–40 minutes, not answering emails, hidden fees, so the consumer gives up | A + E | Application. 🔍 "40 minutes" is anecdotal; present as example, not statistic. Slide typo "40-40". |
| P13.4 | Deadly link, an-Nisā' 4:29: "Do not consume each other's wealth wrongfully … and do not kill yourselves" | T | ⚠️ **The ellipsis hides the key clause**: إِلَّآ أَن تَكُونَ تِجَٰرَةً عَن تَرَاضٖ مِّنكُمۡ, "except trade by mutual consent". For an economics series this clause is central. Also وَلَا تَقۡتُلُوٓاْ أَنفُسَكُمۡ: al-Ṭabarī's preferred reading is "do not kill one another"; others read suicide or self-ruin. |
| P13.5 | When fraud, lies and bribery become common at corporate level, frustration grows, ending in violent crime and killing | E | 🔍 Link between perceived unfairness/corruption and violence has some support but is complex. Present as the lecturer's reading of the verse order (I), plus a hedged empirical claim. |

## Page 14: The tragedy of capitalist oligarchy

| ID | Point | Code | Audit |
|---|---|---|---|
| P14.1 | Heading: سرمایہ دارانہ آمریت کا المیہ | A | |
| P14.2 | How the existence of an ultra-rich class destroys the lower class | E | 🔍 Causal claim. |
| P14.3 | 0.1% Elite: extreme concentration; they buy politics and law | E | 🔍 Concentration: documented (World Inequality Report 2022). Policy capture: argued by Gilens & Page (2014), contested. Qur'anic link: 2:188 وَتُدۡلُواْ بِهَآ إِلَى ٱلۡحُكَّامِ (bribing rulers): **add**. |
| P14.4 | Middle-class squeeze: poor and poorer | E | 🔍 Varies by country (Pew 2015, OECD *Under Pressure: The Squeezed Middle Class* 2019). |
| P14.5 | Riba economy: people fall into debt traps to survive | T + E | Ribā prohibition ✅ 2:275–279, 3:130. Debt-trap dynamics 🔍. |
| P14.6 | Societal collapse: financial pressure breaks families and prostitution grows | E | ⚠️ Sensitive and **needs strong evidence**; financial stress and family breakdown have research support; the prostitution claim should be dropped or sourced. |
| P14.7 | Crime & escapism: theft, robbery and killing become common; people turn to drugs and gambling | E | 🔍 Economic strain theory (Agnew) and "deaths of despair" (Case & Deaton 2020) support a hedged version. |
| P14.8 | The Qur'an both forbade the harām acts and targeted their root: unequal economic system and corrupt elite | I | Strong proof texts: 59:7 كَيۡ لَا يَكُونَ دُولَةَۢ بَيۡنَ ٱلۡأَغۡنِيَآءِ مِنكُمۡ; 17:16 (the *mutrafūn*, affluent elite); 2:188. Add them; the slide cites none. |

## Page 15: Pharaoh's strategy and lahw al-ḥadīth

| ID | Point | Code | Audit |
|---|---|---|---|
| P15.1 | Heading: فرعون کی حکمتِ عملی اور لَهْوَ الْحَدِيث: ایلیٹ طبقہ عوام کو اٹھنے سے کیسے روکتا ہے؟ | I + A | |
| P15.2 | "The Emasculation of Men": Pharaoh slaughtered boys and kept women alive | T | ✅ 28:4 يُذَبِّحُ أَبۡنَآءَهُمۡ وَيَسۡتَحۡيِۦ نِسَآءَهُمۡ; 2:49; 14:6. Also 28:4 جَعَلَ أَهۡلَهَا شِيَعٗا (divided people into factions), a stronger political point. |
| P15.3 | Today's method: making men mentally useless through screens, devices and porn, and commercialising women; this ends a society's economic momentum | A + E | ⚠️ **Polemical analogy, not tafsīr.** The phrase "emasculation" and a coordinated "method" imply intent without evidence. Present only as the lecturer's analogy, with clear labelling; evidence on screen time and productivity is mixed. |
| P15.4 | **لَهْوَ الْحَدِيث (Purchasing Distraction)** | T + I | ✅ 31:6 وَمِنَ ٱلنَّاسِ مَن يَشۡتَرِي لَهۡوَ ٱلۡحَدِيثِ لِيُضِلَّ عَن سَبِيلِ ٱللَّهِ. Classical tafsīr: Ibn Masʿūd swore it means singing; Ibn ʿAbbās; also al-Naḍr ibn al-Ḥārith buying Persian tales / singing girls to distract people from the Qur'an (al-Ṭabarī, Ibn Kathīr). "Purchasing" is textual (يَشۡتَرِي). |
| P15.5 | The corrupt elite invests in entertainment and social-media apps to stop people moving to economic or purposeful industry; people jump app to app with no mental space | A + E | ⚠️ Intent claim ("to stop people") is conspiratorial as stated. Attention-economy business models are documented (ad revenue from engagement); present that, not intent. |

## Page 16: Qur'anic solution (1): true ṣadaqah

| ID | Point | Code | Audit |
|---|---|---|---|
| P16.1 | Heading: معاشی استحکام کا قرآنی حل (حصہ اول): حقیقی صدقہ: صرف کھانا کھلانا نہیں، بلکہ معاشی طور پر بااختیار بنانا | A | |
| P16.2 | Traditional charity: 1) just give food to the hungry 2) they depend on the same fund again 3) only a temporary fix | A | Fair critique of dependency, but the Qur'an itself praises feeding (76:8, 90:14). Do not belittle feeding. |
| P16.3 | Qur'anic ṣadaqah: 1) "*iṭʿām* (feeding) means teaching a skill so they can earn their own food" | I | ⚠️ **Inaccurate.** *Iṭʿām* literally means feeding (90:14 أَوۡ إِطۡعَٰمٞ فِي يَوۡمٖ ذِي مَسۡغَبَةٖ). Empowerment is a legitimate *application*, supported by the hadith of the man sold his goods to buy an axe (Abū Dāwūd 1641, 🔍 graded), not a meaning of the word. |
| P16.4 | 2) Educate orphans, set the needy up in business so they are not a burden | I + A | 2:220 قُلۡ إِصۡلَاحٞ لَّهُمۡ خَيۡرٞ ("improvement for them is best") supports it; 90:15–16. |
| P16.5 | 3) Make ex-prisoners active members so they don't return to crime | A | 76:8 أَسِيرًا means captive (war captive in tafsīr); 90:13 فَكُّ رَقَبَةٍ (freeing a neck). Extending to ex-prisoners is application. 9:60 ٱلۡغَٰرِمِينَ (debtors) is also relevant. |

## Page 17: Qur'anic solution (2): law of inheritance

| ID | Point | Code | Audit |
|---|---|---|---|
| P17.1 | Heading: (حصہ دوم) وراثت کا قانون: خاندانی اجارہ داری کے خاتمے کا الٰہی فارمولا | I | |
| P17.2 | The capitalist problem: billionaire families' wealth stays concentrated for generations, creating extreme inequality | E | 🔍 Piketty, *Capital in the 21st Century* (2014) on inherited wealth. |
| P17.3 | Label "موت خاجات" |: | ⚠️ Garbled text (AI artefact). Omit. |
| P17.4 | "The Qur'an breaks this oligarchy through just one law" | I | ⚠️ **Overstated.** Inheritance works alongside zakāh (9:60), the ban on ribā (2:275), and 59:7. Say "one of its strongest tools". |
| P17.5 | After death wealth is compulsorily distributed horizontally among heirs | T | ✅ 4:7 نَصِيبٗا مَّفۡرُوضٗا (an obligatory share, "be it little or much"); 4:11–12, 4:176. Bequest capped at one third (Bukhari 2742, Saʿd ibn Abī Waqqāṣ). |
| P17.6 | So no single family can seize the whole society's wealth | E | 🔍 Tendency, not guarantee (waqf, corporate structures and pre-death transfers can circumvent). Soften. |

## Page 18: Qur'anic solution (3): marriage as economic institution

| ID | Point | Code | Audit |
|---|---|---|---|
| P18.1 | Heading: (حصہ سوم) شادی بطور معاشی ادارہ: شادی، تعدد ازواج اور غلاموں کی معاشرتی ترقی کا معاشی پہلو | I | |
| P18.2 | Venn: مالی ذمہ داری / یتیموں کی کفالت / سماجی ترقی | A | |
| P18.3 | Man's financial responsibility: "The Qur'an for the first time made clear that the household's full financial responsibility is on the man" | T + E | ✅ Text: 4:34 وَبِمَآ أَنفَقُواْ مِنۡ أَمۡوَٰلِهِمۡ; 2:233 وَعَلَى ٱلۡمَوۡلُودِ لَهُۥ رِزۡقُهُنَّ وَكِسۡوَتُهُنَّ. ⚠️ **"For the first time" is historically false**: husbands' maintenance duties exist in earlier legal systems (e.g. Mesopotamian codes, Jewish ketubah obligations). Drop "first time"; emphasise that the wife's own wealth stays hers (4:4, 4:32). |
| P18.4 | Polygamy and ending crime: the Qur'an gave permission for 4 marriages "in the context of orphans"; wealthy men adopting widows and their orphans keeps them off the streets and out of crime | T + I + E | ✅ 4:3 context is orphans. ⚠️ But the most authoritative reading (ʿĀ'ishah, Bukhari 4574) is that guardians who feared being unjust to orphan girls in their care (marrying them for their wealth without fair dowry) should marry other women. The "marry widows to support orphans" reading is a later interpretation. The verse also says "if you fear you will not be just, then one". The crime link 🔍 is unsupported. |
| P18.5 | Social mobility of the lower class: for the first time in history children of slave women were declared legitimate heirs | I + E | ⚠️ The rule (child of a master by his slave, *umm walad*, is free and inherits) comes from hadith and fiqh, not a verse. "First time in history" is **false**: e.g. Code of Hammurabi §170–171 allowed a father to recognise his slave's children as heirs. |
| P18.6 | Marriage and inheritance laws raised the lowest to economic parity in just one generation | E | ⚠️ Unsupported and overstated. Qur'anic support for the *direction*: 24:32 (marry off the unmarried and righteous slaves; "if poor, Allah will enrich them from His bounty"), 4:25, 90:13. Drop "one generation". |

## Page 19: Global strategy: the concept of wilāyah

| ID | Point | Code | Audit |
|---|---|---|---|
| P19.1 | Heading: عالمی حکمتِ عملی: وَلَایَت کا تصور: غیر متزلزل اتحاد اور وسائل کی شراکت داری | I | |
| P19.2 | Root: the word *walī* comes from the pad placed under a horse saddle, which clings to the horse's back; where the horse turns, the pad turns; an unbreakable bond | I | ✅ Lexically attested: Lisān al-ʿArab records الوَلِيَّة as the saddle cloth (البرذعة / what is under it). But the root's core meaning is nearness (الوَلْي: القُرب). Present the saddle-pad as a vivid *usage*, not "the origin". |
| P19.3 | The global reality: the Qur'an says those who disbelieve are *awliyā'* of one another | T | ✅ 8:73 وَٱلَّذِينَ كَفَرُواْ بَعۡضُهُمۡ أَوۡلِيَآءُ بَعۡضٍ. |
| P19.4 | They use each other's resources, technology and markets; common defence and free trade | E + A | 🔍 Refers to e.g. NATO, EU single market: factual examples OK; linking them to 8:73 is application. |

## Page 20: Building a Muslim economic bloc

| ID | Point | Code | Audit |
|---|---|---|---|
| P20.1 | Heading: مسلم اکنامک بلاک کی تعمیر: بارڈر لیس تعاون اور ٹیلنٹ کا تبادلہ | A | |
| P20.2 | Blueprint in Madinah: Muhājirūn and Anṣār were separate tribes but Allah made them each other's *walī* (economic partnership, giving citizenship) | T + I | ✅ 8:72 أُوْلَٰٓئِكَ بَعۡضُهُمۡ أَوۡلِيَآءُ بَعۡضٖ; the *muʾākhāh* (brotherhood pact) even included mutual inheritance at first, later superseded by 8:75 (blood relatives more entitled). "Citizenship" is a modern gloss. Slide repeats "(معاشی شراکت، شہریت دینا)" twice (typo). |
| P20.3 | Yet they kept priority for internal affairs | T + I | 8:72: no *wilāyah* obligation toward believers who did not emigrate, and help cannot breach a treaty (إِلَّا عَلَىٰ قَوۡمِۭ بَيۡنَكُمۡ وَبَيۡنَهُم مِّيثَٰقٞ). Explain this properly; it is an important limit. |
| P20.4 | Modern application 1: open borders and visa policy (free movement of human resources) | A | Policy proposal. |
| P20.5 | 2: medical experts in one country, minerals in another; connect them | A | |
| P20.6 | 3: let foreign talent open businesses and get citizenship so the best minds drive an economic revolution in Muslim countries | A | |
| P20.7 | Icons: Open Visas / Tech Sharing / Unified Market | A | |

## Page 21: Ultimate power: ending fitnah and global economic dominance

| ID | Point | Code | Audit |
|---|---|---|---|
| P21.1 | Heading: حتمی طاقت: فتنہ کا خاتمہ اور عالمی اقتصادی غلبہ؛ real power is economic influence, not only military | A + E | |
| P21.2 | Al-Anfāl 8:73 "Ultimate warning": "If you (Muslims) do not establish wilāyah among yourselves (unity and economic bloc), there will be great fitnah and corruption on earth" | T + I | ⚠️ **Interpretation inserted into the translation.** Text: إِلَّا تَفۡعَلُوهُ تَكُن فِتۡنَةٞ فِي ٱلۡأَرۡضِ وَفَسَادٞ كَبِيرٞ, "If you do not do so…". "(اتحاد اور معاشی بلاک)" is the deck's gloss inside the quotation. Classical tafsīr: "it" = the believers taking each other as allies and not taking disbelievers as allies (Ibn Kathīr, al-Ṭabarī), including the inheritance/alliance rules just given. Show the verse clean; put "economic bloc" in a separately labelled application card. |
| P21.3 | Economic vs military power: while your economy is weak the enemy crushes you by force; if your bloc gives the world the best technology, the world will think before attacking, since a boycott could strangle it | E | 🔍 Economic interdependence as deterrent: debated (liberal peace theory vs. e.g. 1914). Present as argument. |
| P21.4 | Final call: build startups, tech hubs, promote Muslim excellence; strengthen the economy, "the only Qur'anic path to ending global fitnah" | A | ⚠️ "The only Qur'anic path" is overstated; say "one path the lecturer urges". |

---

## Summary of corrections the narration must make (never repeat silently)

1. **73:20**: travellers seek bounty "in the land", not "in the way of Allah" (P07.5).
2. **4:29**: restore "except trade by mutual consent" (P13.4).
3. **24:29**: restore "uninhabited houses" (P06.6).
4. **28:80**: spoken by "those given knowledge", not a direct divine address (P10.7).
5. **8:73**: no gloss inside the verse translation (P21.2).
6. **Iṭʿām** means feeding, not teaching a skill (P16.3).
7. **Qatr** is stinginess; chain-mail is a related word, not its literal meaning (P11.3).
8. **Thamarah** as "investment" is a reading of specific verses, not the Qur'an's general meaning (P05.7).
9. **Rizq** as "supply chain" is an analogy (P05.2).
10. **Bible characterisation** is oversimplified; quote Genesis exactly or drop it (P03.3–P03.5).
11. **"First time in history"** claims on maintenance and slave heirs are false (P18.3, P18.5).
12. **4:3** mainstream reading via ʿĀ'ishah (P18.4).
13. **Makkah as global pipeline** is debated; map errors (P04.8, P04.10).
14. **Nūḥ infrastructure blueprint**, **Dhul-Qarnayn trade partners**: not in text (P08.4, P08.5).
15. **Divine approval stamps** removed (P01.4).
16. Hadith/athar attributions to be graded: ʿUmar's saying (P07.9), Ibn Masʿūd on 73:20 (P07.7), trustworthy merchant (P07.2).

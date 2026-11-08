import { ThematicAyah } from '../types/quran';

export interface ThemeCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionFr: string;
  iconName: string;
  colorClass: string;
  badgeClass: string;
}

export const THEME_CATEGORIES: ThemeCategory[] = [
  {
    id: 'anxiety-fear',
    nameEn: 'Anxiety & Overthinking',
    nameAr: 'القلق وضيق الصدر',
    nameFr: 'Anxiété et Angoisse',
    descriptionEn: 'Verses bringing peace, tranquility, and inner solace when the mind is troubled.',
    descriptionAr: 'آيات السكينة والطمأنينة لانشراح الصدر وزوال الهم والخوف.',
    descriptionFr: 'Des versets apportant paix, sérénité et réconfort intérieur.',
    iconName: 'ShieldAlert',
    colorClass: 'from-amber-600/10 to-emerald-600/10 text-amber-800 dark:text-amber-400',
    badgeClass: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300'
  },
  {
    id: 'sadness-grief',
    nameEn: 'Sadness & Heartache',
    nameAr: 'الحزن والمواساة',
    nameFr: 'Tristesse et Deuil',
    descriptionEn: 'Divine consolation reminding you that after every hardship comes divine ease.',
    descriptionAr: 'بلسم رباني يذكّرك بأن مع العسر يسراً وبأن ربك لم يودعك وما قلى.',
    descriptionFr: 'Consolation divine rappelant qu’avec la difficulté vient la facilité.',
    iconName: 'HeartHandshake',
    colorClass: 'from-blue-600/10 to-teal-600/10 text-teal-800 dark:text-teal-400',
    badgeClass: 'bg-teal-100 text-teal-900 dark:bg-teal-950/80 dark:text-teal-300'
  },
  {
    id: 'patience-trials',
    nameEn: 'Patience & Trials (Sabr)',
    nameAr: 'الصبر والابتلاء',
    nameFr: 'Patience et Épreuves',
    descriptionEn: 'Fortitude for times when life tests your endurance and faith.',
    descriptionAr: 'تثبيت للقلب واستمداد العون بالصبر والصلاة وبشارة للصابرين.',
    descriptionFr: 'Courage et endurance lorsque les défis de la vie vous éprouvent.',
    iconName: 'Compass',
    colorClass: 'from-stone-600/10 to-amber-600/10 text-stone-800 dark:text-stone-300',
    badgeClass: 'bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-200'
  },
  {
    id: 'forgiveness-hope',
    nameEn: 'Forgiveness & Mercy',
    nameAr: 'التوبة ورجاء المغفرة',
    nameFr: 'Pardon et Miséricorde',
    descriptionEn: 'Never despair of the boundless mercy and forgiving grace of Allah.',
    descriptionAr: 'دعوة للأمل وعدم القنوط من رحمة الله التي وسعت كل شيء.',
    descriptionFr: 'Ne désespérez jamais de l’infinie miséricorde et du pardon d’Allah.',
    iconName: 'Sparkles',
    colorClass: 'from-emerald-600/10 to-teal-600/10 text-emerald-800 dark:text-emerald-400',
    badgeClass: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300'
  },
  {
    id: 'gratitude-joy',
    nameEn: 'Gratitude & Blessings',
    nameAr: 'الشكر وحمد النعم',
    nameFr: 'Gratitude et Bénédictions',
    descriptionEn: 'Deepening joy and recognizing the countless gifts surrounding us.',
    descriptionAr: 'استشعار نعم الله الواسعة، ولئن شكرتم لأزيدنكم.',
    descriptionFr: 'Reconnaître les innombrables bienfaits et amplifier la joie de vivre.',
    iconName: 'SunMedium',
    colorClass: 'from-amber-500/10 to-yellow-500/10 text-amber-900 dark:text-amber-300',
    badgeClass: 'bg-amber-100 text-amber-950 dark:bg-amber-900/60 dark:text-amber-200'
  },
  {
    id: 'guidance-decisions',
    nameEn: 'Seeking Guidance (Hidayah)',
    nameAr: 'طلب الهداية والبصيرة',
    nameFr: 'Quête de Guidance',
    descriptionEn: 'Clarity, direction, and tawakkul when facing decisions and uncertainty.',
    descriptionAr: 'التضرع لطلب التوفيق والنور في المنعطفات والقرارات المصيرية.',
    descriptionFr: 'Clarté, discernement et confiance face aux carrefours de l’existence.',
    iconName: 'Milestone',
    colorClass: 'from-indigo-600/10 to-sky-600/10 text-indigo-900 dark:text-indigo-300',
    badgeClass: 'bg-indigo-100 text-indigo-950 dark:bg-indigo-950/80 dark:text-indigo-300'
  },
  {
    id: 'sustenance-reliance',
    nameEn: 'Sustenance & Tawakkul',
    nameAr: 'الرزق والتوكل على الله',
    nameFr: 'Subsistance et Confiance',
    descriptionEn: 'Relief from financial or career stress by placing ultimate trust in the Provider.',
    descriptionAr: 'اليقين بأن الرزاق ذو القوة المتين، ومن يتوكل على الله فهو حسبه.',
    descriptionFr: 'Sérénité face aux besoins matériels par la confiance envers Le Pourvoyeur.',
    iconName: 'Coins',
    colorClass: 'from-emerald-700/10 to-lime-600/10 text-emerald-900 dark:text-emerald-300',
    badgeClass: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300'
  }
];

export const THEMATIC_AYAHS: ThematicAyah[] = [
  // Anxiety & Overthinking
  {
    id: 'anx-1',
    themeId: 'anxiety-fear',
    themeTitleEn: 'Anxiety & Overthinking',
    themeTitleAr: 'القلق وضيق الصدر',
    themeTitleFr: 'Anxiété et Angoisse',
    surahNumber: 13,
    surahNameAr: 'الرَّعْد',
    surahNameEn: 'Ar-Ra\'d',
    ayahNumber: 28,
    arabicText: 'ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
    englishTranslation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
    frenchTranslation: 'Ceux qui ont cru, et dont les cœurs se tranquillisent à l\'évocation d\'Allah. N\'est-ce point par l\'évocation d\'Allah que se tranquillisent les cœurs?',
    tafsirSummary: 'True inner peace cannot be purchased with worldly distractions. The soul finds its natural harbor and tranquility solely when linked in sincere remembrance to its Creator.',
    reflectionPrompt: 'Take a slow, deep breath. Recite SubhanAllah, Alhamdulillah, and Astaghfirullah. Notice the tension softly releasing from your chest.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/013028.mp3'
  },
  {
    id: 'anx-2',
    themeId: 'anxiety-fear',
    themeTitleEn: 'Anxiety & Overthinking',
    themeTitleAr: 'القلق وضيق الصدر',
    themeTitleFr: 'Anxiété et Angoisse',
    surahNumber: 2,
    surahNameAr: 'البَقَرَة',
    surahNameEn: 'Al-Baqarah',
    ayahNumber: 286,
    arabicText: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ',
    englishTranslation: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned.',
    frenchTranslation: 'Allah n\'impose à aucune âme une charge supérieure à sa capacité. Elle sera récompensée du bien qu\'elle aura fait, punie du mal qu\'elle aura fait.',
    tafsirSummary: 'Divine compassion ensures that whatever challenge you face right now, you have been endowed by Allah with the internal spiritual resilience to endure and overcome it.',
    reflectionPrompt: 'If you are facing an overwhelming exam, project, or personal crisis: remember that your Lord knows your limits better than you do, and He believes in your capacity.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002286.mp3'
  },

  // Sadness & Heartache
  {
    id: 'sad-1',
    themeId: 'sadness-grief',
    themeTitleEn: 'Sadness & Heartache',
    themeTitleAr: 'الحزن والمواساة',
    themeTitleFr: 'Tristesse et Deuil',
    surahNumber: 93,
    surahNameAr: 'الضُّحَىٰ',
    surahNameEn: 'Ad-Duhaa',
    ayahNumber: 3,
    arabicText: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْـَٔاخِرَةُ خَيْرٌ لَّكَ مِنَ ٱلْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
    englishTranslation: 'Your Lord has not taken leave of you, [O Muhammad], nor has He detested [you]. And the Hereafter is better for you than the first [life]. And your Lord is going to give you, and you will be satisfied.',
    frenchTranslation: 'Ton Seigneur ne t\'a ni abandonné, ni détesté. La vie dernière t\'est, certes, meilleure que la vie présente. Ton Seigneur t\'accordera certes [Ses dons], et alors tu seras satisfait.',
    tafsirSummary: 'Revealed to the Prophet ﷺ during a period of silence and sadness. It is an eternal message to any believer feeling distant, lonely, or forsaken: Allah has not abandoned you.',
    reflectionPrompt: 'Whatever sorrow weighs on you today, trust that Allah is preparing a compensation that will leave your heart truly content.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/093003.mp3'
  },
  {
    id: 'sad-2',
    themeId: 'sadness-grief',
    themeTitleEn: 'Sadness & Heartache',
    themeTitleAr: 'الحزن والمواساة',
    themeTitleFr: 'Tristesse et Deuil',
    surahNumber: 94,
    surahNameAr: 'الشَّرْح',
    surahNameEn: 'Ash-Sharh',
    ayahNumber: 5,
    arabicText: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    englishTranslation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
    frenchTranslation: 'A côté de la difficulté est, certes, une facilité! A côté de la difficulté est, certes, une facilité!',
    tafsirSummary: 'Notice the Arabic grammar: hardship (al-usr) is definite, while ease (yusr) is indefinite. Scholars note: one singular hardship will never overpower two vast eases.',
    reflectionPrompt: 'Ease does not just come AFTER difficulty; the verse says WITH the difficulty, seeds of relief and growth are already blooming.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/094005.mp3'
  },

  // Patience & Trials
  {
    id: 'sab-1',
    themeId: 'patience-trials',
    themeTitleEn: 'Patience & Trials (Sabr)',
    themeTitleAr: 'الصبر والابتلاء',
    themeTitleFr: 'Patience et Épreuves',
    surahNumber: 2,
    surahNameAr: 'البَقَرَة',
    surahNameEn: 'Al-Baqarah',
    ayahNumber: 153,
    arabicText: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ',
    englishTranslation: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
    frenchTranslation: 'Ô les croyants! Cherchez secours dans l\'endurance et la Salât. Car Allah est avec ceux qui sont endurants.',
    tafsirSummary: 'Patience is not passive surrender; it is active emotional discipline coupled with turning toward prayer. When Allah promises He is WITH you, no obstacle can defeat you.',
    reflectionPrompt: 'Stand in prayer today not out of routine, but as a deliberate shield against fatigue and stress.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002153.mp3'
  },
  {
    id: 'sab-2',
    themeId: 'patience-trials',
    themeTitleEn: 'Patience & Trials (Sabr)',
    themeTitleAr: 'الصبر والابتلاء',
    themeTitleFr: 'Patience et Épreuves',
    surahNumber: 39,
    surahNameAr: 'الزُّمَر',
    surahNameEn: 'Az-Zumar',
    ayahNumber: 10,
    arabicText: 'إِنَّمَا يُوَفَّى ٱلصَّٰبِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
    englishTranslation: 'Indeed, the patient will be given their reward without account [i.e., without limit].',
    frenchTranslation: 'Les endurants auront leur pleine récompense sans compter.',
    tafsirSummary: 'While all good deeds have weighed, measured multiples, the reward for persevering through hardship is unmeasured, flowing like a boundless ocean.',
    reflectionPrompt: 'When endurance feels heavy, picture the scale of rewards where angels pour blessings without any calculation.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/039010.mp3'
  },

  // Forgiveness & Mercy
  {
    id: 'forg-1',
    themeId: 'forgiveness-hope',
    themeTitleEn: 'Forgiveness & Mercy',
    themeTitleAr: 'التوبة ورجاء المغفرة',
    themeTitleFr: 'Pardon et Miséricorde',
    surahNumber: 39,
    surahNameAr: 'الزُّمَر',
    surahNameEn: 'Az-Zumar',
    ayahNumber: 53,
    arabicText: '۞ قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ',
    englishTranslation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
    frenchTranslation: 'Dis: "Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d\'Allah. Car Allah pardonne tous les péchés. Oui, c\'est Lui le Pardonneur, le Très Miséricordieux."',
    tafsirSummary: 'Considered by companions such as Ibn Mas\'ud as the most hopeful verse in the entire Quran. Allah affectionately calls even those who exceeded all bounds "My Servants" (يا عبادي).',
    reflectionPrompt: 'No matter what mistakes you made yesterday, your slate can be completely wiped clean this very second. Return to Him with sincerity.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/039053.mp3'
  },

  // Gratitude & Blessings
  {
    id: 'grat-1',
    themeId: 'gratitude-joy',
    themeTitleEn: 'Gratitude & Blessings',
    themeTitleAr: 'الشكر وحمد النعم',
    themeTitleFr: 'Gratitude et Bénédictions',
    surahNumber: 14,
    surahNameAr: 'إِبْرَاهِيم',
    surahNameEn: 'Ibrahim',
    ayahNumber: 7,
    arabicText: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِى لَشَدِيدٌ',
    englishTranslation: 'And [remember] when your Lord proclaimed, "If you are grateful, I will surely increase you [in favor]; but if you show ingratitude, indeed, My punishment is severe."',
    frenchTranslation: 'Et lorsque votre Seigneur proclama: "Si vous êtes reconnaissants, très certainement J\'augmenterai [Mes bienfaits] pour vous. Mais si vous êtes ingrats, Mon châtiment sera terrible".',
    tafsirSummary: 'Shukr (gratitude) is not just a polite word; it is the key that locks in existing blessings and unlocks newer, higher spiritual and material elevations.',
    reflectionPrompt: 'Write down or name 3 small blessings today: your sight, the breath in your lungs, the water you drank. Say: Alhamdulillahi Rabbil Alamin.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/014007.mp3'
  },

  // Sustenance & Reliance
  {
    id: 'sust-1',
    themeId: 'sustenance-reliance',
    themeTitleEn: 'Sustenance & Tawakkul',
    themeTitleAr: 'الرزق والتوكل على الله',
    themeTitleFr: 'Subsistance et Confiance',
    surahNumber: 65,
    surahNameAr: 'الطَّلَاق',
    surahNameEn: 'At-Talaaq',
    ayahNumber: 2,
    arabicText: 'وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥ',
    englishTranslation: 'And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect. And whoever relies upon Allah - then He is sufficient for him.',
    frenchTranslation: 'Et quiconque craint Allah, Il lui donnera une issue favorable, et lui accordera Ses dons par des moyens sur lesquels il ne comptait pas. Et quiconque place sa confiance en Allah, Il [Allah] lui suffit.',
    tafsirSummary: 'When all worldly paths seem sealed shut, God-consciousness (Taqwa) unlocks unexpected doors and supplies sustenance from angles beyond human calculation.',
    reflectionPrompt: 'Do your best effort today, then place the outcome in the hands of the One who provides for the birds in the morning sky.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/065002.mp3'
  },

  // Guidance & Decisions
  {
    id: 'guid-1',
    themeId: 'guidance-decisions',
    themeTitleEn: 'Seeking Guidance (Hidayah)',
    themeTitleAr: 'طلب الهداية والبصيرة',
    themeTitleFr: 'Quête de Guidance',
    surahNumber: 18,
    surahNameAr: 'الكَهْف',
    surahNameEn: 'Al-Kahf',
    ayahNumber: 10,
    arabicText: 'إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    englishTranslation: '[Mention] when the youths retreated to the cave and said, "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance."',
    frenchTranslation: 'Quand les jeunes se réfugièrent dans la caverne, ils dirent: "Ô notre Seigneur, donne-nous de Ta part une miséricorde; et assure-nous la droiture dans tout ce qui nous concerne".',
    tafsirSummary: 'The young men of the cave asked for two things: Mercy from Allah, and right guidance (Rashada) in their affairs. It is the ultimate student and seeker prayer.',
    reflectionPrompt: 'Whenever embarking on study, an exam, or a major life crossroads, whisper this profound dua: Rabbana aatina min ladunka rahmah, wa hayyi\' lana min amrina rashada.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/018010.mp3'
  }
];

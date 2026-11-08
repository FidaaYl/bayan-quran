import { Ayah, SurahDetail, SurahMeta } from '../types/quran';
import { SURAHS_CATALOG } from '../data/surahs';

// In-memory cache for loaded surahs
const surahCache = new Map<number, SurahDetail>();

// Local storage key prefix
const STORAGE_PREFIX = 'bayan_quran_surah_';

export async function fetchSurahDetail(surahNumber: number): Promise<SurahDetail> {
  // Check memory cache
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  // Check localStorage cache
  try {
    const cached = localStorage.getItem(`${STORAGE_PREFIX}${surahNumber}`);
    if (cached) {
      const parsed: SurahDetail = JSON.parse(cached);
      surahCache.set(surahNumber, parsed);
      return parsed;
    }
  } catch (e) {
    console.warn('Failed reading from localStorage cache', e);
  }

  // Find meta
  const meta = SURAHS_CATALOG.find(s => s.number === surahNumber) || {
    number: surahNumber,
    name: `سورة ${surahNumber}`,
    englishName: `Surah ${surahNumber}`,
    englishNameTranslation: '',
    numberOfAyahs: 0,
    revelationType: 'Meccan' as const
  };

  try {
    // We request 4 editions simultaneously:
    // 1. quran-uthmani (Original Arabic Uthmani Script)
    // 2. en.sahih (Saheeh International English)
    // 3. fr.hamidullah (French Hamidullah translation)
    // 4. ar.muyassar (Arabic Tafsir Al-Muyassar)
    const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,fr.hamidullah,ar.muyassar`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    const editions = data.data;

    const uthmaniEdition = editions[0];
    const englishEdition = editions[1];
    const frenchEdition = editions[2];
    const tafsirEdition = editions[3];

    const ayahs: Ayah[] = uthmaniEdition.ayahs.map((item: any, idx: number) => {
      let arabicText = item.text;
      // Strip Bismillah prefix from first verse in Surahs other than Al-Fatihah (1) and At-Tawbah (9)
      // because in the Uthmani edition from API, the Bismillah is sometimes concatenated onto verse 1
      if (surahNumber !== 1 && surahNumber !== 9 && idx === 0) {
        const bismillah = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
        if (arabicText.startsWith(bismillah)) {
          arabicText = arabicText.replace(bismillah, '').trim();
        }
      }

      return {
        number: item.number,
        numberInSurah: item.numberInSurah,
        text: arabicText,
        translation: englishEdition?.ayahs[idx]?.text || '',
        frenchTranslation: frenchEdition?.ayahs[idx]?.text || '',
        tafsir: tafsirEdition?.ayahs[idx]?.text || '',
        juz: item.juz,
        page: item.page,
        hizbQuarter: item.hizbQuarter,
        sajda: Boolean(item.sajda)
      };
    });

    const surahDetail: SurahDetail = {
      ...meta,
      name: uthmaniEdition.name || meta.name,
      englishName: uthmaniEdition.englishName || meta.englishName,
      englishNameTranslation: uthmaniEdition.englishNameTranslation || meta.englishNameTranslation,
      revelationType: uthmaniEdition.revelationType || meta.revelationType,
      numberOfAyahs: ayahs.length,
      ayahs
    };

    // Store in cache
    surahCache.set(surahNumber, surahDetail);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${surahNumber}`, JSON.stringify(surahDetail));
    } catch {
      // Storage quota might be reached, silent ignore
    }

    return surahDetail;
  } catch (err) {
    console.error(`Failed to fetch surah ${surahNumber}`, err);
    // If network fails, return fallback for common surahs or throw friendly error
    return getFallbackSurah(surahNumber, meta);
  }
}

function getFallbackSurah(surahNumber: number, meta: SurahMeta): SurahDetail {
  if (surahNumber === 1) {
    return {
      ...meta,
      ayahs: [
        {
          number: 1,
          numberInSurah: 1,
          text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
          translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
          frenchTranslation: 'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux.',
          tafsir: 'أبتدئ قراءتي مستعينا باسم الله، الرحمن الذي وسعت رحمته كل شيء، الرحيم بالمؤمنين.',
          juz: 1,
          page: 1
        },
        {
          number: 2,
          numberInSurah: 2,
          text: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',
          translation: '[All] praise is [due] to Allah, Lord of the worlds -',
          frenchTranslation: 'Louange à Allah, Seigneur de l\'univers.',
          tafsir: 'الثناء الكامل لله تعالى وحده لصفات كماله ونعمه العظيمة.',
          juz: 1,
          page: 1
        },
        {
          number: 3,
          numberInSurah: 3,
          text: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
          translation: 'The Entirely Merciful, the Especially Merciful,',
          frenchTranslation: 'Le Tout Miséricordieux, le Très Miséricordieux,',
          tafsir: 'الرحمن ذو الرحمة العامة لجميع الخلائق، الرحيم بالمؤمنين خاصة.',
          juz: 1,
          page: 1
        },
        {
          number: 4,
          numberInSurah: 4,
          text: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',
          translation: 'Sovereign of the Day of Recompense.',
          frenchTranslation: 'Maître du Jour de la rétribution.',
          tafsir: 'المالك المتصرف في يوم الجزاء والحساب وهو يوم القيامة.',
          juz: 1,
          page: 1
        },
        {
          number: 5,
          numberInSurah: 5,
          text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
          translation: 'It is You we worship and You we ask for help.',
          frenchTranslation: 'C\'est Toi [Seul] que nous adorons, et c\'est Toi [Seul] dont nous implorons secours.',
          tafsir: 'نخصك وحدك بالعبادة والطاعة، ونستعين بك وحدك في جميع أمورنا.',
          juz: 1,
          page: 1
        },
        {
          number: 6,
          numberInSurah: 6,
          text: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
          translation: 'Guide us to the straight path -',
          frenchTranslation: 'Guide-nous dans le droit chemin,',
          tafsir: 'وفقنا وثبتنا على الطريق الواضح المستقيم وهو دين الإسلام.',
          juz: 1,
          page: 1
        },
        {
          number: 7,
          numberInSurah: 7,
          text: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
          translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
          frenchTranslation: 'le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.',
          tafsir: 'طريق النبيين والصديقين والشهداء والصالحين، غير طريق المغضوب عليهم ولا الضالين.',
          juz: 1,
          page: 1
        }
      ]
    };
  }

  // Generic fallback if network fails
  return {
    ...meta,
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        frenchTranslation: 'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux.',
        tafsir: 'أبتدئ مستعينا باسم الله الرحمن الرحيم.',
        juz: 1,
        page: 1
      }
    ]
  };
}

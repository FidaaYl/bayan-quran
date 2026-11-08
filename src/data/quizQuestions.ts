import { QuizQuestion } from '../types/quran';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which Surah in the Holy Quran does NOT begin with the Basmalah (بسم الله الرحمن الرحيم)?',
    questionAr: 'ما هي السورة الوحيدة في القرآن الكريم التي لا تبدأ بالبسملة؟',
    options: ['Surah At-Tawbah (سورة التوبة)', 'Surah Al-Anfal (سورة الأنفال)', 'Surah Al-Qiyamat (سورة القيامة)', 'Surah Al-Hajj (سورة الحج)'],
    correctAnswer: 0,
    explanation: 'Surah At-Tawbah (Chapter 9) does not begin with the Basmalah because it opens with a declaration of severance and ultimatum, and according to companions, it carries intense gravity.',
    surahReference: 'Surah 9: At-Tawbah'
  },
  {
    id: 2,
    question: 'What is the longest Ayah (verse) in the entire Quran?',
    questionAr: 'ما هي أطول آية في القرآن الكريم؟',
    options: [
      'Ayat al-Kursi (آية الكرسي)',
      'Ayat ad-Dayn / The Verse of Debt (آية الدَّيْن)',
      'Ayat an-Nur (آية النور)',
      'The Last Verse of Surah Al-Fath (آخر آية في سورة الفتح)'
    ],
    correctAnswer: 1,
    explanation: 'Ayat ad-Dayn (Surah Al-Baqarah, 2:282) is the longest verse in the Quran, detailing commercial contracts, debts, witnesses, and financial recording.',
    surahReference: 'Surah Al-Baqarah 2:282'
  },
  {
    id: 3,
    question: 'In which Surah is the Basmalah mentioned TWICE?',
    questionAr: 'في أي سورة من القرآن الكريم ذُكرت البسملة مرتين؟',
    options: ['Surah An-Naml (سورة النمل)', 'Surah An-Nahl (سورة النحل)', 'Surah An-Nur (سورة النور)', 'Surah Maryam (سورة مريم)'],
    correctAnswer: 0,
    explanation: 'Surah An-Naml contains the opening Basmalah and a second Basmalah in verse 30 in the letter sent by Prophet Sulayman (pbuh) to Queen Bilqis: "إِنَّهُۥ مِن سُلَيْمَٰنَ وَإِنَّهُۥ بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ".',
    surahReference: 'Surah An-Naml 27:30'
  },
  {
    id: 4,
    question: 'Which Surah is considered by the Prophet ﷺ to be equivalent to one-third of the Quran?',
    questionAr: 'ما هي السورة التي تعدل ثلث القرآن الكريم؟',
    options: ['Surah Al-Ikhlas (سورة الإخلاص)', 'Surah Al-Fatihah (سورة الفاتحة)', 'Surah Yasin (سورة يس)', 'Surah Al-Mulk (سورة الملك)'],
    correctAnswer: 0,
    explanation: 'Surah Al-Ikhlas (Chapter 112) is equivalent to one-third of the Quran because the Quran revolves around three core themes: Tawhid (Monotheism), Stories/History, and Ahkam (Rulings), and Al-Ikhlas encapsulates pure Tawhid.',
    surahReference: 'Surah Al-Ikhlas (112)'
  },
  {
    id: 5,
    question: 'What is the shortest Surah in the Holy Quran?',
    questionAr: 'ما هي أقصر سورة في القرآن الكريم؟',
    options: ['Surah Al-Kawthar (سورة الكوثر)', 'Surah Al-Asr (سورة العصر)', 'Surah An-Nasr (سورة النصر)', 'Surah Al-Falaq (سورة الفلق)'],
    correctAnswer: 0,
    explanation: 'Surah Al-Kawthar consists of just 3 short verses and 10 words, promising abundant divine goodness to the Prophet Muhammad ﷺ.',
    surahReference: 'Surah Al-Kawthar (108)'
  },
  {
    id: 6,
    question: 'Which woman is mentioned by her personal name in the Holy Quran?',
    questionAr: 'من هي المرأة الوحيدة التي ذُكرت باسمها الصريح في القرآن الكريم؟',
    options: ['Maryam (مريم بنت عمران)', 'Asiya (آسية امرأة فرعون)', 'Khadijah (خديجة رضي الله عنها)', 'Sarah (سارة زوج إبراهيم)'],
    correctAnswer: 0,
    explanation: 'Maryam (Mary, mother of Jesus peace be upon him) is the only woman mentioned explicitly by name in the Quran, and Chapter 19 is named after her.',
    surahReference: 'Surah Maryam (19)'
  },
  {
    id: 7,
    question: 'How many Surahs (chapters) are there in the Holy Quran?',
    questionAr: 'كم عدد سور القرآن الكريم؟',
    options: ['114 Surahs', '112 Surahs', '120 Surahs', '110 Surahs'],
    correctAnswer: 0,
    explanation: 'The Quran consists of 114 Surahs, divided into 30 Juz (parts) and 60 Hizbs.',
    surahReference: 'Full Mushaf Structure'
  },
  {
    id: 8,
    question: 'Which Surah is often referred to as "The Heart of the Quran" (قلب القرآن)?',
    questionAr: 'ما هي السورة التي تُعرف بـ "قلب القرآن"؟',
    options: ['Surah Yasin (سورة يس)', 'Surah Ar-Rahman (سورة الرحمن)', 'Surah Al-Waqiah (سورة الواقعة)', 'Surah Al-Kahf (سورة الكهف)'],
    correctAnswer: 0,
    explanation: 'Surah Yasin is celebrated in Islamic tradition as the heart of the Quran due to its vivid depiction of the Resurrection, the oneness of Allah, and prophetic truth.',
    surahReference: 'Surah Yasin (36)'
  }
];

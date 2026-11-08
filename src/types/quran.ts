export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation?: string;
  frenchTranslation?: string;
  tafsir?: string;
  audio?: string;
  juz: number;
  page: number;
  hizbQuarter?: number;
  sajda?: boolean;
}

export interface SurahDetail extends SurahMeta {
  ayahs: Ayah[];
}

export interface Reciter {
  id: string;
  name: string;
  subfolder: string;
  bitrate: string;
  style: string;
}

export interface ThematicAyah {
  id: string;
  themeId: string;
  themeTitleEn: string;
  themeTitleAr: string;
  themeTitleFr: string;
  surahNumber: number;
  surahNameAr: string;
  surahNameEn: string;
  ayahNumber: number;
  arabicText: string;
  englishTranslation: string;
  frenchTranslation: string;
  tafsirSummary: string;
  reflectionPrompt: string;
  audioUrl: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionAr?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  surahReference?: string;
}

export type ViewMode = 'mushaf' | 'hifz' | 'themes' | 'quiz' | 'bookmarks';
export type RecallMode = 'normal' | 'first-words' | 'masked' | 'blanks';
export type MasteryStatus = 'new' | 'learning' | 'mastered';

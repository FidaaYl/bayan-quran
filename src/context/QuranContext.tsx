import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { Ayah, RecallMode, Reciter, SurahDetail, ViewMode } from '../types/quran';
import { RECITERS_CATALOG, getAyahAudioUrl } from '../data/reciters';
import { SURAHS_CATALOG } from '../data/surahs';
import { fetchSurahDetail } from '../services/quranApi';

export type { ViewMode, RecallMode } from '../types/quran';
export type TranslationLanguage = 'en' | 'fr' | 'tafsir' | 'none';
export type AppTheme = 'light' | 'dark';

export interface BookmarkItem {
  id: string;
  surahNumber: number;
  surahNameAr: string;
  surahNameEn: string;
  ayahInSurah: number;
  text: string;
  translation: string;
  dateAdded: number;
}

interface QuranContextType {
  // Navigation & View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedSurahNumber: number;
  setSelectedSurahNumber: (num: number) => void;
  surahDetail: SurahDetail | null;
  isLoadingSurah: boolean;
  loadSurah: (num: number) => Promise<void>;

  // Translations & Display
  activeTranslation: TranslationLanguage;
  setActiveTranslation: (lang: TranslationLanguage) => void;
  arabicFontSize: number;
  setArabicFontSize: (size: number) => void;
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;

  // Audio Playback
  currentReciter: Reciter;
  setCurrentReciter: (reciter: Reciter) => void;
  isPlaying: boolean;
  activePlayingAyah: number | null; // numberInSurah
  playAyah: (surahNumber: number, ayahInSurah: number) => void;
  togglePlayPause: () => void;
  playNextAyah: () => void;
  playPrevAyah: () => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  repeatTimes: number;
  setRepeatTimes: (times: number) => void;
  audioProgress: number; // 0 - 100
  seekAudio: (percent: number) => void;

  // Hifz Studio
  recallMode: RecallMode;
  setRecallMode: (mode: RecallMode) => void;
  masteredAyahs: Record<string, 'learning' | 'mastered'>; // key: `${surahNumber}:${ayahInSurah}`
  setAyahMastery: (surahNumber: number, ayahInSurah: number, status: 'new' | 'learning' | 'mastered') => void;
  revealedAyahsInMasked: Set<number>;
  toggleRevealMaskedAyah: (ayahInSurah: number) => void;
  resetMaskedReveals: () => void;

  // Bookmarks
  bookmarks: BookmarkItem[];
  toggleBookmark: (ayah: Ayah) => void;
  isBookmarked: (surahNumber: number, ayahInSurah: number) => boolean;

  // Student / TP Modal
  isProjectInfoOpen: boolean;
  setIsProjectInfoOpen: (open: boolean) => void;
}

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export const QuranProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('mushaf');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahDetail, setSurahDetail] = useState<SurahDetail | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(true);

  const [activeTranslation, setActiveTranslation] = useState<TranslationLanguage>('en');
  const [arabicFontSize, setArabicFontSize] = useState<number>(26);
  const [appTheme, setAppTheme] = useState<AppTheme>('light');

  // Audio
  const [currentReciter, setCurrentReciter] = useState<Reciter>(RECITERS_CATALOG[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePlayingAyah, setActivePlayingAyah] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [repeatTimes, setRepeatTimes] = useState<number>(1);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Hifz Studio
  const [recallMode, setRecallMode] = useState<RecallMode>('normal');
  const [revealedAyahsInMasked, setRevealedAyahsInMasked] = useState<Set<number>>(new Set());
  const [masteredAyahs, setMasteredAyahs] = useState<Record<string, 'learning' | 'mastered'>>(() => {
    try {
      const saved = localStorage.getItem('qabas_quran_mastery');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('qabas_quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Project Info Modal
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState<boolean>(false);

  // Apply dark theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    if (appTheme === 'dark') {
      root.classList.add('dark');
    }
  }, [appTheme]);

  // Save mastery
  useEffect(() => {
    try {
      localStorage.setItem('qabas_quran_mastery', JSON.stringify(masteredAyahs));
    } catch (e) {
      console.warn(e);
    }
  }, [masteredAyahs]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('qabas_quran_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn(e);
    }
  }, [bookmarks]);

  // Load initial surah
  useEffect(() => {
    loadSurah(selectedSurahNumber);
  }, [selectedSurahNumber]);

  const loadSurah = async (num: number) => {
    setIsLoadingSurah(true);
    try {
      const detail = await fetchSurahDetail(num);
      setSurahDetail(detail);
      setRevealedAyahsInMasked(new Set());
    } finally {
      setIsLoadingSurah(false);
    }
  };

  // Audio setup
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    let count = 0;
    const onEnded = () => {
      count++;
      if (count < repeatTimes) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        count = 0;
        playNextAyah();
      }
    };

    const onError = (e: any) => {
      console.warn('Audio playback error', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [repeatTimes, activePlayingAyah, selectedSurahNumber, currentReciter]);

  // Update speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const playAyah = (surahNum: number, ayahInSurah: number) => {
    if (!audioRef.current) return;

    if (selectedSurahNumber !== surahNum) {
      setSelectedSurahNumber(surahNum);
    }

    const audioUrl = getAyahAudioUrl(surahNum, ayahInSurah, currentReciter.subfolder);
    audioRef.current.src = audioUrl;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setActivePlayingAyah(ayahInSurah);
      })
      .catch((err) => {
        console.warn('Failed to play audio:', err);
        setIsPlaying(false);
      });
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!activePlayingAyah) {
        playAyah(selectedSurahNumber, 1);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      }
    }
  };

  const playNextAyah = () => {
    if (!surahDetail) return;
    const currentAyah = activePlayingAyah || 1;
    if (currentAyah < surahDetail.numberOfAyahs) {
      playAyah(selectedSurahNumber, currentAyah + 1);
    } else {
      if (selectedSurahNumber < 114) {
        setSelectedSurahNumber(selectedSurahNumber + 1);
        playAyah(selectedSurahNumber + 1, 1);
      } else {
        setIsPlaying(false);
        setActivePlayingAyah(null);
      }
    }
  };

  const playPrevAyah = () => {
    const currentAyah = activePlayingAyah || 1;
    if (currentAyah > 1) {
      playAyah(selectedSurahNumber, currentAyah - 1);
    } else if (selectedSurahNumber > 1) {
      const prevSurah = selectedSurahNumber - 1;
      const prevMeta = SURAHS_CATALOG.find(s => s.number === prevSurah);
      setSelectedSurahNumber(prevSurah);
      if (prevMeta) {
        playAyah(prevSurah, prevMeta.numberOfAyahs);
      }
    }
  };

  const seekAudio = (percent: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
      setAudioProgress(percent);
    }
  };

  const setAyahMastery = (surahNum: number, ayahInSurah: number, status: 'new' | 'learning' | 'mastered') => {
    const key = `${surahNum}:${ayahInSurah}`;
    setMasteredAyahs(prev => {
      const updated = { ...prev };
      if (status === 'new') {
        delete updated[key];
      } else {
        updated[key] = status;
      }
      return updated;
    });
  };

  const toggleRevealMaskedAyah = (ayahInSurah: number) => {
    setRevealedAyahsInMasked(prev => {
      const next = new Set(prev);
      if (next.has(ayahInSurah)) {
        next.delete(ayahInSurah);
      } else {
        next.add(ayahInSurah);
      }
      return next;
    });
  };

  const resetMaskedReveals = () => {
    setRevealedAyahsInMasked(new Set());
  };

  const toggleBookmark = (ayah: Ayah) => {
    if (!surahDetail) return;
    const exists = bookmarks.some(b => b.surahNumber === selectedSurahNumber && b.ayahInSurah === ayah.numberInSurah);
    if (exists) {
      setBookmarks(prev => prev.filter(b => !(b.surahNumber === selectedSurahNumber && b.ayahInSurah === ayah.numberInSurah)));
    } else {
      const newBookmark: BookmarkItem = {
        id: `${selectedSurahNumber}:${ayah.numberInSurah}:${Date.now()}`,
        surahNumber: selectedSurahNumber,
        surahNameAr: surahDetail.name,
        surahNameEn: surahDetail.englishName,
        ayahInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: ayah.translation || '',
        dateAdded: Date.now()
      };
      setBookmarks(prev => [newBookmark, ...prev]);
    }
  };

  const isBookmarked = (surahNum: number, ayahInSurah: number) => {
    return bookmarks.some(b => b.surahNumber === surahNum && b.ayahInSurah === ayahInSurah);
  };

  return (
    <QuranContext.Provider
      value={{
        viewMode,
        setViewMode,
        selectedSurahNumber,
        setSelectedSurahNumber,
        surahDetail,
        isLoadingSurah,
        loadSurah,
        activeTranslation,
        setActiveTranslation,
        arabicFontSize,
        setArabicFontSize,
        appTheme,
        setAppTheme,
        currentReciter,
        setCurrentReciter,
        isPlaying,
        activePlayingAyah,
        playAyah,
        togglePlayPause,
        playNextAyah,
        playPrevAyah,
        playbackSpeed,
        setPlaybackSpeed,
        repeatTimes,
        setRepeatTimes,
        audioProgress,
        seekAudio,
        recallMode,
        setRecallMode,
        masteredAyahs,
        setAyahMastery,
        revealedAyahsInMasked,
        toggleRevealMaskedAyah,
        resetMaskedReveals,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        isProjectInfoOpen,
        setIsProjectInfoOpen
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = () => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};

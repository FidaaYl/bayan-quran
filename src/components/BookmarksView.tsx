import React from 'react';
import { useQuran } from '../context/QuranContext';
import { Bookmark, Volume2, BookOpen, Trash2 } from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const { bookmarks, toggleBookmark, playAyah, setSelectedSurahNumber, setViewMode } = useQuran();

  const handleJump = (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setViewMode('mushaf');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 max-w-4xl mx-auto w-full">
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Verses & Reflections</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
          Your Bookmarked Ayahs ({bookmarks.length})
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Quickly return to verses you want to contemplate, review, or memorize.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-400 space-y-3">
          <Bookmark className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-600" />
          <p className="text-sm">You haven't bookmarked any verses yet.</p>
          <p className="text-xs text-stone-400">
            Click the bookmark icon on any verse while reading to save it here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 font-mono text-xs font-bold text-stone-800 dark:text-stone-200">
                    {item.surahNameEn} {item.surahNumber}:{item.ayahInSurah}
                  </span>
                  <span className="font-arabic text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                    سورة {item.surahNameAr}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => playAyah(item.surahNumber, item.ayahInSurah)}
                    className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-600 transition"
                    title="Play Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleJump(item.surahNumber)}
                    className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-800 dark:hover:text-stone-200 transition"
                    title="Open in Mushaf"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      toggleBookmark({
                        number: 0,
                        numberInSurah: item.ayahInSurah,
                        text: item.text,
                        juz: 0,
                        page: 0
                      })
                    }
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                dir="rtl"
                className="font-quran text-right text-stone-900 dark:text-stone-100 text-xl leading-loose"
              >
                {item.text}
                <span className="ayah-end-symbol">
                  <span className="text-amber-600 dark:text-amber-400 font-bold font-arabic">
                    ﴿{item.ayahInSurah}﴾
                  </span>
                </span>
              </div>

              {item.translation && (
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {item.translation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

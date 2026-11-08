import React from 'react';
import { useQuran } from '../context/QuranContext';
import { BookmarkCheck, Volume2, BookOpenText, Trash2 } from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const { bookmarks, toggleBookmark, playAyah, setSelectedSurahNumber, setViewMode } = useQuran();

  const handleJump = (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setViewMode('mushaf');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Saved Verses</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Your Bookmarked Verses ({bookmarks.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Quickly review verses you saved for memorization, prayer, or contemplation.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-slate-400 space-y-2">
          <BookmarkCheck className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
          <p className="text-xs sm:text-sm font-semibold">No bookmarked verses yet.</p>
          <p className="text-xs text-slate-400">
            Click the bookmark icon next to any verse while reading to save it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {bookmarks.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                    {item.surahNameEn} {item.surahNumber}:{item.ayahInSurah}
                  </span>
                  <span className="font-arabic text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    سورة {item.surahNameAr}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => playAyah(item.surahNumber, item.ayahInSurah)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition"
                    title="Play Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleJump(item.surahNumber)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition"
                    title="Open in Mushaf"
                  >
                    <BookOpenText className="w-4 h-4" />
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
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                dir="rtl"
                className="font-quran text-right text-slate-900 dark:text-slate-100 text-xl leading-loose"
              >
                {item.text}
                <span className="ayah-num-tag">{item.ayahInSurah}</span>
              </div>

              {item.translation && (
                <p className="text-xs text-slate-600 dark:text-slate-300">
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

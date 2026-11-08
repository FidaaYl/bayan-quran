import React, { useState, useMemo } from 'react';
import { useQuran } from '../context/QuranContext';
import { SURAHS_CATALOG } from '../data/surahs';
import { Search, Compass } from 'lucide-react';

interface SurahSidebarProps {
  onCloseMobile?: () => void;
}

export const SurahSidebar: React.FC<SurahSidebarProps> = ({ onCloseMobile }) => {
  const { selectedSurahNumber, setSelectedSurahNumber, masteredAyahs } = useQuran();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  const filteredSurahs = useMemo(() => {
    return SURAHS_CATALOG.filter(surah => {
      const matchesSearch =
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.name.includes(searchQuery) ||
        String(surah.number) === searchQuery.trim();

      const matchesFilter = filterType === 'all' || surah.revelationType === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType]);

  const calculateSurahProgress = (surahNum: number, totalAyahs: number) => {
    let count = 0;
    for (let i = 1; i <= totalAyahs; i++) {
      if (masteredAyahs[`${surahNum}:${i}`] === 'mastered') {
        count++;
      }
    }
    return totalAyahs > 0 ? Math.round((count / totalAyahs) * 100) : 0;
  };

  return (
    <aside className="w-full md:w-80 lg:w-88 flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 shrink-0">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search surahs (e.g. Kahf, 18, الكهف)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All (114)
            </button>
            <button
              onClick={() => setFilterType('Meccan')}
              className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                filterType === 'Meccan'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Meccan
            </button>
            <button
              onClick={() => setFilterType('Medinan')}
              className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                filterType === 'Medinan'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Medinan
            </button>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">{filteredSurahs.length} found</span>
        </div>
      </div>

      {/* Surahs Scrollable List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/40">
        {filteredSurahs.map(surah => {
          const isSelected = surah.number === selectedSurahNumber;
          const progress = calculateSurahProgress(surah.number, surah.numberOfAyahs);

          return (
            <button
              key={surah.number}
              onClick={() => {
                setSelectedSurahNumber(surah.number);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition group ${
                isSelected
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600 text-slate-900 dark:text-white'
                  : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                {/* Index Pill */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600'
                  }`}
                >
                  {surah.number}
                </div>

                {/* Details */}
                <div className="truncate">
                  <div className="text-xs sm:text-sm font-bold truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {surah.englishName}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} ayahs
                  </div>

                  {progress > 0 && (
                    <div className="mt-1 w-20 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Arabic Name */}
              <div className="text-right pl-2 shrink-0">
                <div className="font-arabic text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  {surah.name}
                </div>
                <div className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                  {surah.revelationType}
                </div>
              </div>
            </button>
          );
        })}

        {filteredSurahs.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No surahs found matching "{searchQuery}"
          </div>
        )}
      </div>
    </aside>
  );
};

import React, { useState, useMemo } from 'react';
import { useQuran } from '../context/QuranContext';
import { SURAHS_CATALOG } from '../data/surahs';
import { Search, Sparkles, BookOpen, Filter } from 'lucide-react';

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
    <div className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 shrink-0">
      {/* Search Header */}
      <div className="p-4 border-b border-stone-200 dark:border-stone-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search surah name, number..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                filterType === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All (114)
            </button>
            <button
              onClick={() => setFilterType('Meccan')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                filterType === 'Meccan'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Meccan
            </button>
            <button
              onClick={() => setFilterType('Medinan')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                filterType === 'Medinan'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Medinan
            </button>
          </div>
          <span className="text-stone-400 font-mono text-[11px]">{filteredSurahs.length} found</span>
        </div>
      </div>

      {/* Surah List */}
      <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800/60">
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
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-600 text-stone-900 dark:text-white'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-700 dark:text-stone-300'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                {/* Number Badge */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 transition ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 group-hover:bg-emerald-100 group-hover:text-emerald-800 dark:group-hover:bg-emerald-900/60 dark:group-hover:text-emerald-300'
                  }`}
                >
                  {surah.number}
                </div>

                {/* English Meta */}
                <div className="truncate">
                  <div className="text-sm font-semibold truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {surah.englishName}
                  </div>
                  <div className="text-xs text-stone-400 dark:text-stone-500 truncate">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} verses
                  </div>

                  {/* Progress bar if any mastered */}
                  {progress > 0 && (
                    <div className="mt-1 w-24 h-1 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Arabic Name */}
              <div className="text-right pl-2 shrink-0">
                <div className="font-arabic text-base font-semibold text-stone-800 dark:text-stone-200">
                  {surah.name}
                </div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                  {surah.revelationType}
                </div>
              </div>
            </button>
          );
        })}

        {filteredSurahs.length === 0 && (
          <div className="p-8 text-center text-stone-400 text-sm">
            No surahs found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

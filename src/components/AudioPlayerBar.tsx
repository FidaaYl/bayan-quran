import React from 'react';
import { useQuran } from '../context/QuranContext';
import { RECITERS_CATALOG } from '../data/reciters';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Gauge,
  UserCheck,
  Volume2
} from 'lucide-react';

export const AudioPlayerBar: React.FC = () => {
  const {
    surahDetail,
    selectedSurahNumber,
    activePlayingAyah,
    isPlaying,
    togglePlayPause,
    playNextAyah,
    playPrevAyah,
    currentReciter,
    setCurrentReciter,
    playbackSpeed,
    setPlaybackSpeed,
    repeatTimes,
    setRepeatTimes,
    audioProgress,
    seekAudio
  } = useQuran();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekAudio(parseFloat(e.target.value));
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const cycleRepeat = () => {
    const repeats = [1, 3, 5, 10];
    const nextIdx = (repeats.indexOf(repeatTimes) + 1) % repeats.length;
    setRepeatTimes(repeats[nextIdx]);
  };

  return (
    <div className="sticky bottom-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 py-2.5 px-4 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Ayah & Surah Info */}
        <div className="flex items-center space-x-3 w-full sm:w-1/4 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold text-sm shrink-0">
            {activePlayingAyah || 1}
          </div>
          <div className="min-w-0 truncate">
            <div className="text-sm font-semibold text-stone-900 dark:text-white truncate flex items-center space-x-1.5">
              <span>{surahDetail?.englishName || `Surah ${selectedSurahNumber}`}</span>
              <span className="font-arabic text-emerald-600 dark:text-emerald-400 font-bold">
                ({surahDetail?.name})
              </span>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 truncate">
              Ayah {activePlayingAyah || 1} of {surahDetail?.numberOfAyahs || '...'}
            </div>
          </div>
        </div>

        {/* Center: Playback Controls & Scrubber */}
        <div className="flex flex-col items-center w-full sm:w-2/4 max-w-md">
          {/* Main Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={playPrevAyah}
              className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 hover:scale-105 transition"
              title={isPlaying ? 'Pause' : 'Play Ayah'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={playNextAyah}
              className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar Slider */}
          <div className="w-full flex items-center space-x-2 mt-1">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={audioProgress || 0}
              onChange={handleSeek}
              className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* Right: Reciter, Speed, Repeat */}
        <div className="flex items-center justify-end space-x-2 w-full sm:w-1/4">
          {/* Reciter Dropdown */}
          <div className="relative group">
            <select
              value={currentReciter.id}
              onChange={e => {
                const found = RECITERS_CATALOG.find(r => r.id === e.target.value);
                if (found) setCurrentReciter(found);
              }}
              className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-lg px-2.5 py-1.5 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[130px] truncate"
            >
              {RECITERS_CATALOG.map(reciter => (
                <option key={reciter.id} value={reciter.id}>
                  {reciter.name.split('(')[0].trim()}
                </option>
              ))}
            </select>
          </div>

          {/* Repeat Ayah Button (Hifz helper) */}
          <button
            onClick={cycleRepeat}
            className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium transition ${
              repeatTimes > 1
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title={`Repeat each Ayah: ${repeatTimes}x`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>{repeatTimes}x</span>
          </button>

          {/* Speed Button */}
          <button
            onClick={cycleSpeed}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            title={`Speed: ${playbackSpeed}x`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{playbackSpeed}x</span>
          </button>
        </div>
      </div>
    </div>
  );
};

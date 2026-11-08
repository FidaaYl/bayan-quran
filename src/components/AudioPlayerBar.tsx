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
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-slate-900/95 text-white backdrop-blur-xl border border-indigo-500/30 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-2xl transition-all">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Ayah info & soundwave indicator */}
        <div className="flex items-center space-x-2.5 min-w-0 w-1/3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-mono font-bold text-xs shrink-0">
            {activePlayingAyah || 1}
          </div>

          <div className="min-w-0 truncate">
            <div className="text-xs font-bold text-white truncate flex items-center space-x-1">
              <span>{surahDetail?.englishName || `Surah ${selectedSurahNumber}`}</span>
              <span className="font-arabic text-amber-400">({surahDetail?.name})</span>
            </div>
            <div className="text-[10px] text-slate-400 truncate flex items-center space-x-1.5">
              <span>Ayah {activePlayingAyah || 1}</span>
              {isPlaying && (
                <div className="flex items-end space-x-0.5 h-3">
                  <span className="w-0.5 bg-indigo-400 rounded-full animate-wave-1" />
                  <span className="w-0.5 bg-indigo-400 rounded-full animate-wave-2" />
                  <span className="w-0.5 bg-indigo-400 rounded-full animate-wave-3" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Play Controls & Progress Slider */}
        <div className="flex flex-col items-center flex-1 max-w-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={playPrevAyah}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 hover:scale-105 transition"
              title={isPlaying ? 'Pause' : 'Play Ayah'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={playNextAyah}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full flex items-center mt-1">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={audioProgress || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>

        {/* Right: Reciter, Repeat, Speed */}
        <div className="flex items-center justify-end space-x-1.5 w-1/3">
          <select
            value={currentReciter.id}
            onChange={e => {
              const found = RECITERS_CATALOG.find(r => r.id === e.target.value);
              if (found) setCurrentReciter(found);
            }}
            className="text-[10px] bg-slate-800 text-slate-200 rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer max-w-[90px] sm:max-w-[110px] truncate"
          >
            {RECITERS_CATALOG.map(reciter => (
              <option key={reciter.id} value={reciter.id}>
                {reciter.name.split('(')[0].trim()}
              </option>
            ))}
          </select>

          <button
            onClick={cycleRepeat}
            className={`px-1.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center space-x-0.5 ${
              repeatTimes > 1 ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title={`Repeat each Ayah: ${repeatTimes}x`}
          >
            <Repeat className="w-3 h-3" />
            <span>{repeatTimes}x</span>
          </button>

          <button
            onClick={cycleSpeed}
            className="px-1.5 py-1 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition"
            title={`Playback Speed: ${playbackSpeed}x`}
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import { Play, Pause } from 'lucide-react';
import { useMetronomeStore } from '@/lib/store/metronomeStore';
import { cn } from '@/lib/utils/cn';

export function MetronomePanel() {
  const { isPlaying, tempo, currentBeat, start, stop, setTempo } = useMetronomeStore();

  const handleTogglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  return (
    <div className="bg-purple-900/30 border-2 border-purple-700 rounded-lg p-3">
      <div className="flex items-center gap-4">
        {/* Left: Metronome Title & Controls */}
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-purple-100">Metronome</h3>

          {/* Play/Stop Button */}
          <button
            onClick={handleTogglePlay}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-sm transition-colors',
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start
              </>
            )}
          </button>
        </div>

        {/* Center: Tempo Display & Slider */}
        <div className="flex items-center gap-3 flex-1">
          <div className="text-center min-w-[60px]">
            <div className="text-2xl font-bold text-purple-100">
              {tempo}
            </div>
            <div className="text-[10px] text-purple-300">BPM</div>
          </div>

          <div className="flex-1 max-w-xs">
            <input
              type="range"
              min="60"
              max="200"
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Right: Beat Indicators */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((beat) => (
            <div
              key={beat}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all',
                currentBeat === beat && isPlaying
                  ? beat === 1
                    ? 'bg-purple-500 text-white scale-110 shadow-lg'
                    : 'bg-green-500 text-white scale-110 shadow-lg'
                  : 'bg-purple-800/50 text-purple-300'
              )}
            >
              {beat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

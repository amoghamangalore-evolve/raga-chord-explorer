'use client';

import { X, Play, Pause } from 'lucide-react';
import { useUIStore } from '@/lib/store/uiStore';
import { useMetronomeStore } from '@/lib/store/metronomeStore';
import { cn } from '@/lib/utils/cn';

export function Metronome() {
  const { metronomeOpen, setMetronomeOpen } = useUIStore();
  const { isPlaying, tempo, currentBeat, start, stop, setTempo } = useMetronomeStore();

  if (!metronomeOpen) return null;

  const handleTogglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-bold text-white">Metronome</h3>
        <button
          onClick={() => setMetronomeOpen(false)}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Tempo display */}
        <div className="text-center">
          <div className="text-5xl font-bold text-primary-400 mb-2">
            {tempo}
          </div>
          <div className="text-sm text-gray-400">BPM</div>
        </div>

        {/* Tempo slider */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Adjust Tempo
          </label>
          <input
            type="range"
            min="60"
            max="200"
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>60</span>
            <span>200</span>
          </div>
        </div>

        {/* Beat indicator (4 beats) */}
        <div>
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4].map((beat) => (
              <div
                key={beat}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all',
                  currentBeat === beat && isPlaying
                    ? beat === 1
                      ? 'bg-primary-500 text-white scale-110 shadow-lg'
                      : 'bg-green-500 text-white scale-110 shadow-lg'
                    : 'bg-gray-700 text-gray-400'
                )}
              >
                {beat}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center">
            Beat 1 is accented
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleTogglePlay}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors',
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

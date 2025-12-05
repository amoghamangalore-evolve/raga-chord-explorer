'use client';

import { Volume2, Play, Square, Pause } from 'lucide-react';
import { useRagaStore } from '@/lib/store/ragaStore';
import { useAudioStore } from '@/lib/store/audioStore';
import { useMetronomeStore } from '@/lib/store/metronomeStore';
import { RAGAS, NOTE_NAMES } from '@/lib/data/ragas';
import { cn } from '@/lib/utils/cn';
import { RangeSlider } from '@/components/ui/RangeSlider';

export function ControlsBar() {
  const {
    selectedTradition,
    selectedRagaId,
    sa,
    droneType,
    droneVolume,
    setTradition,
    setRaga,
    setSa,
    setDroneType,
    setDroneVolume: setRagaDroneVolume,
  } = useRagaStore();

  const { masterVolume, droneEnabled, initialized, initialize, setMasterVolume, startDrone, stopDrone, setDroneVolume: setAudioDroneVolume } = useAudioStore();
  const { isPlaying: metronomeIsPlaying, tempo, currentBeat, start: startMetronome, stop: stopMetronome, setTempo } = useMetronomeStore();

  // Handle drone start/stop
  const handleDroneToggle = async () => {
    // Ensure audio is initialized first
    if (!initialized) {
      await initialize();
    }

    if (droneEnabled) {
      stopDrone();
    } else {
      if (droneType !== 'None') {
        startDrone(sa, droneType);
        // Set the drone volume immediately after starting
        setTimeout(() => {
          setAudioDroneVolume(droneVolume);
        }, 100);
      }
    }
  };

  // Filter ragas by selected tradition, with Carnatic listed first in data
  const availableRagas = RAGAS.filter((r) => r.tradition === selectedTradition);

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1: Musical Context */}
        <div className="space-y-3 bg-gray-750 p-4 rounded-lg border border-gray-700" data-tour="controls-tradition">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Select the Tradition
            </label>
            <select
              value={selectedTradition}
              onChange={(e) => setTradition(e.target.value as any)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="carnatic">Carnatic</option>
              <option value="hindustani">Hindustani</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Raga
            </label>
            <select
              value={selectedRagaId || ''}
              onChange={(e) => setRaga(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a raga...</option>
              {availableRagas.map((raga) => (
                <option key={raga.id} value={raga.id}>
                  {raga.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Column 2: Pitch & Settings */}
        <div className="space-y-3 bg-gray-750 p-4 rounded-lg border border-gray-700" data-tour="controls-sa">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Select Root Note
            </label>
            <select
              value={sa}
              onChange={(e) => setSa(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {NOTE_NAMES.map((note, index) => (
                <option key={index} value={index}>
                  {note}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Column 3: Drone System */}
        <div className="space-y-3 bg-purple-900/20 p-4 rounded-lg border border-purple-700/30" data-tour="controls-drone">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Drone Type
            </label>
            <div className="flex gap-2">
              <select
                value={droneType}
                onChange={(e) => {
                  const newType = e.target.value as any;
                  setDroneType(newType);
                  // Stop drone if it's playing and type changed
                  if (droneEnabled) {
                    stopDrone();
                  }
                }}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Sa-Pa">Sa-Pa</option>
                <option value="Sa-Ma">Sa-Ma</option>
                <option value="Sa">Sa Only</option>
                <option value="None">None</option>
              </select>
              <button
                onClick={handleDroneToggle}
                disabled={droneType === 'None'}
                className={cn(
                  'px-4 py-2 rounded-lg text-white text-sm font-medium transition-all flex items-center gap-2',
                  droneEnabled
                    ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                    : 'bg-green-600 hover:bg-green-700 active:scale-95',
                  droneType === 'None' && 'opacity-50 cursor-not-allowed'
                )}
              >
                {droneEnabled ? (
                  <>
                    <Square className="w-4 h-4" fill="currentColor" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" fill="currentColor" />
                    Start
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              <Volume2 className="inline w-4 h-4 mr-1" />
              Drone Volume
            </label>
            <div className="flex gap-2 items-center">
              <RangeSlider
                min={0}
                max={100}
                value={droneVolume * 100}
                onChange={(val) => {
                  const vol = val / 100;
                  setRagaDroneVolume(vol);
                  setAudioDroneVolume(vol);
                }}
                disabled={!droneEnabled}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 w-10 text-right">
                {Math.round(droneVolume * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Column 4: Metronome & Master Volume */}
        <div className="space-y-3 bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
          {/* Metronome Controls */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Metronome
            </label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => metronomeIsPlaying ? stopMetronome() : startMetronome()}
                className={cn(
                  'flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-all',
                  metronomeIsPlaying
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                )}
              >
                {metronomeIsPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Start
                  </>
                )}
              </button>
              <div className="flex-1 text-center bg-gray-700 rounded-lg px-2 py-1.5">
                <div className="text-base font-bold text-white leading-none">{tempo}</div>
                <div className="text-[9px] text-gray-400 leading-none">BPM</div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((beat) => (
                  <div
                    key={beat}
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all',
                      currentBeat === beat && metronomeIsPlaying
                        ? beat === 1
                          ? 'bg-indigo-500 text-white'
                          : 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-400'
                    )}
                  >
                    {beat}
                  </div>
                ))}
              </div>
            </div>
            <RangeSlider
              min={60}
              max={200}
              value={tempo}
              onChange={(val) => setTempo(val)}
              className="w-full"
            />
          </div>

          {/* Master Volume */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              <Volume2 className="inline w-4 h-4 mr-1" />
              Master Volume
            </label>
            <div className="flex gap-2 items-center">
              <RangeSlider
                min={0}
                max={100}
                value={masterVolume * 100}
                onChange={async (val) => {
                  const newVolume = val / 100;
                  // Initialize audio engine if not already initialized
                  if (!initialized) {
                    await initialize();
                  }
                  setMasterVolume(newVolume);
                }}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 w-10 text-right">
                {Math.round(masterVolume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

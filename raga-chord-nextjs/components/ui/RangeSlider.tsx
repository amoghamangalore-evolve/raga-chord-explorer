'use client';

import { useRef, useEffect, useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function RangeSlider({ min, max, value, onChange, disabled = false, className = '' }: RangeSliderProps) {
  const [fillWidth, setFillWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const percentage = ((value - min) / (max - min)) * 100;
    setFillWidth(percentage);
  }, [value, min, max]);

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Background track */}
      <div className="absolute left-0 right-0 h-2 bg-gray-600/70 rounded-full border border-gray-500/40" />

      {/* Filled portion (progress) */}
      <div
        className="absolute left-0 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-150 pointer-events-none"
        style={{ width: `${fillWidth}%` }}
      />

      {/* Actual input */}
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="relative w-full bg-transparent range-slider-custom"
      />
    </div>
  );
}

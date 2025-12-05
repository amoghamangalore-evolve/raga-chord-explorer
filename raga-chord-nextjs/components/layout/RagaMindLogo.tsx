'use client';

import React from 'react';

interface RagaMindLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function RagaMindLogo({ size = 40, showText = true, className = '' }: RagaMindLogoProps) {
  // Clean "rm." style logo like the reference
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* "rm." text logo - clean and minimal */}
      <div className="flex items-baseline">
        <span
          className="font-bold tracking-tight text-white"
          style={{
            fontSize: `${size}px`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.02em'
          }}
        >
          rm
        </span>
        {/* Accent dot with gradient */}
        <svg
          width={size * 0.3}
          height={size * 0.3}
          viewBox="0 0 20 20"
          className="ml-0.5"
          style={{ marginBottom: size * 0.1 }}
        >
          <defs>
            <linearGradient id="dot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <circle cx="10" cy="10" r="8" fill="url(#dot-gradient)" />
        </svg>
      </div>

      {/* Optional subtitle */}
      {showText && (
        <span
          className="text-white/70 font-medium hidden sm:inline"
          style={{ fontSize: `${size * 0.35}px` }}
        >
          RagaMind AI
        </span>
      )}
    </div>
  );
}

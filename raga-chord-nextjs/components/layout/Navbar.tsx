'use client';

import { HelpCircle } from 'lucide-react';
import { RagaMindLogo } from './RagaMindLogo';

interface NavbarProps {
  onHelpClick?: () => void;
}

export function Navbar({ onHelpClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 shadow-lg">
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Left: Logo with text */}
        <div className="flex items-center gap-2">
          <RagaMindLogo size={28} showText={false} />
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-tight leading-tight">
              RagaMind
            </span>
            <span className="text-[10px] text-white/70 font-medium leading-tight">
              AI-powered Raga Chord Discovery
            </span>
          </div>
        </div>

        {/* Right: Help button */}
        {onHelpClick && (
          <button
            onClick={onHelpClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Open help tour"
          >
            <HelpCircle className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white hidden sm:inline">Help</span>
          </button>
        )}
      </div>
    </nav>
  );
}

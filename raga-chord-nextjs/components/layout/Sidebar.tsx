'use client';

import { Home, Music2, Layers, BookOpen, HelpCircle, X } from 'lucide-react';
import { useUIStore } from '@/lib/store/uiStore';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'ragas', label: 'Ragas', icon: Music2 },
  { id: 'chords', label: 'Chords', icon: Layers },
  { id: 'theory', label: 'Theory', icon: BookOpen },
  { id: 'help', label: 'Help', icon: HelpCircle },
] as const;

export function Sidebar() {
  const { sidebarOpen, activeSection, setActiveSection, setSidebarOpen } = useUIStore();

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-gray-900 border-r border-gray-800 z-40 overflow-y-auto">
      {/* Close button at top */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-400">Menu</span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          v1.0.0 | Built with Next.js
        </p>
      </div>
    </aside>
  );
}

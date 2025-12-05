import { create } from 'zustand';
import { UIState } from '@/lib/types';

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  sidebarOpen: true,
  activeSection: 'dashboard',
  chatModalOpen: false,
  metronomeOpen: false,

  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setChatModalOpen: (open) => set({ chatModalOpen: open }),
  setMetronomeOpen: (open) => set({ metronomeOpen: open }),
}));

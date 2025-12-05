'use client';

import { X, MessageCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store/uiStore';

export function ChatModal() {
  const { chatModalOpen, setChatModalOpen } = useUIStore();

  if (!chatModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">AI Chat Assistant</h3>
          </div>
          <button
            onClick={() => setChatModalOpen(false)}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content - Placeholder */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-10 h-10 text-purple-400" />
            </div>

            <h4 className="text-2xl font-bold text-white">
              Chat Coming Soon!
            </h4>

            <p className="text-gray-300 max-w-md mx-auto">
              We're working on an AI-powered chat assistant to help you explore ragas,
              understand music theory, and discover new chord progressions.
            </p>

            <div className="pt-6 space-y-2">
              <p className="text-sm font-semibold text-purple-400">
                Planned Features:
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Ask questions about Indian classical music theory</li>
                <li>Get personalized raga recommendations</li>
                <li>Learn about specific chord progressions</li>
                <li>Understand the relationship between ragas and harmony</li>
                <li>Get practice suggestions and exercises</li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setChatModalOpen(false)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-900/50">
          <p className="text-xs text-gray-500 text-center">
            Stay tuned for updates! This feature will be available in a future release.
          </p>
        </div>
      </div>
    </div>
  );
}

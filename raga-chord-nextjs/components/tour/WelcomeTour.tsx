'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  targetSelector: string; // CSS selector for the element to highlight
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: () => void; // Optional action to perform when step starts
}

interface WelcomeTourProps {
  onTrigger?: (trigger: () => void) => void;
}

export function WelcomeTour({ onTrigger }: WelcomeTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tourStepsRef = useRef<TourStep[]>([]);

  // Initialize tour steps with actions
  useEffect(() => {
    tourStepsRef.current = [
      {
        title: 'Welcome to RagaMind AI! 🎵',
        description: 'Discover Western chord progressions based on Indian classical ragas. Let\'s take a quick tour to show you around.',
        targetSelector: 'body',
        position: 'center'
      },
      {
        title: '1. Select the Tradition',
        description: 'Start here! Choose between Carnatic or Hindustani traditions, then select a raga from the dropdown. Each raga has unique notes and characteristics.',
        targetSelector: '[data-tour="controls-tradition"]',
        position: 'bottom',
        action: () => {
          // Scroll to controls bar
          const element = document.querySelector('[data-tour="controls-tradition"]');
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      {
        title: '2. Select Root Note',
        description: 'Change the Sa (root note) to match your vocal range or instrument tuning. This transposes the entire raga to your desired key.',
        targetSelector: '[data-tour="controls-sa"]',
        position: 'bottom',
        action: () => {
          const element = document.querySelector('[data-tour="controls-sa"]');
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      {
        title: '3. Explore the Raga Scale',
        description: 'See the raga\'s aroha (ascending) and avaroha (descending) patterns. Purple notes are in the scale. Click "Play Scale" to hear it!',
        targetSelector: '[data-tour="scale-explorer"]',
        position: 'right',
        action: () => {
          const element = document.querySelector('[data-tour="scale-explorer"]');
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      {
        title: '4. Virtual Keyboard',
        description: 'Purple keys are in the selected raga. Click any key to hear authentic Indian classical instrument sounds. Keys light up blue when you click a chord.',
        targetSelector: '[data-tour="virtual-keyboard"]',
        position: 'left',
        action: () => {
          const element = document.querySelector('[data-tour="virtual-keyboard"]');
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      {
        title: '5. Discover Generated Chords',
        description: 'All Western chords built from the raga\'s notes appear here. Click any chord card to highlight its notes on the keyboard. Use the "Triads Only" toggle to filter.',
        targetSelector: '[data-tour="chord-cards"]',
        position: 'top',
        action: () => {
          const element = document.querySelector('[data-tour="chord-cards"]');
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      {
        title: '6. Drone & Audio Controls',
        description: 'Enable the traditional Sa-Pa tanpura drone for authentic practice. Adjust master volume, drone volume, and drone type (Sa-Pa or Sa-Ma).',
        targetSelector: '[data-tour="controls-drone"]',
        position: 'bottom',
        action: () => {
          const element = document.querySelector('[data-tour="controls-drone"]');
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      {
        title: 'Ready to Explore! 🚀',
        description: 'That\'s everything! Select a raga, play the scale, explore chords, and create beautiful music. Click the ? button anytime to replay this tour.',
        targetSelector: 'body',
        position: 'center'
      }
    ];
  }, []);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('ragamind-tour-completed');
    if (!hasSeenTour) {
      // Show tour after a brief delay
      setTimeout(() => setIsOpen(true), 1500);
    }
  }, []);

  // Update highlight position when step changes
  useEffect(() => {
    if (!isOpen || tourStepsRef.current.length === 0) return;

    const step = tourStepsRef.current[currentStep];

    // Execute step action if exists
    if (step.action) {
      setTimeout(() => step.action!(), 100);
    }

    // Update highlight after action completes
    setTimeout(() => {
      updateHighlight();
    }, 300);
  }, [isOpen, currentStep]);

  // Update highlight on window resize
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => updateHighlight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, currentStep]);

  const updateHighlight = () => {
    if (tourStepsRef.current.length === 0) return;

    const step = tourStepsRef.current[currentStep];
    const element = document.querySelector(step.targetSelector);

    if (element && step.position !== 'center') {
      const rect = element.getBoundingClientRect();
      setHighlightRect(rect);

      // Calculate tooltip position
      calculateTooltipPosition(rect, step.position);
    } else {
      setHighlightRect(null);
    }
  };

  const calculateTooltipPosition = (rect: DOMRect, position: string) => {
    const tooltipWidth = 400;
    const tooltipHeight = 200;
    const gap = 20;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = rect.top - tooltipHeight - gap;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.left - tooltipWidth - gap;
        break;
      case 'right':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.right + gap;
        break;
    }

    // Keep tooltip within viewport
    const maxLeft = window.innerWidth - tooltipWidth - 20;
    const maxTop = window.innerHeight - tooltipHeight - 20;
    left = Math.max(20, Math.min(left, maxLeft));
    top = Math.max(20, Math.min(top, maxTop));

    setTooltipPosition({ top, left });
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
    setHighlightRect(null);
    localStorage.setItem('ragamind-tour-completed', 'true');
  };

  const handleNext = () => {
    if (currentStep < tourStepsRef.current.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartTour = useCallback(() => {
    setCurrentStep(0);
    setIsOpen(true);
  }, []);

  // Expose trigger function to parent component
  useEffect(() => {
    if (onTrigger) {
      onTrigger(handleStartTour);
    }
  }, [onTrigger, handleStartTour]);

  if (tourStepsRef.current.length === 0) return null;

  const step = tourStepsRef.current[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourStepsRef.current.length - 1;
  const isCenterPosition = step.position === 'center';

  return (
    <>
      {/* Tour Overlay */}
      {isOpen && (
        <>
          {/* Backdrop with cutout for highlighted element */}
          <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Highlighted element cutout */}
            {highlightRect && (
              <>
                {/* Glowing border around highlighted element */}
                <div
                  className="absolute border-4 border-purple-500 rounded-lg shadow-2xl shadow-purple-500/50 animate-pulse pointer-events-none"
                  style={{
                    top: highlightRect.top - 8,
                    left: highlightRect.left - 8,
                    width: highlightRect.width + 16,
                    height: highlightRect.height + 16,
                  }}
                />

                {/* Clear area for highlighted element */}
                <div
                  className="absolute bg-transparent"
                  style={{
                    top: highlightRect.top,
                    left: highlightRect.left,
                    width: highlightRect.width,
                    height: highlightRect.height,
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
                  }}
                />
              </>
            )}
          </div>

          {/* Tour Tooltip */}
          <div
            className={`fixed z-[101] pointer-events-auto ${
              isCenterPosition ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''
            }`}
            style={!isCenterPosition ? tooltipPosition : undefined}
          >
            <div className="bg-gray-800 border-2 border-purple-500 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-slide-in">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close tour"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="px-5 py-4">
                <p className="text-gray-200 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Progress Dots */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {tourStepsRef.current.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-8 bg-purple-500'
                          : 'w-2 bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-gray-900 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  Step {currentStep + 1} of {tourStepsRef.current.length}
                </div>

                <div className="flex items-center gap-2">
                  {!isFirstStep && (
                    <button
                      onClick={handlePrevious}
                      className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className="px-4 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-1 font-medium"
                  >
                    {isLastStep ? "Let's Go!" : 'Next'}
                    {!isLastStep && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

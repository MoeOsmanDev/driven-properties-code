'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface FormStepsProps {
  steps: Array<{ title: string }>;
  currentStep: number;
}

/**
 * Progress indicator component showing the current step
 * and progress through the multi-step form
 */
export const FormSteps: React.FC<FormStepsProps> = React.memo(
  ({ steps, currentStep }) => {
    return (
      <nav aria-label='Progress' className='mb-0'>
        <ol role='list' className='flex items-center justify-between'>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                'flex items-center',
                index < steps.length - 1 ? 'flex-1' : ''
              )}
            >
              <div className='flex items-center'>
                {/* Enhanced step indicator */}
                <div
                  className={cn(
                    'flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 shadow-lg relative',
                    currentStep > index
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/30 scale-105'
                      : currentStep === index
                      ? 'bg-gradient-to-r from-white to-gray-50 text-blue-600 border-2 border-blue-500 shadow-blue-500/20 scale-110'
                      : 'bg-white/80 text-slate-600 border-2 border-slate-300 shadow-slate-200/50'
                  )}
                >
                  {/* Glow effect for active/completed steps */}
                  {currentStep >= index && (
                    <div
                      className={cn(
                        'absolute inset-0 rounded-full blur-md',
                        currentStep > index
                          ? 'bg-gradient-to-r from-blue-400/40 to-cyan-400/40'
                          : 'bg-blue-400/30'
                      )}
                    ></div>
                  )}

                  <div className='relative z-10'>
                    {currentStep > index ? (
                      <svg
                        className='h-6 w-6'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <span className='font-bold'>{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Enhanced step title */}
                <div className='ml-4 min-w-0'>
                  <span
                    className={cn(
                      'text-sm font-semibold transition-all duration-300',
                      currentStep >= index
                        ? 'text-white drop-shadow-sm'
                        : 'text-blue-200/70'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </div>

              {/* Enhanced connector line */}
              {index < steps.length - 1 && (
                <div className='ml-6 flex-1 relative'>
                  <div
                    className={cn(
                      'h-1 w-full transition-all duration-500 rounded-full relative overflow-hidden',
                      currentStep > index
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/30'
                        : 'bg-blue-200/30'
                    )}
                  >
                    {/* Animated progress fill */}
                    {currentStep > index && (
                      <div className='absolute inset-0 bg-gradient-to-r from-blue-300/50 to-cyan-300/50 animate-pulse'></div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

FormSteps.displayName = 'FormSteps';

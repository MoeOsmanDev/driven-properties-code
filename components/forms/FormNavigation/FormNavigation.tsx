'use client';

import { Button } from '@/components/ui/button';
import { FormNavigationProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useCallback, useMemo } from 'react';
import { NextIcon } from './NextIcon';
import { PrevIcon } from './PrevIcon';
import { SpinnerIcon } from './SpinnerIcon';

export const FormNavigation: React.FC<FormNavigationProps> = React.memo(
  ({
    currentStep,
    totalSteps,
    canGoPrev,
    canGoNext,
    onPrev,
    onNext,
    onSubmit,
    isLoading = false,
  }) => {
    const isLastStep = useMemo(
      () => currentStep === totalSteps - 1,
      [currentStep, totalSteps]
    );
    const [isNavigating, setIsNavigating] = React.useState(false);

    const handleNext = useCallback(async () => {
      setIsNavigating(true);
      try {
        if (isLastStep) {
          await onSubmit();
        } else {
          await onNext();
        }
      } finally {
        setIsNavigating(false);
      }
    }, [isLastStep, onSubmit, onNext]);

    return (
      <div className='pt-8 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent relative'>
        {/* Decorative line */}
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full'></div>

        <div className='flex items-center justify-between pt-2'>
          {/* Previous Button */}
          <Button
            type='button'
            variant='outline'
            onClick={onPrev}
            disabled={!canGoPrev || isLoading || isNavigating}
            className={cn(
              'flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300',
              'border-2 border-slate-300 hover:border-slate-400',
              'bg-white hover:bg-slate-50',
              'text-slate-700 hover:text-slate-800',
              'shadow-md hover:shadow-lg',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-300',
              'group relative overflow-hidden'
            )}
          >
            {/* Button background effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-slate-50 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

            <div className='relative z-10 flex items-center gap-3'>
              <div className='w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5'>
                <PrevIcon />
              </div>
              <span>Previous</span>
            </div>
          </Button>

          {/* Progress indicator */}
          <div className='flex flex-col items-center space-y-2'>
            <div className='flex items-center gap-2 text-sm font-medium text-slate-600'>
              <span>Step</span>
              <div className='flex items-center space-x-1'>
                <span className='inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-sm'>
                  {currentStep + 1}
                </span>
                <span className='text-slate-400'>of</span>
                <span className='inline-flex items-center justify-center w-6 h-6 bg-slate-200 text-slate-600 text-xs font-bold rounded-full'>
                  {totalSteps}
                </span>
              </div>
            </div>

            {/* Mini progress dots */}
            <div className='flex items-center space-x-1'>
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index <= currentStep
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-sm'
                      : 'bg-slate-200'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Next/Submit Button */}
          <Button
            type='button'
            onClick={handleNext}
            disabled={(!canGoNext && !isLastStep) || isLoading || isNavigating}
            className={cn(
              'flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px]',
              'shadow-lg hover:shadow-xl',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'group relative overflow-hidden',
              isLastStep
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-2 border-green-500 hover:border-green-600 shadow-green-500/30'
                : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-2 border-blue-500 hover:border-blue-600 shadow-blue-500/30'
            )}
          >
            {/* Button glow effect */}
            <div
              className={cn(
                'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl',
                isLastStep
                  ? 'bg-gradient-to-r from-green-400/20 to-emerald-500/20'
                  : 'bg-gradient-to-r from-blue-400/20 to-cyan-500/20'
              )}
            ></div>

            <div className='relative z-10 flex items-center gap-3'>
              {isNavigating ? (
                <>
                  <div className='w-5 h-5 animate-spin'>
                    <SpinnerIcon />
                  </div>
                  <span>{isLastStep ? 'Submitting...' : 'Processing...'}</span>
                </>
              ) : (
                <>
                  <span>{isLastStep ? 'Submit' : 'Next'}</span>
                  {isLastStep ? (
                    <div className='w-5 h-5'>
                      <svg
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        className='w-5 h-5'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5'>
                      <NextIcon />
                    </div>
                  )}
                </>
              )}
            </div>
          </Button>
        </div>
      </div>
    );
  }
);

FormNavigation.displayName = 'FormNavigation';

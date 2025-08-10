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
      <div className='flex items-center justify-between pt-8 border-t border-gray-200'>
        <Button
          type='button'
          variant='outline'
          onClick={onPrev}
          disabled={!canGoPrev || isLoading || isNavigating}
          className='flex items-center gap-2'
        >
          <PrevIcon />
          Previous
        </Button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          Step {currentStep + 1} of {totalSteps}
        </div>

        <Button
          type='button'
          onClick={handleNext}
          disabled={(!canGoNext && !isLastStep) || isLoading || isNavigating}
          className={cn(
            'flex items-center gap-2 min-w-[120px]',
            isLastStep && 'bg-green-600 hover:bg-green-700'
          )}
        >
          {isNavigating ? (
            <>
              <SpinnerIcon />
              {isLastStep ? 'Submitting...' : 'Processing...'}
            </>
          ) : (
            <>
              {isLastStep ? 'Submit' : 'Next'}
              {!isLastStep && <NextIcon />}
            </>
          )}
        </Button>
      </div>
    );
  }
);

FormNavigation.displayName = 'FormNavigation';

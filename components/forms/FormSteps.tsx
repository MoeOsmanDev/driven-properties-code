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
      <nav aria-label='Progress' className='mb-8'>
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
                {/* Step indicator */}
                <div
                  className={cn(
                    'flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
                    currentStep > index
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : currentStep === index
                      ? 'border-blue-600 bg-white text-blue-600'
                      : 'border-gray-300 bg-white text-black'
                  )}
                >
                  {currentStep > index ? (
                    <svg
                      className='h-5 w-5'
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
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step title */}
                <div className='ml-4 min-w-0'>
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors duration-200',
                      currentStep >= index ? 'text-black' : 'text-gray-600'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'ml-4 h-0.5 w-full transition-colors duration-200',
                    currentStep > index ? 'bg-blue-600' : 'bg-gray-300'
                  )}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

FormSteps.displayName = 'FormSteps';

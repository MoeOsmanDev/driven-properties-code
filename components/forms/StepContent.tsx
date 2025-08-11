import { FormData, FormStep } from '@/lib/types';
import React from 'react';
import { FormField } from './FormField/FormField';

interface StepContentProps {
  currentStepData: FormStep;
  currentStep: number;
  totalSteps: number;
  formData: FormData;
  updateField: (key: string, value: any) => void;
}

/**
 * Renders the content for a specific step in the multi-step form
 *
 * This component is responsible for displaying the current step's fields
 * and step information. It serves as the main content area for each step,
 * rendering individual FormField components for each field defined in the step schema.
 *
 * The component provides:
 * - Step title and progress indicator
 * - Dynamic field rendering based on step schema
 * - Consistent layout and styling for all steps
 *
 * @param props - Component properties
 * @param props.currentStepData - Schema definition for the current step
 * @param props.currentStep - Current step index (0-based)
 * @param props.totalSteps - Total number of steps in the form
 * @param props.formData - Current form data for field values
 * @param props.updateField - Function to update field values
 *
 * @example
 * ```typescript
 * <StepContent
 *   currentStepData={formSchema.steps[0]}
 *   currentStep={0}
 *   totalSteps={3}
 *   formData={formData}
 *   updateField={updateField}
 * />
 * ```
 */
export const StepContent: React.FC<StepContentProps> = React.memo(
  ({ currentStepData, currentStep, totalSteps, formData, updateField }) => {
    return (
      <div className='space-y-8'>
        {/* Enhanced step header */}
        <div className='text-center relative'>
          {/* Decorative elements */}
          <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full'></div>

          <div className='pt-4'>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-3'>
              {currentStepData.title}
            </h2>

            {/* Enhanced progress indicator */}
            <div className='flex items-center justify-center space-x-3 mb-4'>
              <span className='text-slate-600 font-medium'>Step</span>
              <div className='flex items-center space-x-2'>
                <span className='inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/30'>
                  {currentStep + 1}
                </span>
                <span className='text-slate-400 font-medium'>of</span>
                <span className='inline-flex items-center justify-center w-8 h-8 bg-slate-200 text-slate-600 text-sm font-bold rounded-full'>
                  {totalSteps - 1}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className='max-w-md mx-auto'>
              <div className='flex items-center justify-between text-xs text-slate-500 mb-2'>
                <span>Progress</span>
                <span>
                  {Math.round(((currentStep + 1) / (totalSteps - 1)) * 100)}%
                </span>
              </div>
              <div className='w-full bg-slate-200 rounded-full h-2 overflow-hidden'>
                <div
                  className='h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 ease-out shadow-lg'
                  style={{
                    width: `${((currentStep + 1) / (totalSteps - 1)) * 100}%`,
                  }}
                >
                  <div className='h-full bg-gradient-to-r from-blue-300/50 to-cyan-300/50 animate-pulse'></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced form fields container */}
        <div className='bg-gradient-to-b from-white to-gray-50/30 rounded-xl border border-gray-200/60 p-6 md:p-8 shadow-lg'>
          <div className='space-y-8'>
            {currentStepData.fields.map((field, index) => (
              <div
                key={field.key}
                className='group relative'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Field container with enhanced styling */}
                <div className='relative bg-white/80 rounded-lg border border-gray-200/60 p-4 hover:border-blue-200 hover:shadow-md transition-all duration-300 hover:bg-white'>
                  {/* Subtle gradient overlay on hover */}
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/30 group-hover:to-cyan-50/20 rounded-lg transition-all duration-300 pointer-events-none'></div>

                  <div className='relative z-10'>
                    <FormField
                      field={field}
                      formData={formData}
                      onUpdate={updateField}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpful tip section */}
        <div className='bg-gradient-to-r from-cyan-50/50 via-blue-50/30 to-cyan-50/50 border border-cyan-200/60 rounded-xl p-5 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-xl'></div>
          <div className='relative flex items-start space-x-3'>
            <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/30'>
              <svg
                className='w-4 h-4 text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-slate-800 mb-1'>Helpful Tip</h4>
              <p className='text-sm text-slate-600'>
                Take your time to fill out all fields accurately. You can always
                go back to previous steps if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StepContent.displayName = 'StepContent';

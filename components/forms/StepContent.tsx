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
export const StepContent: React.FC<StepContentProps> = ({
  currentStepData,
  currentStep,
  totalSteps,
  formData,
  updateField,
}) => {
  return (
    <div className='space-y-8'>
      {/* Step header with title and progress indicator */}
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          {currentStepData.title}
        </h2>
        <p className='text-gray-600'>
          Step {currentStep + 1} of {totalSteps - 1}
        </p>
      </div>

      {/* Form fields for the current step */}
      <div className='space-y-6'>
        {currentStepData.fields.map(field => (
          <FormField
            key={field.key}
            field={field}
            formData={formData}
            onUpdate={updateField}
          />
        ))}
      </div>
    </div>
  );
};

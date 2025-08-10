'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import rawFormSchema from '@/lib/form-schema.json';
import { FormSchema } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { slideVariants } from './animations/slideVariants';
import { FormNavigation } from './FormNavigation/FormNavigation';
import { FormSteps } from './FormSteps';
import { ReviewStep } from './ReviewStep';
import { StepContent } from './StepContent';

export const MultiStepForm: React.FC = () => {
  const {
    currentStep,
    totalSteps,
    formData,
    nextStep,
    prevStep,
    updateField,
    submitForm,
    canGoNext,
    canGoPrev,
  } = useMultiStepForm(rawFormSchema as FormSchema);

  const formSchema = rawFormSchema as FormSchema;
  const currentStepData = formSchema.steps[currentStep];
  const isReviewStep = currentStep === totalSteps - 1;

  const [direction, setDirection] = useState(0);

  const handleNext = async () => {
    setDirection(1);
    return await nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  return (
    <div className='w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
      {/* Steps Header */}
      <div className='px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-700'>
        <FormSteps steps={formSchema.steps} currentStep={currentStep} />
      </div>

      {/* Form Content */}
      <div className='p-4 sm:p-6 md:p-8'>
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className='min-h-[300px] sm:min-h-[350px] md:min-h-[400px]'
          >
            {isReviewStep ? (
              <ReviewStep formSchema={formSchema} formData={formData} />
            ) : (
              <StepContent
                currentStepData={currentStepData}
                currentStep={currentStep}
                totalSteps={totalSteps}
                formData={formData}
                updateField={updateField}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          canGoNext={canGoNext}
          canGoPrev={canGoPrev}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={submitForm}
        />
      </div>
    </div>
  );
};

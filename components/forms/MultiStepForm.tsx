'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import rawFormSchema from '@/lib/form-schema.json';
import { FormSchema } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
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
  const currentStepData = useMemo(
    () => formSchema.steps[currentStep],
    [formSchema.steps, currentStep]
  );
  const isReviewStep = useMemo(
    () => currentStep === totalSteps - 1,
    [currentStep, totalSteps]
  );

  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(async () => {
    setDirection(1);
    return await nextStep();
  }, [nextStep]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    prevStep();
  }, [prevStep]);

  const handleUpdateField = useCallback(
    (key: string, value: any) => {
      updateField(key, value);
    },
    [updateField]
  );

  console.log('page rendered');

  const memoizedFormSteps = useMemo(
    () => <FormSteps steps={formSchema.steps} currentStep={currentStep} />,
    [formSchema.steps, currentStep]
  );

  const memoizedStepContent = useMemo(
    () => (
      <StepContent
        currentStepData={currentStepData}
        currentStep={currentStep}
        totalSteps={totalSteps}
        formData={formData}
        updateField={handleUpdateField}
      />
    ),
    [currentStepData, currentStep, totalSteps, formData, handleUpdateField]
  );

  const memoizedReviewStep = useMemo(
    () => <ReviewStep formSchema={formSchema} formData={formData} />,
    [formSchema, formData]
  );

  const memoizedFormNavigation = useMemo(
    () => (
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={submitForm}
      />
    ),
    [
      currentStep,
      totalSteps,
      canGoNext,
      canGoPrev,
      handlePrev,
      handleNext,
      submitForm,
    ]
  );

  return (
    <div className='w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
      {/* Steps Header */}
      <div className='px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-700'>
        {memoizedFormSteps}
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
            {isReviewStep ? memoizedReviewStep : memoizedStepContent}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {memoizedFormNavigation}
      </div>
    </div>
  );
};

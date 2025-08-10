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

  // Only memoize expensive computations that don't change frequently
  const currentStepData = useMemo(
    () => formSchema.steps[currentStep],
    [currentStep] // formSchema.steps is static, so we don't need it in deps
  );

  const isReviewStep = useMemo(
    () => currentStep === totalSteps - 1,
    [currentStep, totalSteps]
  );

  const [direction, setDirection] = useState(0);

  // Only use useCallback for functions passed to memoized child components
  const handleNext = useCallback(async () => {
    setDirection(1);
    return await nextStep();
  }, [nextStep]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    prevStep();
  }, [prevStep]);

  // const handleUpdateField = (key: string, value: any) => {
  //   updateField(key, value);
  // };

  console.log('page rendered');

  return (
    <div className='w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto'>
      {/* Main form container with glass morphism effect */}
      <div className='bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
        {/* Steps Header with enhanced gradient */}
        <div className='px-4 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 relative overflow-hidden'>
          {/* Subtle pattern overlay */}
          <div className='absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10'></div>
          <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.15),transparent)]'></div>

          <div className='relative'>
            <FormSteps steps={formSchema.steps} currentStep={currentStep} />
          </div>
        </div>

        {/* Form Content with enhanced styling */}
        <div className='p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-b from-gray-50/50 to-white'>
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

          {/* Navigation with modern styling */}
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
    </div>
  );
};

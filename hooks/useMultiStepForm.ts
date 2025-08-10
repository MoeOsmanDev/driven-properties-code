'use client';

import { FormData, FormSchema, UseMultiStepFormReturn } from '@/lib/types';
import { useCallback, useMemo, useState } from 'react';

/**
 * Simplified custom hook for managing multi-step form state and logic
 */
export const useMultiStepForm = (
  schema: FormSchema
): UseMultiStepFormReturn => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const totalSteps = schema.steps.length;

  /**
   * Updates a specific field in the form data
   */
  const updateField = useCallback((key: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = key.split('.');
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }, []);

  /**
   * Moves to the next step
   */
  const nextStep = useCallback(async (): Promise<boolean> => {
    if (currentStep >= totalSteps - 1) return false;
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    return true;
  }, [currentStep, totalSteps]);

  /**
   * Moves to the previous step
   */
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  /**
   * Jumps to a specific step by index
   */
  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < totalSteps) {
        setCurrentStep(stepIndex);
      }
    },
    [totalSteps]
  );

  /**
   * Resets the form to its initial state
   */
  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setFormData({});
  }, []);

  /**
   * Submits the final form data
   */
  const submitForm = useCallback(async (): Promise<FormData | null> => {
    // Show alert to user
    alert(
      'Form submitted successfully! Check the browser console to see your data.'
    );

    // Log the form data to console
    console.log('✅ Form submitted successfully!');
    console.log('📊 Form Data (JSON):', JSON.stringify(formData, null, 2));

    return formData;
  }, [formData]);

  // Computed properties
  const isValid = useMemo(() => {
    return true; // Always valid since no validation is implemented
  }, []);

  const canGoNext = useMemo(() => {
    return currentStep < totalSteps - 1;
  }, [currentStep, totalSteps]);

  const canGoPrev = useMemo(() => {
    return currentStep > 0;
  }, [currentStep]);

  const canSubmit = useMemo(() => {
    return currentStep === totalSteps - 1;
  }, [currentStep, totalSteps]);

  return {
    currentStep,
    totalSteps,
    formData,
    isValid,
    canGoNext,
    canGoPrev,
    canSubmit,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    submitForm,
  };
};

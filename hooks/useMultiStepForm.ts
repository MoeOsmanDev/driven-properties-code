'use client';

import {
  FormData,
  FormField,
  FormSchema,
  UseMultiStepFormReturn,
} from '@/lib/types';
import { useCallback, useMemo, useState } from 'react';

// Validation patterns (same as in FormField)
const VALIDATION_PATTERNS = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^[\d\s\-\+\(\)]{7,15}$/,
  fullName: /^[a-zA-Z\s]{2,50}$/,
} as const;

// Validation function (same logic as FormField)
const validateField = (
  field: FormField,
  value: any,
  fieldPath: string
): boolean => {
  // Required validation
  if (field.required) {
    if (value === undefined || value === null || value === '') {
      return false;
    }
  }

  // If no value and not required, field is valid
  if (!value && !field.required) {
    return true;
  }

  // Type-specific validation
  switch (field.type) {
    case 'text':
      if (typeof value !== 'string') return true;

      const trimmedValue = value.trim();

      if (field.key === 'email') {
        return VALIDATION_PATTERNS.email.test(trimmedValue);
      } else if (field.key === 'fullName') {
        return (
          trimmedValue.length >= 2 &&
          trimmedValue.length <= 50 &&
          VALIDATION_PATTERNS.fullName.test(trimmedValue)
        );
      } else if (field.key === 'number' && fieldPath.includes('phone')) {
        return (
          trimmedValue.length >= 7 &&
          trimmedValue.length <= 15 &&
          VALIDATION_PATTERNS.phone.test(trimmedValue)
        );
      } else if (field.key === 'location') {
        return trimmedValue.length >= 3 && trimmedValue.length <= 100;
      }
      break;

    case 'number':
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) return false;

      if (field.key === 'size') {
        return numValue > 0 && numValue <= 100000;
      } else if (field.key === 'parkingSpots') {
        return numValue >= 1 && numValue <= 50;
      }
      break;

    case 'select':
      if (field.options && field.options.length > 0) {
        return field.options.includes(value);
      }
      break;
  }

  return true;
};

// Function to check if field should be visible
const isFieldVisible = (
  field: FormField,
  formData: FormData,
  parentPath = ''
): boolean => {
  if (!field.dependencies || field.dependencies.length === 0) {
    return true;
  }

  const getValue = (path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], formData);
  };

  return field.dependencies.every(dep => {
    if (dep.equals !== undefined) {
      const depValue = getValue(dep.key);
      return depValue === dep.equals;
    }
    if (dep.notEmpty !== undefined) {
      const value = getValue(dep.key);
      return dep.notEmpty
        ? value && typeof value === 'string' && value !== ''
        : true;
    }
    return true;
  });
};

// Function to get dynamic options for a field
const getFieldOptions = (field: FormField, formData: FormData): string[] => {
  if (field.options) {
    return field.options;
  }

  if (field.optionSource) {
    const getValue = (path: string) => {
      return path.split('.').reduce((current, key) => current?.[key], formData);
    };

    const dependencyValue = getValue(field.optionSource.key);
    if (
      dependencyValue &&
      typeof dependencyValue === 'string' &&
      field.optionSource.map[dependencyValue]
    ) {
      return field.optionSource.map[dependencyValue];
    }
  }

  return [];
};

// Function to validate all fields in a step
const validateStep = (
  fields: FormField[],
  formData: FormData,
  parentPath = ''
): boolean => {
  return fields.every(field => {
    const fieldPath = parentPath ? `${parentPath}.${field.key}` : field.key;

    // Skip validation for invisible fields
    if (!isFieldVisible(field, formData, parentPath)) {
      return true;
    }

    // For group fields, validate all sub-fields
    if (field.type === 'group' && field.fields) {
      return validateStep(field.fields, formData, fieldPath);
    }

    // Get field value
    const value = fieldPath
      .split('.')
      .reduce((current, key) => current?.[key], formData);

    // Validate the field
    return validateField(field, value, fieldPath);
  });
};

/**
 * Professional multi-step form hook with proper React optimization
 * This approach fixes the hook ordering issue while maintaining performance optimizations
 */
export const useMultiStepForm = (
  schema: FormSchema
): UseMultiStepFormReturn => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  // Memoize totalSteps since schema is unlikely to change
  const totalSteps = useMemo(() => schema.steps.length, [schema.steps.length]);

  /**
   * Updates a specific field in the form data
   * Always declared - no conditional hooks
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
  }, []); // No dependencies needed since we use functional updates

  /**
   * Validates the current step
   * Dependencies properly specified to avoid stale closures
   */
  const validateCurrentStep = useCallback((): boolean => {
    const currentStepData = schema.steps[currentStep];
    if (!currentStepData) return false;

    return validateStep(currentStepData.fields, formData);
  }, [currentStep, formData, schema.steps]);

  /**
   * Moves to the next step with validation
   * All dependencies properly listed
   */
  const nextStep = useCallback(async (): Promise<boolean> => {
    // Don't proceed if already at the last step
    if (currentStep >= totalSteps - 1) return false;

    // Validate current step before proceeding
    const isCurrentStepValid = validateCurrentStep();
    if (!isCurrentStepValid) {
      // You could add a toast notification here
      console.warn('Please complete all required fields before proceeding');
      return false;
    }

    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    return true;
  }, [currentStep, totalSteps, validateCurrentStep]);

  /**
   * Moves to the previous step
   * Simple function with minimal dependencies
   */
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []); // No dependencies needed since we use functional updates

  /**
   * Jumps to a specific step by index
   * Dependencies properly specified
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
   * No dependencies needed
   */
  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setFormData({});
  }, []);

  /**
   * Validates all steps and submits the form
   * Dependencies properly specified
   */
  const submitForm = useCallback(async (): Promise<FormData | null> => {
    // Validate all steps before submission
    const allStepsValid = schema.steps.every(step =>
      validateStep(step.fields, formData)
    );

    if (!allStepsValid) {
      alert('Please complete all required fields before submitting');
      return null;
    }

    // Show alert to user
    alert(
      'Form submitted successfully! Check the browser console to see your data.'
    );

    // Log the form data to console
    console.log('✅ Form submitted successfully!');
    console.log('📊 Form Data (JSON):', JSON.stringify(formData, null, 2));

    return formData;
  }, [formData, schema.steps]);

  // Computed properties with proper dependencies
  // These are always declared in the same order
  const isValid = useMemo(() => {
    return validateCurrentStep();
  }, [validateCurrentStep]);

  const canGoNext = useMemo(() => {
    return currentStep < totalSteps - 1 && isValid;
  }, [currentStep, totalSteps, isValid]);

  const canGoPrev = useMemo(() => {
    return currentStep > 0;
  }, [currentStep]);

  const canSubmit = useMemo(() => {
    // Can only submit if on the last step and all previous steps are valid
    if (currentStep !== totalSteps - 1) return false;

    return schema.steps.every(step => validateStep(step.fields, formData));
  }, [currentStep, totalSteps, formData, schema.steps]);

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

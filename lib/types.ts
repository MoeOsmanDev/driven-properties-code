/**
 * Core type definitions for the multi-step form system
 */

export type FieldType =
  | 'text'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'group';

export interface FormDependency {
  key: string;
  equals?: any;
  notEmpty?: boolean;
}

export interface OptionSource {
  key: string;
  map: Record<string, string[]>;
}

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  optionSource?: OptionSource;
  dependencies?: FormDependency[];
  fields?: FormField[]; // For group type
}

export interface FormStep {
  title: string;
  fields: FormField[];
}

export interface FormSchema {
  steps: FormStep[];
}

/**
 * Form data type - dynamically generated based on schema
 */
export type FormData = Record<string, any>;

/**
 * Hook return type for form management
 *
 * Provides comprehensive form state and control functions for multi-step forms
 */
export interface UseMultiStepFormReturn {
  /** Current step index (0-based) */
  currentStep: number;
  /** Total number of steps in the form */
  totalSteps: number;
  /** Form data object with nested field support */
  formData: FormData;
  /** Whether the current step is valid */
  isValid: boolean;
  /** Whether the user can proceed to the next step */
  canGoNext: boolean;
  /** Whether the user can go to the previous step */
  canGoPrev: boolean;
  /** Whether the user can submit the form */
  canSubmit: boolean;
  /** Function to update a specific field value */
  updateField: (key: string, value: any) => void;
  /** Function to move to next step */
  nextStep: () => Promise<boolean>;
  /** Function to move to previous step */
  prevStep: () => void;
  /** Function to jump to a specific step */
  goToStep: (stepIndex: number) => void;
  /** Function to reset form to initial state */
  resetForm: () => void;
  /** Function to submit the final form data */
  submitForm: () => Promise<FormData | null>;
}

/**
 * Form Navigation component props
 */
export interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  /** Function to go to previous step */
  onPrev: () => void;
  /** Function to go to next step - returns success boolean */
  onNext: () => Promise<boolean>;
  /** Function to submit form - FIXED: Returns FormData | null to match hook */
  onSubmit: () => Promise<FormData | null>;
  isLoading?: boolean;
}

/**
 * Form Field component props
 */
export interface FormFieldProps {
  field: FormField;
  formData: FormData;
  onUpdate: (key: string, value: any) => void;
  parentPath?: string;
}

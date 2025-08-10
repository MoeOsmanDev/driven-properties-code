'use client';

import React, { useState } from 'react';

import { FieldGroup } from './inputs/FieldGroup';
import { InputCheckbox } from './inputs/InputCheckbox';
import { InputDate } from './inputs/InputDate';
import { InputNumber } from './inputs/InputNumber';
import { InputRadio } from './inputs/InputRadio';
import { InputSelect } from './inputs/InputSelect';
import { InputText } from './inputs/InputText';
import { UnsupportedField } from './UnsupportedField';

import { FormField as FormFieldType } from '@/lib/types';
import { FormFieldProps } from './types';

// Validation patterns and rules
const VALIDATION_PATTERNS = {
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^[\d\s\-\+\(\)]{7,15}$/,
    message: 'Please enter a valid phone number (7-15 digits)',
  },
  fullName: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message: 'Name must be 2-50 characters and contain only letters',
  },
} as const;

// Validation function
const validateField = (
  field: FormFieldType,
  value: any,
  fieldPath: string
): string | null => {
  // Required validation
  if (field.required) {
    if (value === undefined || value === null || value === '') {
      return `${field.label} is required`;
    }
  }

  // If no value and not required, skip validation
  if (!value && !field.required) {
    return null;
  }

  // Type-specific validation
  switch (field.type) {
    case 'text':
      if (typeof value !== 'string') return null;

      const trimmedValue = value.trim();

      if (field.key === 'email') {
        if (!VALIDATION_PATTERNS.email.pattern.test(trimmedValue)) {
          return VALIDATION_PATTERNS.email.message;
        }
      } else if (field.key === 'fullName') {
        if (trimmedValue.length < 2) {
          return 'Name must be at least 2 characters';
        }
        if (trimmedValue.length > 50) {
          return 'Name must be less than 50 characters';
        }
        if (!VALIDATION_PATTERNS.fullName.pattern.test(trimmedValue)) {
          return VALIDATION_PATTERNS.fullName.message;
        }
      } else if (field.key === 'number' && fieldPath.includes('phone')) {
        if (trimmedValue.length < 7) {
          return 'Phone number must be at least 7 digits';
        }
        if (trimmedValue.length > 15) {
          return 'Phone number must be less than 15 digits';
        }
        if (!VALIDATION_PATTERNS.phone.pattern.test(trimmedValue)) {
          return VALIDATION_PATTERNS.phone.message;
        }
      } else if (field.key === 'location') {
        if (trimmedValue.length < 3) {
          return 'Location must be at least 3 characters';
        }
        if (trimmedValue.length > 100) {
          return 'Location must be less than 100 characters';
        }
      }
      break;

    case 'number':
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return `${field.label} must be a valid number`;
      }

      if (field.key === 'size') {
        if (numValue <= 0) {
          return 'Size must be greater than 0';
        }
        if (numValue > 100000) {
          return 'Size must be less than 100,000 sqm';
        }
      } else if (field.key === 'parkingSpots') {
        if (numValue < 1) {
          return 'Must have at least 1 parking spot';
        }
        if (numValue > 50) {
          return 'Maximum 50 parking spots allowed';
        }
      }
      break;

    case 'select':
      if (field.options && field.options.length > 0) {
        if (!field.options.includes(value)) {
          return 'Please select a valid option';
        }
      }
      break;
  }

  return null;
};

export const FormField: React.FC<FormFieldProps> = React.memo(
  ({ field, formData, onUpdate, parentPath = '' }) => {
    // State for validation errors
    const [validationError, setValidationError] = useState<string | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    /* -------------------------
        1. Derived identifiers
     ------------------------- */
    const fieldPath = parentPath ? `${parentPath}.${field.key}` : field.key;

    /* -------------------------
         2. Get field value
     ------------------------- */
    const getValue = (path: string) => {
      return path.split('.').reduce((current, key) => current?.[key], formData);
    };

    const value = getValue(fieldPath);

    /* -------------------------
         3. Field options
     ------------------------- */
    const fieldOptions = (() => {
      // If field has static options, use them
      if (field.options) {
        return field.options;
      }

      // If field has optionSource, get options based on dependency value
      if (field.optionSource) {
        const dependencyValue = getValue(field.optionSource.key);
        dependencyValue;

        if (
          dependencyValue &&
          typeof dependencyValue === 'string' &&
          field.optionSource.map[dependencyValue]
        ) {
          const options = field.optionSource.map[dependencyValue];
          return options;
        }
        return [];
      }

      return [];
    })();

    /* -------------------------
         4. Field visibility
     ------------------------- */
    const isVisible = (() => {
      // If no dependencies, field is always visible
      if (!field.dependencies || field.dependencies.length === 0) {
        return true;
      }

      // Check all dependencies
      const dependenciesMet = field.dependencies.every(dep => {
        if (dep.equals !== undefined) {
          const depValue = getValue(dep.key);
          // Safe comparison - check if both values are the same type and value
          const result = (depValue as any) === (dep.equals as any);
          return result;
        }
        if (dep.notEmpty !== undefined) {
          const value = getValue(dep.key);
          // Safe empty check - ensure value exists and is not empty string
          const result = dep.notEmpty
            ? value && typeof value === 'string' && value !== ''
            : true;
          return result;
        }
        return true;
      });

      return dependenciesMet;
    })();

    /* -------------------------
         5. Visibility check
     ------------------------- */
    if (!isVisible) return null;

    /* -------------------------
         6. Enhanced change handler with validation
     ------------------------- */
    const handleChange = (newValue: any) => {
      // Update the form data
      onUpdate(fieldPath, newValue);

      // Mark as interacted
      setHasInteracted(true);

      // Validate the field
      const error = validateField(field, newValue, fieldPath);
      setValidationError(error);
    };

    // Handle select change with dependent field clearing
    const handleSelectChange = (newValue: any) => {
      handleChange(newValue);

      // Clear validation errors for dependent fields
      if (field.key === 'propertyType') {
        setValidationError(null);
      } else if (field.key === 'category') {
        setValidationError(null);
      }
    };

    /* -------------------------
         7. Render field based on type
     ------------------------- */
    const renderField = (() => {
      const hasError = hasInteracted && validationError;

      switch (field.type) {
        case 'text':
          return (
            <div className='space-y-1'>
              <InputText
                id={fieldPath as string}
                defaultValue={
                  (typeof value === 'string' ? value : '') as string
                }
                onCommit={handleChange as (val: string) => void}
                placeholder={`Enter ${field.label.toLowerCase()}` as string}
                autoComplete={
                  (field.key === 'email' ? 'email' : 'off') as string
                }
              />
              {hasError && (
                <p className='text-sm text-red-600 mt-1' role='alert'>
                  {validationError}
                </p>
              )}
            </div>
          );

        case 'number':
          return (
            <div className='space-y-1'>
              <InputNumber
                id={fieldPath as string}
                value={
                  (typeof value === 'number' || typeof value === 'string'
                    ? value
                    : '') as string | number
                }
                onChange={handleChange as (val: string) => void}
                placeholder={`Enter ${field.label.toLowerCase()}` as string}
              />
              {hasError && (
                <p className='text-sm text-red-600 mt-1' role='alert'>
                  {validationError}
                </p>
              )}
            </div>
          );

        case 'select':
          return (
            <div className='space-y-1'>
              <InputSelect
                id={fieldPath as string}
                value={(typeof value === 'string' ? value : '') as string}
                options={fieldOptions as string[]}
                onChange={handleSelectChange as (val: string) => void}
                placeholder={`Select ${field.label.toLowerCase()}` as string}
              />
              {hasError && (
                <p className='text-sm text-red-600 mt-1' role='alert'>
                  {validationError}
                </p>
              )}
            </div>
          );

        case 'checkbox':
          return (
            <div className='space-y-1'>
              <InputCheckbox
                id={fieldPath as string}
                label={field.label as string}
                checked={Boolean(value) as boolean}
                onChange={handleChange as (val: boolean) => void}
              />
              {hasError && (
                <p className='text-sm text-red-600 mt-1' role='alert'>
                  {validationError}
                </p>
              )}
            </div>
          );

        case 'radio':
          return (
            <div className='space-y-1'>
              <InputRadio
                name={fieldPath as string}
                selectedValue={
                  (typeof value === 'string' ? value : '') as string
                }
                options={fieldOptions as string[]}
                onChange={handleChange as (val: string) => void}
              />
              {hasError && (
                <p className='text-sm text-red-600 mt-1' role='alert'>
                  {validationError}
                </p>
              )}
            </div>
          );

        case 'date':
          return (
            <div className='space-y-1'>
              <InputDate
                id={fieldPath as string}
                value={(typeof value === 'string' ? value : '') as string}
                onChange={handleChange as (val: string) => void}
              />
              {hasError && (
                <p className='text-sm text-red-600 mt-1' role='alert'>
                  {validationError}
                </p>
              )}
            </div>
          );

        case 'group':
          return (
            <FieldGroup
              label={field.label as string}
              fields={(field.fields ?? []) as FormFieldType[]}
              formData={formData}
              onUpdate={onUpdate as (key: string, value: any) => void}
              parentPath={fieldPath as string}
            />
          );

        default:
          return <UnsupportedField type={field.type as string} />;
      }
    })();

    /* -------------------------
       8. Render wrapper
    ------------------------- */
    if (field.type === 'group') {
      return <div className='space-y-4'>{renderField}</div>;
    }

    return (
      <div className='space-y-2'>
        {field.type !== 'checkbox' && (
          <label
            htmlFor={fieldPath}
            className={`block text-sm font-medium leading-6 ${
              hasInteracted && validationError
                ? 'text-red-700'
                : 'text-gray-900'
            }`}
          >
            {field.label}
            {field.required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}

        {renderField}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

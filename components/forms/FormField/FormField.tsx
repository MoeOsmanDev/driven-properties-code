'use client';

import React, { useMemo } from 'react';

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

export const FormField: React.FC<FormFieldProps> = React.memo(
  ({ field, formData, onUpdate, parentPath = '' }) => {
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
         6. Change handler
     ------------------------- */
    const handleChange = (newValue: any) => {
      onUpdate(fieldPath, newValue);
    };

    /* -------------------------
       5. Field rendering logic
    ------------------------- */
    const renderField = useMemo(() => {
      switch (field.type) {
        case 'text':
          return (
            <InputText
              id={fieldPath as string}
              defaultValue={(typeof value === 'string' ? value : '') as string}
              onCommit={handleChange as (val: string) => void}
              placeholder={`Enter ${field.label.toLowerCase()}` as string}
              autoComplete={(field.key === 'email' ? 'email' : 'off') as string}
            />
          );

        case 'number':
          return (
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
          );

        case 'select':
          return (
            <InputSelect
              id={fieldPath as string}
              value={(typeof value === 'string' ? value : '') as string}
              options={fieldOptions as string[]}
              onChange={handleChange as (val: string) => void}
              placeholder={`Select ${field.label.toLowerCase()}` as string}
            />
          );

        case 'checkbox':
          return (
            <InputCheckbox
              id={fieldPath as string}
              label={field.label as string}
              checked={Boolean(value) as boolean}
              onChange={handleChange as (val: boolean) => void}
            />
          );

        case 'radio':
          return (
            <InputRadio
              name={fieldPath as string}
              selectedValue={(typeof value === 'string' ? value : '') as string}
              options={fieldOptions as string[]}
              onChange={handleChange as (val: string) => void}
            />
          );

        case 'date':
          return (
            <InputDate
              id={fieldPath as string}
              value={(typeof value === 'string' ? value : '') as string}
              onChange={handleChange as (val: string) => void}
            />
          );

        case 'group':
          return (
            <FieldGroup
              label={field.label as string}
              fields={(field.fields ?? []) as FormFieldType[]}
              formData={formData as FormData}
              onUpdate={onUpdate as (key: string, value: any) => void}
              parentPath={fieldPath as string}
            />
          );

        default:
          return <UnsupportedField type={field.type as string} />;
      }
    }, [
      field.type,
      fieldPath,
      value,
      field.label,
      field.key,
      fieldOptions,
      field.fields,
      formData,
      onUpdate,
      parentPath,
      handleChange,
    ]);

    /* -------------------------
       6. Render wrapper
    ------------------------- */
    if (field.type === 'group') {
      return <div className='space-y-4'>{renderField}</div>;
    }

    return (
      <div className='space-y-2'>
        {field.type !== 'checkbox' && (
          <label
            htmlFor={fieldPath}
            className='block text-sm font-medium leading-6 text-gray-900'
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

'use client';

import { FormData, FormField as FormFieldType } from '@/lib/types';
import React from 'react';
import { FormField } from '../FormField';

interface FieldGroupProps {
  label: string;
  fields: FormFieldType[];
  formData: FormData;
  onUpdate: (key: string, value: any) => void;
  parentPath?: string;
}

/**
 * Container component for grouping related form fields together
 *
 * This component creates a visual and logical grouping of form fields,
 * typically used for related information like address details, contact
 * information, or any set of fields that belong together. It provides:
 * - A clear visual boundary with background and border styling
 * - A group label to identify the purpose of the contained fields
 * - Proper spacing and layout for grouped fields
 * - Nested field path management for form data structure
 *
 * The component automatically handles nested field paths by prepending
 * the group key to child field keys (e.g., 'address.street', 'address.city').
 *
 * @param props - Component properties
 * @param props.label - Human-readable label for the field group
 * @param props.fields - Array of form fields to render within the group
 * @param props.formData - Current form data for field values
 * @param props.onUpdate - Function to update field values
 * @param props.parentPath - Optional parent path for nested field structure
 *
 * @example
 * ```typescript
 * <FieldGroup
 *   label="Address Information"
 *   fields={[
 *     { key: 'street', label: 'Street', type: 'text', required: true },
 *     { key: 'city', label: 'City', type: 'text', required: true },
 *     { key: 'zipCode', label: 'ZIP Code', type: 'text', required: true }
 *   ]}
 *   formData={formData}
 *   onUpdate={updateField}
 *   parentPath="contact"
 * />
 * ```
 *
 * @example
 * ```typescript
 * // Without parent path (top-level group)
 * <FieldGroup
 *   label="Personal Details"
 *   fields={[
 *     { key: 'firstName', label: 'First Name', type: 'text', required: true },
 *     { key: 'lastName', label: 'Last Name', type: 'text', required: true }
 *   ]}
 *   formData={formData}
 *   onUpdate={updateField}
 * />
 * ```
 */
export const FieldGroup: React.FC<FieldGroupProps> = React.memo(
  ({ label, fields, formData, onUpdate, parentPath }) => {
    return (
      <div className='space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50'>
        {/* Group header */}
        <h3 className='text-lg font-medium text-gray-900'>{label}</h3>

        {/* Grouped fields */}
        <div className='space-y-4'>
          {fields.map(field => (
            <FormField
              key={field.key}
              field={field}
              formData={formData}
              onUpdate={onUpdate}
              parentPath={parentPath}
            />
          ))}
        </div>
      </div>
    );
  }
);

FieldGroup.displayName = 'FieldGroup';

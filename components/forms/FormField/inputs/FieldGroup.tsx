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

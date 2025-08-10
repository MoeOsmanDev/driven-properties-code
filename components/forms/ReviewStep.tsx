import { FormSchema } from '@/lib/types';
import React from 'react';

interface ReviewStepProps {
  formSchema: FormSchema;
  formData: Record<string, any>;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formSchema,
  formData,
}) => (
  <div className='space-y-8'>
    <div className='text-center'>
      <h2 className='text-2xl font-bold text-gray-900 mb-2'>
        Review Your Information
      </h2>
      <p className='text-gray-600'>
        Please review all the information before submitting
      </p>
    </div>

    <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
      {formSchema.steps.slice(0, -1).map((step, stepIndex) => (
        <div
          key={stepIndex}
          className='p-6 border-b border-gray-100 last:border-b-0'
        >
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            {step.title}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {step.fields.map(field => {
              const renderFieldValue = (field: any, parentPath = '') => {
                const fieldPath = parentPath
                  ? `${parentPath}.${field.key}`
                  : field.key;
                const value = fieldPath
                  .split('.')
                  .reduce(
                    (current: { [x: string]: any }, key: string | number) =>
                      current?.[key],
                    formData
                  );

                if (field.type === 'group' && field.fields) {
                  return (
                    <div key={field.key} className='col-span-full'>
                      <h4 className='font-medium text-gray-900 mb-2'>
                        {field.label}
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 ml-4'>
                        {field.fields.map((subField: any) =>
                          renderFieldValue(subField, fieldPath)
                        )}
                      </div>
                    </div>
                  );
                }

                if (value === undefined || value === null || value === '') {
                  return null;
                }

                return (
                  <div key={fieldPath} className='space-y-1'>
                    <dt className='text-sm font-medium text-gray-600'>
                      {field.label}
                    </dt>
                    <dd className='text-sm text-gray-900'>
                      {field.type === 'checkbox'
                        ? value
                          ? 'Yes'
                          : 'No'
                        : String(value)}
                    </dd>
                  </div>
                );
              };

              return renderFieldValue(field);
            })}
          </div>
        </div>
      ))}
    </div>

    <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
      <div className='flex items-center'>
        <svg
          className='w-5 h-5 text-blue-600 mr-2'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
            clipRule='evenodd'
          />
        </svg>
        <p className='text-sm text-blue-800'>
          By submitting this form, you confirm that all information provided is
          accurate and complete.
        </p>
      </div>
    </div>
  </div>
);

import { FormSchema } from '@/lib/types';
import React from 'react';

interface ReviewStepProps {
  formSchema: FormSchema;
  formData: Record<string, any>;
}

export const ReviewStep: React.FC<ReviewStepProps> = React.memo(
  ({ formSchema, formData }) => (
    <div className='space-y-8'>
      {/* Enhanced header */}
      <div className='text-center'>
        <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg shadow-blue-500/30'>
          <svg
            className='w-8 h-8 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h2 className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-3'>
          Review Your Information
        </h2>
        <p className='text-slate-600 text-lg'>
          Please review all the information before submitting
        </p>
      </div>

      {/* Enhanced review cards */}
      <div className='space-y-6'>
        {formSchema.steps.slice(0, -1).map((step, stepIndex) => (
          <div
            key={stepIndex}
            className='bg-gradient-to-r from-white to-gray-50/50 rounded-xl border border-gray-200/60 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200'
          >
            {/* Card header */}
            <div className='px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-gray-100'>
              <div className='flex items-center'>
                <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 shadow-md'>
                  <span className='text-white text-sm font-bold'>
                    {stepIndex + 1}
                  </span>
                </div>
                <h3 className='text-xl font-bold text-slate-800'>
                  {step.title}
                </h3>
              </div>
            </div>

            {/* Card content */}
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                          <div className='mb-4 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/30 rounded-lg border border-blue-100/50'>
                            <h4 className='font-bold text-slate-800 mb-3 flex items-center'>
                              <div className='w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-2'></div>
                              {field.label}
                            </h4>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                              {field.fields.map((subField: any) =>
                                renderFieldValue(subField, fieldPath)
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (value === undefined || value === null || value === '') {
                      return null;
                    }

                    return (
                      <div
                        key={fieldPath}
                        className='space-y-2 p-3 bg-white/60 rounded-lg border border-gray-100 hover:bg-white/80 transition-colors duration-200'
                      >
                        <dt className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>
                          {field.label}
                        </dt>
                        <dd className='text-base text-slate-800 font-medium'>
                          {field.type === 'checkbox' ? (
                            value ? (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                Yes
                              </span>
                            ) : (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                                No
                              </span>
                            )
                          ) : (
                            String(value)
                          )}
                        </dd>
                      </div>
                    );
                  };

                  return renderFieldValue(field);
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced confirmation notice */}
      <div className='relative overflow-hidden bg-gradient-to-r from-blue-50 via-cyan-50/30 to-blue-50 border-2 border-blue-200/60 rounded-xl p-6 shadow-lg'>
        {/* Decorative background */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl'></div>
        <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 rounded-full blur-xl'></div>

        <div className='relative flex items-start space-x-4'>
          <div className='flex-shrink-0'>
            <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30'>
              <svg
                className='w-5 h-5 text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
          <div>
            <h4 className='font-bold text-blue-900 mb-2'>Important Notice</h4>
            <p className='text-blue-800 leading-relaxed'>
              By submitting this form, you confirm that all information provided
              is accurate and complete. Please ensure all details are correct
              before proceeding.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
);

ReviewStep.displayName = 'ReviewStep';

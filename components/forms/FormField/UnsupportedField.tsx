'use client';

import React from 'react';

interface UnsupportedFieldProps {
  type: string;
}

/**
 * Fallback component for unsupported field types
 *
 * This component is displayed when a form field has a type that is not
 * yet implemented in the form system. It provides a user-friendly
 * warning message with visual indicators to help developers identify
 * missing field type implementations.
 *
 * The component uses a yellow warning style to clearly indicate that
 * this is a development issue that needs attention, while still
 * allowing the form to render without crashing.
 *
 * @param props - Component properties
 * @param props.type - The unsupported field type that triggered this component
 *
 * @example
 * ```typescript
 * // This would render if a field has type: 'file' which isn't implemented
 * <UnsupportedField type="file" />
 * ```
 *
 * @example
 * ```typescript
 * // This would render if a field has type: 'textarea' which isn't implemented
 * <UnsupportedField type="textarea" />
 * ```
 */
export const UnsupportedField: React.FC<UnsupportedFieldProps> = ({ type }) => {
  return (
    <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
      <div className='flex items-center'>
        {/* Warning icon */}
        <svg
          className='w-5 h-5 text-yellow-600 mr-2'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
            clipRule='evenodd'
          />
        </svg>

        {/* Warning message */}
        <span className='text-sm text-yellow-800'>
          Field type "{type}" is not supported yet.
        </span>
      </div>
    </div>
  );
};

'use client';

import React, { useCallback } from 'react';

interface InputCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const InputCheckbox: React.FC<InputCheckboxProps> = React.memo(
  ({ id, label, checked, onChange }) => {
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
      },
      [onChange]
    );

    return (
      <div className='flex items-center'>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={handleChange}
          className='h-4 w-4 text-cyan-600 focus:ring-cyan-600 border-gray-300 rounded'
        />
        <label htmlFor={id} className='ml-2 block text-sm text-gray-900'>
          {label}
        </label>
      </div>
    );
  }
);

InputCheckbox.displayName = 'InputCheckbox';

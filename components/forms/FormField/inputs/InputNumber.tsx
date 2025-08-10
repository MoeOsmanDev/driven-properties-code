'use client';

import React, { useCallback } from 'react';

interface InputNumberProps {
  id: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputNumber: React.FC<InputNumberProps> = React.memo(
  ({ id, value, onChange, placeholder }) => {
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <input
        type='number'
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
      />
    );
  }
);

InputNumber.displayName = 'InputNumber';

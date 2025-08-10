'use client';

import React, { useCallback } from 'react';

interface InputSelectProps {
  id: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputSelect: React.FC<InputSelectProps> = React.memo(
  ({ id, value, options, onChange, placeholder }) => {
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
      >
        {placeholder && (
          <option value='' disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);

InputSelect.displayName = 'InputSelect';

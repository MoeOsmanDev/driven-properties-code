'use client';

import React, { useCallback } from 'react';

interface InputRadioProps {
  name: string;
  selectedValue: string;
  options: string[];
  onChange: (value: string) => void;
}

export const InputRadio: React.FC<InputRadioProps> = React.memo(
  ({ name, selectedValue, options, onChange }) => {
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <div className='space-y-2'>
        {options.map(option => (
          <div key={option} className='flex items-center'>
            <input
              type='radio'
              id={`${name}-${option}`}
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={handleChange}
              className='h-4 w-4 text-cyan-600 focus:ring-cyan-600 border-gray-300'
            />
            <label
              htmlFor={`${name}-${option}`}
              className='ml-2 block text-sm text-gray-900'
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    );
  }
);

InputRadio.displayName = 'InputRadio';

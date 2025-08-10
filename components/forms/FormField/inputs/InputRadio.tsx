'use client';

import React from 'react';

interface InputRadioProps {
  name: string;
  selectedValue: string;
  options: string[];
  onChange: (value: string) => void;
}

export const InputRadio: React.FC<InputRadioProps> = ({
  name,
  selectedValue,
  options,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

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
            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
          />
          <label
            htmlFor={`${name}-${option}`}
            className='ml-2 block text-sm text-gray-900 cursor-pointer'
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

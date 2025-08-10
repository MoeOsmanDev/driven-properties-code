'use client';

import React from 'react';

interface InputDateProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputDate: React.FC<InputDateProps> = ({
  id,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type='date'
      id={id}
      value={value}
      onChange={handleChange}
      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
    />
  );
};

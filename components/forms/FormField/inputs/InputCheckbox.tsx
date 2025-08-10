'use client';

import React from 'react';

interface InputCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const InputCheckbox: React.FC<InputCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={handleChange}
        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
      />
      <label
        htmlFor={id}
        className='ml-2 block text-sm text-gray-900 cursor-pointer'
      >
        {label}
      </label>
    </div>
  );
};

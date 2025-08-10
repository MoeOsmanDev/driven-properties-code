'use client';

import React, { useCallback, useEffect, useState } from 'react';

interface InputTextProps {
  id: string;
  defaultValue?: string;
  onCommit: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export const InputText: React.FC<InputTextProps> = React.memo(
  ({ id, defaultValue = '', onCommit, placeholder, autoComplete = 'off' }) => {
    /** Internal state for the input value */
    const [inputValue, setInputValue] = useState(defaultValue);

    /**
     * Handles input value changes
     *
     * Updates the internal state and immediately commits the new value
     * to the parent form for real-time validation and data management.
     *
     * @param event - Change event from the input element
     */
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onCommit(newValue); // Immediately commit the value to parent form
      },
      [onCommit]
    );

    /**
     * Handles input blur events
     *
     * Commits the current input value when the user leaves the field,
     * ensuring the final value is captured even if it hasn't changed
     * since the last keystroke.
     */
    const handleBlur = useCallback(() => {
      onCommit(inputValue); // Also commit when leaving the field
    }, [onCommit, inputValue]);

    /**
     * Syncs internal state with external defaultValue changes
     *
     * This effect ensures that if the defaultValue prop changes
     * externally (e.g., from form reset or navigation), the internal
     * state is updated accordingly.
     */
    useEffect(() => {
      setInputValue(defaultValue);
    }, [defaultValue]);

    return (
      <input
        type='text'
        id={id}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
      />
    );
  }
);

InputText.displayName = 'InputText';

'use client';

import React, { useCallback, useEffect } from 'react';

interface InputTextProps {
  id: string;
  defaultValue?: string;
  onCommit: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

/**
 * Text input component for form fields
 *
 * This component provides a controlled text input with immediate value
 * commitment and comprehensive styling. It's designed for use within
 * the FormField system and provides:
 * - Immediate value updates as the user types
 * - Value commitment on blur for better UX
 * - Error state styling with visual indicators
 * - Accessibility features (labels, autoComplete)
 * - Responsive design with Tailwind CSS
 *
 * The component uses a controlled input pattern where the internal
 * state is managed locally but changes are immediately propagated
 * to the parent form via the onCommit callback.
 *
 * @param props - Component properties
 * @param props.id - Unique identifier for the input field
 * @param props.defaultValue - Initial value for the input field
 * @param props.onCommit - Callback function called when value changes or field loses focus
 * @param props.placeholder - Placeholder text displayed when field is empty
 * @param props.autoComplete - HTML autocomplete attribute value
 * @param props.error - Whether to display error styling
 *
 * @example
 * ```typescript
 * <InputText
 *   id="firstName"
 *   defaultValue="John"
 *   onCommit={(value) => updateField('firstName', value)}
 *   placeholder="Enter your first name"
 *   autoComplete="given-name"
 *   error={Boolean(errors.firstName)}
 * />
 * ```
 *
 * @example
 * ```typescript
 * // Email field with email autocomplete
 * <InputText
 *   id="email"
 *   defaultValue=""
 *   onCommit={(value) => updateField('email', value)}
 *   placeholder="Enter your email address"
 *   autoComplete="email"
 *   error={Boolean(errors.email)}
 * />
 * ```
 */
export const InputText: React.FC<InputTextProps> = React.memo(
  ({ id, defaultValue = '', onCommit, placeholder, autoComplete = 'off' }) => {
    /** Internal state for the input value */
    const [inputValue, setInputValue] = React.useState(defaultValue);

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
        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
      />
    );
  }
);

InputText.displayName = 'InputText';

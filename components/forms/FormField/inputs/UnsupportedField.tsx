'use client';

import React from 'react';

interface UnsupportedFieldProps {
  type: string;
}

export const UnsupportedField: React.FC<UnsupportedFieldProps> = ({ type }) => {
  return <div className='text-red-500'>Unsupported field type: {type}</div>;
};

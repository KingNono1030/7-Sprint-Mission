import React, { ChangeEvent, KeyboardEvent } from 'react';

interface LabelInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  placeholder: string;
  type?: 'text' | 'password' | 'email';
  labelHeader?: string;
  classNameHeader?: string;
  classNameInput?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const LabelInput = ({
  onChange,
  value = '',
  labelHeader = '',
  placeholder = '',
  type = 'text',
  name,
  classNameHeader = '',
  classNameInput = '',
  onKeyDown,
}: LabelInputProps) => (
  <label className=''>
    {labelHeader && (
      <h3
        className={`mb-2 text-base font-bold text-gray-800 ${classNameHeader}`}
      >
        {labelHeader}
      </h3>
    )}
    <div className='relative'>
      <input
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={type}
        className={`w-full h-14 px-6 py-4 mb-2 rounded-xl bg-gray-100 text-base font-normal placeholder-gray-400 ${classNameInput}`}
        required
        onKeyDown={onKeyDown}
      />
    </div>
  </label>
);

export default LabelInput;

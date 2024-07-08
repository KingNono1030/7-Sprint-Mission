import React from 'react';

const LabelInput = ({
  onChange = null,
  value = '',
  labelHeader = '',
  placeholder = '',
  type = 'text',
  name = '',
  visibilityLogo = null,
  classNameHeader = '',
  classNameInput = '',
  onKeyDown = null,
}) => (
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
      {visibilityLogo}
    </div>
  </label>
);

export default LabelInput;

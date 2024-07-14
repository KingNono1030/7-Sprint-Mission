import { ChangeEvent } from 'react';
import useToggle from '@hooks/useToggle';
import PasswordVisibilityButton from '@components/PasswordVisibilityButton';

interface PasswordInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  placeholder: string;
  labelHeader?: string;
  classNameHeader?: string;
  classNameInput?: string;
}

export default function PasswordInput({
  onChange,
  name = '',
  value = '',
  placeholder = '',
  labelHeader = '',
  classNameHeader = '',
  classNameInput = '',
}: PasswordInputProps) {
  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false);
  return (
    <label className=''>
      <h3
        className={`mb-2 text-base font-bold text-gray-800 ${classNameHeader}`}
      >
        {labelHeader}
      </h3>
      <div className='relative'>
        <input
          onChange={onChange}
          value={value}
          type={isPasswordVisible ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          autoComplete='password'
          className={`w-full h-14 px-6 py-4 mb-2 rounded-xl bg-gray-100 text-base font-normal placeholder-gray-400 ${classNameInput}`}
          required
        />
        <PasswordVisibilityButton
          onClick={togglePasswordVisibility}
          show={isPasswordVisible}
        />
      </div>
    </label>
  );
}

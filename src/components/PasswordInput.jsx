import useToggle from '../hooks/useToggle';
import PasswordVisibilityButton from './PasswordVisibilityButton';

export default function LabelInput({
  onChange,
  value = '',
  labelHeader = '',
  placeholder = '',
  name = '',
  visibilityLogo = null,
  classNameHeader = '',
  classNameInput = '',
}) {
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
        <PasswordVisibilityButton onClick={togglePasswordVisibility} />
      </div>
    </label>
  );
}

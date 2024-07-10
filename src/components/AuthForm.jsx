import React, { useState } from 'react';
import Button from './Button';
import LabelInput from '../components/LabelInput';
import PasswordInput from '../components/PasswordInput';
import InputErrorMessage from '../components/InputErrorMessage';
import { useValidation } from '../hooks/useValidation';

const AuthForm = ({
  initialValues,
  validationRules,
  onSubmit,
  fields,
  title,
}) => {
  const [values, setValues] = useState(initialValues);
  const [isInitialized, setIsInitialized] = useState(false);
  const { errors, isComplete } = useValidation(values, validationRules);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFocusOut = () => {
    setIsInitialized(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isComplete) {
      onSubmit(values);
    }
  };

  return (
    <>
      <form
        onBlur={handleFocusOut}
        onSubmit={handleSubmit}
        className='mx-auto max-w-[640px]'
      >
        {fields.map((field) => {
          const InputComponent =
            field.type === 'password' ? PasswordInput : LabelInput;
          return (
            <div key={field.name} className='mt-6'>
              <InputComponent
                onChange={handleInputChange}
                value={values[field.name]}
                labelHeader={field.label}
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
              />
              {isInitialized && errors[field.name] && (
                <InputErrorMessage>{errors[field.name]}</InputErrorMessage>
              )}
            </div>
          );
        })}
        <Button
          type='submit'
          disabled={!isComplete}
          size='large'
          className='w-full my-6'
        >
          {title}
        </Button>
      </form>
    </>
  );
};

export default AuthForm;

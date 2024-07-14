import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@components/Button';
import LabelInput from '@components/LabelInput';
import PasswordInput from '@components/PasswordInput';
import { useValidation } from '@hooks/useValidation';
import { valuesType } from '@utils/validationRules';

export interface Field {
  type: 'email' | 'password' | 'text';
  name: string;
  label: string;
  placeholder: string;
}
interface AuthFormProps<T> {
  initialValues: T;
  validationRules: { [key: string]: any };
  onSubmit: (values: T) => void;
  fields: Field[];
  title: string;
}

export default function AuthForm({
  initialValues,
  validationRules,
  onSubmit,
  fields,
  title,
}: AuthFormProps<valuesType>) {
  const [values, setValues] = useState<valuesType>(initialValues);
  const [isInitialized, setIsInitialized] = useState(false);
  const { errors, isComplete } = useValidation({ values, validationRules });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFocusOut = () => {
    setIsInitialized(true);
  };

  const handleSubmit = (e: FormEvent) => {
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
        className={formStyle}
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
                <div className='mt-2 mb-6 ml-4 font-semibold text-base text-red-700'>
                  {errors[field.name]}
                </div>
              )}
            </div>
          );
        })}
        <Button
          type='submit'
          isActive={isComplete}
          size='large'
          className={buttonStyle}
        >
          {title}
        </Button>
      </form>
    </>
  );
}

const formStyle = 'mx-auto max-w-[640px]';
const buttonStyle = 'w-full my-6';

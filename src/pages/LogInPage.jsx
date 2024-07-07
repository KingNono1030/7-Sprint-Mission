import { Helmet } from 'react-helmet';
import { useState } from 'react';
import AuthContainer from '../components/AuthContainer';
import RoundButton from '../components/RoundButton';
import LabelInput from '../components/LabelInput';
import { useValidation } from '../hooks/useValidation';
import InputErrorMessage from '../components/InputErrorMessage';

const EMAIL_LABEL = '이메일';
const EMAIL_PLACEHOLDER = '이메일을 입력해주세요';
const ERROR_MESSAGE_EMAIL_NOT_VALID = '잘못된 이메일 형식입니다';

const PASSWORD_LABEL = '비밀번호';
const PASSWORD_PLACEHOLDER = '비밀번호를 입력해주세요';

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_MINIMUM_LENGTH = 8;

const INITIAL_VALUE = {
  email: '',
  password: '',
};

const validationRules = {
  email: {
    placeholder: EMAIL_PLACEHOLDER,
    regex: EMAIL_REGEXP,
    errorMessage: ERROR_MESSAGE_EMAIL_NOT_VALID,
  },
  password: {
    placeholder: PASSWORD_PLACEHOLDER,
    minLength: PASSWORD_MINIMUM_LENGTH,
    errorMessage: `비밀번호를 ${PASSWORD_MINIMUM_LENGTH}자 이상 입력해주세요`,
  },
};

export default function LogInPage() {
  const [values, setValues] = useState(INITIAL_VALUE);
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
    }
  };

  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <AuthContainer>
        <form
          onBlur={handleFocusOut}
          onSubmit={handleSubmit}
          className='mx-auto max-w-[640px]'
        >
          <LabelInput
            onChange={handleInputChange}
            value={values.email}
            labelHeader={EMAIL_LABEL}
            placeholder={EMAIL_PLACEHOLDER}
            type='email'
            name='email'
          />
          {isInitialized && errors.email && (
            <InputErrorMessage>{errors.email}</InputErrorMessage>
          )}
          <LabelInput
            onChange={handleInputChange}
            value={values.password}
            labelHeader={PASSWORD_LABEL}
            placeholder={PASSWORD_PLACEHOLDER}
            type='password'
            name='password'
            classNameHeader='mt-6'
          />
          {isInitialized && errors.password && (
            <InputErrorMessage>{errors.password}</InputErrorMessage>
          )}
          <RoundButton
            type='submit'
            disabled={!isComplete}
            className='w-full my-6'
          >
            로그인
          </RoundButton>
        </form>
      </AuthContainer>
    </>
  );
}

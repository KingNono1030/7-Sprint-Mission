import { Helmet } from 'react-helmet';
import { useState } from 'react';
import AuthContainer from '../components/AuthContainer';
import RoundButton from '../components/RoundButton';
import LabelInput from '../components/LabelInput';
import PasswordInput from '../components/PasswordInput';
import InputErrorMessage from '../components/InputErrorMessage';
import { useValidation } from '../hooks/useValidation';

const EMAIL_LABEL = '이메일';
const EMAIL_PLACEHOLDER = '이메일을 입력해주세요';
const ERROR_MESSAGE_EMAIL_NOT_VALID = '잘못된 이메일 형식입니다';

const NICKNAME_LABEL = '닉네임';
const NICKNAME_PLACEHOLDER = '닉네임을 입력해주세요';

const PASSWORD_LABEL = '비밀번호';
const PASSWORD_PLACEHOLDER = '비밀번호를 입력해주세요';
const ERROR_MESSAGE_PASSWORD_NOT_VALID = `비밀번호를 8자 이상 입력해주세요`;

const PASSWORD_REPEAT_LABEL = '비밀번호 확인';
const PASSWORD_REPEAT_PLACEHOLDER = '비밀번호를 다시 한 번 입력해주세요';
const ERROR_MESSAGE_PASSWORD_NOT_MATCH = '비밀번호가 일치하지 않습니다';

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_MINIMUM_LENGTH = 8;

const INITIAL_VALUES = {
  email: '',
  nickname: '',
  password: '',
  passwordRepeat: '',
};

const validationRules = {
  email: {
    placeholder: EMAIL_PLACEHOLDER,
    regex: EMAIL_REGEXP,
    errorMessage: ERROR_MESSAGE_EMAIL_NOT_VALID,
  },
  nickname: {
    placeholder: NICKNAME_PLACEHOLDER,
  },
  password: {
    placeholder: PASSWORD_PLACEHOLDER,
    minLength: PASSWORD_MINIMUM_LENGTH,
    errorMessage: ERROR_MESSAGE_PASSWORD_NOT_VALID,
  },
  passwordRepeat: {
    placeholder: PASSWORD_REPEAT_PLACEHOLDER,
    customValidator: (value, values) =>
      value === values.password ? '' : ERROR_MESSAGE_PASSWORD_NOT_MATCH,
  },
};

export default function SignUpPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
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
        <title>회원가입</title>
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
            value={values.nickname}
            labelHeader={NICKNAME_LABEL}
            placeholder={NICKNAME_PLACEHOLDER}
            type='text'
            name='nickname'
            classNameHeader='mt-6'
          />
          {isInitialized && errors.nickname && (
            <InputErrorMessage>{errors.nickname}</InputErrorMessage>
          )}
          <PasswordInput
            onChange={handleInputChange}
            value={values.password}
            labelHeader={PASSWORD_LABEL}
            placeholder={PASSWORD_PLACEHOLDER}
            name='password'
            classNameHeader='mt-6'
          />
          {isInitialized && errors.password && (
            <InputErrorMessage>{errors.password}</InputErrorMessage>
          )}
          <PasswordInput
            onChange={handleInputChange}
            value={values.passwordRepeat}
            labelHeader={PASSWORD_REPEAT_LABEL}
            placeholder={PASSWORD_REPEAT_PLACEHOLDER}
            name='passwordRepeat'
            classNameHeader='mt-6'
          />
          {isInitialized && errors.passwordRepeat && (
            <InputErrorMessage>{errors.passwordRepeat}</InputErrorMessage>
          )}
          <RoundButton
            type='submit'
            disabled={!isComplete}
            className='w-full my-6'
          >
            회원가입
          </RoundButton>
        </form>
      </AuthContainer>
    </>
  );
}

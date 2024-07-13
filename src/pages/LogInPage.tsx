import { Helmet } from 'react-helmet-async';
import AuthContainer from '@components/AuthContainer';
import AuthForm, { Field } from '@components/AuthForm';
import {
  valuesType,
  emailValidation,
  passwordValidation,
} from '@utils/validationRules';

export default function LogInPage() {
  const handleSubmit = (values: valuesType): void => {
    console.log('제출 완료:', values);
  };

  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <AuthContainer>
        <AuthForm
          initialValues={INITIAL_VALUES}
          validationRules={validationRules}
          onSubmit={handleSubmit}
          fields={fields}
          title='로그인'
        />
      </AuthContainer>
    </>
  );
}

const INITIAL_VALUES = {
  email: '',
  password: '',
};

const validationRules = {
  email: emailValidation,
  password: passwordValidation,
};

const fields: Field[] = [
  {
    type: 'email',
    name: 'email',
    label: '이메일',
    placeholder: emailValidation.placeholder,
  },
  {
    type: 'password',
    name: 'password',
    label: '비밀번호',
    placeholder: passwordValidation.placeholder,
  },
];

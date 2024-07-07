import { Helmet } from 'react-helmet';
import AuthContainer from '../components/AuthContainer';
import AuthForm from '../components/AuthForm';
import { emailValidation, passwordValidation } from '../utils/validationRules';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

const validationRules = {
  email: emailValidation,
  password: passwordValidation,
};

const fields = [
  {
    name: 'email',
    label: '이메일',
    placeholder: emailValidation.placeholder,
    type: 'email',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: passwordValidation.placeholder,
    type: 'password',
  },
];

export default function LogInPage() {
  const handleSubmit = (values) => {
    console.log('Form submitted successfully', values);
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

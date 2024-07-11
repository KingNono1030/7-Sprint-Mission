import { Helmet } from 'react-helmet-async';
import AuthContainer from '../components/AuthContainer';
import AuthForm from '../components/AuthForm';
import {
  emailValidation,
  passwordValidation,
  nicknameValidation,
  passwordRepeatValidation,
} from '../utils/validationRules';

const INITIAL_VALUES = {
  email: '',
  nickname: '',
  password: '',
  passwordRepeat: '',
};

const validationRules = {
  email: emailValidation,
  nickname: nicknameValidation,
  password: passwordValidation,
  passwordRepeat: passwordRepeatValidation,
};

const fields = [
  {
    name: 'email',
    label: '이메일',
    placeholder: emailValidation.placeholder,
    type: 'email',
  },
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: nicknameValidation.placeholder,
    type: 'text',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: passwordValidation.placeholder,
    type: 'password',
  },
  {
    name: 'passwordRepeat',
    label: '비밀번호 확인',
    placeholder: passwordRepeatValidation.placeholder,
    type: 'password',
  },
];

export default function SignUpPage() {
  const handleSubmit = (values) => {
    console.log('Form submitted successfully', values);
  };

  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <AuthContainer>
        <AuthForm
          initialValues={INITIAL_VALUES}
          validationRules={validationRules}
          onSubmit={handleSubmit}
          fields={fields}
          title='회원가입'
        />
      </AuthContainer>
    </>
  );
}

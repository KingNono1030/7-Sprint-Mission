export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const PASSWORD_MINIMUM_LENGTH = 8;

export const emailValidation = {
  placeholder: '이메일을 입력해주세요',
  regex: EMAIL_REGEXP,
  errorMessage: '잘못된 이메일 형식입니다',
};

export const passwordValidation = {
  placeholder: '비밀번호를 입력해주세요',
  minLength: PASSWORD_MINIMUM_LENGTH,
  errorMessage: `비밀번호를 ${PASSWORD_MINIMUM_LENGTH}자 이상 입력해주세요`,
};

export const nicknameValidation = {
  placeholder: '닉네임을 입력해주세요',
};

export const passwordRepeatValidation = {
  placeholder: '비밀번호를 다시 한 번 입력해주세요',
  customValidator: (value, values) =>
    value === values.password ? '' : '비밀번호가 일치하지 않습니다',
};

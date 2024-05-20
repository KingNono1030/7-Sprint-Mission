const form = document.querySelector('.main-form');
const button = document.querySelector('.main-form button');

const passwordErrorMessage = '비밀번호를 입력해주세요';

function checkFormFilled({ target }) {
  validateInputs(target);
  const inputs = [...document.querySelectorAll('.label_input')];
  const hasInputErrors = inputs.some(
    (item) => item.classList.contains('input_error') || item.value === ''
  );
  button.disabled = hasInputErrors;
}

function validateInputs(input) {
  const errorMessages = {
    email: validateEmail,
    nickname: validateNickname,
    password: validatePassword,
    'password-repeat': validatePasswordRepeat,
  };

  const { errorMessage, hasError } = errorMessages[input.name](input);
  removeErrorMessage(input);
  hasError && addErrorMessage(input, errorMessage);
  outlineInputError(input, hasError);
}

function validateEmail(target) {
  const value = target.value.trim();
  if (value === '')
    return { errorMessage: '이메일을 입력해주세요', hasError: true };
  if (!isValidEmail(value))
    return { errorMessage: '잘못된 이메일 형식입니다', hasError: true };
  return { errorMessage: '', hasError: false };
}

function isValidEmail(emailAddress) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const isValid = emailRegex.test(emailAddress);
  return isValid;
}

function validateNickname(target) {
  const value = target.value.trim();
  if (value === '')
    return { errorMessage: '닉네임을 입력해주세요', hasError: true };
  return { errorMessage: '', hasError: false };
}

function validatePassword(target) {
  const value = target.value.trim();
  if (value === '')
    return { errorMessage: passwordErrorMessage, hasError: true };
  if (value.length < 8)
    return { errorMessage: '비밀번호를 8자 이상 입력해주세요', hasError: true };
  return { errorMessage: '', hasError: false };
}

function validatePasswordRepeat(target) {
  const inputPassword = document.querySelector('.label_input[name="password"]');
  const passwordValue = inputPassword.value.trim();
  const value = target.value.trim();
  if (value === '')
    return { errorMessage: passwordErrorMessage, hasError: true };
  if (value !== passwordValue)
    return { errorMessage: '비밀번호가 일치하지 않습니다', hasError: true };
  return { errorMessage: '', hasError: false };
}

function addErrorMessage(input, content) {
  const label = input.closest('.form_label');
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = content;
  label.appendChild(errorMessage);
}

function removeErrorMessage(input) {
  const label = input.closest('.form_label');
  const errorMessage = label.querySelector('.error-message');
  errorMessage && errorMessage.remove();
}

function outlineInputError(input, hasError) {
  hasError
    ? input.classList.add('input_error')
    : input.classList.remove('input_error');
}

form.addEventListener('focusout', checkFormFilled);

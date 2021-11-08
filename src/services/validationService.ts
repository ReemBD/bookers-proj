export const passwordValidations = {
  required: true,
  minLength: {
    value: 6,
    message: 'Password must contain at least 6 characters.',
  },
};
export const usernameValidations = {
  required: true,
  maxLength: {
    value: 15,
    message: 'Username must contain up to 15 characters',
  },
};

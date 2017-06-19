import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const loginValidate = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default loginValidate;

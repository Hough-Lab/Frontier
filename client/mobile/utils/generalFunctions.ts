import { LayoutAnimation } from 'react-native';

import {
  LoginInputValues,
  RegisterInputValues,
} from '../interfaces/interfaces';

export const applyAnimation = (property = 'scaleXY') => {
  LayoutAnimation.configureNext({
    duration: 700,
    create: { duration: 300, type: 'easeOut', property: property },
    update: { type: 'spring', springDamping: 10 },
    delete: { duration: 300, type: 'easeOut', property: property },
  });
};

export const validateLogin = (inputValues: LoginInputValues) => {
  if (inputValues.email === '' && inputValues.password === '')
    return 'Please enter your email and password.';
  else if (inputValues.email === '') return 'Please enter your email address.';
  else if (inputValues.password === '') return 'Please enter your password.';
  else return '';
};

export const validateRegister = (inputValues: RegisterInputValues) => {
  const allInputs = Object.values(inputValues);
  let error = '';
  console.log('allInputs', allInputs);
  allInputs.forEach((input) => {
    if (input === '') error = 'You must not leave any field blank.';
  });
  if (error !== '') return error;
  else if (inputValues.password !== inputValues.confirmPassword)
    return 'Please make sure your passwords match.';
  else return '';
};

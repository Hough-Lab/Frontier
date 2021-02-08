import { LayoutAnimation } from 'react-native';

import { LoginInputValues } from '../interfaces/interfaces';

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

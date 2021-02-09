import { LayoutAnimation } from 'react-native';

import { LoginInputValues } from '../interfaces/interfaces';
import { Review } from '../interfaces/reducerInterfaces';

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


export const getAverageRating = (reviews: Review[]) => {
  const ratings = reviews.map((review) => review.rating);
  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  return ratings.reduce(reducer, 0) / ratings.length;
}

export const getAverageSafetyRating = (reviews: Review[]) => {
  const ratings = reviews.map((review) => review.safetyRating);
  console.log('ratings', ratings.length);
  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  return ratings.reduce(reducer, 0) / ratings.length;
}
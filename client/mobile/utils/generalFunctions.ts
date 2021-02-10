import { LayoutAnimation } from 'react-native';
import { useSelector } from 'react-redux';

import {
  LoginInputValues,
  RegisterInputValues,
} from '../interfaces/interfaces';
import { Review, POI, POIArray } from '../interfaces/reducerInterfaces';

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
  allInputs.forEach((input) => {
    if (input === '') error = 'You must not leave any field blank.';
  });
  if (error !== '') return error;
  else if (inputValues.password !== inputValues.confirmPassword)
    return 'Please make sure your passwords match.';
  else return '';
};

export const getAverageRating = (reviews: Review[]) => {
  const ratings = reviews.map((review) => review.rating);
  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  return ratings.reduce(reducer, 0) / ratings.length;
};

export const getAverageSafetyRating = (reviews: Review[]) => {
  const ratings = reviews.map((review) => review.safetyRating);
  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  return ratings.reduce(reducer, 0) / ratings.length;
};

export const getFirstPicture = (POI: POI) => {
  if (typeof POI?.reviews !== 'undefined') {
    if (POI?.reviews[0]?.picture && POI?.reviews[0]?.picture !== null) {
      return POI.reviews[0].picture;
    }
  }
};

export const filterPOIByTag = (allPOI: POI[], tags: string[]) => {
  if (!tags.length) {
    return allPOI;
  } else {
    const filteredPOI = allPOI.filter((POI: POI) => {
      return tags.every((tag) => {
        return POI.tags?.indexOf(tag) !== -1;
      });
    });

    return filteredPOI;
  }
};

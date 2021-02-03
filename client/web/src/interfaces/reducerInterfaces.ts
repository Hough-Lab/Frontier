import { Action } from 'redux';

export interface FrontierAction<T> extends Action {
  type: string;
  payload: T;
}

export interface User {
  userId: string;
  isBusiness: boolean;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  language: string;
  from: string;
  lastSeen: string;
  profilePicture: string;
  email: string;
  verifications: number;
  certified: boolean;
}

//TODO set up rest of interfaces

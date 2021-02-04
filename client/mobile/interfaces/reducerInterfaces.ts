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

export interface PointOfInterest {
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

export interface Event {
  eventId: string;
  dateFrom: Date;
  dateTo: Date;
  title: string;
  description: string;
  maxCapacity: number;
  isPrivate: boolean;
  picture: string;
  pointOfInterest: PointOfInterest;
  tags: string[];
}

export interface Review {
  reviewId: string;
  createdAt: string;
  budgetLevel: number;
  title: string;
  description: string;
  rating: number;
  safetyRating: number;
  safetyComment: string;
  picture: string;
  pointOfInterest: PointOfInterest;
  tags: string[];
}

//TODO set up rest of interfaces

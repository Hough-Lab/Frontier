import { Action } from "redux";

export interface FrontierAction<T> extends Action {
  type: string;
  payload: T;
}

export interface SystemState {
  user: User;
  event: Event;
  review: Review;
  allPOI: POIArray;
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

export interface Event {
  eventId: string;
  dateFrom: string;
  dateTo: string;
  title: string;
  description: string;
  maxCapacity: number;
  isPrivate: boolean;
  picture: string;
  pointOfInterestId: string;
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
  pointOfInterestId: string;
  tags: string[];
}

export interface POIArray {
  [key: string]: POI;
}

export interface POI {
  pointOfInterestId: string;
  formattedAddress: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}

//TODO set up rest of interfaces

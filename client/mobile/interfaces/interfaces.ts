import { Dispatch, SetStateAction } from "react";

export interface Navigation {
  addListener: Function;
  canGoBack: Function;
  dangerouslyGetParent: Function;
  dangerouslyGetState: Function;
  dispatch: Function;
  goBack: Function;
  isFocused: Function;
  navigate: Function;
  pop: Function;
  popToTop: Function;
  push: Function;
  removeListener: Function;
  replace: Function;
  reset: Function;
  setOptions: Function;
  setParams: Function;
}

export interface Iimage {
  result: {
    cancelled: boolean;
    height: number;
    type: string;
    uri: string;
    width: number;
  };
}

export interface LoginInputValues {
  email: string;
  password: string;
}

export interface RegisterInputValues {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface IUploadImage {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
  pictureStyle?: {
    width: number;
    height: number;
    borderRadius: number;
    alignSelf:
      | 'center'
      | 'flex-start'
      | 'flex-end'
      | 'stretch'
      | 'baseline'
      | 'auto'
      | undefined;
  };
  uploadContainer: {
    width: string;
    height: number;
    justifyContent:
      | 'center'
      | 'flex-start'
      | 'flex-end'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | undefined;
    alignItems:
      | 'center'
      | 'flex-start'
      | 'flex-end'
      | 'stretch'
      | 'baseline'
      | undefined;
    borderColor?: string;
    backgroundColor?: string;
    elevation?: number;
    borderRadius?: number;
    borderWidth?: number;
    padding: number;
    marginBottom: number;
  };
}

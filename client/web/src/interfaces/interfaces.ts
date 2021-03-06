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

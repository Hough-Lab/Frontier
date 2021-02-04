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

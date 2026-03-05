import { observable, action, makeObservable, computed, toJS } from 'mobx';
import { persist } from 'mobx-persist';

class AuthStore {
  @persist('object')
  @observable
  isLoggedIn = true;//false;
  continueAsGuest = false;

  // @persist('object')
  // @observable
  // searchEngine

  constructor(store) {
    makeObservable(this);
  }

  @action logIn() {
    console.log('tkt authstore logIn called');
    this.isLoggedIn = true;
  }

  setContinueAsGuest(state: boolean) {
    this.continueAsGuest = state;
  }
}
export default AuthStore;

import { observable, action, makeObservable, computed, toJS } from 'mobx';
import { persist } from 'mobx-persist';
import Store from './Store';
import moment from 'moment';

class Cortex {
  @persist('object')
  @observable
  isDataLoading = false;

  // @persist('object')
  // @observable
  // isSearchBarVisible = false;

  @persist('object')
  @observable
  noData = false;

  @persist('object')
  @observable
  jewishCal = {};

  @persist('object')
  @observable
  pressedDay;

  @observable
  today = moment().format('YYYY-MM-DD');

  constructor(store) {
    makeObservable(this);
  }
}

export default Cortex;

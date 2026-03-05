import { observable, action, makeObservable, computed, toJS } from "mobx";
import { persist } from "mobx-persist";

class SearchStore {
  @persist("object")
  @observable
  isSearchBarVisible = false;

  @persist("object")
  @observable
  searchEngine = "welcome";

  constructor(store) {
    makeObservable(this);
  }
}
export default SearchStore;

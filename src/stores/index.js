import Store from './Store';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

const store = new Store();

export default {
  store,
  cortex: store.cortex,
  searchStore: store.searchStore,
  authStore: store.authStore,
};

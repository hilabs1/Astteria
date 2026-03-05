import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'mobx-persist';
import SearchStore from './SearchStore';
import Cortex from './Cortex';
import AuthStore from './AuthStore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export default class Store {
  cortex;
  searchStore;
  authStore;

  constructor() {
    this.cortex = new Cortex(this);
    this.searchStore = new SearchStore(this);
    this.authStore = new AuthStore(this);
    Promise.all([
      hydrate('cortex', this.cortex),
      hydrate('searchStore', this.searchStore),
      hydrate('authStore', this.authStore),
    ]);
  }
}

class Storage {
  constructor(storeType = 'localStorage') {
    this.store = window[storeType];
  }

  getItem(key) {
    try {
      return JSON.parse(this.store.getItem(key));
    } catch (e) {
      return this.store.getItem(key);
    }
  }

  setItem(key, value) {
    if (typeof value === 'object') {
      this.store.setItem(key, JSON.stringify(value));
    } else {
      this.store.setItem(key, value);
    }
  }
}

export default new Storage();

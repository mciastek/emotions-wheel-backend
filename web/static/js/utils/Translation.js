class Translation {
  constructor() {
    this.lang = 'en';
    this.translations = {};
  }

  changeLanguage(lang) {
    this.lang = lang;
    return this.fetchTranslations();
  }

  getTranslations(propName) {
    return this.translations[propName] || {};
  }

  fetchTranslations() {
    return fetch(`/translations/${this.lang}.json`, {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((translations) => {
      this.translations = translations;
      return translations;
    });
  }
}

const instance = new Translation();

export function rep(string = '', params) {
  const regex = /%(.*?)%/g;

  return string.replace(regex, (_, property) => {
    return params[property] || '';
  });
}

export default instance;

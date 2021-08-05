import { translate, getTranslations } from 'react-i18nify';

export const getClientLanguage = () => {
  const translations = getTranslations(),
    translatedlanguages = Object.keys(translations);
  let translatedRegex,
    clientLanguage;

  switch (translatedlanguages.length) {
    case 0:
      return undefined;

    case 1:
      translatedRegex = new RegExp(`^${translatedlanguages[0]}`);
      break;

    default:
      translatedRegex = translatedlanguages.reduce((accumulator, currentValue, index) =>
        index === 1 ? `(${accumulator})|(${currentValue})` : `${accumulator}|(${currentValue})`
      );
      translatedRegex = new RegExp(`^${translatedRegex}`);
  }

  if (navigator.languages) {
    clientLanguage = navigator.languages.find(
      language => translatedRegex.test(language));

    if (clientLanguage) {
      return translations[clientLanguage] ? clientLanguage : clientLanguage.substring(0, 2);
    }
  }

  clientLanguage = navigator.language || navigator.userLanguage;

  if (clientLanguage && translatedlanguages.find( language => clientLanguage.search(language) >= 0 || language.search(clientLanguage) >= 0)) {
    return translations[clientLanguage] ? clientLanguage : clientLanguage.substring(0, 2);
  }

  return undefined;
}

export const getComponentTranslator = (name) => {
  return (key, parameters) => {
    return translate(name + '.' + key, parameters);
  }
};

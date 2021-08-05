import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import configureStore from './redux';
import Header from './components/header/header';
import Routes from './routes/';
import { setLocale, setTranslations } from 'react-i18nify';
import { getClientLanguage } from './util/i18n';
import translations from './i18n';

// Import stylesheets
import './assets/stylesheets/base.scss';

const store = configureStore();

setTranslations(translations);
setLocale(getClientLanguage() || 'en');

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main>
          <Routes />
        </main>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// Enable hot relading
module.hot.accept();

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import Routes from './routes';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div className="mkrn-app">
        <Header />
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// Enable hot relading
module.hot.accept();

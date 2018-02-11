import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux';

import { persistor, store } from './configureStore';

import './app/styles/index.css';
import RootScene from './app/scenes';

ReactDOM.render((
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RootScene />
    </Provider>
  </PersistGate>
), document.getElementById('root'));

registerServiceWorker();

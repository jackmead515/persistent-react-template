import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import reducers from './app/reducers'
import axios from 'axios';
import { Route, Router } from 'react-router';
import { persistor, store } from './configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react'
import createBrowserHistory from 'history/createBrowserHistory'

import './app/styles/index.css';
import Chat from './app/scenes/Chat/';
import Create from './app/scenes/Create/';
import Launch from './app/scenes/Launch/';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://127.0.0.1:5000/api/';

export const history = createBrowserHistory();

ReactDOM.render((
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path="/" component={Launch} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/chat" component={Chat} />
        </div>
      </Router>
    </Provider>
  </PersistGate>
), document.getElementById('root'));

registerServiceWorker();

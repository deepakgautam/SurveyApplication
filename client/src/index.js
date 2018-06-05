import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import RootReducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware'
import reduxThunk from 'redux-thunk';
import App from './containers/App.js'

import axios from 'axios';

window.axios = axios ;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  RootReducers,
  composeEnhancers(
    applyMiddleware(
      reduxThunk,)
  ),
);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
  , document.querySelector('#root')
);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StartScreen from './StartScreen';
import registerServiceWorker from './registerServiceWorker';
import reducer from './Reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//create store and add middleware and reducer
const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <StartScreen />
  </Provider>,
  //find the div with id 'root' and put a reference to it as second arguement
  document.querySelector('#root')
);

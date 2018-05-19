import React from 'react';
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

const target = document.querySelector('#root')


render(
      <Provider store={store}>
        <App />
      </Provider>,
    target
  )
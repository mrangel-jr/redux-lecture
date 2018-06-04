import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
// import 'bootstrap/dist/css/bootstrap.css';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  )

ReactDOM.render(
  <Router>
    <Provider store={store}>
        <App/>
    </Provider>
  </Router>,
  document.getElementById('root'));

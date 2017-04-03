import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
// import {  } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import {appReducer} from './reducers' // Or wherever you keep your reducers

import './index.css';
import App from './App';

import Main from './containers/main/Main';
import Whywe from './containers/whywe/Whywe';
import Contacts from './containers/contacts/Contacts';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    appReducer
  }))

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <App>
          <Route exact={true} path="/" component={Main}/>
          <Route path="/whywe" component={Whywe}/>
          <Route path="/contacts" component={Contacts}/>
        </App>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
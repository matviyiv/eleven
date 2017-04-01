import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route, Router, Switch } from 'react-router'

import {appReducer} from './reducers' // Or wherever you keep your reducers

import App from './App';
import './css/bootstrap.min.css';
import './css/index.css';

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
        <Route path="/home" component={App}/>
        <Route path="/app" component={()=>{return <div>yooooooo</div>}}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
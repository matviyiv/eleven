import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import moment from 'moment';

import createHistory from 'history/createBrowserHistory';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { appReducer } from './flux/reducers';
import { localization } from './flux/localization';

import './index.css';
import App from './App';

import Main from './containers/main/Main';
import Whywe from './containers/whywe/Whywe';
import Services from './containers/services/Services';
import Contacts from './containers/contacts/Contacts';

// Booking
import Step1 from './containers/booking/Step1';
import Step2 from './containers/booking/Step2';
import Step3 from './containers/booking/Step3';
import FinalForm from './containers/booking/FinalForm';
import Finish from './containers/booking/Finish';

import Calendar from './containers/calendar/Calendar';

moment.locale('uk_UA');

const history = createHistory();

const reducer = combineReducers({ app: appReducer, str: localization });
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <App>
          <Route exact={true} path="/" component={Main}/>
          <Route path="/whywe" component={Whywe}/>
          <Route path="/contacts" component={Contacts}/>
          <Route path="/services" component={Services}/>
          <Route path="/booking/step1" component={Step1}/>
          <Route path="/booking/step2/:serviceId" component={Step2}/>
          <Route path="/booking/step3/:subServiceId" component={Step3}/>
          <Route path="/booking/form" component={FinalForm}/>
          <Route path="/booking/done" component={Finish}/>
          <Route path="/full/calendar" component={Calendar}/>
        </App>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
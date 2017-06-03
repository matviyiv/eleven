import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

import BackgroundSlider from './background-slider/BackgroundSlider';
import * as actionCreators from './flux/actions';
import Menu from './menu/Menu';
import {classes} from './utils';

export class App extends Component {
  componentWillMount() {
    const {location, actions} = this.props;
    if (location.pathname.indexOf('/booking') === 0) {
      actions.changeAppState('booking');
    }
  }

  componentWillReceiveProps(nextProps) {
    const {location} = this.props;
    const newPath = nextProps.location.pathname;
    if (location.pathname !== newPath) {
      const newStateName = newPath.indexOf('/booking') === 0 ? 'booking' : ''
      this.props.actions.changeAppState(newStateName);
    }
  }

  render() {
    const {app: {appState}} = this.props;
    const floatingButtonClasses = classes({
      'floating-button': true,
      'floating-button--back': appState.showBackButton
    });

    return (
      <div className="app">
        <BackgroundSlider/>
        <a className={floatingButtonClasses} onClick={this.onFloatingButton}>
          <div className="floating-button__text">{appState.showBackButton ? '<' : '+'}</div>
        </a>
        <div className="over-bg"></div>
         <div className="container"> 
            <div className="tab-content text-center"> 
             {this.props.children}
            </div>
         </div>
        <Menu currentPath={this.props.location.pathname}/>
      </div>
    );
  }

  onFloatingButton = (event) => {
    const {history, app: {appState}} = this.props;
    event.preventDefault();
    if (appState.showBackButton) {
      return history.goBack();
    }    
    history.push('/booking/step1');
  }
}

function mapStateToProps(state) {
  return {app: state.app};
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
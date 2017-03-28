import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import BackgroundSlider from './background-slider/BackgroundSlider'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BackgroundSlider/>
        <p className="App-intro">
          1To get started, edit <code onClick={() => {this.props.push('/app')}}>src/App.js</code> and save to reload.
        </p>
        <Link to="/app">App</Link>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { app: state.reducers };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

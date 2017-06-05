import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import BackgroundSlider from './components/background-slider/BackgroundSlider';
import Menu from './components/menu/Menu';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <BackgroundSlider/>
        <div className="over-bg"></div>
        <div className="container app__content"> 
            <div className="tab-content text-center"> 
             {this.props.children}
            </div>
        </div>
        <Menu currentPath={this.props.location.pathname}/>
      </div>
    );
  }
}
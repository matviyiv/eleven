import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import BackgroundSlider from './background-slider/BackgroundSlider';
import Menu from './menu/Menu';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <BackgroundSlider/>
        <Link to="/booking/step1" className="floating-button">
          <div className="floating-button__text">+</div>
        </Link>
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
}
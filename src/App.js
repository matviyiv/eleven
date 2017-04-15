import React, { Component } from 'react';
import './App.css';

import BackgroundSlider from './background-slider/BackgroundSlider';
import Menu from './menu/Menu';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <BackgroundSlider/>
        <div className="app-mask"></div>
         <div className="container"> 
            <div className="tab-content text-center"> 
             {this.props.children}
            </div>
         </div>
        <Menu/>
      </div>
    );
  }
}

/*
<p>
          1To get started, edit <div onClick={() => {this.props.push('/app')}}>src/App.js</div> and save to reload.
        </p>
        <Link to="/app">App</Link>
        */
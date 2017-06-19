import React, { Component } from 'react';
import './App.css';

import {addToHomescreen} from './components/add-to-home-screen';

import BackgroundSlider from './components/background-slider/BackgroundSlider';
import Menu from './components/menu/Menu';

export default class App extends Component {
  state = {
    minimizeHeader: false
  }
  componentDidMount() {
    addToHomescreen.language = 'uk_ua';
    const addtohome = addToHomescreen({
      autostart: false,
      skipFirstVisit: true,
      maxDisplayCount: 1,
      lifespan: 30,
    });

    addtohome.show();
  }
  handleScroll = (event) => {
    this.setState({
      minimizeHeader: this.refs.content.scrollTop !== 0
    })
  }
  render() {
    return (
      <div className="app noselect">
        <BackgroundSlider/>
        <div className="over-bg"></div>
        <div className="app__content" onScroll={this.handleScroll} ref="content"> 
            <div className="container tab-content text-center"> 
             {this.props.children}
            </div>
        </div>
        <Menu currentPath={this.props.location.pathname} isMinimized={this.state.minimizeHeader}/>
      </div>
    );
  }
}
import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import './moment/moment-timezone-with-data-2012-2022';
// import {addToHomescreen} from './components/add-to-home-screen';

import * as actionCreators from './flux/actions';
import BackgroundSlider from './components/background-slider/BackgroundSlider';
import Menu from './components/menu/Menu';

moment.tz.setDefault('Europe/Kiev');

export class App extends Component {
  state = {
    minimizeHeader: false
  }
  componentDidMount() {
    // addToHomescreen.language = 'uk_ua';
    // const addtohome = addToHomescreen({
    //   autostart: false,
    //   skipFirstVisit: true,
    //   maxDisplayCount: 1,
    //   lifespan: 30,
    // });

    // addtohome.show();
  }
  handleScroll = (event) => {
    this.setState({
      minimizeHeader: this.refs.content.scrollTop !== 0
    })
  }
  render() {
    const {str, actions} = this.props;
    return (
      <div className="app noselect">
        <BackgroundSlider/>
        <div className="over-bg"></div>
        <div className="app__content" onScroll={this.handleScroll} ref="content"> 
            <div className="container tab-content text-center"> 
             {this.props.children}
            </div>
        </div>
        <Menu
          currentPath={this.props.location.pathname}
          isMinimized={this.state.minimizeHeader}
          changeLanguage={actions.changeLanguage}
          str={str}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { str: state.str };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {classes} from '../utils';
import './FloatingButton.css';

export default class FloatingButton extends Component {
  render() {
    const {showBackButton} = this.props;
    let content = '+';
    let linkClasses = classes({
      'floating-button': true,
      'floating-button--back': showBackButton
    });

    if (showBackButton) {
      content = '<';
    }

    return (
      <a className={linkClasses} onClick={this.clickHandler}>
        <div className="floating-button__text">{content}</div>
      </a>
    );
  }

  clickHandler = () => {
    const {showBookingButton, showBackButton, history} = this.props;

    if (showBackButton) {
      return history.goBack();
    }

    if (showBookingButton) {
      return history.push('/booking/step1'); ;
    }
  }
}
import React, { Component } from 'react';
import './menu.css';
import logo from '../../logo-yellow.svg';
import { Link } from 'react-router-dom';
import {classes} from '../../utils';

export default class Menu extends Component {
  state = {
    isMobileMenuOpen: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPath !== nextProps.currentPath) {
      this.setState({isMobileMenuOpen:false});
    }
  }

  toggleMobileMenu = () => this.setState({isMobileMenuOpen: !this.state.isMobileMenuOpen});

  render() {
    const {
      currentPath,
      isMinimized,
      currentLocale,
      str: {currentLocalization}
    } = this.props;
    const str = currentLocalization.menu;
    const { isMobileMenuOpen } = this.state;
    const menuItemsClass = classes({
      'nav nav-tabs menu__items': true,
      open: isMobileMenuOpen
    });
    const hgroupClasses = classes({
      'menu__hgroup': true,
      'menu__hgroup--minimized': isMinimized
    });

    return (
    <header role="header" className="menu__header">
      <hgroup className={hgroupClasses}> 
        <h1>
          <Link to="/" className="menu--logo"><img src={logo}/></Link>
         </h1>
        <nav role="nav" id="header-nav" className="nav navy">
          <div id="menu-button" className={isMobileMenuOpen ? 'open' : null} onClick={this.toggleMobileMenu}>
            <i className="hamburger">☰</i>Navigation
          </div>
          <ul className={menuItemsClass}>
            <li className={currentPath === '/' ? 'active' : ''}>
              <Link to="/" title={str.main}>{str.main}</Link>
            </li>
            <li className={currentPath === '/whywe' ? 'active' : ''}>
              <Link to="/whywe"title={str.whywe}>{str.whywe}</Link>
            </li>
            <li className={currentPath === '/services' ? 'active' : ''}>
              <Link to="/services" title={str.services}>{str.services}</Link>
            </li>
            <li className={currentPath === '/contacts' ? 'active' : ''}>
              <Link to="/contacts"  title="{str.contacts}">{str.contacts}</Link>
            </li>
            <li className={currentPath === '/booking/step1' ? 'active' : ''}>
              <Link to="/booking/step1"  title={str.booktime}>{str.booktime}</Link>
            </li>
            
          </ul>
          <div role="socil-icons" className="mobile-social">
            <li className="language-selector">{this.renderLanguageSelector()}</li>
            <li><a href="https://www.facebook.com/Eleven-beauty-bar-116922598898721/" target="_blank" title="facebook" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
            <li><a href="https://www.instagram.com/eleven.beauty.bar/" target="_blank" title="instagram" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
          </div>
        </nav>
        <ul role="socil-icons" className="desk-social">
          <li className="language-selector">{this.renderLanguageSelector()}</li>
          <li><a href="https://www.facebook.com/Eleven-beauty-bar-116922598898721/" target="_blank" title="facebook" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
          <li><a href="https://www.instagram.com/eleven.beauty.bar/" target="_blank" title="instagram" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
        </ul>
      </hgroup>
      <footer className="desk">
         <p>&copy; All rights reserved. Eleven 2017 Made with <i className="fa fa-heart" aria-hidden="true"></i></p>
      </footer>
    </header>);
  }

  changeLanguage = (locale) => (event) => {
    event.preventDefault();
    document.cookie = 'lang=' + locale; 
    this.props.changeLanguage(locale, this.props.str);
  }

  renderLanguageSelector() {
    const {str: {currentLocale}} = this.props;
    if (currentLocale === 'ua') {
      return <a onClick={this.changeLanguage('en')} title="English">ENG</a>
    }

    if (currentLocale === 'en') {
      return <a onClick={this.changeLanguage('ua')} title="Українська">УКР</a>
    }
  }
}

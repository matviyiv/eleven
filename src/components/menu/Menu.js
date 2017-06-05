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
    const {currentPath} = this.props;
    const { isMobileMenuOpen } = this.state;
    const menuItemsClass = classes({
      'nav nav-tabs menu__items': true,
      open: isMobileMenuOpen
    });

    return (
<header role="header" className="menu__header">
  <hgroup> 
    <h1>
      <Link to="/" className="menu--logo"><img src={logo}/></Link>
     </h1>
    <nav role="nav" id="header-nav" className="nav navy">
      <div id="menu-button" className={isMobileMenuOpen ? 'open' : null} onClick={this.toggleMobileMenu}>
        <i className="fa fa-bars"></i>Navigation
      </div>
      <ul className={menuItemsClass}>
        <li className={currentPath === '/' ? 'active' : ''}>
          <Link to="/" title="Головна">Головна</Link>
        </li>
        <li className={currentPath === '/whywe' ? 'active' : ''}>
          <Link to="/whywe"title="Чому ми">Чому ми</Link>
        </li>
        <li className={currentPath === '/services' ? 'active' : ''}>
          <Link to="/services" title="Послуги">Послуги</Link>
        </li>
        <li className={currentPath === '/contacts' ? 'active' : ''}>
          <Link to="/contacts"  title="Контакти">Контакти</Link>
        </li>
      </ul>
      <div role="socil-icons" className="mobile-social">
        <li><a href="#" target="_blank" title="twitter"><i className="fa fa-twitter"></i></a></li>
        <li><a href="#" target="_blank" title="facebook"><i className="fa fa-facebook"></i></a></li>
        <li><a href="#" target="_blank" title="google-plus"><i className="fa fa-google-plus"></i></a></li>
        <li><a href="#" target="_blank" title="pinterest"><i className="fa fa-pinterest"></i></a></li>
      </div>
    </nav>
    <ul role="socil-icons" className="desk-social">
      <li><a href="#" target="_blank" title="twitter"><i className="fa fa-twitter"></i></a></li>
      <li><a href="#" target="_blank" title="facebook"><i className="fa fa-facebook"></i></a></li>
      <li><a href="#" target="_blank" title="google-plus"><i className="fa fa-google-plus"></i></a></li>
      <li><a href="#" target="_blank" title="pinterest"><i className="fa fa-pinterest"></i></a></li>
    </ul>
  </hgroup>
  <footer className="desk">
     <p>&copy; All rights reserved. Eleven 2017 Made with <i className="fa fa-heart" aria-hidden="true"></i></p>
  </footer>
</header>);
  }
}
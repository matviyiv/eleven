import React, { Component } from 'react';
import './menu.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    return (
<header role="header">
  <hgroup> 
    <h1>
      <Link to="/booking/step1" className="menu--logo"><img src={logo}/></Link>
     </h1>
    <nav role="nav" id="header-nav" className="nav navy">
      <ul className="nav nav-tabs">
        <li className="active"><Link to="/" title="Головна">Головна</Link></li>
        <li><Link to="/whywe"title="Чому ми">Чому ми</Link></li>
        <li><Link to="/services" title="Послуги">Послуги</Link></li>
        <li><Link to="/contacts"  title="Контакти">Контакти</Link></li>
      </ul>
      <div role="socil-icons" className="mobile-social">
        <li><a href="#" target="_blank" title="twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
        <li><a href="#" target="_blank" title="facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
        <li><a href="#" target="_blank" title="google-plus"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
        <li><a href="#" target="_blank" title="pinterest"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
      </div>
    </nav>
    <ul role="socil-icons" className="desk-social">
      <li><a href="#" target="_blank" title="twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
      <li><a href="#" target="_blank" title="facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
      <li><a href="#" target="_blank" title="google-plus"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
      <li><a href="#" target="_blank" title="pinterest"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
    </ul>
  </hgroup>
  <footer className="desk">
     <p>&copy; All rights reserved. Eleven 2017 Made with <i className="fa fa-heart" aria-hidden="true"></i></p>
  </footer>
</header>)
  }
}
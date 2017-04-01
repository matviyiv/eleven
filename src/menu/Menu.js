import React, { Component } from 'react';
import './menu.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    return (<header className="menu">
      <hgroup className="menu--hgroup">
        <h1>
          <Link to="/home" className="menu--logo"><image src={logo}/></Link>
        </h1>
        <nav className="nav navy menu--nav">
          <div className="menu--button"><i className="fa fa-bars" aria-hidden="true"></i>Navigation</div>
          <ul className="nav nav-tabs menu--tabs">
            <li className="active"><Link to="/home" title="Головна">Головна</Link></li>
            <li><Link to="/main" title="Про нас">Про нас</Link></li>
            <li><Link to="/main" title="Підписатись">Підписатись</Link></li>
            <li><Link to="/main" title="Контакти">Контакти</Link></li>
          </ul>
        </nav>
      </hgroup>
      <footer className="desk menu--footer">
        <p>© All rights reserved. Eleven 2017 Made with <i class="fa fa-heart" aria-hidden="true"></i></p>
      </footer>
    </header>)
  }
}
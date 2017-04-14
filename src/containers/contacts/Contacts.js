import React, { Component } from 'react';
import './contacts.css';

export default class Contacts extends Component {
  render() {
    return (
    	    <article role="contact" className="contact-pan">
	          <header className="page-title">
	            <h2>Контакти</h2>
	          </header>
	          <div className ="box">
	          <div className="ntify_form">
	            <form method="post" action="php/subscribe.php" name="subscribeform" id="subscribeform">
	              <input name="email" type="email" id="subemail" placeholder="Введіть емейл..."></input>
	              <label>
	                <input name="" type="submit" className="button-icon"></input>
	                <i className="fa fa-paper-plane" aria-hidden="true"></i>
	              </label>
	            </form>
				<p>Будь ласка введіть свій емейл і ми повідомимо щойно відкриємось!.</p> <br/>
	            <h3><a href="mailto:Contact@eleven.lviv.ua">info@eleven.lviv.ua </a></h3>
          <ul>
            <li><i className="fa fa-map-marker" aria-hidden="true"></i> м. Львів, вул. Чорновола 31</li>
            <li><i className="fa fa-phone" aria-hidden="true"></i> <a href="tel:0631813812">0631813812</a></li>
          </ul>
	           </div>
          </div>
        </article>
    	)
}
}
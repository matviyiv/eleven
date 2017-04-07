import React, { Component } from 'react';
import './services.css';

export default class Services extends Component {
  render() {
    return (
    	   <section  className="">
	        <article role="services" className="services-pan">
	          <header className="page-title">
	            <h2>Послуги</h2>
	          </header>
		         <ul role="services">
		            <li> <i className="fa fa-scissors" aria-hidden="true"></i>
		              <h6>Перукарські послуги</h6>
		              <p>Ми завжди стараємось надати <br/>
		              своїй роботі ексклювного вигляду<br/></p>
		            </li>
		            <li> <i className="fa fa-diamond" aria-hidden="true"></i>
		              <h6>Макіяж</h6>
		              <p>Відчуйте легкість та комфорт<br/>
		                під час свого візиту <br/> до нас.</p>
		            </li>
		            <li> <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
		              <h6>Манікюр</h6>
		              <p>Ми впевнені у справі, котру<br/> робимо - 
		                тому чудові емоції<br/> гарантовано.</p>
		            </li>
		            <li> <i className="fa fa-gift" aria-hidden="true"></i>
		              <h6>Сертифікати</h6>
		              <p>Ми впевнені у справі, котру<br/> робимо - 
		                тому чудові емоції<br/> гарантовано.</p>
		            </li>
		          </ul>
	           </article>
      </section>
    )
}
}
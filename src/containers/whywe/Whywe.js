import React, { Component } from 'react';
import './whywe.css';

export default class Whywe extends Component {
  render() {
    return (
    	   <section  className="">
	        <article role="whywe" className="whywe-pan">
	          <header className="page-title">
	            <h2>Чому ми</h2>
	          </header>
		         <ul role="services">
		            <li> <i className="fa fa-diamond" aria-hidden="true"></i>
		              <h6>Ексклюзивний стиль</h6>
		              <p>Ми завжди стараємось надати <br/>
		              своїй роботі ексклювного вигляду<br/></p>
		            </li>
		            <li> <i className="fa fa-coffee" aria-hidden="true"></i>
		              <h6>Затишок</h6>
		              <p>Відчуй легкість та комфорт<br/>
		                під час свого візиту <br/> до нас.</p>
		            </li>
		            <li> <i className="fa fa-heart" aria-hidden="true"></i>
		              <h6>Чудові емоції</h6>
		              <p>Ми впевнені у справі, котру<br/> робимо - 
		                тому чудові емоції<br/> гарантовано.</p>
		            </li>
		          </ul>
	           </article>
      </section>
    )
}
}
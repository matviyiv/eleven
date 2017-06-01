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
		              <h6>hair style</h6>
		              <p>Завітай до нас на стрижку, фарбування чи просто <br/>
		              зачіску  - відпочинь! <br/></p>
		            </li>
		            <li> <i className="fa fa-diamond" aria-hidden="true"></i>
		              <h6>make up</h6>
		              <p>Вечірка? Інша нагода? <br/>
		                заходь до нас <br/> на мейк</p>
		            </li>
		            <li> <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
		              <h6>nail art</h6>
		              <p>Хочеться чогось цікавого?<br/> не зволікай
		                - ми знаємо,<br/> що тобі сподобається</p>
		            </li>
		            <li> <i className="fa fa-gift" aria-hidden="true"></i>
		              <h6>Сертифікати</h6>
		              <p>Наші послуги  - <br/> чудовий подарунок!
		                <br/> Деталі за телефоном</p>
		            </li>
		          </ul>
	           </article>
      </section>
    )
}
}
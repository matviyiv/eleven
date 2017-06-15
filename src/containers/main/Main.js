import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './main.css';
import FloatingButton from '../../components/FloatingButton';

export default class Main extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }
  render() {
    return (<div>
      <FloatingButton showBookingButton history={this.props.history}/>
         <section  className="">
          <article role="main" className="main-pan">
            <header className="page-title">
              <h2>Головна</h2>
            </header>
              <p>Ми команда талановитих молодих людей з креативними ідеями, котрі прагнемо втілювати в життя. <br/> Ми працюємо, щоб ти відчувала себе впевнено
                і довіряла нам  на 100%.<br/> У студії eleven ти знайдеш широкий спектр перукарських послуг, послуги макіяжу та манікюру за доступними цінами.<br/>Приходь! У нас затишно.
                <br/>
                <p>Лови знижки з нагоди відкриття! 30%  на всі послуги! Поспіши забронювати!</p>
              <Link to="/booking/step1" className="app__link">Забронювати час</Link>
              </p>
          </article>
      </section>
    </div>);
}
}
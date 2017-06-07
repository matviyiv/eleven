import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './contacts.css';
import FloatingButton from '../../components/FloatingButton';
import * as actionCreators from '../../flux/actions';

export class Contacts extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    subscribeEmail: ''
  }

  render() {
    return (<div>
      <FloatingButton showBookingButton history={this.props.history}/>
          <article role="contact" className="contact-pan">
            <header className="page-title">
              <h2>Контакти</h2>
            </header>
            <div className ="box">
            <div className="ntify_form">
              <form  className="contact__form" onSubmit={this.submit} name="subscribeform" id="subscribeform">
                <input
                  className="contact__email-input"
                  name="email"
                  type="email"
                  id="subemail"
                  placeholder="Введіть емейл..."
                  onChange={this.onEmailChange}
                />
                <label>
                  <input name="" type="submit" className="button-icon" />
                  <i className="fa fa-paper-plane" aria-hidden="true" onClick={this.submit}></i>
                </label>
              </form>
          <p>Будь ласка введіть свій емейл і ми повідомимо щойно відкриємось!.</p> <br/>
              <h3><a href="mailto:Contact@eleven.lviv.ua" className="contact__email-link">info@eleven.lviv.ua </a></h3>
          <ul>
            <li><i className="fa fa-map-marker" aria-hidden="true"></i> <a href="https://goo.gl/maps/uhZfiKZjZWp">м. Львів, вул. Чорновола 31</a></li>
            <li><i className="fa fa-phone" aria-hidden="true"></i> <a href="tel:0631813812">0631813812</a></li>
          </ul>
             </div>
          </div>
        </article>
      </div>);
  }

  onEmailChange = (e) => this.setState({subscribeEmail: e.target.value})

  submit = (e) => {
    e.preventDefault();
    this.props.actions.subscribe(this.state.subscribeEmail);
  }
}


function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
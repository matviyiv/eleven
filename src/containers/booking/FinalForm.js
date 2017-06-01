import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import firebaseApp from 'firebase/app';
import 'firebase/auth';
import * as actionCreators from '../../flux/actions';

export class FinalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.app.booking.name || '',
      phone: props.app.booking.phone || '',
      notes: props.app.booking.notes || '',
      nameInputInvalid: false,
      phoneInputInvalid: false,
      showVerification: false,
      verificationCode: '',
    };
  }

  componentDidMount() {
    this.recaptchaVerifier = new firebaseApp.auth.RecaptchaVerifier('make-booking', {
      'size': 'invisible',
      'callback': (response) => {
        this.handleSubmit();
      }
    });

    // this.refs.nameInput.setCustomValidity('це поле обовязкове');
    // this.refs.phoneInput.setCustomValidity('це поле обовязкове');
  }

  render() {
    const { name, phone, notes, nameInputInvalid, phoneInputInvalid, showVerification } = this.state;
    const {app: {services, booking} } = this.props;
    const hasServices = Object.keys(booking.selectedServices).length;

    if (showVerification) {
      return (<div>
        <input type="text" onChange={this.onCodeChange}/>
        <input type="submit" onClick={this.handleVerification} value="Submit"/>
      </div>);
    }

    return (<section>
      <article role="whywe" className="whywe-pan">
        <header className="page-title">
          <h2>Final Form</h2>
        </header>
        <ul>{hasServices && this.renderServices(booking.selectedServices)}</ul>
        <form>
        <ul>
        <li>
          <label>Name: 
          <input
            type="text"
            autoFocus="true"
            name="name"
            ref="nameInput"
            className={nameInputInvalid ? 'invalid-input' : ''}
            value={name}
            onChange={this.nameChange}
            />
          </label></li>
        <li>
          <label>Phonenumber:
            <input
              type="tel"
              name="phone"
              ref="phoneInput"
              className={phoneInputInvalid ? 'invalid-input' : ''}
              value={phone}
              onChange={this.phoneChange}
              required={true}
              />
          </label>
        </li>
        <li>
          <label>Notes:
            <textarea
              name="notes"
              cols="40"
              rows="5"
              value={notes}
              onChange={this.notesChange}
              >
            </textarea>
          </label>
          </li>
        <li>
          <input
            type="submit"
            value="Submit"
            id="make-booking"
            data-sitekey="6Ld8pyMUAAAAAMqNYtkiuY9lZrbJWbH8cfxUWyNR"
            disabled={!hasServices}
            />
        </li>
        <li>
          <button onClick={this.addMore}>Add more</button>
        </li>
        </ul>
        </form>
      </article>
    </section>);
  }

  nameChange = (event) => this.setState({name: event.target.value})
  phoneChange = (event) => this.setState({phone: event.target.value})
  notesChange = (event) => this.setState({notes: event.target.value})
  onCodeChange = (event) => this.setState({verificationCode: event.target.value})

  addMore = (event) => {
    const { name, phone, notes } = this.state;
    event.preventDefault();
    this.props.actions.saveBookingUser({ name, phone, notes });
    this.submit();
    this.props.history.push('/booking/step1');
  }

  handleSubmit = (event) => {
    event && event.preventDefault();
    if (!this.refs.nameInput.validity.valid || !this.refs.phoneInput.validity.valid) {
      return this.setState({
        nameInputInvalid: !this.refs.nameInput.validity.valid,
        phoneInputInvalid: !this.refs.phoneInput.validity.valid
      });
    }
    firebaseApp.auth().signInWithPhoneNumber(this.state.phone, this.recaptchaVerifier)
      .then((confirmation) => {
        this.confirmationResult = confirmation;
        this.setState({showVerification: true})
      })
      .catch((error) => {
        console.error('signInWithPhoneNumber', error);
      });
  }

  handleVerification = () => {
    const {verificationCode} = this.state;
    this.confirmationResult.confirm(verificationCode)
      .then(({user}) => {
        this.submit();
        this.props.actions.clearBooking();
        this.props.history.push('/booking/done');
      }).catch(function (error) {
        console.error('confirm', error);
      });
  }

  submit = () => {
    const { name, phone, notes } = this.state;
    const { actions, app: {booking} } = this.props;
    actions.submitBooking({ ...booking, name, phone, notes });
  }

  renderServices(services) {
    const content = [];
    for (let id in services) {
      let service = services[id];
      content.push(<li key={id}>{service.name} {moment(service.dateStart).format('Do MMMM HH:mm')}</li>);
    };
    return content;
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalForm);
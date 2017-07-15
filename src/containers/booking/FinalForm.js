import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../flux/actions';
import firebaseApp from 'firebase/app';
import 'firebase/auth';

export class FinalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.booking.name || '',
      phone: props.booking.phone || '',
      notes: props.booking.notes || '',
      confirmationCode: '',
      isSubmitted: false,
      invalidPhone: false,
      invalidCode: false,
      confirmationResult: null,
    };
  }

  componentWillMount() {
    const { booking, history} = this.props;
    const hasServices = Object.keys(booking.selectedServices).length;
    if (!hasServices) {
      history.push('/booking/step1');
    }
  }

  componentDidMount() {
    const { name, phone } = this.state;
    const { str, currentLocale } = this.props;
    if (!name) {
      this.refs.nameInput.setCustomValidity(str.invalid_required);
    }
    if (!phone) {
      this.refs.phoneInput.setCustomValidity(str.invalid_number);
    }

    this.recaptchaVerifier = new firebaseApp.auth.RecaptchaVerifier('recaptcha-container', {width: 60, hl : currentLocale == 'ua' ? 'uk' : currentLocale});
    this.recaptchaVerifier.render().then((widgetId) => {
      window.grecaptcha.reset(widgetId);
    });
  }

  render() {
    const { name, phone, notes, isSubmitted, confirmationResult, invalidPhone } = this.state;
    const { booking, str } = this.props;

    if (confirmationResult) {
      return this.renderConfirmation();
    }

    return (<section className="container final-form--container">
      <article className="final-form">
        <header className="page-title">
          <h2>{str.title}</h2>
        </header>
        <ul className="final-form--booking-list">
          {this.renderServices(booking.selectedServices)}
        </ul>
        <form onSubmit={this.formSubmit} className={isSubmitted ? 'final-form--submitted' : ''}>
        <div className="final-form--fields clearfix">
        <div className="form-group row">
          <label className="col-sm-4 control-label" htmlFor="name-input">{str.name_label}</label>
          <div className="col-sm-6">
          <input
            type="text"
            autoFocus="true"
            name="name"
            id="name-input"
            ref="nameInput"
            className="form-control"
            value={name}
            placeholder={str.name_placeholder}
            onChange={this.nameChange}
            required={true}
            />
            </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 control-label" htmlFor="phone-input">{str.number_label}</label>
          <div className="col-sm-6">
            <input
              type="text"
              name="phone"
              ref="phoneInput"
              id="phone-input"
              className="form-control"
              value={phone}
              placeholder="+38 063 11 22 333"
              onChange={this.phoneChange}
              required={true}
              />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 control-label" htmlFor="phone-input">{str.info_label}</label>
          <div className="col-sm-6">
            <textarea
              name="notes"
              cols="40"
              rows="5"
              className="form-control"
              placeholder={str.info_placeholder}
              value={notes}
              onChange={this.notesChange}
              >
            </textarea>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4"></div>
          <div className="col-sm-6" id="recaptcha-container"></div>
        </div>
        {invalidPhone && this.renderInvalidError()}
        <div className="form-group row">
          <div className="col-sm-6 col-sm-offset-4 col-md-4 col-md-offset-4 clearfix">
          <button className="btn btn-secondary final-form__add" onClick={this.addMore}>{str.add_btn}</button>
          <input
            type="submit"
            value={str.submit}
            className="btn btn-default final-form__submit"
            onClick={this.sendSMS}
            disabled={isSubmitted}
            />
          </div>
        </div>
        </div>
        </form>
      </article>
    </section>);
  }

  nameChange = (event) => {
    this.refs.nameInput.setCustomValidity('');
    this.setState({name: event.target.value, isSubmitted: false });
  }

  phoneChange = (event) => {
    this.refs.phoneInput.setCustomValidity('');
    this.setState({phone: event.target.value, isSubmitted: false, invalidPhone: false });
  }

  notesChange = (event) => this.setState({notes: event.target.value});

  confirmationCodeChange = (event) => this.setState({confirmationCode: event.target.value});

  formSubmit = (event) => event.preventDefault();

  addMore = (event) => {
    event.preventDefault();
    const { name, phone, notes } = this.state;
    this.props.actions.saveBookingUser({ name, phone, notes });
    this.props.history.push('/booking/step1');
  }

  sendSMS = () => {
    const { phone } = this.state;
    this.setState({isSubmitted: true});
    firebaseApp.auth().signInWithPhoneNumber(phone, this.recaptchaVerifier)
    .then((confirmationResult) => this.setState({ confirmationResult }))
    .catch(() => {
      this.setState({ invalidPhone: true });
      this.recaptchaVerifier.render().then((widgetId) => {
        window.grecaptcha.reset(widgetId);
      });
    });
  }

  submitCode = () => {
    const { confirmationResult, confirmationCode } = this.state;
    confirmationResult.confirm(confirmationCode)
      .then(() => {
        this.submit();
        this.props.actions.clearBooking();
        this.props.history.push('/booking/done');
      }).catch((error) => {
        this.setState({invalidCode: true});
        console.log('error', error);
      });
  }

  deleteSelectedService = (serviceId) => () => {
    this.props.actions.deleteSelectedService(serviceId);
  }

  submit = () => {
    const { name, phone, notes } = this.state;
    const { actions, booking } = this.props;
    actions.submitBooking({ ...booking, name, phone, notes });
  }

  renderServices(services) {
    const { currentLocale } = this.props;
    const content = [];
    moment.locale(currentLocale);
    for (let id in services) {
      let service = services[id];
      const displayName = service[currentLocale] || service.name;
      content.push(<li key={id} className="final-form__selected-service">
        {displayName} {moment(service.dateStart).format('Do MMMM HH:mm')}
        <span className="glyphicon glyphicon-remove" onClick={this.deleteSelectedService(id)}></span>
      </li>);
    };
    return content;
  }

  back = () => {
    this.setState({ confirmationResult: null });
  }

  renderConfirmation() {
    const { confirmationCode, invalidCode } = this.state;
    const { str } = this.props;

    return (<section className="container final-form--container">
      <article className="final-form">
        <header className="page-title">
          <h2>{str.title_code}</h2>
        </header>
        <div className="final-form--fields clearfix">
          <div className="form-group row">
            <label className="col-sm-4 control-label" htmlFor="phone-input">{str.confirm_label}</label>
            <div className="col-sm-6">
              <input
                type="text"
                name="phone"
                ref="phoneInput"
                id="phone-input"
                className="form-control"
                value={confirmationCode}
                placeholder="123456"
                onChange={this.confirmationCodeChange}
                required={true}
                />
            </div>
          </div>
          {invalidCode && 
            (<div className="form-group row final-form__invalid-phone">
              {str.invalid_code}
            </div>)
          }
          <div className="form-group row">
            <div className="col-sm-6 col-sm-offset-4 col-md-4 col-md-offset-4 clearfix">
            <button className="btn btn-default final-form__confirm" onClick={this.submitCode}>{str.submitCode_btn}</button>
            <button className="btn btn-secondary final-form__back-btn" onClick={this.back}>{str.submitCode_btn}</button>
            </div>
          </div>
        </div>
      </article>
    </section>);
  }

  renderInvalidError() {
    const { str } = this.props;
    return (<div className="form-group row final-form__invalid-phone">
      {str.invalid_phone}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    booking: state.app.booking,
    str: state.str.currentLocalization.final_form,
    currentLocale: state.str.currentLocale
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalForm);

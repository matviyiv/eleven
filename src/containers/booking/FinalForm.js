import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../flux/actions';

export class FinalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.app.booking.name || '',
      phone: props.app.booking.phone || '',
      notes: props.app.booking.notes || '',
      isSubmitted: false,
    };
  }

  componentWillMount() {
    const { app:{booking}, history} = this.props;
    const hasServices = Object.keys(booking.selectedServices).length;
    if (!hasServices) {
      history.push('/booking/step1');
    }
  }

  componentDidMount() {
    const { name, phone } = this.state;
    if (!name) {
      this.refs.nameInput.setCustomValidity("Це поле є обов'язковим");
    }

    if (!phone) {
      this.refs.phoneInput.setCustomValidity("Будь ласка введіть вірний мобільний номер");
    }
  }

  render() {
    const { name, phone, notes, isSubmitted } = this.state;
    const {app: {booking} } = this.props;
    const hasServices = Object.keys(booking.selectedServices).length;
    return (<section className="container final-form--container">
      <article className="final-form">
        <header className="page-title">
          <h2>Обрані послуги</h2>
        </header>
        <ul className="final-form--booking-list">
          {hasServices && this.renderServices(booking.selectedServices)}
        </ul>
        <form onSubmit={this.handleSubmit} className={isSubmitted ? 'final-form--submitted' : ''}>
        <div className="final-form--fields clearfix">
        <div className="form-group row">
          <label className="col-sm-4 control-label" htmlFor="name-input">{"Ім'я:"}</label>
          <div className="col-sm-6">
          <input
            type="text"
            autoFocus="true"
            name="name"
            id="name-input"
            ref="nameInput"
            className="form-control"
            value={name}
            placeholder="як до вас звертатися"
            onChange={this.nameChange}
            required={true}
            />
            </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 control-label" htmlFor="phone-input">Мобільний номер:</label>
          <div className="col-sm-6">
            <input
              type="tel"
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
          <label className="col-sm-4 control-label" htmlFor="phone-input">Додаткова інформація:</label>
          <div className="col-sm-6">
            <textarea
              name="notes"
              cols="40"
              rows="5"
              className="form-control"
              placeholder="мені потрібно ..."
              value={notes}
              onChange={this.notesChange}
              >
            </textarea>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4 col-sm-offset-2 col-md-4 col-md-offset-4 clearfix">
          <input
            type="submit"
            value="Надіслати"
            className="btn btn-default final-form__submit"
            onClick={this.onClickSubmit}
            />
          <button className="btn btn-secondary final-form__add" onClick={this.addMore}>Додати послугу</button>
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
    this.setState({phone: event.target.value, isSubmitted: false });
  }

  notesChange = (event) => this.setState({notes: event.target.value});

  onClickSubmit = () => this.setState({isSubmitted: true})

  addMore = (event) => {
    const { name, phone, notes } = this.state;
    event.preventDefault();
    this.props.actions.saveBookingUser({ name, phone, notes });
    this.props.history.push('/booking/step1');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.submit();
    this.props.actions.clearBooking();
    this.props.history.push('/booking/done');
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
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
    };
  }

  render() {
    const { name, phone, notes } = this.state;
    const {app: {services, booking} } = this.props;
    const hasServices = Object.keys(booking.selectedServices).length;
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
            value={name}
            onChange={this.nameChange}
            />
          </label></li>
        <li>
          <label>Phonenumber:
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={this.phoneChange}
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
            onClick={this.handleSubmit}
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

  nameChange = (event) => {
    this.setState({name: event.target.value});
  }

  phoneChange = (event) => {
    this.setState({phone: event.target.value});
  }

  notesChange = (event) => {
    this.setState({notes: event.target.value});
  }

  addMore = (event) => {
    event.preventDefault();
    // this.submit();
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
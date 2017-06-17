import React, { Component } from 'react';
import './calendar.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import _ from 'lodash';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as actionCreators from '../../flux/actions';
import FloatingButton from '../../components/FloatingButton';
import EditBooking from './EditBooking.js';

export class Calendar extends Component {
  state = {
    filterMaster: '',
    email: '',
    password: '',
    openEdit: false,
    selectedBookingId: '',
  }

  componentWillMount() {
    Notification && Notification.requestPermission();
    BigCalendar.momentLocalizer(moment);
  }

  componentWillUnmount() {
    this.props.actions.logout();
  }

  componentWillReceiveProps(nextProps) {
    const {
      app: {allEvents, auth, db},
      actions
    } = nextProps;
    if (auth.status == 'success') {
      !allEvents.list.length && !allEvents.loading && actions.getAllEvents();
      !db.subscribed && actions.subscribeForNewBookings();
    }
  }

  render() {
    const {app: {allEvents, auth, masters}} = this.props;
    const {filterMaster, email, password, openEdit, selectedBooking} = this.state;
    let events = allEvents.list;

    if (auth.loading) {
      return (<h2>Loading...</h2>);
    }

    if (auth.status !== 'success') {
      return (<div>
        <input type="email" onChange={this.onEmailChange} value={email} placeholder="Email"/>
        <input type="password" onChange={this.onPasswordChange} value={password} placeholder="Password"/>
        <button onClick={this.login}>Submit</button>
      </div>);
    }

    if (allEvents.list.length === 0) {
      return (<h2>{allEvents.loading ? 'Loading...' : 'No events found'}</h2>);
    }

    if (filterMaster !== '') {
      events = _.filter(events, {masterId: filterMaster});
    }

    return (<div className="calendar--container">
      <FloatingButton showBookingButton history={this.props.history}/>
      <div>User: {auth.email}</div>
      Календар усіх подій
      <div>Filters:
      <select onChange={this.changeMaster} value={filterMaster}>
        <option value=''>filter by masters</option>
        {this.renderMasters()}
      </select>
      </div>
      <BigCalendar
        selectable
        events={events}
        defaultView='week'
        popup={true}
        min={moment('10:00', 'hh:mm').toDate()}
        max={moment('21:00', 'hh:mm').toDate()}
        messages={{
          allDay: 'цілий день',
          previous: '<<',
          next: '>>',
          today: 'сьогодні',
          month: 'місяць',
          week: 'тиждень',
          day: 'день',
        }}
        views={['month', 'week', 'day']}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={moment().toDate()}
        onSelectEvent={this.onSelectEvent}
      />
      <EditBooking
        isOpen={openEdit}
        masters={masters}
        selectedBooking={selectedBooking}
        updateBooking={this.updateBooking}
        onCloseModal={this.onCloseModal}
        onDelete={this.onDelete}
      />
    </div>);
  }

  renderMasters() {
    const {app:{masters}} = this.props;
    return _.map(masters.list, (master) => (<option value={master.id} key={master.id}>
      {master.name}
    </option>));
  }

  changeMaster = (event) => {
    this.setState({filterMaster: event.target.value});
  }

  onDelete = (bookingId) => {
    if (confirm('Ви впевнені що хочете идалити бронювання?')) {
      this.props.actions.deleteBoking(bookingId);
    }
  }

  onSelectEvent = (event) => {
    this.setState({
      openEdit: !this.state.openEdit,
      selectedBooking: {
        id: event.bookingId,
        data: event.booking,
        subServiceId: event.subServiceId,
        title: event.title,
      }
    })
    
  }

  updateBooking = (bookingId, booking, subServiceId) => {
    this.props.actions.updateBooking(bookingId, booking, subServiceId);
  }

  onEmailChange = (event) => this.setState({email: event.target.value});
  onPasswordChange = (event) => this.setState({password: event.target.value});

  login = () => {
    const {email, password} = this.state;
    this.props.actions.authenticate(email, password);
  }

  onCloseModal = () => {
    this.setState({openEdit: false})
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
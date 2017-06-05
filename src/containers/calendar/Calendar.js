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

export class Calendar extends Component {
  state = {
    filterMaster: '',
    email: '',
    password: '',
  }

  componentWillMount() {
    const {
      app: {allEvents},
      actions
    } = this.props;

    !allEvents.list.length && !allEvents.loading && actions.getAllEvents();
    
    BigCalendar.momentLocalizer(moment);
  }

  componentWillUnmount() {
    this.props.actions.logout();
  }

  render() {
    const {app: {allEvents, auth}} = this.props;
    const {filterMaster, email, password} = this.state;
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
        {this.renederMasters()}
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
        onSelectSlot={(slotInfo) => alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()}
          \nend: ${slotInfo.end.toLocaleString()}`
        )}
      />
    </div>);
  }

  renederMasters() {
    const {app:{masters}} = this.props;
    return _.map(masters.list, (master) => (<option value={master.id} key={master.id}>
      {master.name}
    </option>));
  }

  changeMaster = (event) => {
    this.setState({filterMaster: event.target.value});
  }

  onSelectEvent = (event) => {
    const isConfirmed = confirm('Are you sure you want to delete this booking?');

    if (isConfirmed) {
      this.props.actions.deleteBoking(event.bookingId);
    }
  }  

  onEmailChange = (event) => this.setState({email: event.target.value});
  onPasswordChange = (event) => this.setState({password: event.target.value});

  login = () => {
    const {email, password} = this.state;
    this.props.actions.authenticate(email, password);
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
import React, { Component } from 'react';
import './calendar.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import _ from 'lodash';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as actionCreators from '../../flux/actions';

export class Calendar extends Component {
  state = {
    filterMaster: '',
  }

  componentWillMount() {
    const {
      app: {allEvents},
      actions
    } = this.props;

    !allEvents.list.length && !allEvents.loading && actions.getAllEvents();
    
    BigCalendar.momentLocalizer(moment);
  }

  render() {
    const {app: {allEvents}} = this.props;
    const {filterMaster} = this.state;
    let events = allEvents.list;

    if (allEvents.list.length == 0) {
      return (<h2>{allEvents.loading ? 'Loading...' : 'No events found'}</h2>);
    }

    if (filterMaster != '') {
      events = _.filter(events, {masterId: filterMaster});
    }

    return (<div className="calendar--container">
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

  renederMasters () {
    const {app:{masters}} = this.props;
    return _.map(masters.list, (master) => (<option value={master.id} key={master.id}>
      {master.name}
    </option>))
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
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
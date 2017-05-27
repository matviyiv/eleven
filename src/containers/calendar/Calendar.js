import React, { Component } from 'react';
import './calendar.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as actionCreators from '../../flux/actions';

export class Calendar extends Component {
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

    if (allEvents.list.length == 0) {
      return (<h2>{allEvents.loading ? 'Loading...' : 'No events found'}</h2>);
    }

    return (<div className="calendar--container">
      Календар усіх подій
      <BigCalendar
        selectable
        events={allEvents.list}
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
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={(slotInfo) => alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()}
          \nend: ${slotInfo.end.toLocaleString()}`
        )}
      />
    </div>);
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
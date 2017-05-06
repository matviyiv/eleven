import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../flux/actions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export class Step3 extends Component {
  state = {
    selectedDate: moment()
  }

  componentWillMount() {
    const {app: {masters, services}, actions} = this.props;
    !masters.list && !masters.loading && actions.loadMasters();
    !services.list && !services.loading && actions.loadServices();
  }

  getAvaliableTime(master) {
    const content = [];
    const {selectedDate} = this.state;
    const date = selectedDate.date();
    const dateType = isEven(date) ? 'even' : 'odd';
    const isWorking = master.work.indexOf(dateType) > -1;
    const startWorkHours = selectedDate.hours(10).minutes(0).seconds(0);
    if (isWorking) {
      let index = 0;
      for (let time = startWorkHours; time < moment(startWorkHours).hours(20); time.add(30, 'minutes')) {
        content.push(<li key={index++}>
          <a onClick={this.selectMasterNextDate(master.id, moment(time))}>
          {time.format('HH:mm')}
          </a>
        </li>);
      }
    }
    else {
      content.push(<li key="msg-no-master"><a>
        Майстер не працює в цей день спробуйте наступну дату 
        {dateType == 'even' ? ' непарного ' : ' парного'}
        дня
      </a></li>);
    }

    return <ul className="time-list">{content}</ul>;
  }

  render() {
    const {app, match: {params}} = this.props;
    const id = params.subServiceId;
    
    if (app.masters.loading || app.services.loading) return (<div>'Loading ...'</div>);

    const masters = app.masters.list.filter((m) => m.services.indexOf(id) > -1);
    const content = masters.length ? this.renderMasters(masters) : 'No master found!';

    return (<div>
      <DatePicker
        inline
        dateFormat="DD/MM/YYYY"
        todayButton={"Сьогодні"}
        utcOffset={+2}
        locale="uk_UA"
        selected={this.state.selectedDate}
        onChange={this.handleDateChange}
        minDate={moment()}
        maxDate={moment().add(30, "days")}
        placeholderText="Виберіть дату візиту" />
      {content}
    </div>)
  }

  selectMaster = (masterId) => {
    const {app, match: {params}} = this.props;
    const serviceId = params.subServiceId;
    return () => {
      // this.props.actions.selectMaster({masterId, serviceId});
      // this.props.history.push(`/booking/calendar/${serviceId}/${masterId}`);
    }
  }

  selectMasterNextDate = (masterId, date) => {
    const {app, match: {params}} = this.props;
    const serviceId = params.subServiceId;
    return () => {
      this.props.actions.selectMasterNextDate({masterId, serviceId, date});
      this.props.history.push('/booking/form');
    }
  }

  handleDateChange = (selectedDate) => {
    this.setState({selectedDate});
  }

  renderMasters(list) {
    const items = list.map((master) => {
      const timeList = this.getAvaliableTime(master);
      return <li key={master.id}>
      <a onClick={this.selectMaster(master.id)}>{master.name}</a>
      <br/>
        Avaliable date: {timeList}
      </li>
    });

    return (<ul>
      {items}
    </ul>)
  }
}

function isEven(n) {
  return n == parseFloat(n)? !(n%2) : void 0;
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
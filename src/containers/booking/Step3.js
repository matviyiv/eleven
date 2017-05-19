import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import * as actionCreators from '../../flux/actions';
import * as MasterHelper from '../../utils/MasterHelper';

export class Step3 extends Component {
  state = {
    selectedDate: moment(),
    filteredMasters: null,
    currentService: null
  }

  componentWillMount() {
    const {
      app: {masters, services},
      actions,
      match: {params}
    } = this.props;

    !masters.list && !masters.loading && actions.loadMasters();
    !services.list && !services.loading && actions.loadServices();
  }

  componentWillReceiveProps(nextProps) {
    const {filteredMasters, currentService} = this.state;
    const {app: {masters, services}, match: {params}} = nextProps;
    const id = params.subServiceId;

    if (!filteredMasters && masters.list) {
      this.setState({
        filteredMasters: _.filter(masters.list, (m) => m.services.indexOf(id) > -1)
      });
    }

    if (!currentService) {
      this.setState({currentService: findSubService(services.list, id)});
    }
  }

  getAvaliableTime(master) {
    const {selectedDate, currentService} = this.state;
    const listOfAvaliableHours = MasterHelper.getAvaliableTime({master, selectedDate, duration: currentService.duration});
    const date = selectedDate.date();
    const dateType = MasterHelper.isEven(date) ? 'even' : 'odd';
    let content = listOfAvaliableHours.map((time) => <li key={time.format('DD-HH:mm')}>
          <a onClick={this.selectMasterNextDate(master.id, moment(time))}>
          {time.format('HH:mm')}
          </a>
        </li>);

    
    if (listOfAvaliableHours.length == 0) {
      content = [<li key="msg-no-master"><a>
        Майстер не працює або зайнятий в цей день спробуйте наступну дату 
        {dateType == 'even' ? ' непарного ' : ' парного '}
        дня
      </a></li>];
    }

    return <ul className="time-list">{content}</ul>;
  }

  render() {
    const {app: {masters, services}} = this.props;
    const {filteredMasters, currentService} = this.state;
    
    if (masters.loading || services.loading) return (<div>Loading ...</div>);

    const content = filteredMasters.length ? this.renderMasters(filteredMasters) : 'No master found!';

    return (<div>
      <h2>{currentService.name} duration: {currentService.duration}h</h2>
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
    const {match: {params}} = this.props;
    const serviceId = params.subServiceId;
    return () => {
      // this.props.actions.selectMaster({masterId, serviceId});
      // this.props.history.push(`/booking/calendar/${serviceId}/${masterId}`);
    }
  }

  selectMasterNextDate = (masterId, date) => {
    const {match: {params}} = this.props;
    const serviceId = params.subServiceId;
    return () => {
      this.props.actions.selectMasterNextDate({masterId, serviceId, date});
      this.props.history.push('/booking/form');
    }
  }

  handleDateChange = (selectedDate) => {
    const {filteredMasters} = this.state;
    this.props.actions.getMastersTime(filteredMasters, selectedDate);
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

function findSubService(services, subServiceId) {
  for (let serviceIndex in services) {
    let subservice = services[serviceIndex].sub.find((sub) => sub.id === subServiceId);
    if (subservice) return subservice;
  }
}

function mapStateToProps(state) {
  return {app: state.app};
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
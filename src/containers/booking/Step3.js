import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../flux/actions';

export class Step3 extends Component {
  componentWillMount() {
    const {app: {masters, services}, actions} = this.props;
    !masters.list && !masters.loading && actions.loadMasters();
    !services.list && !services.loading && actions.loadServices();
  }

  render() {
    const {app, match: {params}} = this.props;
    const id = params.subServiceId;
    
    if (app.masters.loading) return (<div>'Loading ...'</div>);

    const masters = app.masters.list.filter((m) => m.services.indexOf(id) > -1);
    const content = masters.length ? this.renderMasters(masters) : 'No master found!';
    return (<div>
      {content}
    </div>)
  }

  selectMaster = (masterId) => {
    const {app, match: {params}} = this.props;
    const serviceId = params.subServiceId;
    return () => {
      // this.props.actions.selectMaster({masterId, serviceId});
      this.props.history.push(`/booking/calendar/${serviceId}/${masterId}`);
    }
  }

  selectMasterNextDate = (masterId) => {
    const {app, match: {params}} = this.props;
    const serviceId = params.subServiceId;
    return () => {
      this.props.actions.selectMasterNextDate({masterId, serviceId});
      this.props.history.push('/booking/form');
    }
  }

  renderMasters(list) {

    const items = list.map((master) => {
      return <li key={master.id}>
      <a onClick={this.selectMaster(master.id)}>{master.name}</a>
      <br/>
      <a onClick={this.selectMasterNextDate(master.id)}>Avaliable date: {master.nextDate || new Date().toString()}</a>
      </li>
    });
    return (<ul>
      {items}
    </ul>)
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
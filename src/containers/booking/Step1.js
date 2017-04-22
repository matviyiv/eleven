import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../flux/actions';

export class Step1 extends Component {
  componentWillMount() {
    const {app: {services} } = this.props;
    !services.list && this.props.actions.loadServices();
  }
  render() {
    const {app: {services} } = this.props;
    const content = services.loading ? 'Loading ...' : this.renderServices(services.list);
    return (<div>
      {content}
    </div>)
  }

  selectService = (serviceId) => {
    return () => {
      this.props.history.push('/booking/step2/' + serviceId);
    }
  }

  renderServices(list) {
    const items = list.map((service) => {
      return <li key={service.id} onClick={this.selectService(service.id)}>{service.name}</li>
    });
    return (<ul className="booking--service-list">
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

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
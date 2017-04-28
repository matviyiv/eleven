import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../flux/actions';

export class Step2 extends Component {
  componentWillMount() {
    const {app: {services, booking}, actions, match: {params} } = this.props;
    !services.list && actions.loadServices();
  }

  render() {
    const {app, match: {params}} = this.props;
    const id = params.serviceId;
    
    if (app.services.loading) return (<div>'Loading ...'</div>);

    const service = app.services.list.find((s) => s.id === id);
    const content = service ? this.renderSubServices(service.sub) : 'No service found!';
    return (<div>
      {content}
    </div>)
  }

  selectService = (serviceId) => {
    return () => {
      this.props.actions.selectService(serviceId);
      this.props.actions.loadMasters();
      this.props.history.push('/booking/step3/' + serviceId);
    }
  }

  renderSubServices(list) {
    const items = list.map((service) => {
      return <li key={service.id} onClick={this.selectService(service.id)}>{service.name}</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
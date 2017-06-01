import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actionCreators from '../../flux/actions';

export class Step2 extends Component {
  componentWillMount() {
    const {app: {services}, actions } = this.props;
    !services.list && !services.loading && actions.loadServices();
  }

  render() {
    const {app, match: {params}} = this.props;
    const id = params.serviceId;
    
    if (app.services.loading) return (<div>'Loading ...'</div>);

    const service = app.services.list.find((s) => s.id === id);
    const content = service ? this.renderSubServices(service.sub) : 'No service found!';
    return ( <section>
      <article role="sub-step" className="sub-step-pan">
        <header className="page-title">
          <h2>Що бажаєш?</h2>
        </header>
        {content}
      </article>
    </section>)
  }

  selectService = (serviceId, serviceName) => () => {
    const {app: {masters}, actions, history} = this.props;
    !masters.list && !masters.loading && actions.loadMasters();
    history.push('/booking/step3/' + serviceId);
  }

  renderSubServices(list) {
    const items = list.map((service) => {
      return <li key={service.id} onClick={this.selectService(service.id, service.name)}>{_.capitalize(service.name)}</li>
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
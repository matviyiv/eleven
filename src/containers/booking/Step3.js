import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../flux/actions';

export class Step3 extends Component {
  componentWillMount() {
    const {app: {masters}, actions} = this.props;
    !masters.list && !masters.loading && actions.loadMasters();
  }

  render() {
    const {app, match: {params}} = this.props;
    const id = app.booking.currentService || params.subServiceId;
    
    if (app.masters.loading) return (<div>'Loading ...'</div>);

    const masters = app.masters.list.filter((m) => m.services.indexOf(id) > -1);
    const content = masters.length ? this.renderMasters(masters) : 'No master found!';
    return (<div>
      {content}
    </div>)
  }

  selectMaster = (id) => {
    return () => {
      this.props.actions.selectMaster(id);
      this.props.history.push('/booking/form');
    }
  }

  renderMasters(list) {
    const items = list.map((service) => {
      return <li key={service.id} onClick={this.selectMaster(service.id)}>
      {service.name}
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
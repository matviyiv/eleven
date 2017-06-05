import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../flux/actions';
import FloatingButton from '../../components/FloatingButton';

export class Step1 extends Component {
  componentWillMount() {
    const {app: {services} } = this.props;
    !services.list && this.props.actions.loadServices();
  }
  render() {
    return (<div>
    <FloatingButton showBackButton history={this.props.history}/>
    <section>
      <article role="step" className="step-pan">
        <header className="page-title">
          <h2>Вибери послугу</h2>
        </header>
        <ul>
          <li onClick={this.selectService('s1')}> <i className="fa fa-scissors" aria-hidden="true"></i>
            <h6>hair style</h6>
          </li>
          <li onClick={this.selectService('s2')}> <i className="fa fa-diamond" aria-hidden="true"></i>
            <h6>make up</h6>
          </li>
          <li onClick={this.selectService('s3')}> <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
            <h6>nail art</h6>
          </li>
        </ul>
      </article>
    </section>
    </div>);
  }

  selectService = (serviceId) => {
    return () => {
      this.props.history.push('/booking/step2/' + serviceId);
    };
  }

}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
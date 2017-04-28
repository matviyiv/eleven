import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../flux/actions';

export class Finish extends Component {
  componentDidMount() {
    // this.props.history.replace({});
  }
  render() {
    return (<section>
      <article role="whywe" className="whywe-pan">
        <header className="page-title">
          <h2>Done</h2>
        </header>
        Thank you someone will contact you soon !!!!
      </article>
    </section>);
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
import React, { Component } from 'react';
import './booking.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../../flux/actions';

export class Finish extends Component {
  componentDidMount() {
    // this.props.history.replace({});
  }
  render() {
    return (<section className="container">
      <article className="booking-success">
        <header className="page-title">
          <h2>Готово</h2>
        </header>
        <div className="booking-success--message">
        {"Найблищим часом наш адміністратор зв'яжеться з вами."}
        <br/>
        <Link to="/" className="booking-success--link">На головну</Link>
        </div>
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
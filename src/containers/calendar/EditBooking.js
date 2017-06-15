import React, { Component } from 'react';
import Modal from 'react-modal';

import './calendar.css';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    const {name} = props.selectedBooking.data;
  
    this.state = {
      name: name,
    };
  }

  static defaultProps = {
    selectedBooking: {
      id: '',
      data: {
        name: '',
      }
    }
  }

  render() {
    const {isOpen, updateBooking} = this.props;
    const {name} = this.state;

    return (<div>
      <Modal
        isOpen={isOpen}
        style={modalStyles}
        contentLabel="Modal"
      >
        <h1>редагувати бронювання</h1>
        <form onSubmit={updateBooking}>
          <div className="form-group row">
          <label className="col-sm-4 control-label" htmlFor="name-input">{"Ім'я:"}</label>
          <div className="col-sm-6">
          <input
            type="text"
            autoFocus="true"
            name="name"
            id="name-input"
            ref="nameInput"
            className="form-control"
            value={name}
            placeholder="як до тебе звертатися"
            onChange={this.nameChange}
            required={true}
            />
            </div>
        </div>
        </form>
      </Modal>
    </div>)
  }

  nameChange = () => this.setState({name: event.target.value})
}

const modalStyles = {
  overlay: {
    zIndex: 100
  }
}
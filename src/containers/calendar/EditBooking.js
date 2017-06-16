import React, { Component } from 'react';
import Modal from 'react-modal';

import './calendar.css';

export default class Calendar extends Component {
  state = {
    name: '',
    phone: '',
    notes: '',
    duration: 1,
    title: ''
  }

  static defaultProps = {
    selectedBooking: {
      id: '',
      data: {
        name: '',
        phone: '',
        notes: '',
        title: ''
      }
    },
    onCloseModal: () => {}
  }

  componentWillReceiveProps(nextProps) {
    const {selectedBooking:{data, subServiceId, title}} = nextProps;
    if (this.props.selectedBooking.subServiceId != subServiceId) {
      this.setState({
        name: data.name,
        phone: data.phone,
        notes: data.notes,
        title: title,
        duration: data.selectedServices[subServiceId].duration
      });
    }
  }

  render() {
    const {isOpen, updateBooking, onDelete, onCloseModal} = this.props;
    const {name, phone, notes, duration, title} = this.state;

    return (<div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={modalStyles}
        contentLabel="Modal"
      >
        <h1>
          редагувати бронювання
          <span className="close" onClick={onCloseModal}>x</span>
        </h1>
        <form onSubmit={updateBooking} className="edit__form">
          <div>{title}</div>
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
          <div className="form-group row">
            <label className="col-sm-4 control-label" htmlFor="name-input">Мобільний номер:</label>
            <div className="col-sm-6">
            <input
              type="tel"
              name="phone"
              ref="phoneInput"
              id="phone-input"
              className="form-control"
              value={phone}
              placeholder="+38 063 11 22 333"
              onChange={this.phoneChange}
              required={true}
              />
              </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 control-label" htmlFor="phone-input">Додаткова інформація:</label>
            <div className="col-sm-6">
              <textarea
                name="notes"
                cols="40"
                rows="5"
                className="form-control"
                placeholder="мені потрібно ..."
                value={notes}
                onChange={this.notesChange}
                >
              </textarea>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 control-label" htmlFor="name-input">Тривалість</label>
            <div className="col-sm-6">
            <input
              type="text"
              name="duration"
              id="duration-input"
              ref="durationInput"
              className="form-control"
              value={duration}
              placeholder="тривалість"
              onChange={this.durationChange}
              required={true}
              />
              </div>
          </div>
          <div className="edit__controls">
            <input type="submit" value="Зберегти зміни" className="btn btn-primary"/>
            <button onClick={onCloseModal} className="btn btn-default">Закрити</button>
            <button onClick={this.onDelete} className="btn btn-danger">Видалити</button>
          </div>
        </form>
      </Modal>
    </div>)
  }

  nameChange = () => this.setState({name: event.target.value})
  phoneChange = () => this.setState({phone: event.target.value})
  notesChange = () => this.setState({notes: event.target.value})
  durationChange = () => this.setState({duration: event.target.value})
  onDelete = () => {
    this.props.onDelete(this.props.selectedBooking.id);
    this.props.onCloseModal();
  }
}

const modalStyles = {
  overlay: {
    zIndex: 100
  }
}
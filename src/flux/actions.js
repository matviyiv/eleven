import moment from 'moment';
import _ from 'lodash';

export const constants = {
  SERVICES_LOADING: 'SERVICES_LOADING',
  SERVICES_LOADED: 'SERVICES_LOADED',
  SELECT_SERVICE: 'SELECT_SERVICE',
  SERVICES_FAILED: 'SERVICES_FAILED',
  MASTERS_LOADING: 'MASTERS_LOADING',
  MASTERS_LOADED: 'MASTERS_LOADED',
  MASTERS_FAILED: 'MASTERS_FAILED',
  SELECT_MASTER_NEXT_DATE: 'SELECT_MASTER_NEXT_DATE',
  BOOKING_SUBMIT: 'BOOKING_SUBMIT',
  BOOKING_SUBMITED: 'BOOKING_SUBMITED',
  BOOKING_FAILED: 'BOOKING_FAILED',
  BOOKING_CLEAR: 'BOOKING_CLEAR',
  MASTERS_TIME_LOADING: 'MASTERS_TIME_LOADING',
  MASTERS_TIME_LOADED: 'MASTERS_TIME_LOADED',
  MASTERS_TIME_ERROR: 'MASTERS_TIME_ERROR'
};

export function loadServices() {
  return dispatch => {
    dispatch({
      type: constants.SERVICES_LOADING
    });
    window.firebase.database().ref('lviv/services').once('value')
      .then((services) => {
        console.log('services loaded', services.val());
        dispatch({
          type: constants.SERVICES_LOADED,
          data: services.val()
        });
      })
      .catch((error) => {
        console.error('action loadServices failed', error);
        dispatch({
          type: constants.SERVICES_FAILED,
          error: error
        });
      });
  };
}

export function selectService(data) {
  return {
    type: constants.SELECT_SERVICE,
    data
  }
}

export function selectMasterNextDate(data) {
  return {
    type: constants.SELECT_MASTER_NEXT_DATE,
    data
  }
}

export function loadMasters() {
  return dispatch => {
    dispatch({
      type: constants.MASTERS_LOADING
    });
    window.firebase.database()
      .ref('lviv/masters')
      .once('value')
      .then((masters) => {
        const mastersList = masters.val();
        console.log('masters loaded', mastersList);
        dispatch({
          type: constants.MASTERS_LOADED,
          data: mastersList
        });
      })
      .catch((error) => {
        console.error('action loadMasters failed', error);
        dispatch({
          type: constants.MASTERS_FAILED,
          error: error
        });
      });
  };
}

export function getMastersTime(mastersList, _date_) {
  return dispatch => {
    dispatch({
      type: constants.MASTERS_TIME_LOADING
    });
    const date = moment(_date_);
    if (mastersList) {
      return Promise.all(
        mastersList.map((master) => window.firebase.database()
          .ref(`lviv/mastersTime/${master.id}/${date.get('year')}/${date.get('month')}/${date.get('date')}`).once('value'))
      )
      .then((timeList) => timeList.map((time) => time.val()))
      .then((result) => {
        dispatch({
          type: constants.MASTERS_TIME_LOADED,
          data: {mastersList, result, date}
        });
      })
      .catch((e) => {
        dispatch({
          type: constants.MASTERS_TIME_ERROR,
          error: e
        });
      })
    }
  }
}

export function submitBooking(booking) {
  return dispatch => {
    dispatch({
      type: constants.BOOKING_SUBMIT,
      data: {booking}
    });
    const mastersData = getMasterTime(booking.selectedServices);
    debugger;
    window.firebase.database().ref('lviv/mastersTime')
      .set(mastersData)
    // window.firebase.database().ref('lviv/bookings')
      // .push(booking)
      .then(() => {
        console.log('submitBooking done');
        dispatch({
          type: constants.BOOKING_SUBMITED
        });
      })
      .catch((error) => {
        console.error('action submitBooking failed', error);
        dispatch({
          type: constants.BOOKING_FAILED,
          error: error
        });
      });
  }
}

export function clearBooking() {
  return {
    type: constants.BOOKING_CLEAR,
  }
}

function getMasterTime(bookings) {
  return _.reduce(bookings, (result, booking) => {
    let date = moment(booking.dateStart);
    _.setWith(result, `${booking.masterId}.${date.get('year')}.${date.get('month')}.${date.get('date')}.${date.get('hour')}.${date.get('minute')}`, {name: booking.name, duration: booking.duration}, Object);
    return result;
  }, {});
}

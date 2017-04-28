export const constants = {
  SERVICES_LOADING: 'SERVICES_LOADING',
  SERVICES_LOADED: 'SERVICES_LOADED',
  SELECT_SERVICE: 'SELECT_SERVICE',
  SERVICES_FAILED: 'SERVICES_FAILED',
  MASTERS_LOADING: 'MASTERS_LOADING',
  MASTERS_LOADED: 'MASTERS_LOADED',
  MASTERS_FAILED: 'MASTERS_FAILED',
  SELECT_MASTER: 'SELECT_MASTER',
  BOOKING_SUBMIT: 'BOOKING_SUBMIT',
  BOOKING_SUBMITED: 'BOOKING_SUBMITED',
  BOOKING_FAILED: 'BOOKING_FAILED',
  BOOKING_CLEAR: 'BOOKING_CLEAR',
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

export function selectService(serviceId) {
  return {
    type: constants.SELECT_SERVICE,
    data: {serviceId}
  }
}

export function selectMaster(masterId) {
  return {
    type: constants.SELECT_MASTER,
    data: {masterId}
  }
}

export function loadMasters() {
  return dispatch => {
    dispatch({
      type: constants.MASTERS_LOADING
    });
    window.firebase.database().ref('lviv/masters').once('value')
      .then((masters) => {
        console.log('masters loaded', masters.val());
        dispatch({
          type: constants.MASTERS_LOADED,
          data: masters.val()
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

export function submitBooking(booking) {
  return dispatch => {
    dispatch({
      type: constants.BOOKING_SUBMIT,
      data: {booking}
    });
    window.firebase.database().ref('lviv/bookings')
      .push(booking)
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

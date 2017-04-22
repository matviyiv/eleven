export const constants = {
  SERVICES_LOADING: 'SERVICES_LOADING',
  SERVICES_LOADED: 'SERVICES_LOADED',
  SELECT_SERVICE: 'SELECT_SERVICE',
  MASTERS_LOADING: 'MASTERS_LOADING',
  MASTERS_LOADED: 'MASTERS_LOADED',
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
      });
  };
}

export function selectService(serviceId) {
  return {
    type: constants.SELECT_SERVICE,
    data: {serviceId}
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
      });
  };
}

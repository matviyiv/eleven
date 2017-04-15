const SERVICES_LOADING = 'SERVICES_LOADING',
  SERVICES_LOADED = 'SERVICES_LOADED';

export function loadServices() {
  return dispatch => {
    dispatch({
      type: SERVICES_LOADING
    });
    window.firebase.database().ref('lviv/services').once('value')
      .then((services) => {
        console.log('services loaded', services.val());
        dispatch({
          type: SERVICES_LOADED,
          data: services.val()
        });
      });
  };
}

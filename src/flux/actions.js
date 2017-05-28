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
  SAVE_BOOKING_USER: 'SAVE_BOOKING_USER',
  BOOKING_DELETED: 'BOOKING_DELETED',
  BOOKING_DELETED_FAILED: 'BOOKING_DELETED_FAILED',

  MASTERS_TIME_LOADING: 'MASTERS_TIME_LOADING',
  MASTERS_TIME_LOADED: 'MASTERS_TIME_LOADED',
  MASTERS_TIME_ERROR: 'MASTERS_TIME_ERROR',
  
  ALL_EVENTS_LOADING: 'ALL_EVENTS_LOADING',
  ALL_EVENTS_LOADED: 'ALL_EVENTS_LOADED',
  ALL_EVENTS_FAILED: 'ALL_EVENTS_FAILED',
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

var data = {
      "-Kl7glERlFhN-Jmm4INs" : {
        "name" : "sdd",
        "notes" : "dsds",
        "phone" : "dssd",
        "selectedServices" : {
          "s3_3+1496125800000" : {
            "dateEnd" : "Tue May 30 2017 13:30:00 GMT+0400 (+04)",
            "dateStart" : "Tue May 30 2017 10:30:00 GMT+0400 (+04)",
            "duration" : 3,
            "masterId" : "e4",
            "name" : "service 33"
          }
        },
        "timestamp" : 1495868314738
      },
      "-Kl7gsSXlq98fXh-hROE" : {
        "name" : "sdd",
        "notes" : "dsds",
        "phone" : "dssd",
        "selectedServices" : {
          "s2_2+1495974600000" : {
            "dateEnd" : "Sun May 28 2017 18:30:00 GMT+0400 (+04)",
            "dateStart" : "Sun May 28 2017 16:30:00 GMT+0400 (+04)",
            "duration" : 2,
            "masterId" : "e4",
            "name" : "service 22"
          },
          "s3_3+1496125800000" : {
            "dateEnd" : "Tue May 30 2017 13:30:00 GMT+0400 (+04)",
            "dateStart" : "Tue May 30 2017 10:30:00 GMT+0400 (+04)",
            "duration" : 3,
            "masterId" : "e4",
            "name" : "service 33"
          }
        },
        "timestamp" : 1495868344315
      },
      "-Kl7kwuZ5rlnJcc2jM-u" : {
        "name" : "11",
        "notes" : "11221",
        "phone" : "1111",
        "selectedServices" : {
          "s3_3+1495872000787" : {
            "dateEnd" : "Sat May 27 2017 15:00:00 GMT+0400 (+04)",
            "dateStart" : "Sat May 27 2017 12:00:00 GMT+0400 (+04)",
            "duration" : 3,
            "masterId" : "e3",
            "name" : "service 33"
          }
        },
        "timestamp" : 1495869411150
      },
      "-Kl7lc0DMVjgI8EMsEjm" : {
        "name" : "2222",
        "notes" : "22222",
        "phone" : "2222",
        "selectedServices" : {
          "s3_3+1495872000396" : {
            "dateEnd" : "Sat May 27 2017 15:00:00 GMT+0400 (+04)",
            "dateStart" : "Sat May 27 2017 12:00:00 GMT+0400 (+04)",
            "duration" : 3,
            "masterId" : "e1",
            "name" : "service 33"
          }
        },
        "timestamp" : 1495869587650
      }
    };

var masters = {
      "e1" : {
        "id" : "e1",
        "name" : "employee 1",
        "services" : [ "s2_3", "s3_3" ],
        "work" : [ "odd" ]
      },
      "e2" : {
        "id" : "e2",
        "name" : "employee 2",
        "services" : [ "s1_3" ],
        "work" : [ "even" ]
      },
      "e3" : {
        "id" : "e3",
        "name" : "employee 3",
        "services" : [ "s2_3", "s3_3" ],
        "work" : [ "odd" ]
      },
      "e4" : {
        "id" : "e4",
        "name" : "employee 4",
        "services" : [ "s2_2", "s3_3" ],
        "work" : [ "even" ]
      },
      "e5" : {
        "id" : "e5",
        "name" : "employee 5",
        "services" : [ "s1_3", "s3_2" ],
        "work" : [ "odd" ]
      }
    }

    var services = [ {
      "id" : "s1",
      "name" : "service 1",
      "sub" : [ {
        "duration" : 2,
        "id" : "s1_1",
        "name" : "service 11"
      }, {
        "duration" : 1,
        "id" : "s1_2",
        "name" : "service 12"
      }, {
        "duration" : 3,
        "id" : "s1_3",
        "name" : "service 13"
      } ]
    }, {
      "id" : "s2",
      "name" : "service 2",
      "sub" : [ {
        "duration" : 4,
        "id" : "s2_1",
        "name" : "service 21"
      }, {
        "duration" : 2,
        "id" : "s2_2",
        "name" : "service 22"
      }, {
        "duration" : 3,
        "id" : "s2_3",
        "name" : "service 23"
      } ]
    }, {
      "id" : "s3",
      "name" : "serice 3",
      "sub" : [ {
        "duration" : 5,
        "id" : "s3_1",
        "name" : "service 31"
      }, {
        "duration" : 2,
        "id" : "s3_2",
        "name" : "service 32"
      }, {
        "duration" : 3,
        "id" : "s3_3",
        "name" : "service 33"
      } ]
    } ];

export function getAllEvents() {
  return dispatch => {
    const date = moment().subtract(1, 'month');
    dispatch({
          type: constants.MASTERS_LOADED,
          data: masters
        });
    dispatch({
          type: constants.ALL_EVENTS_LOADED,
          data: data
        });
    dispatch({
          type: constants.SERVICES_LOADED,
          data: services
        });
    return;
    dispatch({
      type: constants.ALL_EVENTS_LOADING
    });
    return;
    Promise.all([
      loadMastersRequest(),
      loadBookingsRequest(date),
    ])
      .then(([masters, services, bookings]) => {
        dispatch({
          type: constants.MASTERS_LOADED,
          data: masters.val()
        });
        dispatch({
          type: constants.ALL_EVENTS_LOADED,
          data: bookings.val()
        });
      })
      .catch((error) => {
        console.error('action getAllEvents failed', error);
        dispatch({
          type: constants.ALL_EVENTS_FAILED,
          error: error
        });
      });
  };
}

function loadMastersRequest() {
  return window.firebase.database()
    .ref('lviv/masters')
    .once('value');
}

function loadBookingsRequest(date) {
  return window.firebase.database()
    .ref('lviv/bookings')
    .orderByChild('timestamp')
    .startAt(date.toDate().getTime())
    .once('value');
}

export function submitBooking(booking) {
  return dispatch => {
    booking.timestamp = moment().toDate().getTime();
    dispatch({
      type: constants.BOOKING_SUBMIT,
      data: {booking}
    });
    const mastersData = getMasterTime(booking.selectedServices);
    Promise.all([
      window.firebase.database().ref('lviv/mastersTime')
        .update(mastersData),
      window.firebase.database().ref('lviv/bookings')
        .push(booking)
    ])
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

export function saveBookingUser(data) {
  return {
    type: constants.SAVE_BOOKING_USER,
    data
  }
}

export function clearBooking() {
  return {
    type: constants.BOOKING_CLEAR,
  }
}

export function deleteBoking(bookingId) {
  return dispatch => {
    dispatch({
        type: constants.BOOKING_DELETED,
        data: {bookingId}
      });
    return;
  
    window.firebase.database()
    .ref('lviv/bookings/' + bookingId)
    .delete()
    .then(() => {
      dispatch({
        type: constants.BOOKING_DELETED,
        data: {bookingId}
      });
    })
    .catch((error) => {
      dispatch({
        type: constants.BOOKING_DELETED_FAILED,
        data: {error}
      });
    })
    
  }
}

function getMasterTime(bookings) {
  return _.reduce(bookings, (result, booking) => {
    let date = moment(booking.dateStart);
    result[`${booking.masterId}/${date.get('year')}/${date.get('month')}/${date.get('date')}/${date.get('hour')}/${date.get('minute')}`] = {name: booking.name, duration: booking.duration};
    return result;
  }, {});
}

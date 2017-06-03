import {constants} from './actions';
import moment from 'moment';
import _ from 'lodash';

const initialState = {
  services: {},
  masters: {},
  booking: {
    selectedServices: {}
  },
  allEvents: {
    list: [],
    loading: false,
  },
  auth: {
    status: '',
    loading: false,
    email: '',
  },
  appState: {
    showBackButton: false,
  }
};
const {
  SERVICES_LOADING,
  SERVICES_LOADED,
  SELECT_SERVICE,
  MASTERS_LOADED,
  SELECT_MASTER_NEXT_DATE,
  MASTERS_TIME_LOADED,
  SAVE_BOOKING_USER,
  ALL_EVENTS_LOADED,
  ALL_EVENTS_LOADING,
  BOOKING_DELETED,
  AUTH_LOADING,
  AUTH_DONE,
  LOGOUT,

  SERVICES_FAILED,
  BOOKING_FAILED,
  BOOKING_DELETED_FAILED,
  MASTERS_TIME_ERROR,
  ALL_EVENTS_FAILED,
  AUTH_FAILED,

  APP_STATE_CHANGE,
} = constants;

export function appReducer(state = initialState, action) {
  const actions = {
    SERVICES_LOADING: (st) => {
      st.services.loading = true;
      return { ...st };
    },
    SERVICES_LOADED: (st, data) => {
      st.services.loading = false;
      st.services.list = data;
      return { ...st };
    },
    MASTERS_LOADING: (st) => {
      st.masters.loading = true;
      return {...st};
    },
    MASTERS_LOADED: (st, data) => {
      st.masters.loading = false;
      st.masters.list = data;
      return { ...st };
    },
    SELECT_MASTER_NEXT_DATE: (st, {serviceId, masterId, date}) => {
      const service = findSubService(st.services.list, serviceId);
      const master = st.masters.list[masterId];
      const dateEnd = moment(date).add(service.duration, 'hours');
      const selectedService = {
        masterId: masterId,
        dateStart: date.toDate().toString(),
        dateEnd: dateEnd.toDate().toString(),
        name: service.name,
        duration: service.duration,
      };

      st.booking.selectedServices[serviceId + '+' + date.valueOf()] = selectedService;

      return { ...st };
    },
    MASTERS_TIME_LOADED: (st, {mastersList, result, date}) => {
      const time = moment(date).format('YYYY/M/D');
      mastersList.forEach((master, index) => {
        _.setWith(st.masters.list[master.id], `booked.${time}`, result[index], Object);
      })
      return { ...st };
    },
    BOOKING_SUBMITED: (st) => {
      st.booking = initialState.booking;
      return {...st}
    },
    SAVE_BOOKING_USER: (st, {name, phone, notes}) => {
      st.booking.name = name;
      st.booking.phone = phone;
      st.booking.notes = notes;
      st.booking.status = 'active';
      return {...st}
    },
    BOOKING_CLEAR: (st) => {
      st.booking.selectedServices = initialState.booking.selectedServices;
      return {...st}
    },
    ALL_EVENTS_LOADING: (st) => {
      st.allEvents.loading = true;
      return {...st};
    },
    ALL_EVENTS_LOADED: (st, bookings) => {
      let eventsList = st.allEvents.list;
      _.forEach(bookings, (booking, bookingId) => {
        if (booking.status == 'deleted') return;
        eventsList = eventsList.concat(_.map(booking.selectedServices, (service) => ({
            title: `Сервіс: ${service.name} майстер: ${st.masters.list[service.masterId].name} name:${booking.name} ${booking.phone}`,
            start: new Date(service.dateStart),
            end: new Date(service.dateEnd),
            desc: `${booking.name} ${booking.phone}`,
            masterId: service.masterId,
            bookingId
          })));
      });
      st.allEvents.loading = false;
      st.allEvents.list = eventsList;
      return {...st};
    },
    BOOKING_DELETED: (st, {bookingId}) => {
      let index = _.findIndex(st.allEvents.list, {bookingId});
      delete st.allEvents.list[index];
      return {...st};
    },
    AUTH_LOADING: (st) => {
      st.auth.loading = true;
      return {...st};
    },
    AUTH_DONE: (st, {email}) => {
      st.auth.email = email;
      st.auth.status = 'success';
      st.auth.loading = false;
      return {...st};
    },
    LOGOUT: (st) => {
      st.auth.email = '';
      st.auth.status = '';
      return {...st};
    },
    APP_STATE_CHANGE: (st, {stateName}) => {
      st.appState.showBackButton = initialState.appState.showBackButton;
      if (stateName === 'booking') {
        st.appState.showBackButton = true;
      }
      return {...st};
    },
    default: (st) => st
  },
  modifier = actions[action.type] || actions.default;
  if ([
      SERVICES_FAILED,
      BOOKING_FAILED,
      BOOKING_DELETED_FAILED,
      MASTERS_TIME_ERROR,
      ALL_EVENTS_FAILED,
      AUTH_FAILED,
    ].indexOf(action.type) > -1) console.error(action.error || action.data.error)
  const newState = modifier(state, action.data);
  console.log('----', action.type, newState);
  return newState;
}

function findSubService(services, subServiceId) {
  for (let serviceIndex in services) {
    let subservice = services[serviceIndex].sub.find((sub) => sub.id === subServiceId);
    if (subservice) return subservice;
  }
}
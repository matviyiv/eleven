import {constants} from './actions';
import moment from 'moment';
import _ from 'lodash';

const initialState = {
  services: {},
  masters: {},
  booking: {
    selectedServices: {}
  },
};
const {
  SERVICES_LOADING,
  SERVICES_LOADED,
  SELECT_SERVICE,
  MASTERS_LOADED,
  SELECT_MASTER_NEXT_DATE,
  MASTERS_TIME_LOADED,
  SAVE_BOOKING_USER,
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
      return {...st}
    },
    BOOKING_CLEAR: (st) => {
      st.booking = initialState.booking;
      return {...st}
    },
    default: (st) => st
  },
  modifier = actions[action.type] || actions.default;
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
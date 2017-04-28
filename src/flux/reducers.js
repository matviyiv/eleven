import {constants} from './actions';

const initialState = {
  services: {},
  masters: {},
  booking: {
    selectedServices: [],
    selectedMasters: [],
  },
};
const {
  SERVICES_LOADING,
  SERVICES_LOADED,
  SELECT_SERVICE,
  MASTERS_LOADED,
  SELECT_MASTER,
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
    SELECT_SERVICE: (st, data) => {
      st.booking.selectedServices.push(data.serviceId);
      st.booking.currentService = data.serviceId;
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
    SELECT_MASTER: (st, data) => {
      st.booking.selectedMasters.push(data.masterId);
      return { ...st };
    },
    BOOKING_SUBMIT: (st, data) => {
      st.booking = {
        ...st.booking,
        ...data.booking
      }
      return {...st};
    },
    BOOKING_CLEAR: (st) => {
      st.booking = {};
      return {...st}
    },
    default: (st) => st
  },
  modifier = actions[action.type] || actions.default;

  return modifier(state, action.data);
}
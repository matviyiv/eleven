import {constants} from './actions';

const initialState = {
  services: {},
  booking: {
    services: []
  },
  masters: {},
}
const {
  SERVICES_LOADING,
  SERVICES_LOADED,
  SELECT_SERVICE,
  MASTERS_LOADED,
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
      st.booking.services.push(data.serviceId);
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
    default: (st) => st
  },
  modifier = actions[action.type] || actions.default;

  return modifier(state, action.data);
}
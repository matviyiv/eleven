import {constants} from './actions';

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
      st.booking.selectedServices[data.serviceId] = {
        name: data.serviceName
      };
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
      const master = st.masters.list.find((m) => m.id == masterId);
      const dateStart = master.nextDate || new Date();
      const dateEnd = getDateEnd(dateStart, service.duration);
      const selectedService = st.booking.selectedServices[serviceId] || {};

      selectedService.masterId = masterId;
      selectedService.dateStart = dateStart;
      selectedService.dateEnd = dateEnd;
      selectedService.name = service.name;

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


function getDateEnd(startDate, serviceDuration) {
  const dateEnd = new Date(startDate);
  return new Date(dateEnd.setHours(startDate.getHours() + serviceDuration))
}

function findSubService(services, subServiceId) {
  for (let serviceIndex in services) {
    let subservice = services[serviceIndex].sub.find((sub) => sub.id === subServiceId);
    if (subservice) return subservice;
  }
}
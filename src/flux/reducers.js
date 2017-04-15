const initialState = {
  services: {}
}

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
    default: (st) => st
  },
  modifier = actions[action.type] || actions.default;

  return modifier(state, action.data);
}
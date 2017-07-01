import {constants} from './actions';
import ua from '../localization/ua.json';

const {
  LOCALIZATION_LOADED,
  SET_LAGUAGE,
  } = constants;
const initialState = {
  currentLocale: 'ua',
  ua
};
export function localization(state = initialState, action) {
  const actions = {
    [LOCALIZATION_LOADED]: (st, {localization, locale}) => {
      st[locale] = localization;
      st.currentLocale = locale;
      return { ...st };
    },
    [SET_LAGUAGE]: (st, {locale}) => {
      st.currentLocale = locale;
      return { ...st };
    },
    default: (st) => st
  },
  modifier = actions[action.type] || actions.default;
  return modifier(state, action.data);
}
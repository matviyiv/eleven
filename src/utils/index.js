import _ from 'lodash';

/**
 * classes({
 *   active: true,
 *   hidden: false,
 *   visible: true
 * }) => 'active visible'
 * @param  {Object} classObject Map of css classes with boolean value
 * @return {String}             String of passed css classes.
 */
export function classes(classObject) {
  return _.keys(_.pickBy(classObject, _.identity)).join(' ');
}
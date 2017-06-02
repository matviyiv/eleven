import _ from 'lodash';

exports.classes = classes;

/**
 * classes({
 *   active: true,
 *   hidden: false,
 *   visible: true
 * }) => 'active visible'
 * @param  {Object} classObject Map of css classes with boolean value
 * @return {String}             String of passed css classes.
 */
function classes(classObject) {
  return _.keys(_.pickBy(classObject, _.identity)).join(' ');
}
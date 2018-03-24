import moment from 'moment';
import _ from 'lodash';

const weekdays = moment.weekdays();

export function getAvaliableTime({master, selectedDate, duration}) {
  const timeList = [];
  const isToday = moment().get('date') === selectedDate.get('date');
  const startingWorkHours = (isToday && moment().get('hours') > 10) ? moment().get('hours') + 1 : 10;
  const startWorkHours = selectedDate.hours(startingWorkHours).minutes(0).seconds(0);
  const endWorkHours = selectedDate.day() === 0 ? 16 : 20;// if sunday make shorter day

  if (!isWorking(selectedDate, master.work)) {return timeList;}

  let bookedTime;
  for (let time = startWorkHours; time < moment(startWorkHours).hours(endWorkHours); time.add(30, 'minutes')) {
    //filter booked time
    bookedTime = _.get(master.booked, `${moment(time).format('YYYY/M/D')}.${time.get('hour')}.${time.get('minute')}`, bookedTime);
    if (bookedTime) {
      time.add(bookedTime.duration - 0.5, 'hours'); // minus step 30 min
      bookedTime = null;
      continue;
    }
    timeList.push(moment(time));
  }

  // filter by duration
  return timeList.filter((time, index) => {
    return moment(time).add(duration, 'hours').get('hours') <= 20
      && (timeList[index + (duration / 0.5)] ?
        timeList[index + (duration / 0.5)].get('hours') === moment(time).add(duration, 'hours').get('hours')
        :
        ['20:00', '16:00'].indexOf(moment(time).add(duration, 'hours').format('HH:mm')) > -1);
  });
}

export function isEven(n) {
  return n === parseFloat(n)? !(n%2) : void 0;
}

export function isWorking(selectedDate, workList) {
  const date = selectedDate.date();
  const dayOfTheWeek = weekdays[selectedDate.day()];
  const dateType = isEven(date) ? 'even' : 'odd';
  return workList.indexOf(dateType) > -1 || workList.indexOf(dayOfTheWeek) > -1;
}
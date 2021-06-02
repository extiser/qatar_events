import moment from 'moment'

const DATE_FORMAT = 'D MMMM YYYY';
const TIME_FORMAT = 'HH:mmA';

export default function makeDateString(start, end) {
    const startDay = moment(start).format(DATE_FORMAT);
    const startTime = moment(start).format(TIME_FORMAT);

    const endDay = moment(end).format(DATE_FORMAT);
    const endTime = moment(end).format(TIME_FORMAT);

    let str = '';

    if (startDay === endDay) {
        str = `${startDay}, ${startTime} - ${endTime}`
    } else {
        str = `${startDay}, ${startTime} - ${endDay}, ${endTime}`
    }

    return str;
}
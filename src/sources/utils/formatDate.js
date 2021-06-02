import moment from 'moment'

export default function formatDate(date, format) {
    if (moment(date).isValid()) return moment(date).format(format);

    return date;
}
import _ from 'lodash'

export default function makePriceString(array) {
    if (!Array.isArray(array)) return;

    if (!array.length) {
        array = [{
            ticketType: "-",
            priceValue: "N/A"
        }]
    }


    const min = _.minBy(array, (obj) => obj.priceValue);
    const max = _.maxBy(array, (obj) => obj.priceValue);

    const renderString = (obj) => {
        if (isNaN(obj.priceValue)) return obj.priceValue;

        if ((obj.priceValue > 0) && obj.priceValue !== '') {
            return `${obj.priceValue} QR`
        } else if (obj.priceValue === '0') {
            return 'Free'
        } else if (obj.priceValue === '') {
            return 'N/A'
        }
    };

    return {
        min: renderString(min),
        max: renderString(max),
    };
}
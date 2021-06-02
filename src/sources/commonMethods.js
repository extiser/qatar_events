export const getInitialValues = (fields, values) => {
    let obj = {};

    fields.forEach(field => {
        if (values[field]) {
            obj[field] = values[field]
        }
    });

    return obj;
};

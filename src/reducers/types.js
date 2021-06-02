import { GET_TYPES } from "../sources/constants/actionTypes";

export default function types(state = [], action = {}) {
    switch (action.type) {
        case GET_TYPES:
            const types = action.data.data;
            const colors = {};
            const names = {};

            types && types.forEach(type => {
                colors[type.handle] = type.color;
                names[type.handle] = type.name;
            });

            return {
                data: types,
                colors,
                names
            };
        default:
            return state
    }
}
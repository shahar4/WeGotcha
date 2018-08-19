import { UPDATE_TA_OH_MANAGE_CHOICE } from '../actions/types';

let initialState = {
    dateTime: new Date()
};

export default function (state = initialState, action) {
    switch (action.type) {

        case UPDATE_TA_OH_MANAGE_CHOICE:
            return action.payload;

        default:
            return state;
    }
}
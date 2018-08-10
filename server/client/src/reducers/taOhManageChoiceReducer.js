import { UPDATE_TA_OH_MANAGE_CHOICE } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {

        case UPDATE_TA_OH_MANAGE_CHOICE:
            return action.payload;

        default:
            return state;
    }
}
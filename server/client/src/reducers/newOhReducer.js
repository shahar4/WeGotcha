
import { UPDATE_TA_DATE_TIME_FOR_NEW_OH } from '../actions/types';

let initialState = {
    dateTime: new Date()
};

export default function (state = initialState, action) {
    switch (action.type) {

        case UPDATE_TA_DATE_TIME_FOR_NEW_OH: {
            console.log("action.payload: ", action.payload);
            return { dateTime: action.payload };
        }
    
        default:
            return state;
    }
}
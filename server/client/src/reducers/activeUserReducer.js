import { FETCH_USER, REMOVE_STUDENT_FROM_QUEUE, CREATE_NEW_OH, SUBMIT_EDITED_OH } from "../actions/types";

let initialState = {
    googleId: '',
    name: {
        familyName: '',
        givenName: '',
    },
    __V: '',
    _id: '',
    officeHoursCreated: {
        oh_id: '',
        _id: '',
    },
};

export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_USER: {
            return action.payload || false;
        }
        case REMOVE_STUDENT_FROM_QUEUE: {
            return { 
                googleId: state.googleId,
                name: state.name,
                __V: state.__v,
                _id: state._id
            };
        }
        case CREATE_NEW_OH : {
            return {
                googleId: state.googleId,
                name: state.name,
                __V: state.__v,
                _id: state._id,
                officeHoursCreated: action.payload.newOfficeHours
            };
        }
        case SUBMIT_EDITED_OH: {
            return {
                googleId: state.googleId,
                name: state.name,
                __V: state.__v,
                _id: state._id,
                officeHoursCreated: action.payload.newOfficeHours
            };
        }
        default: {
            return state;
        }
    }
}
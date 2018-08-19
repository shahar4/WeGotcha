import { FETCH_USER, REMOVE_STUDENT_FROM_QUEUE } from "../actions/types";

export default function(state = null, action) {
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

    //////TODO:ADD REDUCER FOR JOIN QUEUETODO:

        default:
            return state;
    }
}

    // officeHoursJoined.array_location
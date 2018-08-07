import { HANDLE_STUDENT_ACTION } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {

    case HANDLE_STUDENT_ACTION:
        return action.payload;

    default:
        return state;
    }
}
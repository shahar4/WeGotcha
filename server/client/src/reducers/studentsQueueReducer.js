import { CHANGE_DISPLAY_IN_STUDENTS_QUEUE } from '../actions/types';

let initialState = {
    displayAnsweredStudentsInQueue: true
};
export default function (state = initialState, action) {
    switch (action.type) {

    case CHANGE_DISPLAY_IN_STUDENTS_QUEUE:
        return {
            displayAnsweredStudentsInQueue: !state.displayAnsweredStudentsInQueue
        };

    default:
        return state;
    }
}
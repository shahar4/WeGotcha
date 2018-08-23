import { CHANGE_DISPLAY_IN_TA_QUEUE } from '../actions/types';

let initialState = {
    queue: {
        displayAnsweredStudentsInQueue: false,
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_DISPLAY_IN_TA_QUEUE: {
            return {
                queue: {
                    displayAnsweredStudentsInQueue: !state.queue.displayAnsweredStudentsInQueue,
                },
            };
        }
        default: {
            return state;
        }
    }
}
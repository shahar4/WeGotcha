import { CHANGE_DISPLAY_IN_STUDENTS_QUEUE, UPDATE_STUDENT_GOAL, FETCH_STUDENT_OH_JOINED, UPDATE_STUDENT_CHOICE_OF_OH, REMOVE_STUDENT_FROM_QUEUE } from '../actions/types';
import { SEE_QUEUE } from '../constants';

/*
 *                                D A T A     M O D E L
 *  
 *      ohJoined: String -------------------------------- (any OH name)
 *      goal: { value: String, label: String } ---------- ('viewOnly' / 'joinQueue' / 'queueJoined')
 *      displayAnsweredStudentsInQueue: boolean --------- (T/F)
 *      ohNotSelectedYet: { chosenOh: String } ---------- (any OH name)
 *      
 */
let initialState = {
    goal: { value: SEE_QUEUE, label: SEE_QUEUE },
    displayAnsweredStudentsInQueue: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

    case FETCH_STUDENT_OH_JOINED: {
        if(action.payload.course_name) {
            return {
                ohJoined: action.payload,
                goal: action.payload ? 'queueJoined' : state.goal,
                displayAnsweredStudentsInQueue: state.displayAnsweredStudentsInQueue,
            };
        } else {
            return { ...state };
        }
    }

    case UPDATE_STUDENT_GOAL: {
        return {
            ohJoined: state.ohJoined,
            goal: action.payload,
            displayAnsweredStudentsInQueue: state.displayAnsweredStudentsInQueue,
            ohNotSelectedYet: state.ohNotSelectedYet,
        };
    }

    case CHANGE_DISPLAY_IN_STUDENTS_QUEUE: {
        return {
            ohJoined: state.ohJoined,
            goal: state.ohJoined ? 'queueJoined' : state.goal,
            displayAnsweredStudentsInQueue: !state.displayAnsweredStudentsInQueue,
            ohNotSelectedYet: state.ohNotSelectedYet,
        };
    }

    case UPDATE_STUDENT_CHOICE_OF_OH: {
        return {
            ohJoined: state.ohJoined,
            goal: state.ohJoined ? 'queueJoined' : state.goal,
            displayAnsweredStudentsInQueue: state.displayAnsweredStudentsInQueue,
            ohNotSelectedYet: {
                chosenOh: action.payload
            }
        }
    }

    case REMOVE_STUDENT_FROM_QUEUE: {
        return { ...initialState };
    }

    default:
        return state;
    }
}

import { UPDATE_NEW_OH_COURSE_NAME, UPDATE_NEW_OH_LOCATION, UPDATE_NEW_OH_NOTES, UPDATE_NEW_OH_DATE, UPDATE_NEW_OH_START_TIME, UPDATE_NEW_OH_END_TIME } from '../actions/types';
import { TODAY_DATE, TODAY_START_TIME, TODAY_END_TIME } from '../constants';

let initialState = {
    course_name: '',
    date: TODAY_DATE,
    start_time: TODAY_START_TIME,
    end_time: TODAY_END_TIME,
    location: '',
    notes: '',
};

export default function (state = initialState, action) {
    switch (action.type) {

        case UPDATE_NEW_OH_COURSE_NAME: {
            return {
                course_name: action.payload,
                date: state.date,
                start_time: state.start_time,
                end_time: state.end_time,
                location: state.location,
                notes: state.notes,
            };
        }

        case UPDATE_NEW_OH_DATE: {
            return {
                course_name: state.course_name,
                date: action.payload,
                start_time: state.start_time,
                end_time: state.end_time,
                location: state.location,
                notes: state.notes,
            };
        }

        case UPDATE_NEW_OH_START_TIME: {
            return {
                course_name: state.course_name,
                date: state.date,
                start_time: action.payload,
                end_time: state.end_time,
                location: state.location,
                notes: state.notes,
            };
        }

        case UPDATE_NEW_OH_END_TIME: {
            return {
                course_name: state.course_name,
                date: state.date,
                start_time: state.start_time,
                end_time: action.payload,
                location: state.location,
                notes: state.notes,
            };
        }

        case UPDATE_NEW_OH_LOCATION: {
            return {
                course_name: state.course_name,
                date: state.date,
                start_time: state.start_time,
                end_time: state.end_time,
                location: action.payload,
                notes: state.notes,
            };
        }

        case UPDATE_NEW_OH_NOTES: {
            return {
                course_name: state.course_name,
                date: state.date,
                start_time: state.start_time,
                end_time: state.end_time,
                location: state.location,
                notes: action.payload,
            };
        }

        default:
            return state;
    }
}
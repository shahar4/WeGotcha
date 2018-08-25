import * as actionType from '../actions/types';
import { SEE_OTHER_QUEUES } from '../constants';
import { TODAY_DATE, TODAY_START_TIME, TODAY_END_TIME } from '../constants';

let initialState = {
    queue: {
        ManageOhChoice: {},
        displayAnsweredStudentsInQueue: false,
    },
    scheduledOfficeHours: [],
    ohFormValues: {
        course_name: '',
        date: TODAY_DATE,
        start_time: TODAY_START_TIME,
        end_time: TODAY_END_TIME,
        location: '',
        notes: '',
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionType.UPDATE_TA_OH_MANAGE_CHOICE:{
            return {
                queue: {
                    ManageOhChoice: action.payload,
                    ...state.displayAnsweredStudentsInQueue,
                },
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues: state.ohFormValues,
            };
        }
        case actionType.CHANGE_DISPLAY_IN_TA_QUEUE: {
            return {
                queue: {
                    ...state.queue,
                    displayAnsweredStudentsInQueue: !state.queue.displayAnsweredStudentsInQueue,
                },
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues: state.ohFormValues,
            };
        }
        case actionType.UPDATE_TA_SCHEDULED_OH_LIST_SELECTORS: {
            return {
                queue: state.queue,
                scheduledOfficeHours: action.payload,
                ohFormValues: state.ohFormValues,
            };
        }
        case actionType.UPDATE_NEW_OH_COURSE_NAME: {
            return {
                queue: state.queue,
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues : {
                    course_name: action.payload,
                    date: state.ohFormValues.date,
                    start_time: state.ohFormValues.start_time,
                    end_time: state.ohFormValues.end_time,
                    location: state.ohFormValues.location,
                    notes: state.ohFormValues.notes,
                    _id: state.ohFormValues._id,
                },
            };
        }

        case actionType.UPDATE_NEW_OH_DATE: {
            return {
                queue: state.queue,
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues : {
                    course_name: state.ohFormValues.course_name,
                    date: action.payload,
                    start_time: state.ohFormValues.start_time,
                    end_time: state.ohFormValues.end_time,
                    location: state.ohFormValues.location,
                    notes: state.ohFormValues.notes,
                    _id: state.ohFormValues._id,
                },
            };
        }

        case actionType.UPDATE_NEW_OH_START_TIME: {
            return {
                queue: state.queue,
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues : {
                    course_name: state.ohFormValues.course_name,
                    date: state.ohFormValues.date,
                    start_time: action.payload,
                    end_time: state.ohFormValues.end_time,
                    location: state.ohFormValues.location,
                    notes: state.ohFormValues.notes,
                    _id: state.ohFormValues._id,
                },
            };
        }

        case actionType.UPDATE_NEW_OH_END_TIME: {
            return {
                queue: state.queue,
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues : {
                    course_name: state.ohFormValues.course_name,
                    date: state.ohFormValues.date,
                    start_time: state.ohFormValues.start_time,
                    end_time: action.payload,
                    location: state.ohFormValues.location,
                    notes: state.ohFormValues.notes,
                    _id: state.ohFormValues._id,
                },
            };
        }

        case actionType.UPDATE_NEW_OH_LOCATION: {
            return {
                queue: state.queue,
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues : {
                    course_name: state.ohFormValues.course_name,
                    date: state.ohFormValues.date,
                    start_time: state.ohFormValues.start_time,
                    end_time: state.ohFormValues.end_time,
                    location: action.payload,
                    notes: state.ohFormValues.notes,
                    _id: state.ohFormValues._id,
                },
            };
        }

        case actionType.UPDATE_NEW_OH_NOTES: {
            return {
                queue: state.queue,
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues : {
                    course_name: state.ohFormValues.course_name,
                    date: state.ohFormValues.date,
                    start_time: state.ohFormValues.start_time,
                    end_time: state.ohFormValues.end_time,
                    location: state.ohFormValues.location,
                    notes: action.payload,
                    _id: state.ohFormValues._id,
                },
            };
        }
        case actionType.UPDATE_OH_FORM_VALUES_FOR_EDIT: {
            return {
                queue: state.queue,
                scheduledOfficeHours: state.scheduledOfficeHours,
                ohFormValues: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}
import axios from 'axios';
import * as actionTypes from './types';
import { JOIN_QUEUE } from '../constants';

//Asks the BE who is logged in. Update app state to contain that user.
//This is an action creator (a func that returns an action) that actually returns an arrow func. The => func in async so it uses the async & await framework to deal with the promises.
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};


//Takes all the vals filled in from the OfficeHoursFormReview component and asks BE to store in db
export const submitOfficeHours = (values, history) => async dispatch => {
    const res = await axios.post('/api/office_hours', values);

    history.push('/office_hours/created');
    dispatch({ type: actionTypes.SUBMIT_OFFICE_HOURS, payload: res.data });
};


//Fetches from BE a list of all the office hours for the ChooseOfficeHours component
export const fetchOfficeHoursList = () => async (dispatch) => {
    const res = await axios.get('/api/get_office_hours_list');
    dispatch({ type: actionTypes.FETCH_OFFICE_HOURS_LIST, payload: res.data });
};


//Update app state to contain new course chosen by student
export const handleOfficeHoursChoice = choice => {
    return { type: actionTypes.HANDLE_OH_CHOICE, payload: choice };
};


//Update app state to contain new student action
export const handleStudentActionChoice = studentAction => {
    return {
        type: actionTypes.HANDLE_STUDENT_ACTION, payload: studentAction
    };
};


//Ask BE to do whatever the student wanted with the selected course
export const performStudentAction = (detailsForQueue, history) => async dispatch => {
    const res = detailsForQueue.studentAction === JOIN_QUEUE ?
        await axios.post('/api/student_join_queue', detailsForQueue):
            await axios.post('/api/student/see_queue', detailsForQueue);

    history.push('/students/queue_joined');
    dispatch({
        type: actionTypes.PERFORM_STUDENT_ACTION,
        payload: { studentName: res.data.studentName, arrayLocation: res.data.arrayLocation }
    });
};


export const checkPlaceInLine = (courseName, studentName) => async (dispatch) => {
    const res = await axios.get('/api/place_in_line', courseName, studentName);

    dispatch({ type: actionTypes.CHECK_PLACE_IN_LINE, payload: res.data });
};


export const updateTaManageOhChoice = choice => {
        return { type: actionTypes.UPDATE_TA_OH_MANAGE_CHOICE, payload: choice
        };
};


export const switchTaManagingPageView = () => {
        return { type: actionTypes.SWITCH_TA_MANAGING_PAGE_VIEW,
        };
};


//Take course_name and student _id and delete student from course' queue
export const removeStudentFromQueue = (courseName, studentId) => async dispatch => {
    const res = await axios.post('/api/office_hours/remove_student', courseName, studentId);

    dispatch({
        type: actionTypes.REMOVE_STUDENT_FROM_QUEUE,
        payload: res.data
    });
};

//Take course_name and update the advancement status of the queue
export const updateQueueStatus = (course) => async dispatch => {
    const res = await axios.post('/api/office_hours/update_status', course);

    dispatch({
        type: actionTypes.UPDATE_QUEUE_STATUS,
        payload: res.data
    });
};
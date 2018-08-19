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
export const updateStudentChoiceOfOh = choice => {
    return { type: actionTypes.UPDATE_STUDENT_CHOICE_OF_OH, payload: choice };
};


//Update app state to contain new student action
export const updateStudentGoal = studentAction => {
    return { type: actionTypes.UPDATE_STUDENT_GOAL, payload: studentAction };
};


//Ask BE to do whatever the student wanted with the selected course
export const performStudentAction = (detailsForQueue, history) => async dispatch => {
    let res;
    let payloadInfo = {};
    
    if (detailsForQueue.studentAction === JOIN_QUEUE) {
        res = await axios.post('/api/student_join_queue', detailsForQueue);
        payloadInfo = { studentName: res.data.studentName, arrayLocation: res.data.arrayLocation }
    }
    
    history.push('/students/see_queue');
    dispatch({
        type: actionTypes.PERFORM_STUDENT_ACTION,
        payload: payloadInfo
    });
};


export const checkPlaceInLine = (courseName, studentName) => async (dispatch) => {
    const res = await axios.get('/api/place_in_line', courseName, studentName);

    dispatch({ type: actionTypes.CHECK_PLACE_IN_LINE, payload: res.data });
};


export const updateTaManageOhChoice = choice => {
    return { type: actionTypes.UPDATE_TA_OH_MANAGE_CHOICE, payload: choice };
};


export const switchTaManagingPageView = () => {
    return { type: actionTypes.SWITCH_TA_MANAGING_PAGE_VIEW,};
};

//Take course_name and update the advancement status of the queue
export const updateQueueStatus = course => async dispatch => {
    const res = await axios.post('/api/office_hours/update_status', course);

    dispatch({ type: actionTypes.UPDATE_QUEUE_STATUS,  payload: res.data });
};

//SWITCH STATE THAT DETERMINES SHOW OR HIDE OF ANSWERWED STUDENTS IN STUDENT'S QUEUE
export const changeDisplayInStudentsQueue = () => {
    return { type: actionTypes.CHANGE_DISPLAY_IN_STUDENTS_QUEUE };
};


//FETCH OH THE ACTIVE USER WHO IS A STUDENT JOINED
export const fetchStudentOhJoind = () => async (dispatch) => {
    const res = await axios.get('/api/student/fetch_oh_joind');

    dispatch({ type: actionTypes.FETCH_STUDENT_OH_JOINED, payload: res.data });
};


//SET USER'S HAT TO STUDENT/TA
export const setUserHat = (hat, didJoinOh, history) => {
    let newUrl;

    if (hat === 'student') {
        newUrl = didJoinOh ? 'students/see_queue' : 'students/choose_office_hours';
    } else {
        newUrl = 'ta/options';
    }
    history.push(newUrl);
    return { type: actionTypes.SET_USER_HAT, payload: hat };
};


//Takes in student's id and course id, removes students from DB and changes the state
export const removeStudentFromQueue = (courseName, studentIdInQueue) => async dispatch => {
    const values = { courseName, studentIdInQueue };
    const res = await axios.post('/api/office_hours/remove_student_from_queue', values);

    dispatch({ type: actionTypes.REMOVE_STUDENT_FROM_QUEUE, payload: res.data });
};


//Update TA's choice of date & time for the new OH
export const updateTaDateTimeForNewOh = newDateTime => {
    console.log(newDateTime);
    return { type: actionTypes.UPDATE_TA_DATE_TIME_FOR_NEW_OH, payload: newDateTime };
};
import axios from 'axios';
import * as actionTypes from './types';

//This is an action creator (a func that returns an action) that actually returns an arrow func.
//The => func in async so it uses the async & await framework to deal with the promises.
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

export const submitOfficeHours = (values, history) => async dispatch => {
    const res = await axios.post('/api/office_hours', values);

    history.push('/office_hours/created');
    dispatch({ type: actionTypes.SUBMIT_OFFICE_HOURS, payload: res.data });
};

export const fetchOfficeHoursList = () => async (dispatch) => {
    const res = await axios.get('/api/get_office_hours_list');
    dispatch({ type: actionTypes.FETCH_OFFICE_HOURS_LIST, payload: res.data });
};


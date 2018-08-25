import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import activeUserReducer from './activeUserReducer';
import officeHoursListReducer from './officeHoursListReducer';
import performStudentAction from './performStudentActionReducer';
import placeInLineReducer from './checkPlaceInLineReducer';
import changeDisplayInStudentsQueue from './studentsQueueReducer';
import studentReducer from './studentReducer';
import hatReducer from './hatReducer';
import taReducer from './taReducer';

export default combineReducers({
    activeUser: activeUserReducer,
    hat: hatReducer,
    form: reduxForm,//delete?
    officeHoursList: officeHoursListReducer,
    studentInQueue: performStudentAction,
    placeInLine: placeInLineReducer,
    studentsQueue: changeDisplayInStudentsQueue,
    student: studentReducer,
    ta: taReducer,
});
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import activeUserReducer from './activeUserReducer';
import officeHoursListReducer from './officeHoursListReducer';
import performStudentAction from './performStudentActionReducer';
import placeInLineReducer from './checkPlaceInLineReducer';
import updateTaManageOhChoice from './taOhManageChoiceReducer';
import switchTaManagingPageView from './taManagingPageViewReducer';
import changeDisplayInStudentsQueue from './studentsQueueReducer';
import studentReducer from './studentReducer';
import hatReducer from './hatReducer';
import newOhReducer from './newOhReducer';
import taReducer from './taReducer';

export default combineReducers({
    activeUser: activeUserReducer,
    hat: hatReducer,
    form: reduxForm,//delete?
    officeHoursList: officeHoursListReducer,
    studentInQueue: performStudentAction,
    placeInLine: placeInLineReducer,
    taManageOhChoice: updateTaManageOhChoice,
    showInTaManagePage: switchTaManagingPageView,
    studentsQueue: changeDisplayInStudentsQueue,
    student: studentReducer,
    ta: taReducer,
    newOh: newOhReducer,
});
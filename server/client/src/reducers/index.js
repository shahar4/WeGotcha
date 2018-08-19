import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import fetchUser from './authReducer';
import officeHoursReducer from './officeHoursReducer';
import performStudentAction from './performStudentActionReducer';
import checkPlaceInLine from './checkPlaceInLineReducer';
import updateTaManageOhChoice from './taOhManageChoiceReducer';
import switchTaManagingPageView from './taManagingPageViewReducer';
import changeDisplayInStudentsQueue from './studentsQueueReducer';
import studentReducer from './studentReducer';
import hatReducer from './hatReducer';
import newOhReducer from './newOhReducer';

export default combineReducers({
    activeUser: fetchUser,
    hat: hatReducer,
    form: reduxForm,
    officeHoursList: officeHoursReducer,
    studentInQueue: performStudentAction,
    placeInLine: checkPlaceInLine,
    taManageOhChoice: updateTaManageOhChoice,
    showInTaManagePage: switchTaManagingPageView,
    studentsQueue: changeDisplayInStudentsQueue,
    student: studentReducer,
    newOh: newOhReducer,
});
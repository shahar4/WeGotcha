import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import fetchUser from './authReducer';
import officeHoursReducer from './officeHoursReducer';
import handleOfficeHoursChoice from './OHChoiceReducer';
import handleStudentActionChoice from './studentAction';
import performStudentAction from './performStudentActionReducer';
import checkPlaceInLine from './checkPlaceInLineReducer';
import updateTaManageOhChoice from './taOhManageChoiceReducer';
import switchTaManagingPageView from './taManagingPageViewReducer';

export default combineReducers({
    activeUser: fetchUser,
    form: reduxForm,
    office_hours_list: officeHoursReducer,
    chosenOfficeHourName: handleOfficeHoursChoice,
    selectedStudentAction: handleStudentActionChoice,
    studentInQueue: performStudentAction,
    placeInLine: checkPlaceInLine,
    taManageOhChoice: updateTaManageOhChoice,
    showInTaManagePage: switchTaManagingPageView,
});
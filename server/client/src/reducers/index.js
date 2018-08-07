import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import fetchUser from './authReducer';
import officeHoursReducer from './officeHoursReducer';
import fetchOfficeHoursList from './officeHoursListReducer';
import handleOfficeHoursChoice from './OHChoiceReducer';
import handleStudentActionChoice from './studentAction';
import performStudentAction from './performStudentActionReducer';
import checkPlaceInLine from './checkPlaceInLineReducer';

export default combineReducers({
    activeUser: fetchUser,
    form: reduxForm,
    office_hours: officeHoursReducer,
    office_hours_list: fetchOfficeHoursList,
    chosenOfficeHourName: handleOfficeHoursChoice,
    selectedStudentAction: handleStudentActionChoice,
    studentInQueue: performStudentAction,
    placeInLine: checkPlaceInLine,
});
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import officeHoursReducer from './officeHoursReducer';
import fetchOfficeHoursList from './officeHoursListReducer';


export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    office_hours: officeHoursReducer,
    office_hours_list: fetchOfficeHoursList,
});
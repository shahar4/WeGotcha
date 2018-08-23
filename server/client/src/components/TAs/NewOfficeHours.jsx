//Will show the OfficeHoursForm & OfficeHoursFormReview depending on a boolean managed
//in the component-level state
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import OfficeHoursForm from './OfficeHoursForm';
import OfficeHoursFormReview from './OfficeHoursFormReview';

class NewOfficeHours extends Component {
    state = { showOfficeHoursFormReview: false };

    render() {
        return (
            this.state.showOfficeHoursFormReview ? 
                <OfficeHoursFormReview onReviewBack={() => this.setState({ showOfficeHoursFormReview: false })}/> : 
                <OfficeHoursForm submitNewOhValues={() => this.setState({ showOfficeHoursFormReview: true })}/>
        );
    }
}

 /* 
  * As redux-form default behavior is to clear the form when the component related to it is unmounted, 
  * if we connect this component to the form but not specify the not-delete behavior,
  * the form is deleted when this component unmounts.
  */
export default reduxForm ({
    form: 'newOfficeHourForm'
})(NewOfficeHours);
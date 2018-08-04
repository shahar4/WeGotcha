import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { FORM_FIELDS } from '../../constants';
import OfficeHourFormField from './OfficeHourFormField';

class OfficeHoursForm extends Component {
    renderFields() {
        return (
            _.map(FORM_FIELDS, field => {
                return (
                    <Field
                        key={field.name}
                        component={OfficeHourFormField}  
                        {...field} 
                    />);
            })
        );
    }

    render() {
        return (
            <div className="container center-align" style={{marginTop: '30px', paddingBottom:'20px', width:'420px'}}>
                <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
                    <div style={{ fontSize: '1rem' }}>
                        {this.renderFields()}
                    </div>
                    <button type="submit" className="btn-flat white-text right" style={{backgroundColor: '#C4D8E2', width: '160px' }}> 
                        NEXT
                        <i className="material-icons right">done</i>
                    </button>
                    <Link to={'/chooseHat'} className="red btn-flat white-text left" style={{ width: '160px'}}>
                        CANCEL
                        <i className="material-icons right">cancel</i>
                    </Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    let errors = {};

    _.each(FORM_FIELDS, ({ name, noValError }) => {
        if(!values[name]) {
            errors[name] = noValError;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'newOfficeHourForm',
    destroyOnUnmount: false,
})(OfficeHoursForm);
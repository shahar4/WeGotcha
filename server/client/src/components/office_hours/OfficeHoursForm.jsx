import _ from 'lodash';
import * as actions from '../../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { FORM_FIELDS } from '../../constants';
import OfficeHourFormField from './OfficeHourFormField';
import DateTimePicker from 'react-datetime-picker';

class OfficeHoursForm extends Component {
    renderFields() {
        return (
            _.map(FORM_FIELDS, field => {
                return (
                    <Field
                        key={field.name}
                        component={OfficeHourFormField}  
                        {...field} 
                    />
                );
            })
        );
    }

    render() {
        let date = new Date();
        return (
            <div className="container center-align" style={{marginTop: '30px', paddingBottom:'20px', width:'420px'}}>
                <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
                    <div style={{ fontSize: '1rem' }}>
                        {this.renderFields()}
                    </div>
                    <div style={{width:'100%', marginBottom:'30px'}}>
                        <DateTimePicker
                            onChange={(selection) => this.props.updateTaDateTimeForNewOh(selection)}
                            value={this.props.dateTime}
                            locale={"en-US"}
                            showLeadingZeros={true}
                        />
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

function mapStateToProps(state) {
    return {
        dateTime: state.newOh.dateTime
    };
}

export default reduxForm({
    validate,
    form: 'newOfficeHourForm',
    destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(OfficeHoursForm));


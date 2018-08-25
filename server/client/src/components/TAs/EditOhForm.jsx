import _ from 'lodash';
import * as actions from '../../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FORM_FIELDS, PICKER_FIELDS, MANAGE } from '../../constants';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    container: { display: 'flex', flexWrap: 'wrap', },
    textField: { marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 420, },
});

class EditOhForm extends Component {
    state = {
        validation: {
            course_name: '',
            location: '',
            date: '',
        }
    };

    renderFormFields() {
        return (
            _.map(FORM_FIELDS, field => {
                return (
                    <div style={{ marginBottom: '30px' }} key={field.name}>
                        <label> {field.label} </label>
                        <input
                            value={this.props[field.name]}
                            onChange={(text) => this.props.updateNewOhValues(text.target.value, field.name)}
                            style={{ marginBottom: '5px', marginTop: '-15px' }}
                            placeholder={field.placeholder}
                        />
                        <div className="red-text" >
                            {this.state.validation[field.name]}
                        </div>
                    </div>
                );
            })
        );
    }
    renderPickerFields() {
        return (
            _.map(PICKER_FIELDS, field => {
                return (
                    <TextField
                        key={field.name}
                        style={{ marginRight: field.marginRight }}
                        label={field.label}
                        type={field.type}
                        defaultValue={field.defaultValue}
                        onChange={value => this.props.updateNewOhValues(value.target.value, field.name)}
                    />
                );
            })
        );
    }
    render() {
        const validateAndSubmit = () => {
            let today = new Date().setHours(0, 0, 0, 0);
            let ohDate = new Date(this.props.date).setHours(0, 0, 0, 0);
            this.setState({
                validation: {
                    course_name: this.props.course_name ? '' : 'Please enter course name.',
                    location: this.props.location ? '' : 'Please enter office hours location.',
                    date: today <= ohDate ? '' : 'Date cannot be before today.',
                }
            });
            if (this.props.course_name && this.props.location && today <= ohDate) {
                this.props.submitEditedOh(this.props);
                this.props.updateTAGoalInQueue(MANAGE);
            }
        }
        return (
            <div style={{marginBottom:'120px'}}>
                <div className="container center-align" style={{ marginTop: '60px', width: '390px' }}>
                    <div style={{ fontSize: '1rem' }}>
                        {this.renderFormFields()}
                    </div>
                </div>
                <div className="container center-align">
                    <div style={{ marginBottom: '30px' }}>
                        {this.renderPickerFields()}
                        <div className="red-text" >
                            {this.state.validation['date']}
                        </div>
                    </div>
                    <div className="container center-align" style={{ marginTop: '40px', width: '390px' }}>
                        <button
                            onClick={validateAndSubmit}
                            className="btn-flat white-text right"
                            style={{ backgroundColor: '#C4D8E2', width: '170px' }}
                        >
                            SUBMIT
                            <i className="material-icons right">done</i>
                        </button>
                        <button 
                            onClick={()=>console.log('canceling')}
                            className="red btn-flat white-text left"
                            style={{ width: '170px' }}
                        >
                            CANCEL
                            <i className="material-icons right">cancel</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        course_name: state.ta.ohFormValues.course_name,
        location: state.ta.ohFormValues.location,
        notes: state.ta.ohFormValues.notes,
        date: state.ta.ohFormValues.date,
        start_time: state.ta.ohFormValues.start_time,
        end_time: state.ta.ohFormValues.end_time,
        _id: state.ta.ohFormValues._id,
    };
}

export default withStyles(styles)(connect(mapStateToProps, actions)(EditOhForm));
import _ from 'lodash';
import * as actions from '../../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FORM_FIELDS, PICKER_FIELDS } from '../../constants';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: { display: 'flex', flexWrap: 'wrap', },
    textField: { marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 420, },
});

class OfficeHoursForm extends Component {
    state = {
        validation: {
            course_name: '',
            location: '',
            date: '',
        },
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
                            style={{ marginBottom: '5px', marginTop:'-15px' }} 
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
                        style={{ marginRight: field.marginRight}}
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
        const validateAndAdvanceToReview = () => {
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
                this.props.submitNewOhValues();
            }
        }
        return (
            <div>
                <div className="container center-align" style={{ marginTop: '90px', width:'390px' }}>
                    <div style={{ fontSize: '1rem' }}>
                        {this.renderFormFields()}
                    </div>
                </div>
                <div className="container center-align">
                    <div style={{marginBottom:'30px'}}>
                        {this.renderPickerFields()}
                        <div className="red-text" >
                            {this.state.validation['date']}
                        </div>
                    </div>
                    <div className="container center-align" style={{ marginTop: '40px', width: '390px' }}>
                        <button
                            onClick={validateAndAdvanceToReview}
                            className="btn-flat white-text right" 
                            style={{backgroundColor: '#C4D8E2', width: '170px' }}
                        > 
                            NEXT
                            <i className="material-icons right">done</i>
                        </button>
                        <Link to={'/chooseHat'} className="red btn-flat white-text left" style={{ width: '170px'}}>
                            CANCEL
                            <i className="material-icons right">cancel</i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        course_name: state.newOh.course_name,
        location: state.newOh.location,
        notes: state.newOh.notes,
        date: state.newOh.date,
        start_time: state.newOh.start_time,
        end_time: state.newOh.end_time,
    };
}

export default withStyles(styles)(connect(mapStateToProps, actions)(OfficeHoursForm));


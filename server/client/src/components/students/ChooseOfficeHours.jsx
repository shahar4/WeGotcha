import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { JOIN_QUEUE, SEE_QUEUE } from '../../constants';
import OfficeHourFormField from '../office_hours/OfficeHourFormField';

const ChooseOfficeHours = ({ officeHoursList, selectedOH, handleOfficeHoursChoice, handleStudentActionChoice,
    selectedStudentAction, performStudentAction, currentStudent, studentAction, history }) => {
        
    const officeHoursOptions = _.map(officeHoursList, course => {
        return (
            { value: course.course_name, label: course.course_name }
        );
    });
    
    const doWhatOptions = [
        { value: JOIN_QUEUE, label: JOIN_QUEUE },
        { value: SEE_QUEUE, label: SEE_QUEUE },
    ];
    
    const detailsForQueue = {
        courseName: selectedOH.value,
        studentAction: selectedStudentAction.value,
        studentName: currentStudent.name,
        studentId: currentStudent.googleId,
    };

    return (
        <div className="container center" style={{ width: '420px', marginTop: '60px', }}>
            <h5 style={{ color: '#9e9e9e' }}> Choose your office hours: </h5>
            <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <Select
                        value={selectedOH}
                        onChange={selection => handleOfficeHoursChoice(selection)}
                        options={officeHoursOptions}
                    />
                </div>
                <h5 style={{ color: '#9e9e9e' }}> What do you want to do with them? </h5>
                <div style={{ marginBottom: '40px' }}>
                    <Select
                        value={selectedStudentAction}
                        onChange={selection => handleStudentActionChoice(selection)}
                        options={doWhatOptions}
                    />
                </div>
                {studentAction === JOIN_QUEUE &&
                    <div>
                        <h5 style={{ color: '#9e9e9e' }}> Want to share question topics? </h5>
                        <Field
                            component={OfficeHourFormField}
                            name='questions_topics'
                            type='text'
                            examples='midterm prep, HW#6...'
                            noValErro='Please enter topics for your questions'
                        />
                    </div>
                }
                <button 
                    className="btn-flat white-text center"
                    style={{backgroundColor: '#C4D8E2', width: '160px'}}
                    onClick={() => performStudentAction(detailsForQueue, history)}
                >
                    SUBMIT
                    <i className="material-icons right \">add</i>
                </button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { 
        officeHoursList: state.office_hours_list,
        selectedOH: state.chosenOfficeHourName,
        selectedStudentAction: state.selectedStudentAction,
        currentStudent: {
            name: state.activeUser ? state.activeUser.name.givenName + ' ' + state.activeUser.name.familyName : '',
            googleId: state.activeUser ? state.activeUser.googleId : '',
        },
        studentAction: state.selectedStudentAction.label,
    };
}

export default reduxForm({
    form: 'enterOHQueueForm',
})(connect(mapStateToProps, actions)(withRouter(ChooseOfficeHours)));

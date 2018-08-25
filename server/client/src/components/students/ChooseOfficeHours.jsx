import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { JOIN_QUEUE, SEE_QUEUE } from '../../constants';
import OfficeHourFormField from '../TAs/OfficeHourFormField';
import * as moment from 'moment';

const ChooseOfficeHours = ({ studentName, officeHoursList, selectedOH, updateStudentChoiceOfOh, updateStudentGoal,
    selectedStudentAction, performStudentAction, fetchOfficeHoursList, currentStudent, studentAction, topics, history }) => {
        
    let officeHoursOptions = [];
    
    _.forEach(officeHoursList, course => {
        let today = moment();
        let endTimeHours = parseInt(course.end_time.split(':')[0]) + 1;

        if ( moment(course.date).format("MMM Do YY") === today.format("MMM Do YY") && 
            endTimeHours >= parseInt(moment().format("hh")) ) {

            officeHoursOptions.push (
                { value: course.course_name, label: course.course_name }
            );
        }
    });
    
    const doWhatOptions = [
        { value: JOIN_QUEUE, label: JOIN_QUEUE },
        { value: SEE_QUEUE, label: SEE_QUEUE },
    ];
    
    const detailsForQueue = {
        courseName: selectedOH.value,
        studentAction: selectedStudentAction.value,
        studentName: currentStudent.name,
        studentGoogleId: currentStudent.googleId,
        topics: topics
    };

    return (
        <div className="container center" style={{ width: '420px', marginTop: '60px', }}>
            <h5 style={{ color: '#9e9e9e' }}>
                Hey, {studentName}!
                <br /><br />
                Choose your office hours:
            </h5>
            <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <Select
                        value={selectedOH}
                        onChange={selection => updateStudentChoiceOfOh(selection)}
                        options={officeHoursOptions}
                        placeholder={"Select from today's OHs..."}
                    />
                </div>
                <h5 style={{ color: '#9e9e9e' }}> What do you want to do with them? </h5>
                <div style={{ marginBottom: '40px' }}>
                    <Select
                        value={selectedStudentAction}
                        onChange={selection => updateStudentGoal(selection)}
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
                    onClick={() => {
                        performStudentAction(detailsForQueue, history);
                        fetchOfficeHoursList();
                    }}
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
        officeHoursList: state.officeHoursList,
        selectedOH: state.student.ohNotSelectedYet ? state.student.ohNotSelectedYet.chosenOh : '',
        selectedStudentAction: state.student.goal,
        currentStudent: {
            name: state.activeUser ? state.activeUser.name.givenName + ' ' + state.activeUser.name.familyName : '',
            googleId: state.activeUser ? state.activeUser.googleId : '',
        },
        studentAction: state.student.goal.label,
        topics: state.form.enterOHQueueForm ? 
            state.form.enterOHQueueForm.values ? state.form.enterOHQueueForm.values.questions_topics : '' : '',
        studentName: state.activeUser ? state.activeUser.name.givenName : '',
    };
}

export default reduxForm({
    form: 'enterOHQueueForm',
    destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(withRouter(ChooseOfficeHours)));

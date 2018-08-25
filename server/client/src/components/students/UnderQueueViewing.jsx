import _ from 'lodash';
import React from 'react';
import { JOIN_QUEUE } from '../../constants';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import OfficeHourFormField from '../TAs/OfficeHourFormField';

const UnderQueueViewing = ({ updateStudentGoal, studentAction, howManyInLine, minsPerQuestion, selectedOH, officeHoursList, courseName, 
    studentIdInQueue, removeStudentFromQueue, fetchOfficeHoursList, performStudentAction }) => {

    const officeHoursOptions = _.map(officeHoursList, course => {
        return (
            { value: course.course_name, label: course.course_name }
        );
    });
    
    //ADJUST WORDINGS TO QUEUE STATUS I.E. (SINGULAR VS PLURAL...)
    let firstLineFirstWords; let studentOrStudents;
    if (howManyInLine > 1) { firstLineFirstWords = 'There are'; studentOrStudents = 'students'; }
    else { firstLineFirstWords = 'There is'; studentOrStudents = 'student'; }

    const joinQueueSelectorValue = { value: JOIN_QUEUE, label: JOIN_QUEUE };
    const seeOtherOhsValue = 'seeOtherOhs';

    return (
        <div className="center">
            <p style={{ color:'#9e9e9e', fontSize:'18px', marginBottom:'20px' }}>
                {firstLineFirstWords} <b>{howManyInLine} {studentOrStudents} in line</b> right now and your TA is imparting
                <br />
                knowledge at a staggering pace of <b>{minsPerQuestion} per question.</b>
                <br />
                <br />
                Estimated wait time: {howManyInLine * minsPerQuestion} minutes.
            </p>
            <br />
            <button
                className="waves-effect waves-light btn-large"
                style={{ width: '280px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginRight: '5px', }}
                onClick={() => updateStudentGoal(joinQueueSelectorValue)}
                >Join Queue
            </button>
            <button
                className="waves-effect waves-light btn-large"
                style={{ width: '280px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginLeft: '5px' }}
                onClick={() => updateStudentGoal(seeOtherOhsValue)}
                >See other office hours
            </button>
            <div className="container center" style={{ width: '420px' }}>
                {studentAction.label === JOIN_QUEUE &&
                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <h5 style={{ color: '#9e9e9e' }}> Want to share question topics? </h5>
                        <Field
                            component={OfficeHourFormField}
                            name='questions_topics'
                            type='text'
                            examples='midterm prep, HW#6...'
                            noValErro='Please enter topics for your questions'
                        />
                    </div>
                } {studentAction === seeOtherOhsValue &&
                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <Select
                            value={selectedOH}
                            onChange={selection => console.log(selection)}
                            options={officeHoursOptions}
                        />
                    </div>
                } {(studentAction.label === JOIN_QUEUE || studentAction === seeOtherOhsValue) &&
                    <button 
                        className="btn-flat white-text center"
                        style={{backgroundColor: '#C4D8E2', width: '160px'}}
                        onClick={() => {
                            // performStudentAction(detailsForQueue, history);
                            // fetchOfficeHoursList();
                        }}
                    >SUBMIT
                        <i className="material-icons right \">add</i>
                    </button>
                }
            </div>
        </div>
    );
}

export default reduxForm({
    form: 'enterOHQueueForm2',
    destroyOnUnmount: false,
})((withRouter(UnderQueueViewing)));
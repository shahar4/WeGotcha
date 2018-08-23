import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import QueueListItems from './QueueListItem';
import { studentsAnsweredDivStyle, topListTextStyle } from '../../constants';

const ManageOfficeHours = ({ course, displayAnsweredStudents, changeDisplayInTaQueue }) => {
        const howManyInLine = course ? course.queue.length - course.next_in_line : 0;
        const displayText = displayAnsweredStudents ? 'Hide them' : 'Show them';

        let height = course ? course.queue.length < 6 || (howManyInLine < 6 && !displayAnsweredStudents) ? 'autu' : '534px' : 'auto';
        const ulStyle = { height, overflow: 'scroll', width: '600px', marginTop: '30px', marginRight: 'auto', marginLeft: 'auto' };

        return (
            <ul className="collection" style={ulStyle}>
                <div style={{ height: '30px', backgroundColor: '#e1ebf0' }}>
                    <span className="left" style={studentsAnsweredDivStyle}>
                        {course ? course.next_in_line : 0} answered!
                        </span>
                    <a className="right" style={topListTextStyle} onClick={() => changeDisplayInTaQueue()}>
                        {displayText}
                    </a>
                </div>
                {course.queue.length === 0 &&
                    <h4>Nobody signed up yet.</h4>
                }
                <QueueListItems 
                    course={course}
                    displayAnsweredStudents={displayAnsweredStudents}
                />
            </ul>
        );
}

function mapStateToProps(state) {
    let chosenOh;
    _.forEach(state.officeHoursList, OH => {
        if (OH.course_name === state.taManageOhChoice.value) {
            chosenOh = OH;
        }
    })

    return {
        course: chosenOh,
        displayAnsweredStudents: state.ta.queue.displayAnsweredStudentsInQueue,
    };
}

export default connect(mapStateToProps, actions)(ManageOfficeHours);
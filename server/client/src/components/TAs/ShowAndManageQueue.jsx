import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ManageOfficeHours extends Component {
    /*TODO:
     ** HIGHLIGHT THE CURRENT ACTIVE USER
     ** PRESENT A PAGE ALSO IF NOBODY SHOWED UP
     ** 
     */
    render() {
        let lineIsAt = 0;
        const listItems = this.props.queue.map(student => 
        {
            const backgroundColor = lineIsAt < this.props.course.next_in_line ? '#F8F8F8' : '#FFFFFF';
            console.log(lineIsAt, this.props.course.next_in_line)
            lineIsAt += 1;
            return (
                <li className="collection-item avatar" key={student._id} style={{ backgroundColor: backgroundColor}}>
                    <i className="material-icons circle" style={{ backgroundColor: '#C4D8E2', fontSize:'30px' }}> person </i>
                    <div className="left">
                        <span 
                            className="left title" 
                            style={{ color: '#C4D8E2', fontWeight: 'bold' }}
                        >
                        {student.student_name} 
                        </span>
                        <br/>
                        <span 
                            className="left" 
                            style={{ fontWeight: 'bold' }}
                        > 
                        UNI: sk4120 
                        </span>
                        <br/>
                        <span 
                            style={{ fontWeight: 'bold' }}
                            > Topics: Flumpert, Numpert 
                        </span>
                    </div>
                    <div className="secondary-content">
                        <a 
                            onClick={() => console.log(student)} //this.props.removeStudentFromQueue(this.props.courseName, student._id)
                            style={{ color: '#C4D8E2', cursor: 'pointer'}}>
                            <i className="material-icons">delete</i>
                        </a>
                        <br/>
                        <a
                            onClick={() => this.props.updateQueueStatus(this.props.course)} 
                            style={{ color: '#C4D8E2', cursor: 'pointer' }}>
                            <i className="material-icons">done</i>
                        </a>
                    </div>
                </li>
            )}
        );
        return (
            <ul className="collection">
                {listItems}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    let chosenOh;
    _.forEach(state.office_hours_list, OH => {
        if (OH.course_name === state.taManageOhChoice.value) {
            chosenOh = OH;
        }
    })

    return {
        queue: chosenOh.queue,
        nextInLine: chosenOh.next_in_line,
        date: chosenOh.date,
        times: chosenOh.times,
        courseName: chosenOh.course_name,
        course: chosenOh
    };
}

export default connect(mapStateToProps, actions)(ManageOfficeHours);
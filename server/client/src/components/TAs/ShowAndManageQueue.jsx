import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ManageOfficeHours extends Component {
    render() {
        let lineIsAt = 0;
        const listItems = this.props.course.queue.map(student => {
            const backgroundColor = lineIsAt < this.props.course.next_in_line ? '#F8F8F8' : '#FFFFFF';
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
                            className="left" 
                            style={{ fontWeight: 'bold' }}
                        > {student.topics ? 'Topics: ' + student.topics : ''} 
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
            <ul className="collection" style={{ height: '534px', overflow: 'scroll'}}>
                {this.props.course.queue.length === 0 &&
                    <h4>Nobody signed up yet. <br/> We're sure they will come pouring!</h4> }
                {listItems}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    let chosenOh;
    _.forEach(state.officeHoursList, OH => {
        if (OH.course_name === state.taManageOhChoice.value) {
            chosenOh = OH;
        }
    })

    return {
        course: chosenOh
    };
}

export default connect(mapStateToProps, actions)(ManageOfficeHours);
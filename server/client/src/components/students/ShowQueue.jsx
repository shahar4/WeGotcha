import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import QueueListItems from './QueueListItems';
import UnderQueueJoined from './UnderQueueJoined';
import UnderQueueViewing from './UnderQueueViewing';
import { studentsAnsweredDivStyle, topListTextStyle } from '../../constants';

class ManageOfficeHours extends Component {    
    render() {
        const howManyInLine = this.props.course ? this.props.course.queue.length - this.props.course.next_in_line : 0;
        const displayText = this.props.displayAnsweredStudents ? 'Hide them' : 'Show them';
        
        let height = 'auto';
        if (this.props.course) {
            height = this.props.course.queue.length < 6 || (howManyInLine < 6 && !this.props.displayAnsweredStudents) ? 'autu' : '534px';
        }
        const ulStyle = { height, overflow: 'scroll', width: '60%', marginTop: '30px', marginRight: 'auto', marginLeft: 'auto' };

        return (
            <div>
                <ul className="collection" style={ulStyle}>
                    <div style={{ height:'30px', backgroundColor: '#e1ebf0' }}>
                        <span className="left" style={studentsAnsweredDivStyle}>
                            {this.props.course ? this.props.course.next_in_line : 0} answered!
                        </span>
                        <a className="right" style={topListTextStyle} onClick={() => this.props.changeDisplayInStudentsQueue()}>
                            {displayText}
                        </a>
                    </div>
                    {this.props.course ? this.props.course.queue.length === 0 &&
                        <h5>Nobody signed up yet. <br /> Don't worry... they'll come!</h5> : ''
                    }
                    <QueueListItems 
                        course={this.props.course}
                        displayAnsweredStudents={this.props.displayAnsweredStudents}
                    />
                </ul>
                {this.props.studentGoal === 'queueJoined'
                    ? <UnderQueueJoined
                        howManyInLine={howManyInLine}
                        minsPerQuestion={5}
                        studentIdInQueue={this.props.studentIdInQueue}
                        courseName={this.props.course ? this.props.course.course_name : ''}
                        removeStudentFromQueue={this.props.removeStudentFromQueue}
                        fetchOfficeHoursList={this.props.fetchOfficeHoursList}
                        />
                    : <UnderQueueViewing
                        howManyInLine={howManyInLine} 
                        minsPerQuestion={5} 
                        studentIdInQueue={this.props.studentIdInQueue}
                        courseName={this.props.course ? this.props.course.course_name : ''}
                        fetchOfficeHoursList={this.props.fetchOfficeHoursList}
                        updateStudentGoal={this.props.updateStudentGoal}
                        studentAction={this.props.studentGoal}
                        selectedOH={this.props.selectedOH}
                        officeHoursList={this.props.officeHoursList}
                        performStudentAction={this.props.performStudentAction}
                        />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    let chosenOh;
    const ohName = state.student.ohJoined ? state.student.ohJoined.course_name : state.student.ohNotSelectedYet ? state.student.ohNotSelectedYet.chosenOh.value : '';

    _.forEach(state.officeHoursList, OH => {
        if (OH.course_name === ohName) {
            chosenOh = OH;
        }
    })

    return {
        course: chosenOh,
        displayAnsweredStudents: state.student.displayAnsweredStudentsInQueue,
        studentGoal: state.student.goal,
        studentIdInQueue: state.activeUser ? state.activeUser.googleId : '',
        selectedOH: state.student.ohNotSelectedYet ? state.student.ohNotSelectedYet.chosenOh : '',
        officeHoursList: state.officeHoursList,
    };
}

export default connect(mapStateToProps, actions)(ManageOfficeHours);
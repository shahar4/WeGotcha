import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const QueueListItems = ({ course, displayAnsweredStudents, updateQueueStatus, removeStudentFromQueue, fetchOfficeHoursList }) => {
    let lineIsAt = 0;
    const listItems = course ? course.queue.map(student => {
        const backgroundColor = lineIsAt < course.next_in_line ? '#F8F8F8' : '#FFFFFF';
        if (!displayAnsweredStudents && lineIsAt < course.next_in_line) {
            lineIsAt++;
            return;
        } else {
            return (
                <li className="collection-item avatar" key={student._id} style={{ backgroundColor: backgroundColor }}>
                    {lineIsAt++ === course.next_in_line &&
                        <span
                            className="center"
                            style={{ color: '#AF0000', fontWeight: 'bold' }}
                        >* Up Next *
                            </span>
                    }
                    <i className="material-icons circle" style={{ backgroundColor: '#C4D8E2', fontSize: '30px' }}> person </i>
                    <div className="left">
                        <span
                            className="left title"
                            style={{ color: '#C4D8E2', fontWeight: 'bold' }}
                        >
                            {student.student_name}
                        </span>
                        <br />
                        <span
                            className="left"
                            style={{ fontWeight: 'bold' }}
                        >
                            {student.topics ? 'Topics: ' + student.topics : 'Topics not specified'}
                        </span>
                    </div>
                    <div className="secondary-content">
                        <a
                            onClick={() => {
                                removeStudentFromQueue(course._id, student.studentGoogleId);
                                fetchOfficeHoursList();
                            }}
                            style={{ color: '#C4D8E2', cursor: 'pointer' }}>
                            <i className="material-icons">delete</i>
                        </a>
                        <br />
                        <a
                            onClick={() => updateQueueStatus(course)}
                            style={{ color: '#C4D8E2', cursor: 'pointer' }}>
                            <i className="material-icons">done</i>
                        </a>
                    </div>
                </li>
            )
        }
    }
    ) : '';
    return (listItems);
}
export default connect(null, actions)(QueueListItems);
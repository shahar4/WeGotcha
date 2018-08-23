import React from 'react';

const QueueListItems = ({ course, displayAnsweredStudents }) => {
    let lineIsAt = 0;
    const listItems = course ? course.queue.map(student => {
        const backgroundColor = lineIsAt < course.next_in_line ? '#F8F8F8' : '#FFFFFF';

        if (!displayAnsweredStudents && lineIsAt < course.next_in_line) {
            lineIsAt++;
            return;
        } else {
            return (
                <li className="collection-item avatar" key={student._id} style={{ backgroundColor }}>
                    {lineIsAt++ === course.next_in_line && 
                        <span
                            className="right"
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
                            style={{ color: '#9e9e9e', fontWeight: 'bold' }}
                        > {student.topics ? 'Topics: ' + student.topics : 'Topics not specified'}
                        </span>
                    </div>
                </li>
            )
        }
    }) : '';
    return (listItems);
}

export default QueueListItems;
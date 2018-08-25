//TODO: REFACTOR & MAKE THIS PAGE FIT OH WITH ZERO STUDENTS IN QUEUE (SO THE INCOMING STUDENT IS FIRST IN LINE)
import React from 'react';
import EditTopicsInQueue from './EditTopicsInQueue';

const UnderQueueJoined = ({ howManyInLine, minsPerQuestion, courseId, studentIdInQueue, removeStudentFromQueue, fetchOfficeHoursList }) => {
    //ADJUST WORDINGS TO QUEUE STATUS I.E. (SINGULAR VS PLURAL...)
    let firstLineFirstWords; let studentOrStudents;
    if (howManyInLine > 1 ) { firstLineFirstWords = 'There are'; studentOrStudents = 'students'; }
    else { firstLineFirstWords = 'There is'; studentOrStudents = 'student'; }

    return (
        <div style={{ textAlign:'center' }}>
            <p style={{ color:'#9e9e9e', fontSize:'18px', marginBottom:'20px' }}>
                {firstLineFirstWords} <b>{howManyInLine} {studentOrStudents} in line</b> right now and your TA is imparting
                <br/>
                knowledge at a staggering pace of <b>{minsPerQuestion} per question.</b>
                <br/>
                <br/>
                Estimated wait time: {howManyInLine * minsPerQuestion} minutes.
            </p>
            <br/>
            <div>
                <button
                    className="center waves-effect waves-light btn-large" 
                    style={{ display: 'inline', width: '250px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginRight: '5px',}}
                    onClick={() => {
                        removeStudentFromQueue(courseId, studentIdInQueue);
                        fetchOfficeHoursList();
                        }}
                >Leave Queue
                </button>
                <EditTopicsInQueue
                    modalWidth='auto'
                    buttonName='Edit topics'
                    body='editTopics'
                    courseId={courseId}
                    studentIdInQueue={studentIdInQueue}
                />
            </div>
            <div>
                <button
                    className="center waves-effect waves-light btn-large"
                    style={{ width: '300px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginTop: '10px' }}
                >See other office hours
                </button>
            </div>
        </div>
    );
}

export default UnderQueueJoined;
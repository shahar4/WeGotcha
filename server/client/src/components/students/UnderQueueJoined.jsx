//TODO: REFACTOR & MAKE THIS PAGE FIT OH WITH ZERO STUDENTS IN QUEUE (SO THE INCOMING STUDENT IS FIRST IN LINE)
import React from 'react';

const UnderQueueJoined = ({ howManyInLine, minsPerQuestion, courseName, studentIdInQueue, removeStudentFromQueue, fetchOfficeHoursList }) => {
    //ADJUST WORDINGS TO QUEUE STATUS I.E. (SINGULAR VS PLURAL...)
    let firstLineFirstWords; let studentOrStudents;
    if (howManyInLine > 1 ) { firstLineFirstWords = 'There are'; studentOrStudents = 'students'; }
    else { firstLineFirstWords = 'There is'; studentOrStudents = 'student'; }

    return (
        <div style={{ textAlign:'center' }}>
            <h5 style={{ color:'#9e9e9e' }}>
                {firstLineFirstWords} <b>{howManyInLine} {studentOrStudents} in line</b> right now and your TA is imparting
                <br/>
                knowledge at a staggering pace of <b>{minsPerQuestion} per question.</b>
                <br/>
                <br/>
                Estimated wait time: {howManyInLine * minsPerQuestion} minutes.
            </h5>
            <br/>
            <div>
                <button
                    className="center waves-effect waves-light btn-large" 
                    style={{ width: '250px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginRight: '5px',}}
                    onClick={() => {
                        removeStudentFromQueue(courseName, studentIdInQueue);
                        fetchOfficeHoursList();
                        }}
                >Leave Queue
                </button>
                <button 
                    className="center waves-effect waves-light btn-large" 
                    style={{ width: '250px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginLeft: '5px'}}
                >Edit topics
                </button>
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
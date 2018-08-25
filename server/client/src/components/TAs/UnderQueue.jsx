import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../actions';
import { SEE_OTHER_QUEUES, MANAGE, EDIT } from '../../constants';
import EditOhForm from './EditOhForm';

class UnderQueue extends Component {
    state = {
        goal: MANAGE,
    };

    updateTAGoalInQueue = goal => {
        if (goal === EDIT) {
            this.props.updateOhFormValuesForEdit(this.props.ohFormValues);
        }       
        this.setState(
            { goal: goal }
        );
    };

    render() {
        const { howManyInLine, minsPerQuestion, taOptions, updateTaManageOhChoice } = this.props;

        //SETTING THE TEXT
        let firstLineFirstWords; let studentOrStudents;
        if (howManyInLine > 1) { firstLineFirstWords = 'There are'; studentOrStudents = 'students'; }
        else { firstLineFirstWords = 'There is'; studentOrStudents = 'student'; }

        return (
            <div style={{ textAlign: 'center' }}>
                <p style={{ color:'#9e9e9e', fontSize:'18px', marginBottom:'20px' }}>
                    There are {howManyInLine} {studentOrStudents} in line right now.<br/>
                    You are imparting knowledge at a staggering pace of <b>{minsPerQuestion} per question.</b>
                </p>

                <div>
                    <button
                        className="center waves-effect waves-light btn-large"
                        style={{ width: '250px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginRight: '5px', }}
                        onClick={() => this.updateTAGoalInQueue(EDIT)}
                    >EDIT OFFICE HOURS
                    </button>
                    <button
                        className="center waves-effect waves-light btn-large"
                        style={{ width: '250px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginLeft: '5px' }}
                        onClick={() => console.log("yeepi")}
                    >FINISH OFFICE HOURS
                    </button>
                </div>
                <div>
                    <button
                        className="center waves-effect waves-light btn-large"
                        style={{ width: '300px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginTop: '10px' }}
                        onClick={() => this.updateTAGoalInQueue(SEE_OTHER_QUEUES)}
                    >OTHER OFFICE HOURS
                    </button>
                </div>

                {this.state.goal === SEE_OTHER_QUEUES && 
                    <div className="container center" style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <Select
                            onChange={selection => updateTaManageOhChoice(selection)}
                            options={taOptions}
                        />
                    </div>
                }
                {this.state.goal === EDIT && 
                    <EditOhForm 
                        updateTAGoalInQueue={this.updateTAGoalInQueue}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    let course = {};
    _.forEach(state.officeHoursList, oh => {
        if (oh._id === state.ta.queue.ManageOhChoice.value) {
            course = oh;
        }
    });
    const { course_name, date, start_time, end_time, location, notes, _id } = course;

    return {
        taOptions: state.ta.scheduledOfficeHours,
        ohFormValues: {
            course_name: course_name,
            date: date,
            start_time: start_time,
            end_time: end_time,
            location: location,
            notes: notes,
            _id: _id,
        },
    };
}

export default connect(mapStateToProps, actions)(UnderQueue);
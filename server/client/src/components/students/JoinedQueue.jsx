// Says 
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const checkPlaceInLine = (studentLocationInArray, currentQueueHead) => {
    return studentLocationInArray - currentQueueHead;
};

class JoinedQueue extends Component {
    render() {
        return (
            <div>
                <h4>Hi, {this.props.studentName}!</h4>
                <h4>Your place in line is: {checkPlaceInLine(this.props.studentLocationInArray, this.props.currentQueueHead) || ''}!</h4>
                <h4>We'll let you know when you are 3rd!</h4>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let findingCurrentQueueHead;
    _.forEach(state.office_hours_list, OH => {
        if (OH.course_name === state.activeUser.office_hours_joined.course_name) {
            findingCurrentQueueHead = OH.next_in_line;
        }
    })
    return {
        studentName: state.activeUser ? state.activeUser.name.givenName : '',//TODO: take only first name, cap first letter.
        studentLocationInArray: state.activeUser ? state.activeUser.office_hours_joined.array_location : '',
        currentQueueHead: findingCurrentQueueHead,
    };
}

export default connect(mapStateToProps, actions)(JoinedQueue);

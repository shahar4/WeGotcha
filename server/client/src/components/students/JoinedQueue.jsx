// Says 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class JoinedQueue extends Component {
    
    render() {
        return (
            <div>
                <h4>Hi, {this.props.studentName}!</h4>
                <h4>Your place in line is: {}!</h4>
                <h4>We'll let you know when you are 3rd!</h4>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("state: ", state);
    return {
        studentName: state.activeUser ? state.activeUser.name.givenName : '',//TODO: take only first name, cap first letter.
        courseName: state.studentInQueue.courseName,
        placeInLine: state.placeInLine,
    };
}

export default connect(mapStateToProps, actions)(JoinedQueue);

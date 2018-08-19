import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

const buttonStyle = { width: '200px', backgroundColor: '#C4D8E2', fontSize: '1.23em' };

class ChooseHat extends Component {
    render() {
        return (
            <div className="container center-align" style={{ marginTop: '120px', color: '#9e9e9e', width: '420px' }}>
                <div className="row">
                    <h3 className="col s12" style={{ marginBottom: '30px' }}> Who Are You Today?</h3>
                    <div>
                        <button
                            onClick={() => {
                                this.props.fetchStudentOhJoind();
                                this.props.setUserHat('student', this.props.didJoinOh, this.props.history);
                            }}
                            className="waves-effect waves-light btn-large right" 
                            style={buttonStyle}> 
                            STUDENT
                        </button>
                        <button
                            onClick={() => this.props.setUserHat('ta', false, this.props.history)} 
                            className="waves-effect waves-light btn-large left" 
                            style={buttonStyle}> 
                            TA 
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        didJoinOh: state.activeUser ? state.activeUser.officeHoursJoined : '' ? true : false,
    };
}

export default connect(mapStateToProps, actions)(withRouter(ChooseHat));
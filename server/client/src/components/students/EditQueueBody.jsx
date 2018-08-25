import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class EditQueueBody extends Component {
    state = {
        newVal: '',
    };

    handleNewValChange = val => {
        this.setState({ newVal: val });
    };

    render() {
        const topicActionValues = {
            studentIdInQueue: this.props.studentIdInQueue,
            courseId: this.props.courseId,
            newTopics: this.state.newVal,
        };
        return (
            <div>
                <label> New topics </label>
                <input
                    onChange={val => this.handleNewValChange(val.target.value)}
                    style={{ marginBottom: '5px' }}
                    placeholder="i.e. flumperts" />
                <div className="container center" style={{marginTop:'15px'}}>
                    <button 
                        className="btn-flat white-text"
                        style={{backgroundColor: '#C4D8E2', width: '160px'}}
                        onClick={() => {
                            this.props.submitEditedTopics(topicActionValues);
                            this.props.handleClose();
                            }} >
                        SUBMIT
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(EditQueueBody);


//studentGoogleId, courseId, newTopics
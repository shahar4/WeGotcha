import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditQueueBody from './EditQueueBody';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class EditTopicsInQueue extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div style={{ display: 'inline' }}>
                <button
                    onClick={this.handleOpen}
                    className="center waves-effect waves-light btn-large"
                    style={{ width: '250px', backgroundColor: '#C4D8E2', fontSize: '1.23em', marginLeft: '5px' }}
                >{this.props.buttonName}
                </button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={{ width: this.props.modalWidth, top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className="EditTopicsInQueue-paper-31">
                        {this.props.body === 'editTopics' &&
                            <EditQueueBody
                                courseId={this.props.courseId}
                                studentIdInQueue={this.props.studentIdInQueue}
                                handleClose={this.handleClose}
                            />
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(EditTopicsInQueue);;
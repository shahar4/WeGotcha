import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing.unit,
    },
});

class QueueTitle extends React.Component {
    state = {
        anchorEl: null,
    };

    handlePopoverOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, course } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const courseNotes = course.notes ? '** ' +  course.notes + ' **' : '';

        return (
            <div>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : null}
                    aria-haspopup="true"
                    onMouseEnter={this.handlePopoverOpen}
                    onMouseLeave={this.handlePopoverClose}
                >
                    <label style={{ color: '#9e9e9e', fontSize: '18px'}}>
                        {course.course_name}
                    </label>
                </Typography>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography className={classes.typography} style={{ textAlign: 'center' }}>
                        {course.ta.name}<br />
                        {course.start_time} - {course.end_time} @ {course.location}<br/>
                        {courseNotes}
                    </Typography>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(QueueTitle);
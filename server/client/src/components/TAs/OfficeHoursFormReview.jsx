import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FORM_REVIEW_FIELDS } from '../../constants';
import * as actions from '../../actions';

const OfficeHoursFormReview = ({ ohValues, onReviewBack, createNewOh, history }) => {
    const reviewFormFields = _.map(FORM_REVIEW_FIELDS, ({ name, label }) => {
        return (
            <div key={name}>
                <div className="panel panel-info">
                    <div className="panel-body" style={{ color: '#9e9e9e' }}> {label} </div>
                    <div className="panel-footer" style={{ backgroundColor: '#C4D8E2', color:'white' }}> {ohValues[name]} </div>
                </div>
            </div>
        );
    });

    return (
        <div className="container center" style={{ width: '420px', marginTop: '30px', }}>
            <h5 style={{ color: '#9e9e9e' }}> Please review your entries: </h5>
            <div style={{marginTop: '20px'}}>
                {reviewFormFields}
                    <button 
                        className="yellow darken-3 btn-flat white-text left"
                        style={{width: '160px'}}
                        onClick={ onReviewBack }
                    >
                        BACK
                        <i className="material-icons right">arrow_back</i>
                    </button>
                    <button 
                        className="btn-flat white-text right"
                        style={{backgroundColor: '#C4D8E2', width: '160px'}}
                        onClick={() => createNewOh(ohValues, history)}
                    >
                        ADD OH
                        <i className="material-icons right \">add</i>
                    </button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        ohValues: {
            course_name: state.newOh.course_name,
            date: state.newOh.date,
            start_time: state.newOh.start_time,
            end_time: state.newOh.end_time,
            location: state.newOh.location,
            notes: state.newOh.notes,
            ta: {
                name: state.activeUser ? state.activeUser.name.givenName + ' ' + state.activeUser.name.familyName : '',
                googleId: state.activeUser ? state.activeUser.googleId : '',
            },
            times: state.newOh.start_time + ' - ' + state.newOh.end_time,
        },
    }; 
}


export default connect(mapStateToProps, actions)(withRouter(OfficeHoursFormReview));
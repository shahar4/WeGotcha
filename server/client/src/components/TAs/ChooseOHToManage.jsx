import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../actions';

class ChooseOHToManage extends Component {
    render() {
        const taOfficeHoursList = [];
        const taOhOptions = [];

        _.forEach(this.props.allOficeHours, OH => {
            if (OH.ta.googleId === this.props.activeTaId) {
                taOfficeHoursList.push(OH);
            }
        })

        _.forEach(taOfficeHoursList, OH => {
            taOhOptions.push({ value: OH._id, label: OH.course_name })
        })
        this.props.updateTaScheduledOhForSelectors(taOhOptions);
        
        return (
            <div className="container center" style={{ width: '420px', marginTop: '60px', }}>
                <h5 style={{ color: '#9e9e9e', marginBottom: '40px' }}> Choose your office hours: </h5>
                <div style={{ marginBottom: '40px' }}>
                    <Select
                        onChange={selection => this.props.updateTaManageOhChoice(selection)}
                        options={taOhOptions}
                        noOptionsMessage={() => "You have no scheduled office hours"}
                    />
                </div>
                <button 
                    className="btn-flat white-text center"
                    style={{ backgroundColor: '#C4D8E2', width: '200px', fontSize: '1.23em'}}
                    onClick={() => this.props.switchTaManagingPageView('showQueue')}
                >
                MANAGE
                    <i className="material-icons right">work</i>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        allOficeHours: state.officeHoursList || '',
        activeTaId: state.activeUser ? state.activeUser.googleId : '',
        taManageOhChoice: state.ta.queue.ManageOhChoice,
    };
}

export default connect(mapStateToProps, actions)(ChooseOHToManage);
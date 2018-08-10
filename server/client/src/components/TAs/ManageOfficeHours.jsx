import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseOHToManage from './ChooseOHToManage';
import ShowAndManageQueue from './ShowAndManageQueue';

class ManageOfficeHours extends Component {
    render() {
        return (
            <div className="container center-align" style={{ marginTop: '120px', color: '#9e9e9e', width: '660px' }}>
                {
                    this.props.whatToShow === 'chooseOh' && <ChooseOHToManage />
                }
                {
                    this.props.whatToShow === 'showQueue' && <ShowAndManageQueue />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeTA: state.activeUser ? state.activeUser.name.givenName : '',
        whatToShow: state.showInTaManagePage
    };
}

export default connect(mapStateToProps, null)(ManageOfficeHours);
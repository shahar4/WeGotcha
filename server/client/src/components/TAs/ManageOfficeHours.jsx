import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseOHToManage from './ChooseOHToManage';
import ShowAndManageQueue from './ShowAndManageQueue';

class ManageOfficeHours extends Component {
    state = {
        whatToShow: 'chooseOh',
    };

    switchTaManagingPageView = selection => {
        this.setState(
            { whatToShow: selection }
        );
    };

    render() {
        const marginTop = this.state.whatToShow === 'chooseOh' ? '100px' : '40px';
        return (
            <div className="container center-align" style={{ marginTop, color: '#9e9e9e', width: '660px' }}>
                {
                    this.state.whatToShow === 'chooseOh' && <ChooseOHToManage switchTaManagingPageView={this.switchTaManagingPageView}/>
                }
                {
                    this.state.whatToShow === 'showQueue' && <ShowAndManageQueue switchTaManagingPageView={this.switchTaManagingPageView}/>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeTA: state.activeUser.name.givenName,
    };
}

export default connect(mapStateToProps, null)(ManageOfficeHours);
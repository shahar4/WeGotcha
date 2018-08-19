import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const buttonStyle = { width: '290px', backgroundColor: '#C4D8E2', marginRight: '10px', marginBottom: '10px', fontSize:'1.23em' };

class ChooseHat extends Component {
    render() {
        return (
            <div className="container center-align" style={{ marginTop: '120px', color: '#9e9e9e', width: '660px' }}>
                <div className="row">
                    <h4 className="col s12" style={{ marginBottom: '30px' }}>
                        Hey, {this.props.activeTA}!
                        <br/>
                        How can we assist you today? 
                    </h4>
                    <div>
                        <Link
                            to={'/ta/office_hours/new'}
                            className="waves-effect waves-light btn-large center"
                            style={buttonStyle}>
                            CREATE OFFICE HOURS
                        </Link>
                        <Link
                            to={'/ta/office_hours/manage'}
                            className="waves-effect waves-light btn-large center"
                            style={buttonStyle}>
                            MANAGE OFFICE HOURS
                        </Link>
                        <Link
                            to={'/office_hours/new'}
                            className="waves-effect waves-light btn-large center"
                            style={buttonStyle}>
                            EDIT OFFICE HOURS
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeTA: state.activeUser ? state.activeUser.name.givenName : '',
    };
}

export default connect(mapStateToProps, null)(ChooseHat);
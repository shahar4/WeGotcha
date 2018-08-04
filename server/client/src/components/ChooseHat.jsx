import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const buttonStyle = { width: '200px', backgroundColor: '#C4D8E2' };

class ChooseHat extends Component {
    render() {
        return (
            <div className="container center-align" style={{ marginTop: '120px', color: '#9e9e9e', width: '420px' }}>
                <div className="row">
                    <h3 className="col s12" style={{ marginBottom: '30px' }}> Who Are You Today?</h3>
                    <div>
                        <Link 
                            to={'/students/choose_office_hours'} 
                            className="waves-effect waves-light btn-large right" 
                            style={buttonStyle}> 
                            STUDENT
                        </Link>
                        <Link 
                            to={'/office_hours/new'}
                            className="waves-effect waves-light btn-large left" 
                            style={buttonStyle}> 
                            TA 
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(ChooseHat);
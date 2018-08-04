import React from 'react';
import { connect } from 'react-redux';

const ChooseOfficeHours = ({ office_hours_list, auth }) => {
    console.log(office_hours_list, auth);
    const renderOfficeHoursList = () => {
        return (
            <ul>
                <li>
                    Hello World!
                </li>
            </ul>
        );
    }
    return (
        <div className="container center" style={{ width: '420px', marginTop: '30px', }}>
            <h5 style={{ color: '#9e9e9e' }}> Choose your office hours: </h5>
            <div style={{ marginTop: '20px' }}>
                {renderOfficeHoursList()}
            </div>
        </div>
    );
};

function mapStateToProps({ office_hours_list, auth }) {
    return { office_hours_list, auth };
}

export default connect(mapStateToProps, null)(ChooseOfficeHours);
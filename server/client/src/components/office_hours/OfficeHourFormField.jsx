//Contains logic to render a single label & text input
import React from 'react';

const OfficeHourFormField = ({ input, label, meta: { touched, error } }) => {
    return (
        <div>
            <label> {label} </label>
            <input {...input} style={{ marginBottom: '5px' }}   />
            <div className="red-text" style={{marginBottom: '25px'}}>
                {touched && error}
            </div>
        </div>
    );
}

export default OfficeHourFormField;
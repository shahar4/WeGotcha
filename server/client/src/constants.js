export const FORM_FIELDS = [
    { name: 'course_name', label: 'Course Name', type: 'text', noValError: 'Please enter course name.', placeholder: '' },
    { name: 'location', label: 'Location', type: 'text', noValError: 'Please enter location.', placeholder: '' },
    { name: 'notes', label: 'Notes', type: 'text', noValError: '', placeholder: '' }
];

export const JOIN_QUEUE = 'Join Queue';
export const SEE_QUEUE = 'See Queue';


//SETTING UP THE DATE&TIME AS THE PROPER PROPS TO THE PICKERS
let d = new Date().toISOString().split('T');
export const TODAY_DATE = d[0];

    d = d[1].split(':');
    export const TODAY_START_TIME = d[0] + ':' + d[1];

        d = new Date();
        d.setHours(d.getHours() + 2);
        d = d.toISOString().split('T')[1].split(':');
        export const TODAY_END_TIME = d[0] + ':' + d[1];


export const FORM_REVIEW_FIELDS = [
    { name: 'course_name', label: 'Course Name' },
    { name: 'location', label: 'Location' },
    { name: 'notes', label: 'Notes' },
    { name: 'date', label: 'Date' },
    { name: 'times', label: 'Times' }
];

export const PICKER_FIELDS = [
    {name: 'date', label: 'Date', type: 'date', defaultValue: TODAY_DATE, marginRight: '5px' },
    {name: 'startTime', label: 'Start time', type: 'time', defaultValue: TODAY_START_TIME, marginRight: '5px' },
    {name: 'endTime', label: 'End time', type: 'time', defaultValue: TODAY_END_TIME, marginRight: '0px' },
];


//STYLES FOR BOTH TA & STUDENT QUEUES
export const studentsAnsweredDivStyle = { color: '#FFFFFF', fontWeight: 'bold', marginTop: '5px', marginLeft: '5px' };
export const topListTextStyle = { fontWeight: 'bold', marginTop: '5px', marginRight: '5px' };


//TA GOALS IN QUEUE
export const MANAGE = 'manage';
export const SEE_OTHER_QUEUES = 'see_other_queues';
export const EDIT = 'edit';
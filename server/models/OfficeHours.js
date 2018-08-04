const mongoose = require('mongoose');
const { Schema } = mongoose;

const officeHourSchema = new Schema({
    course_name: String,
    times: String,
    location: String,
    notes: String,
});

mongoose.model('officeHours', officeHourSchema);
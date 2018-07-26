const mongoose = require('mongoose');
const { Schema } = mongoose;

const officeHourSchema = new Schema({
    day: String,
    time: String
});

mongoose.model('officeHours', officeHourSchema);
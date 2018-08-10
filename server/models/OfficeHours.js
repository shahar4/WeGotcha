const mongoose = require('mongoose');
const { Schema } = mongoose;
const OHQueueSchema = require('./OfficeHoursQueue');

const officeHourSchema = new Schema({
    course_name: String,
    ta: { name: String, googleId: String },
    date: { type: Date, default: Date.now },
    times: String,
    location: String,
    notes: String,
    queue: [{ student_name: String, topics: String }],
    next_in_line: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('officeHours', officeHourSchema);
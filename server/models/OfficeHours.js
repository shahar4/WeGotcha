const mongoose = require('mongoose');
const { Schema } = mongoose;

const officeHourSchema = new Schema({
    course_name: String,
    ta: { name: String, googleId: String },
    date: String,
    start_time: String,
    end_time: String,
    location: String,
    notes: String,
    queue: [{ student_name: String, topics: String, studentGoogleId: String }],
    next_in_line: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('officeHours', officeHourSchema);
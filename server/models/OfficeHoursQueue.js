const mongoose = require('mongoose');
const { Schema } = mongoose;

const OHQueueSchema = new Schema({
    student_name: String,
    array_location: Number,
    // topics: String,
});

module.exports = OHQueueSchema;
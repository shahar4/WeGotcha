const mongoose = require('mongoose');
const { Schema } = mongoose;

const OHQueueSchema = new Schema({
    student_name: String,
    // topics: String,
});

module.exports = OHQueueSchema;
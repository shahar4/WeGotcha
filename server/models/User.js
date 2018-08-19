//REMEMBER TO REQUIRE IN INDEX.JS
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: { familyName: String, givenName: String },
  uni: String,
  officeHoursJoined: { course_name: String, array_location: Number },
});

mongoose.model('users', userSchema);
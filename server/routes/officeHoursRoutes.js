/*
 * Structure: Define an => func, immediatelly export it, wire it up to the
 * express App object inside of the top level index.js file
 */
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const OfficeHours = mongoose.model('officeHours');
const User = mongoose.model('users');

module.exports = app => {     
    app.post('/api/office_hours', requireLogin, async (req, res) => { //requireLogin is passed in and called as a middleware
        const { course_name, times, location, notes } = req.body;
        const officeHours = new OfficeHours({ course_name, times, location, notes });

        try {
            await officeHours.save();
        } 
        catch(err) {
            res.status(422).send(err);
        }
        
        res.send(req.body);
    });

    app.get('/api/get_office_hours_list', async (req, res) => {
        const list = await OfficeHours.find();
        res.send(list);
    });

    app.post('/api/student_join_queue', requireLogin, async (req, res) => {
        //TODO: make it so you only register for a queue in that same date (and only 15 mins before OH have started)
        const { studentName, courseName, studentId } = req.body;  
        console.log("ho ho ho",req.body);      

        const officeHours = await OfficeHours.findOne({ course_name: courseName });
        officeHours.queue.push({ student_name: studentName });

        const user = await User.findOne({ googleId: studentId });
        user.office_hours_joined = { course_name: courseName, array_location: officeHours.__v};

        try {
            await officeHours.save();
            await user.save();
        } 
        catch(err) {
            res.status(422).send(err);
        }

        req.body.arrayLocation = officeHours.__v;
        res.send(req.body);
    });

    app.get('/api/place_in_line', async (req, res) => {
        const { courseName, studentName } = req.body;
        const officeHours = await OfficeHours.findOne({ course_name: courseName });

        req.body.placeInLine = officeHours.__v - officeHours.next_in_line;
        res.send(req.body);
    });
};
// /api/student/see_queue

        // OfficeHours.findOne(query, (err, OH) => {
        //     OH.queue = [...OH.queue, {student_name: studentName }]
        //     OH.save();
        // });
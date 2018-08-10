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
        const { course_name, times, location, notes, ta } = req.body;
        const officeHours = new OfficeHours({ course_name, times, location, notes, ta });

        try {
            await officeHours.save();
        } 
        catch(err) {
            res.status(422).send(err);
        }
        
        const list = await OfficeHours.find();
        res.send(list);
    });

    app.get('/api/get_office_hours_list', async (req, res) => {
        const list = await OfficeHours.find();
        res.send(list);
    });

    app.post('/api/student_join_queue', requireLogin, async (req, res) => {
        //TODO: make it so you only register for a queue in that same date (and only 15 mins before OH have started)
        const { studentName, courseName, studentId } = req.body; 

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
        const { courseName } = req.body;
        const officeHours = await OfficeHours.findOne({ course_name: courseName });

        if (officeHours) {
            req.body.placeInLine = officeHours.__v - officeHours.next_in_line;
        }
        res.send(req.body);
    });


    app.post('/api/office_hours/remove_student', requireLogin, async (req, res) => {
        /* 
         * TODO:
         ** WHEN YOU REMOVE A STUDENT YOU NEED TO:
         *** 1. REMOVE HIM FROM THE OH.QUEUE IN THE DB
         *** 2. FOR ALL THE ONES AFTER HIM: UPDATE THEIR ARRAY_LOCATION
         */
        const { courseName, studentId } = req.body;

        const officeHours = await OfficeHours.findOne({
            course_name: courseName
        });
        _.forEach(officeHours.queue, (student) => {
            if(student._id === studentId) {

            }
        })

        const user = await User.findOne({
            googleId: studentId
        });
        user.office_hours_joined = {
            course_name: courseName,
            array_location: officeHours.__v
        };

        try {
            await officeHours.save();
            await user.save();
        } catch (err) {
            res.status(422).send(err);
        }

        req.body.arrayLocation = officeHours.__v;
        res.send(req.body);
    });


    app.post('/api/office_hours/update_status', requireLogin, async (req, res) => {
        const courseName = req.body.course_name;

        const officeHours = await OfficeHours.findOne({
            course_name: courseName
        });
        
        officeHours.next_in_line += 1;

        try {
            await officeHours.save();
        } catch (err) {
            res.status(422).send(err);
        }
        const list = await OfficeHours.find();
        res.send(list);
    });
};


// /api/student/see_queue

        // OfficeHours.findOne(query, (err, OH) => {
        //     OH.queue = [...OH.queue, {student_name: studentName }]
        //     OH.save();
        // });
/*
 * Structure: Define an => func, immediatelly export it, wire it up to the
 * express App object inside of the top level index.js file
 */
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const OfficeHours = mongoose.model('officeHours');
const User = mongoose.model('users');

module.exports = app => {     
    app.post('/api/office_hours/create', requireLogin, async (req, res) => { //requireLogin is passed in and called as a middleware
        const { course_name, date, start_time, end_time, location, notes, ta } = req.body;
        const newOfficeHours = new OfficeHours({ course_name, date, start_time, end_time, location, notes, ta });

        const user = await User.findOne({ googleId: ta.googleId });
        user.officeHoursCreated = { oh_id: newOfficeHours._id };

        try {
            await newOfficeHours.save();
            await user.save();
        } 
        catch(err) {
            res.status(422).send(err);
        }
        
        const list = await OfficeHours.find();
        res.send({ list: list, newOfficeHours: newOfficeHours });
    });


    app.get('/api/get_office_hours_list', async (req, res) => {
        const list = await OfficeHours.find();
        res.send(list);
    });


    app.post('/api/student_join_queue', requireLogin, async (req, res) => {
        const { studentName, courseName, studentGoogleId, topics } = req.body;
        const user = await User.findOne({ googleId: studentGoogleId });
        
        if(user.officeHoursJoined.course_name) {
            res.send("You cannot register to more than one office hours at the same time.")
        }

        const officeHours = await OfficeHours.findOne({ course_name: courseName });
        officeHours.queue.push({ student_name: studentName, studentGoogleId: studentGoogleId, topics: topics });

        user.officeHoursJoined = { course_name: courseName, array_location: officeHours.queue.length-1};

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


    app.post('/api/office_hours/remove_student_from_queue', requireLogin, async (req, res) => {
        /* 
         * TODO:
         ** WHEN YOU REMOVE A STUDENT YOU NEED TO:
         *** 1. REMOVE HIM FROM THE OH.QUEUE IN THE DB
         *** 2. FOR ALL THE ONES AFTER HIM: UPDATE THEIR ARRAY_LOCATION
         */
        const { courseId, studentId } = req.body;

        const officeHours = await OfficeHours.findOne({ _id: courseId });
        const queue = officeHours.queue;

        let i;
        let itemFound = false;
        //TODO: EDGE CASE FOR WHEN THE QUEUE ONLY HAS ONE USER --> I<QUEUE.LENGTH TODO://
        for(i=0; i<queue.length-1; i++) {
            if (queue[i].studentGoogleId === studentId) {
                itemFound = true;
            }
            if (itemFound) {
                officeHours.queue[i] = officeHours.queue[i+1];
                // const user = await User.findOne({ googleId: studentId });
            }
        }
        //TODO: MAKE SURE THAT ONLY PEOPLE WHO ARE IN THE QUEUE CAN SEE THE LEAVE QUEUE BUTTON TODO://
        officeHours.queue.pop();

        const user = await User.findOne({ googleId: studentId });
        user.officeHoursJoined = {};

        try { await officeHours.save(); await user.save(); }
        catch (err) { res.status(422).send(err); }

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

    app.get('/api/student/fetch_oh_joind', (req, res) => {
        res.send(req.user.officeHoursJoined);
    });

    app.post('/api/office_hours/update_edited_oh', requireLogin, async (req, res) => {
        const { course_name, date, start_time, end_time, location, notes, _id } = req.body;
        const editedOfficeHours = await OfficeHours.findOne({ _id: _id });

        editedOfficeHours.course_name = course_name;
        editedOfficeHours.date = date;
        editedOfficeHours.start_time = start_time;
        editedOfficeHours.end_time = end_time;
        editedOfficeHours.location = location;
        editedOfficeHours.notes = notes;

        try {
            await editedOfficeHours.save();
        } 
        catch(err) {
            res.status(422).send(err);
        }
        
        const list = await OfficeHours.find();
        res.send({ list: list, newOfficeHours: editedOfficeHours });
    });


    app.post('/api/student/update_edited_topics', requireLogin, async (req, res) => {
        const { studentIdInQueue, courseId, newTopics } = req.body;
        const editedOfficeHours = await OfficeHours.findOne({ _id: courseId });

        let queue = editedOfficeHours.queue;
        for (i = 0; i < queue.length; i++) {
            if (queue[i].studentGoogleId === studentIdInQueue) {
                queue[i].topics = newTopics;
            }
        }
        editedOfficeHours.queue = queue;

        try {
            await editedOfficeHours.save();
        } 
        catch(err) {
            res.status(422).send(err);
        }
        
        const list = await OfficeHours.find();
        res.send({ list: list });
    });


};


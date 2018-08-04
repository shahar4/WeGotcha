/*
 * Structure: Define an => func, immediatelly export it, wire it up to the
 * express App object inside of the top level index.js file
 */
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const OfficeHours = mongoose.model('officeHours');

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
};


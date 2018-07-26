const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            new User({ googleId: profile.id }).save();
            // console.log("looking into stuff");
            // User.findOne({ googleId: profile.id }).then(existingUser => {
            //     console.log("looks interesting");
            //     if (existingUser) {
            //         console.log("user exists");
            //         done(null, existingUser);
            //     } else {
            //         console.log("user doesn't exists");
            //         new User({ googleId: profile.id }).save().then(user => done(null, user));
            //     }
            // });
        }
    )
);
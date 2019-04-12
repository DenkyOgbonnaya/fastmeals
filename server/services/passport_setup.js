const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../model/userModel')
require('dotenv').config();

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}, (AccessToken, refreshToken, profile, done) => {
    User.findOne({oauthId: profile.id})
    .then(currentUser => {
        if(!currentUser){
            User.create({
                userName: profile.name.givenName,
                email: profile.emails[0].value,
                oauthId: profile.id
            })
            .then(newUser => {
                done(null, newUser);
            })
        }else {
            done(null, currentUser);
        }
    })
}))
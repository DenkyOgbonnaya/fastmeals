const oauthRouter = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

oauthRouter.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}))
oauthRouter.get('/auth/google/redirect', passport.authenticate('google', {session: false}), (req, res) => {
    jwt.sign(
        {currentUser: req.user},
        process.env.SECRET_KEY, 
        {expiresIn:'24hrs'}, (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.redirect(`https://fastmeals.herokuapp.com?token=${token}`)
        }
    });
})

module.exports = oauthRouter;
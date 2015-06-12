"use strict";

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('./server/models'),
    siteRoutes = require('./server/routes/site-routes'),
    jwt = require('jsonwebtoken')
;

// Passport allows you to use multiple login strategies on the same site
//passport.use(new LocalStrategy(Account.authenticate()));
passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {

        // we only have one user name admin, typically, go to DB to get these usernames and passwords
        models.User.find({
            where: {
                email: username
            }
        }).then(function (user) {
            if (user) {
                //return done(null, {username: user.username});
                if (models.isPasswordValid(user.password, password)) {
                    user.password = null; // remove the password
                    // The user is found and the password is correct, now create a token.
                    var token = jwt.sign({username: user.email}, siteRoutes.getSecretToken(), {expiresInMinutes: 60*5});
                    var userModel = {
                        email: user.email,
                        token: token
                    };
                    return done(null, userModel); // supply Passport with the user that authenticated
                }
            }
            return done(null, false, {message: 'Invalid username or password'});
        }, function (err) {
            return done(err);
        });
    }
));
// only serialize the unique username to the session}));

//passport.serializeUser(Account.serializeUser());
//passport.serializeUser(function(user, done){
//    done(null, user.username);
//});
//
////passport.deserializeUser(Account.deserializeUser());, function(err){

//passport.deserializeUser(function(username, done){
//    done(null, {username: username});
//});

// FROM A passport.js file
// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    //done(null, user.id);
    //done(null, user.username); // only serialize the unique username to the
    done(null, user); // only serialize the unique username to the session
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
    // Go to database using var User = require('../models/user');, et al.
    //User.findById(id, function(err, user) {
    //    done(err, user);
    //}

    // TODO: check session first to see if the user exists rather than db

    models.User.find({
        where: {
            username: user.username
        }
    }).then(function (user) {
        done(null, user);
        //if (user) {
        //    return done(null, user);
        //} else {
        //    return done(null, false, { message: 'Invalid username or password'});
        //}
    }, function (err) {
        return done(err);
    });


    //done(null, {username: username});
});


module.exports = passport;

"use strict";

var path = require('path');

module.exports.index = function (req, res) {
    // relative to where this file is
    res.sendFile(path.join(__dirname, '/../../client/views/index.html'));
};

module.exports.notFound = function (req, res) {
    // relative to where this file is
    res.sendFile(path.join(__dirname, '/../../client/views/404.html'));
};

//exports.login = function (req, res) {
//    //res.render('login', {title: 'Login'});
//    //res.sendFile(path.join(__dirname, '/../../client/views/login.html'));
//
//    if (req.session.passport.user === undefined) {
//        res.sendFile(path.join(__dirname, '/../../client/views/login.html'));
//    } else {
//        res.sendFile(path.join(__dirname, '/../../client/views/user.html'), {title: 'Welcome!', user: req.user});
//    }
//};

module.exports.loginGet = function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client/views/login.html'));
};

module.exports.loginPost = function (req, res) {
    //var user = req.user;
    //if (user) {
    //    if (models.isPasswordValid(user.password, password)) {
    //        user.password = null; // remove the password
    //        // The user is found and the password is correct, now create a token.
    //        var token = jwt.sign({username: user.email}, getSecretToken(), {expiresInMinutes: 60*5});
    //        return res.json({
    //            success: true,
    //            message: 'Enjoy your token!',
    //            token: token
    //        });
    //    }
    //}
    //
    //res.send(req.user);
    res.send(req.user);
};

var getSecretToken = function () {
    return 'oiuadsfkljwerLKJAERLKAJSDooijsdfs234239230423';
};
module.exports.getSecretToken = getSecretToken;

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var models = require('../models');

module.exports.loginJwt = function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json(401, {error: 'Invalid username or password'});
        }

        var username = res.req.body.email;
        var password = res.req.body.password;

        // TODO: does this come from the db every time? What about session? State issues?
        models.User.find({
            where: {
                email: username
            }
        }).then(function (user) {
            if (user) {
                if (models.isPasswordValid(user.password, password)) {
                    user.password = null; // remove the password
                    // The user is found and the password is correct, now create a token.
                    var token = jwt.sign({username: user.email}, getSecretToken(), {expiresInMinutes: 60*5});
                    return res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
            return res.json(401, {error: 'Invalid username or password'});
        }, function (err) {
            return next(err);
        });
    })(req, res, next);
};

module.exports.isauth = function (req, res) {
    if (req.user) {
        res.json({isAuthenticated: true, user: req.user});
    } else {
        res.json({isAuthenticated: false});
    }
};

module.exports.logout = function (req, res) {
    //res.render('login', {title: 'Login'});
    //res.sendFile(path.join(__dirname, '/../../client/views/login.html'));

    if (req.session.passport.user === undefined) {
        res.sendFile(path.join(__dirname, '/../../client/views/login.html'));
    } else {
        res.sendFile(path.join(__dirname, '/../../client/views/user.html'), {title: 'Welcome!', user: req.user});
    }
};

module.exports.admin = function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client/views/index.html'));
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/signup');
};

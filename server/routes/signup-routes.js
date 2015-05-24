"use strict";

var models = require('../models');
var express = require('express');
var router = express.Router();
var path = require('path');

//router.get('/userexists', function (req, res) {
//    models.Actor.findAll({
//        where: {
//            actor_id: 1
//        }
//    }).then(function (actors) {
//        // Do something useful
//        res.sendFile(path.join(__dirname, '/../../client/views/index.html'));
//    });
//});

// Get Parent/Players info by parent email
router.post('/get/email', function (req, res) {
    // Get parent
    var parentEmail = req.body.parentEmail;
    if (!parentEmail) {
        return res.json(null);
    }
    models.Parent.find({
        where: {email: req.body.parentEmail}
    }).then(function (parent) {
        if (parent) {
            models.Player.findAll({
                where: {parent_id: parent.id}
            }).then(function (players) {
                res.json({parent: parent, players: players});
            });
        } else {
            res.json({parent: parent});
        }
    });
});

router.get('/save/profile', function (req, res) {
    // Get params
    var parentEmail = req.body.parentEmail;
    var parentFirstName = req.body.parentFirstName;
    var parentLastName = req.body.parentLastName;
    var parentPhone = req.body.parentPhone;
    var playerFirstName = req.body.playerFirstName;
    var playerLastName = req.body.playerLastName;
    var playerTeam = req.body.playerTeam;
    var playerPosition = req.body.playerPosition;
    if (!parentFirstName && !parentLastName && !parentPhone && !playerFirstName
        && !playerLastName && !playerTeam && !playerPosition) {
        return res.json({status: fail, message: 'Failed to save due to invalid parameter'});
    }
    //var parentEmail = "test533@tester.com";
    //var parentFirstName = "Joe";
    //var parentLastName = "Lowe";
    //var parentPhone = "1112223333";
    //var playerFirstName = "Dude";
    //var playerLastName = "Lowe";
    //var playerTeam = "Nuggets";
    //var playerPosition = "Defense";

    models.createParentAndPlayer(parentEmail, parentFirstName, parentLastName, parentPhone,
        playerFirstName, playerLastName, playerPosition, playerTeam)
        .then(function (result) {
            res.json(result);
        });
});

router.post('/get/packages', function (req, res) {
    models.Package.findAll()
        .then(function (packages) {
            res.json({packages: packages});
        });
});

module.exports = router;
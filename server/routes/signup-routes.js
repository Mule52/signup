"use strict";

var models = require('../models');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/userexists', function (req, res) {
    models.Actor.findAll({
        where: {
            actor_id: 1
        }
    }).then(function (actors) {
        // Do something useful
        res.sendFile(path.join(__dirname, '/../../client/views/index.html'));
    });
});

// Get Parent/Players info by parent email
router.post('/email', function (req, res) {
    // Get parent
    models.Parent.find({
        where: {email: req.body.parentEmail}
    }).then(function (parent) {
        models.Player.findAll({
            where: {parent_id: 1}
        }).then(function (players) {
            res.json({parent: parent, players: players});
        });
    });
});


module.exports = router;
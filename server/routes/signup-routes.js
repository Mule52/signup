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
    var parentEmail = req.body.parentEmail;
    if (!parentEmail){
        return res.json(null);
    }
    models.Parent.find({
        where: {email: req.body.parentEmail}
    }).then(function (parent) {
        if (parent){
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


module.exports = router;
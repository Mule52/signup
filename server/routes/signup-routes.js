"use strict";

var models = require('../models');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/userexists', function(req, res) {
    models.Actor.findAll({
        where: {
            actor_id: 1
        }
    }).then(function(actors){
        // Do something useful
        res.sendFile(path.join(__dirname, '/../../client/views/index.html'));
    });
});


module.exports = router;
"use strict";

var path = require('path');

exports.index = function(req, res){
    // relative to where this file is
    res.sendFile(path.join(__dirname, '/../../client/views/index.html'));
};

exports.notFound = function(req, res){
    // relative to where this file is
    res.sendFile(path.join(__dirname, '/../../client/views/404.html'));
};

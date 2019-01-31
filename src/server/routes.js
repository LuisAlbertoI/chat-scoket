const express = require('express');
const routes = express.Router();
const path = require('path');

routes.use(express.static(path.join(__dirname, '../public')));

routes.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));

});

module.exports = routes
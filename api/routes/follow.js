'use strict'

var express = require('express');
var FollowController = require('../controllers/follow');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//api.get('/pruebas', md_auth.ensureAuth, FollowController.pruebas2);
api.post('/follow',md_auth.ensureAuth ,FollowController.saveFollow);
api.delete('/follow/:id', md_auth.ensureAuth, FollowController.deleteFollow);
api.get('/following/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowingUsers);

module.exports = api;

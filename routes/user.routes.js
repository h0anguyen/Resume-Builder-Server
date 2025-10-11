const express = require('express');
const User = require('../models/user.model');
const UserController = require('../controller/user.controller');

const userController = new UserController(User);

module.exports = userController.router;
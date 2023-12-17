const actions = require('./jwt/actions.test');

const express = require('express');

const api_tests = express.Router();

api_tests.use('/actions' , actions );

module.exports = api_tests;
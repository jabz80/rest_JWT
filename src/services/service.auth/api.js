const express = require('express');
const api = express.Router();

// / api / auth 

var users = [];

api.get('/' , ( req , res ) => {
    res.send('/api/auth');
});

api.post('/register' , ( req , res ) => {

});

api.post('/login' , ( req , res ) => {

})

module.exports = api;
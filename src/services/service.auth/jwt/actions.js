// jwt.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'yourSecretKey'; // Replace with a secure secret key
const saltRounds = 10;

const generateToken = (data) => {
  const payload = {
    data
  };

  // creates the token.
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};



const verifyToken = (token) => {
    try {
        //returns the payload.
      return jwt.verify(token, secretKey);
    } catch (err) {
      return null;
    }
  };
  
  const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds);
  };
  
  const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  };
  
  module.exports = { generateToken, verifyToken, hashPassword, comparePassword };
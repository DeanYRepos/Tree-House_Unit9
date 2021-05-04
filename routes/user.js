'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models')
const { authenticateUser } = require('../middleware/authen-users');
const User = db.User;

function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        // Forward error to the global error handler
        next(error);
      }
    }
  }
  //return the currently authenticated user along with a 200 HTTP status code.
  router.get('/users', authenticateUser, asyncHandler(async(req, res) => {
     const user = req.currentUser;
   
     res.status(200).json({
      firstName: user.firstName,
      lastName:  user.lastName,
      emailAddress: user.emailAddress,

     });
    
     console.log(user);
     
   }));

  router.post('/users', asyncHandler(async (req,res) => {

    try {
     await User.create(req.body);
      res.status(201).location('/').end();
    } catch(error) {
      
      console.log('ERROR: ', error);
   
    }
  }));

 
  module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models')
const { authenticateUser } = require('../middleware/authen-users');
const{ asyncHandler } = require('../middleware/async-handler');
const User = db.User;


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
    
     await User.create(req.body);
      res.status(201).location('/').end();
    
  }));

 
  module.exports = router;
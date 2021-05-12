'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models')
const { authenticateUser } = require('../middleware/authen-users');
const{ asyncHandler } = require('../middleware/async-handler');
const User = db.User;


  //returns the currently authenticated user along with a 200 HTTP status code.
  router.get('/users', authenticateUser, asyncHandler(async(req, res) => {
     const user = req.currentUser;
   
     res.status(200).json({
       
      firstName: user.firstName,
      lastName:  user.lastName,
      emailAddress: user.emailAddress,

     });
    
     console.log(user);
     
   }));
   //Posts a new user and handles 'SequelizeValidationError' and  'SequelizeUniqueConstraintError' errors
  router.post('/users', asyncHandler(async (req,res) => {
    try{

      await User.create(req.body);
      res.location('/')
      res.status(201).end();
      

    } catch(error){
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
      console.log(error);
    } else {
       
      throw error; 
      
      
    }
  
  }
  }));

 
  module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models')
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
  router.get('/users', asyncHandler(async(res,req) => {
     const user = await User.findAll(req.currentUser);
   
     res.status(200).json({
      firstName: user.firstName,
      lastName:  user.lastName,
      emailAddress: user.emailAddress,

     });
    
     console.log(user);
     
   }));

  router.post('/', asyncHandler(async(res,req) => {

    try{
     await User.create(req.body);
      res.status(201).location('/').end();
    }catch(error){
      console.log('ERROR: ', error.name);
      next();
    }
  }));

  router.get('/courses', asyncHandler(async (req,res) => {

    
  }))
  module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();
const{ User, Course } = require('./models');

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
     const user = req.authUser;
    return res.status(200).json(user);
    
     
     
   }));

  router.post('/users', asyncHandler(async(res,req) => {

    try{
      const user = await User.create(req.body);
      res.status(201).json(user)
      res.location('/');
    }catch(error){
      console.log('ERROR: ', error.name);
    }
  }));

  router.get('/courses', asyncHandler(async (req,res) => {

    
  }))
  module.exports = router;
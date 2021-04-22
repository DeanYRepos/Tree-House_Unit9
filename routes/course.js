'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');
const user = require('../models').User;
const Course = db.Course;

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

  router.get('/courses', asyncHandler(async (res,req) => {
      const courses = await Course.findAll({
        include:[
          {
            model: user,
          }
        ],
      });
       res.res.status(200).json(courses);
       
  }))
  router.get('/courses/:id', asyncHandler(async(res, req) => {
    const course = await Course.findAll(req.params.id);
    res.json(course);
    console.log(course);
   
  }))

  module.exports = router;
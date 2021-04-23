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

  router.get('/courses', asyncHandler(async (req,res) => {
      const courses = await Course.findAll({
        include:[
          {
            model: user,
            as: 'User',
          }
        ],
      });
       res.status(200).json(courses);
       
  }));
  
  router.get('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course){
      res.json(course);
      console.log(course);
    } else {
        res.status(404);
    }
  }));

  router.post('/courses', asyncHandler(async (req, res) => {
    
  }))
  module.exports = router;
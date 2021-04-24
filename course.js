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
    const course = await Course.create(req.body);
    res.status(201).location(`/courses/${course.id}`).json({message: "Course Created"}).end();

  }));

  router.put('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if(course){
      
  
      await Course.update({
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
      }, {
        where: {
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded
     } }

  
      );
      res.status(204).end();

    }else{
      res.status(404).json({message: "Course not found"})
    }
  }));
  module.exports = router;
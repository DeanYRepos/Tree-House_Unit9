'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');
const User = require('../models').User;
const { authenticateUser } = require('../middleware/authen-users');
const{ asyncHandler } = require('../middleware/async-handler');
const Course = db.Course;



  router.get('/courses',  asyncHandler(async (req,res) => {
      const courses = await Course.findAll({
        attributes: {
          exclude: ['password','createdAt', 'updatedAt']
        },
        include:[
          {
            model: User,
            as: 'User',   
            attributes: {
             exclude: ['password','createdAt', 'updatedAt']
           },
          }
        ],
      });
       res.status(200).json(courses);
       
  }));
  
  router.get('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id,{
      attributes: {
        exclude: ['password','createdAt', 'updatedAt']
      },
      include: [
        {
          model: User,
          as:'User',   
          attributes: {
           exclude: ['password','createdAt', 'updatedAt']
         },
        }
      ]
    });
    if (course){
      res.status(200).json(course);
      console.log(course);
    } else {
        res.status(404);
    }
    
  }));

  router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.create(req.body);
    res.status(201).location(`/courses/${course.id}`).json({message: "Course Created"}).end();

  }));

  router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    const user = req.currentUser.id;
    
      console.log(course);
    // console.log(user);
      if(course.userId === user ){
  
        // if( course.userId === user.id){
    
          await Course.update({

            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            

          }, {
            where: {
            
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            
         } }
         
      
          );
        //   if( course.userId === user.id){
          res.status(204).end();
        // } else {
        //   res.status(403);
        //  }
  
        }else {
             res.status(403).end();
            }
  }));

  router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    const user = req.currentUser.id;
    if(course.userId === user){
      await course.destroy();
      res.status(204).end();
    } else{
      res.status(403).json({message: "Course not found"});
    }
  
  }))


  module.exports = router;
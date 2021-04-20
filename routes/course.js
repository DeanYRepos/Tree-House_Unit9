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

  router.get('/', asyncHandler(async (res,req) => {
      const courses = await Course.findAll({
        include:[
          {
            model: user,
          }
        ],
      });
        res.json(courses).status(200);
       
  }))

  module.exports = router;
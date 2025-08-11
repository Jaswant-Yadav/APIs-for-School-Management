
const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const controller = require('../controllers/schoolsController');

router.post(
  '/addSchool',
  [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('address').trim().notEmpty().withMessage('address is required'),
    body('latitude')
      .notEmpty()
      .withMessage('latitude required')
      .isFloat({ min: -90, max: 90 }).withMessage('latitude must be a number between -90 and 90'),
    body('longitude')
      .notEmpty()
      .withMessage('longitude required')
      .isFloat({ min: -180, max: 180 }).withMessage('longitude must be a number between -180 and 180')
  ],
  controller.addSchool
);

router.get(
  '/listSchools',
  [
    query('latitude').notEmpty().withMessage('latitude required').isFloat({ min: -90, max: 90 }),
    query('longitude').notEmpty().withMessage('longitude required').isFloat({ min: -180, max: 180 })
  ],
  controller.listSchools
);

module.exports = router;

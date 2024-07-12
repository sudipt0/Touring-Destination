const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

/* Start: Middleware */
// router.param('id', tourController.checkID);

/* End: Middleware */

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours) // middleware used to validate JWT token (authController.protect)
  // .post(tourController.checkBody, tourController.createTour);
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );
router
  .route('/:id')
  .get(authController.protect, tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deteleTour,
  );

module.exports = router;

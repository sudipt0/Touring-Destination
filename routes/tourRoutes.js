const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

/* Start: Middleware */
// router.param('id', tourController.checkID);

/* End: Middleware */

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  // .post(tourController.checkBody, tourController.createTour);
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deteleTour);

module.exports = router;

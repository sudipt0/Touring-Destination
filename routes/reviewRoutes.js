const express = require('express');

const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true }); // mergeParams is used to get access to the tourId from the tour router

// POST /tours/234fad4/reviews
// GET /tours/234fad4/reviews
// GET /reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    reviewController.updateOneReview,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview,
  );

module.exports = router;

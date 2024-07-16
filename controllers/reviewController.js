const Review = require('../models/reviewModel');
// const APIFeature = require('../utils/apiFeatures');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.getAllReviews = catchAsync(async (req, res) => {
//   // EXECUTE QUERY
//   let filter = {};
//   if (req.params.tourId) {
//     filter = { tour: req.params.tourId };
//   }
//   const features = new APIFeature(Review.find(filter), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();

//   const reviews = await features.query;
//   /* let filter = {};

//   if (req.params.tourId) {
//     filter = { tour: req.params.tourId };
//   }
//   const reviews = await Review.find(filter); */

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews: reviews,
//     },
//   });
// });
exports.getAllReviews = factory.getAll(Review);

/* exports.createReview = catchAsync(async (req, res) => {
  // Get it from URL and JWT token
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
}); */
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateOneReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

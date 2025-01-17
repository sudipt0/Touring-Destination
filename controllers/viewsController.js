const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { token } = require('morgan');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  // 2) Build template
  //   console.log(tour);
  // 3) Render template using data from
  res
    .setHeader(
      'Content-Security-Policy',
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ",
    )
    .status(200)
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res
    .setHeader(
      'Content-Security-Policy',
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ",
    )
    .status(200)
    .render('login', {
      title: 'Log into your account',
    });
});

exports.getAccount = (req, res) => {
  res
    .setHeader(
      'Content-Security-Policy',
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ",
    )
    .status(200)
    .render('account/me', {
      title: 'Your account',
    });
};

exports.signup = (req, res) => {
  res
    .setHeader(
      'Content-Security-Policy',
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ",
    )
    .status(200)
    .render('signup', {
      title: 'Create your account',
    });
};

exports.forgotPassword = (req, res) => {
  res
    .setHeader(
      'Content-Security-Policy',
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ",
    )
    .status(200)
    .render('forgotPassword', {
      title: 'Forgot your password?',
    });
};
exports.resetPassword = (req, res) => {
  res
    .setHeader(
      'Content-Security-Policy',
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ",
    )
    .status(200)
    .render('resetPassword', {
      title: 'Reset your password',
      token: req.params.token,
    });
};

const User = require('../models/userModel');
// const APIFeature = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

/* const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
}; */
// Optimization of the above function
const filterObj = (obj, ...allowedFields) =>
  Object.keys(obj).reduce((newObj, key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});

// exports.getAllUsers = catchAsync(async (req, res, next) => {
//   const features = new APIFeature(User.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();

//   const users = await features.query;

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     data: {
//       users: users,
//     },
//   });
// });
exports.getAllUsers = factory.getAll(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined, Please use /signup instead',
  });
};
// Get my profile (after login)
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-my-password',
        400,
      ),
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // 4) Send response
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
/* Delete my profile (after login) */
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

/* exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-__v');
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
}); */

exports.getUser = factory.getOne(User);
/* exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined from user controller',
  });
}; */
// Do not update passwords with this
exports.updateUser = factory.updateOne(User);

/* exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
 */
exports.deleteUser = factory.deleteOne(User);

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.use(authController.protect);
// All routes after this middleware are protected

router.route('/update-my-password').patch(authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);

router.route('/update-me').patch(userController.updateMe);
router.route('/delete-me').delete(userController.deleteMe);

router.route('/').get(userController.getAllUsers);

router.use(authController.restrictTo('admin'));
// All routes after this middleware are restricted to admin
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

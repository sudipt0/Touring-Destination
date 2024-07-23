const express = require('express');

const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.signup);
router.get('/forgot-password', viewsController.forgotPassword);
router.get('/reset-password/:token', viewsController.resetPassword);

router.get('/account', authController.protect, viewsController.getAccount);

module.exports = router;

const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();


router.get('/', bookingController.createBookingCheckout, authController.isLoggedIn, viewsController.getConsultants);
router.get('/about', authController.isLoggedIn, viewsController.getAbout);
router.get('/works', authController.isLoggedIn, viewsController.getWorks);
router.get('/terms', authController.isLoggedIn, viewsController.getTerms);
router.get('/users/:slug', authController.isLoggedIn, viewsController.getConsultant);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignup);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-bookings', 
            // bookingController.getCheckoutSession,
            authController.protect, 
            viewsController.getMyBookings);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

module.exports = router;
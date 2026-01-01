const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

// @route   POST api/reviews
// @desc    Submit a review for an order
// @access  Private (Student)
router.post('/', auth, reviewController.addReview);

// @route   GET api/reviews/vendor/:vendorId
// @desc    Get reviews for a specific vendor
// @access  Private
router.get('/vendor/:vendorId', auth, reviewController.getVendorReviews);

module.exports = router;

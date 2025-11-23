const express = require('express');
const router = express.Router();
const outletController = require('../controllers/outletController');
const auth = require('../middleware/auth');

// @route   GET api/outlets
// @desc    Get all outlets (with search/filter/sort)
// @access  Public
router.get('/', outletController.getOutlets);

// @route   GET api/outlets/:id
// @desc    Get outlet by ID
// @access  Private
router.get('/:id', auth, outletController.getOutletById);

// @route   GET api/outlets/:id/menu
// @desc    Get outlet menu
// @access  Private
router.get('/:id/menu', auth, outletController.getOutletMenu);

module.exports = router;

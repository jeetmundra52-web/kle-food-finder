const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private (Student)
router.post('/', auth, orderController.createOrder);

// @route   GET api/orders
// @desc    Get all orders for logged in user
// @access  Private
router.get('/', auth, orderController.getOrders);

// @route   PUT api/orders/:id/status
// @desc    Update order status
// @access  Private (Vendor)
router.put('/:id/status', auth, orderController.updateOrderStatus);

module.exports = router;

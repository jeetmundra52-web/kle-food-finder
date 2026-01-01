const Order = require('../models/Order');
const User = require('../models/User');

// Create a new order
exports.createOrder = async (req, res) => {
    const { vendorId, items, totalAmount, paymentMethod } = req.body;

    try {
        const order = new Order({
            student: req.user.id,
            vendor: vendorId,
            items,
            totalAmount,
            paymentMethod
        });

        await order.save();

        // Populate student details for the socket event
        const populatedOrder = await Order.findById(order._id).populate('student', 'name email');

        // Emit socket event to the specific vendor's room
        if (req.io) {
            req.io.to(vendorId).emit('newOrder', populatedOrder);
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get orders for a user (student or vendor)
exports.getOrders = async (req, res) => {
    try {
        let orders;
        const user = await User.findById(req.user.id);

        if (user.role === 'vendor') {
            orders = await Order.find({ vendor: req.user.id }).sort({ date: -1 }).populate('student', 'name email');
        } else {
            orders = await Order.find({ student: req.user.id }).sort({ date: -1 }).populate('vendor', 'name');
        }

        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update order status (Vendor only)
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        // Ensure user is the vendor of this order
        console.log(`[OrderAuth] OrderVendor: ${order.vendor}, RequestUser: ${req.user.id}`);
        if (String(order.vendor) !== String(req.user.id)) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

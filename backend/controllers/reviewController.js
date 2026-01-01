const Review = require('../models/Review');
const Order = require('../models/Order');
const User = require('../models/User');

exports.addReview = async (req, res) => {
    // req.body should be an object with: { orderId, ratings: [ { foodItemName, rating, comment } ] }
    // OR simpler: just one review per item?
    // The requirement says: "Student must be allowed to give a review ONLY after order is completed"
    // "Review includes: Star rating ... Optional text feedback"

    // We'll assume the client sends an array of reviews for the items in the order.
    const { orderId, reviews } = req.body; // reviews: [{ foodItemName, rating, comment }]

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // 1. Validate Order Status
        if (order.status !== 'completed') {
            return res.status(400).json({ msg: 'Order must be completed to submit a review' });
        }

        // 2. Validate Single Submission
        if (order.isRated) {
            return res.status(400).json({ msg: 'Order has already been rated' });
        }

        // 3. Validate User
        const s1 = String(order.student);
        const s2 = String(req.user.id);
        console.log(`[ReviewAuthDebug] '${s1}' vs '${s2}' match? ${s1 === s2}`);
        if (s1 !== s2) {
            console.log(`[ReviewAuthFail] Mismatch!`);
            return res.status(401).json({ msg: 'User not authorized to review this order' });
        }

        const vendor = await User.findById(order.vendor);
        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }

        // Process each review
        for (const reviewData of reviews) {
            // Validate rating range
            if (reviewData.rating < 1 || reviewData.rating > 5) {
                continue; // Or return error? Let's skip invalid ones or clamp. Better to skip.
            }

            // Create Review Document
            const review = new Review({
                order: orderId,
                student: req.user.id,
                vendor: order.vendor,
                foodItemName: reviewData.foodItemName,
                rating: reviewData.rating,
                comment: reviewData.comment
            });
            await review.save();

            // Update Vendor Menu Item Stats
            // Find the specific menu item
            const menuItem = vendor.menu.find(item => item.name === reviewData.foodItemName);
            if (menuItem) {
                // Calculate new average
                // New Average = ((Current Avg * Total Reviews) + New Rating) / (Total Reviews + 1)
                const currentTotal = menuItem.totalReviews || 0;
                const currentAvg = menuItem.averageRating || 0;

                const newTotal = currentTotal + 1;
                const newAvg = ((currentAvg * currentTotal) + reviewData.rating) / newTotal;

                menuItem.totalReviews = newTotal;
                menuItem.averageRating = newAvg;
            }
        }

        // Save vendor with updated menu
        await vendor.save();

        // Mark order as rated
        order.isRated = true;
        await order.save();

        res.json({ msg: 'Reviews submitted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


exports.getVendorReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ vendor: req.params.vendorId })
            .populate('student', 'name')
            .sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

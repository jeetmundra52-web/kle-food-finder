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
        // 3. Validate User
        const s1 = String(order.student);
        const s2 = String(req.user.id);
        console.log(`[ReviewAuthDebug] Checking authorization: Order Student ID='${s1}', Request User ID='${s2}'`);

        if (s1 !== s2) {
            console.error(`[ReviewAuthFail] ID Mismatch! Student who ordered: ${s1}, Student trying to review: ${s2}`);
            return res.status(401).json({ msg: 'User not authorized to review this order' });
        }

        const vendor = await User.findById(order.vendor);
        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }

        const submittedReviews = [];

        // Process each review
        for (const reviewData of reviews) {
            // Validate rating range
            if (reviewData.rating < 1 || reviewData.rating > 5) {
                console.warn(`[ReviewAdd] Skipping invalid rating: ${reviewData.rating} for item ${reviewData.foodItemName}`);
                continue;
            }

            // Create Review Document
            const review = new Review({
                order: orderId,
                student: req.user.id,
                vendor: order.vendor,
                foodItemName: reviewData.foodItemName,
                rating: parseInt(reviewData.rating), // Ensure number
                comment: reviewData.comment
            });
            const savedReview = await review.save();
            submittedReviews.push(savedReview);

            // Update Vendor Menu Item Stats
            const menuItem = vendor.menu.find(item => item.name === reviewData.foodItemName);
            if (menuItem) {
                const currentTotal = menuItem.totalReviews || 0;
                const currentAvg = menuItem.averageRating || 0;

                const newTotal = currentTotal + 1;
                const newAvg = ((currentAvg * currentTotal) + parseInt(reviewData.rating)) / newTotal;

                menuItem.totalReviews = newTotal;
                menuItem.averageRating = newAvg;
                console.log(`[ReviewAdd] Updated stats for ${menuItem.name}: New Avg=${newAvg.toFixed(2)}, Total=${newTotal}`);
            }
        }

        // Save vendor with updated menu
        await vendor.save();

        // Mark order as rated
        order.isRated = true;
        await order.save();

        // Emit real-time events via Socket.io
        if (req.io) {
            // 1. Notify all students on the outlet page to update ratings
            req.io.to(String(order.vendor)).emit('ratingUpdated', {
                vendorId: order.vendor,
                menu: vendor.menu
            });
            console.log(`[Socket] Emitted ratingUpdated for outlet ${order.vendor}`);

            // 2. Notify the vendor specifically with new reviews
            // We'll populate the student name for the review event
            const student = await User.findById(req.user.id).select('name');
            submittedReviews.forEach(rev => {
                const revObj = rev.toObject();
                revObj.student = { name: student.name };
                req.io.to(String(order.vendor)).emit('newReview', revObj);
            });
            console.log(`[Socket] Emitted newReview events for vendor ${order.vendor}`);
        }

        res.json({ msg: 'Reviews submitted successfully', reviews: submittedReviews });

    } catch (err) {
        console.error('[ReviewAddError]', err.message);
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

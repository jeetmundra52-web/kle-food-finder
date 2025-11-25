const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');
require('dotenv').config();

const debugData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check Vendor Offers
        const vendor = await User.findOne({ email: 'doughpaze@kletech.ac.in' });
        if (vendor) {
            console.log(`\nVendor: ${vendor.name} (${vendor._id})`);
            console.log(`Offers in DB: ${vendor.offers.length}`);
            vendor.offers.forEach(o => console.log(`- ${o.code}: ${o.discount}% off (Valid until: ${o.validUntil})`));
        } else {
            console.log('Vendor not found');
        }

        // Check Orders
        const orders = await Order.find({ vendor: vendor._id });
        console.log(`\nTotal Orders for Vendor: ${orders.length}`);
        let revenue = 0;
        orders.forEach(o => {
            console.log(`- Order ${o._id}: Status=${o.status}, Amount=₹${o.totalAmount}`);
            if (o.status === 'completed') revenue += o.totalAmount;
        });
        console.log(`Calculated Revenue (Completed only): ₹${revenue}`);

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

debugData();

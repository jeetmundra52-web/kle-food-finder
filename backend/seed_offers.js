const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const offers = [
    { code: "SPRINT3", discount: 20, description: "Sprint 3 Special", validUntil: "2025-12-31" },
    { code: "WELCOME50", discount: 50, description: "Welcome Offer", validUntil: "2025-12-31" },
    { code: "we", discount: 35, description: "Weekend Special", validUntil: "2025-12-31" },
    { code: "wel50", discount: 10, description: "Welcome Back", validUntil: "2025-12-31" },
    { code: "welll30", discount: 20, description: "Wellness Discount", validUntil: "2025-12-31" },
    { code: "jeet", discount: 10, description: "Student Special", validUntil: "2025-12-31" },
    { code: "TESTCODE", discount: 25, description: "Test Offer", validUntil: "2025-12-31" }
];

const seedOffers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const vendor = await User.findOne({ email: 'doughpaze@kletech.ac.in' });
        if (!vendor) {
            console.log('Vendor not found');
            process.exit(1);
        }

        console.log(`Found vendor: ${vendor.name}`);
        console.log(`Clearing existing offers...`);

        vendor.offers = offers;
        await vendor.save();

        console.log(`✅ Successfully added ${vendor.offers.length} offers!`);

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

seedOffers();

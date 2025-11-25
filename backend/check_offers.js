const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkOffers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const vendor = await User.findOne({ email: 'doughpaze@kletech.ac.in' });
        if (vendor) {
            console.log(`Vendor: ${vendor.name}`);
            console.log(`Offers Count: ${vendor.offers.length}`);
            console.log('Offers:', vendor.offers.map(o => o.code));
        } else {
            console.log('Vendor not found');
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

checkOffers();

const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkVendors = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const vendors = await User.find({ role: 'vendor' });
        console.log(`\nTotal Vendors Found: ${vendors.length}`);

        vendors.forEach(v => {
            console.log(`- ${v.name} (ID: ${v._id})`);
            console.log(`  Menu Items: ${v.menu.length}`);
            console.log(`  Offers: ${v.offers.length}`);
            console.log('---');
        });

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

checkVendors();

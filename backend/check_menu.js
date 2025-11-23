const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkMenu = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const vendor = await User.findOne({ name: 'Doughpaze' });
        if (vendor) {
            console.log(`Vendor: ${vendor.name}`);
            console.log(`Menu Items: ${vendor.menu.length}`);
            console.log(JSON.stringify(vendor.menu, null, 2));
        } else {
            console.log('Vendor Doughpaze not found');
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

checkMenu();

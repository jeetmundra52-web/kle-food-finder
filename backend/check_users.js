const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const userId = '6922df65519c15e469872270'; // The ID from the order
        const user = await User.findById(userId);

        if (user) {
            console.log(`User ${userId} FOUND: ${user.name}`);
        } else {
            console.log(`User ${userId} NOT FOUND`);
        }

        const allUsers = await User.find({});
        console.log(`Total Users in DB: ${allUsers.length}`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUsers();

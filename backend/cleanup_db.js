const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const deleteInvalidUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const emailToDelete = 'test1763879274923@example.com';
        const result = await User.deleteOne({ email: emailToDelete });

        if (result.deletedCount === 1) {
            console.log(`Successfully deleted user with email: ${emailToDelete}`);
        } else {
            console.log(`User with email ${emailToDelete} not found.`);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

deleteInvalidUser();


const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const emailToCheck = '01fe23bcs142@kletech.ac.in';

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({ email: emailToCheck });
        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User NOT found');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        mongoose.connection.close();
    }
};

checkUser();

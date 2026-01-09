const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const seedTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = '01fe23bcs142@kletech.ac.in';
        const hashedPassword = await bcrypt.hash('123', 10);

        let user = await User.findOne({ email });
        if (user) {
            console.log('Test user already exists. Updating password...');
            user.password = hashedPassword;
            await user.save();
        } else {
            user = new User({
                name: 'Test Student',
                email: email,
                password: hashedPassword,
                role: 'student'
            });
            await user.save();
            console.log('Test student account created successfully');
        }

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

seedTestUser();

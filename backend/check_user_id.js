const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const id = '6922dce6519c15e46987226e'; // ID from frontend debug info
        console.log(`Checking ID: ${id}`);

        const user = await User.findById(id);
        if (user) {
            console.log(`User Found: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`);
            console.log(`Offers Count: ${user.offers ? user.offers.length : 0}`);
        } else {
            console.log('User NOT found with this ID');
        }

        const doughpaze = await User.findOne({ email: 'doughpaze@kletech.ac.in' });
        if (doughpaze) {
            console.log('---');
            console.log(`Real Doughpaze ID: ${doughpaze._id}`);
            console.log(`Offers: ${doughpaze.offers.length}`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

checkUser();

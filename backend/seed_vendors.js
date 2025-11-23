const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const vendors = [
    { name: "Doughpaze", email: "doughpaze@kletech.ac.in", password: "Doughpaze@123" },
    { name: "Ethnic Flavours", email: "ethnicflavours@kletech.ac.in", password: "Ethnic@123" },
    { name: "Spice Story", email: "spicestory@kletech.ac.in", password: "Spice@123" },
    { name: "Chow King", email: "chowking@kletech.ac.in", password: "Chow@123" },
    { name: "Gapa Gup", email: "gapagup@kletech.ac.in", password: "Gapa@123" },
    { name: "Chai Paani", email: "chaipaani@kletech.ac.in", password: "Chai@123" },
    { name: "Wow Franky, Wraps and Sandwich", email: "wowfrankywrapsandsandwich@kletech.ac.in", password: "WowFranky@123" },
    { name: "Crazy Corn Juice and Snacks", email: "crazycornjuiceandsnacks@kletech.ac.in", password: "CrazyCorn@123" },
    { name: "The Bake Hub", email: "thebakehub@kletech.ac.in", password: "BakeHub@123" },
    { name: "Thanda Garam", email: "thandagaram@kletech.ac.in", password: "Thanda@123" }
];

const seedVendors = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        for (const vendor of vendors) {
            // Check if vendor exists
            let user = await User.findOne({ email: vendor.email });
            if (user) {
                console.log(`Vendor ${vendor.name} already exists. Skipping.`);
                continue;
            }

            user = new User({
                name: vendor.name,
                email: vendor.email,
                password: vendor.password,
                role: 'vendor'
            });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(vendor.password, salt);

            await user.save();
            console.log(`Registered vendor: ${vendor.name}`);
        }

        console.log('Vendor seeding completed.');
        mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

seedVendors();

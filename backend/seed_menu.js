const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const menus = {
    "Doughpaze": [
        { name: "Donut", price: 60, category: "Dessert", isVeg: true, description: "Chocolate glazed donut" },
        { name: "Pizza Slice", price: 80, category: "Snacks", isVeg: true, description: "Cheese corn pizza" }
    ],
    "Ethnic Flavours": [
        { name: "Masala Dosa", price: 50, category: "Breakfast", isVeg: true, description: "Crispy dosa with potato filling" },
        { name: "Idli Vada", price: 40, category: "Breakfast", isVeg: true, description: "Steamed idli with crispy vada" }
    ],
    "Spice Story": [
        { name: "Chicken Biryani", price: 150, category: "Main Course", isVeg: false, description: "Spicy hyderabadi biryani" },
        { name: "Veg Pulao", price: 100, category: "Main Course", isVeg: true, description: "Mildly spiced rice with vegetables" }
    ],
    "Chow King": [
        { name: "Veg Noodles", price: 90, category: "Chinese", isVeg: true, description: "Stir fried noodles with veggies" },
        { name: "Manchurian", price: 100, category: "Chinese", isVeg: true, description: "Veg balls in spicy sauce" }
    ],
    "Gapa Gup": [
        { name: "Pani Puri", price: 40, category: "Chaat", isVeg: true, description: "6 pieces of spicy water balls" },
        { name: "Sev Puri", price: 50, category: "Chaat", isVeg: true, description: "Flat puris topped with potatoes and sev" }
    ],
    "Chai Paani": [
        { name: "Masala Chai", price: 15, category: "Beverages", isVeg: true, description: "Spiced indian tea" },
        { name: "Bun Maska", price: 30, category: "Snacks", isVeg: true, description: "Soft bun with butter" }
    ],
    "Wow Franky, Wraps and Sandwich": [
        { name: "Veg Franky", price: 60, category: "Wraps", isVeg: true, description: "Spicy vegetable roll" },
        { name: "Cheese Sandwich", price: 70, category: "Sandwich", isVeg: true, description: "Grilled cheese sandwich" }
    ],
    "Crazy Corn Juice and Snacks": [
        { name: "Sweet Corn", price: 40, category: "Snacks", isVeg: true, description: "Steamed sweet corn cup" },
        { name: "Watermelon Juice", price: 50, category: "Beverages", isVeg: true, description: "Fresh fruit juice" }
    ],
    "The Bake Hub": [
        { name: "Black Forest Cake", price: 450, category: "Cakes", isVeg: true, description: "500g chocolate cake" },
        { name: "Veg Puff", price: 20, category: "Snacks", isVeg: true, description: "Flaky pastry with veg filling" }
    ],
    "Thanda Garam": [
        { name: "Cold Coffee", price: 60, category: "Beverages", isVeg: true, description: "Chilled coffee with ice cream" },
        { name: "Hot Chocolate", price: 70, category: "Beverages", isVeg: true, description: "Rich hot cocoa" }
    ]
};

const seedMenu = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const vendors = await User.find({ role: 'vendor' });

        for (const vendor of vendors) {
            if (menus[vendor.name]) {
                vendor.menu = menus[vendor.name];
                await vendor.save();
                console.log(`Updated menu for ${vendor.name}`);
            }
        }

        console.log('Menu seeding completed.');
        mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

seedMenu();

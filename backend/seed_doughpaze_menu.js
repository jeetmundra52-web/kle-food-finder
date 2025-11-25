const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const menuItems = [
    // Pastries (Dessert)
    { name: "Pineapple Slice", price: 60, category: "Dessert", isVeg: true, description: "Fresh pineapple pastry" },
    { name: "Chocolate Truffle Slice", price: 70, category: "Dessert", isVeg: true, description: "Rich chocolate truffle" },
    { name: "Dutch Chocolate Slice", price: 80, category: "Dessert", isVeg: true, description: "Premium dutch chocolate" },
    { name: "Red Velvet Slice", price: 80, category: "Dessert", isVeg: true, description: "Classic red velvet" },
    { name: "Black Forest Slice", price: 60, category: "Dessert", isVeg: true, description: "Classic black forest" },
    { name: "Chocolate Brownie", price: 50, category: "Dessert", isVeg: true, description: "Fudgy chocolate brownie" },
    { name: "Chocolate Mud cake", price: 60, category: "Dessert", isVeg: true, description: "Decadent mud cake" },
    { name: "Lava Cup", price: 50, category: "Dessert", isVeg: true, description: "Molten chocolate lava cup" },
    { name: "Russian Ball", price: 30, category: "Dessert", isVeg: true, description: "Sweet russian ball" },

    // Cheese cake (Dessert)
    { name: "Blueberry cheese Slice", price: 100, category: "Dessert", isVeg: true, description: "Creamy blueberry cheesecake" },
    { name: "Philadelphia Slice", price: 100, category: "Dessert", isVeg: true, description: "Classic Philadelphia cheesecake" },
    { name: "Chocolate cheese slice", price: 100, category: "Dessert", isVeg: true, description: "Chocolate cheesecake" },

    // Mousse cake cups (Dessert)
    { name: "Chocolate mousse cup", price: 70, category: "Dessert", isVeg: true, description: "Airy chocolate mousse" },
    { name: "Mango mousse cup", price: 60, category: "Dessert", isVeg: true, description: "Fresh mango mousse" },
    { name: "Blueberry mousse cup", price: 70, category: "Dessert", isVeg: true, description: "Berry mousse cup" },

    // Doughnuts (Dessert)
    { name: "Choco Fudge", price: 60, category: "Dessert", isVeg: true, description: "Chocolate fudge doughnut" },
    { name: "Choco Mocha", price: 50, category: "Dessert", isVeg: true, description: "Coffee chocolate doughnut" },
    { name: "Irish Coffee", price: 50, category: "Dessert", isVeg: true, description: "Irish coffee flavor" },
    { name: "Blueberry Doughnut", price: 50, category: "Dessert", isVeg: true, description: "Blueberry glazed" },
    { name: "Butterscotch Delight", price: 50, category: "Dessert", isVeg: true, description: "Butterscotch topped" },

    // Nachos (Snacks)
    { name: "Regular Nachos", price: 89, category: "Snacks", isVeg: true, description: "Crispy nachos with dip" },
    { name: "Cheese Nachos", price: 119, category: "Snacks", isVeg: true, description: "Loaded cheese nachos" },
    { name: "Cheese Veggie Nachos", price: 129, category: "Snacks", isVeg: true, description: "Nachos with cheese and veggies" },

    // Pasta (Main Course)
    { name: "White Cheese Wonder Pasta", price: 149, category: "Main Course", isVeg: true, description: "Creamy white sauce pasta" },
    { name: "Red Arrabiatta Delight Pasta", price: 149, category: "Main Course", isVeg: true, description: "Spicy red sauce pasta" },
    { name: "Pink Panther Roar Pasta", price: 149, category: "Main Course", isVeg: true, description: "Mix sauce pasta" },

    // Burger (Main Course)
    { name: "Aloo Tikki Burger", price: 59, category: "Main Course", isVeg: true, description: "Classic potato patty burger" },
    { name: "Veg Spicy Sheekh Burger", price: 79, category: "Main Course", isVeg: true, description: "Spicy veg sheekh patty" },
    { name: "Spinach & Corn Burger", price: 99, category: "Main Course", isVeg: true, description: "Healthy spinach corn patty" },
    { name: "BurgFri Burger", price: 99, category: "Main Course", isVeg: true, description: "Burger with fries inside" },
    { name: "Crispy Paneer Burger", price: 99, category: "Main Course", isVeg: true, description: "Crispy fried paneer patty" },
    { name: "Paneer Tadka Burger", price: 99, category: "Main Course", isVeg: true, description: "Spicy paneer tadka" },
    { name: "Cheese Crunchy Burger", price: 99, category: "Main Course", isVeg: true, description: "Extra crunchy cheese burger" },

    // Pizza (Main Course)
    { name: "Original Margherita Pizza", price: 149, category: "Main Course", isVeg: true, description: "Classic cheese pizza" },
    { name: "Double Cheese Margherita Pizza", price: 199, category: "Main Course", isVeg: true, description: "Extra cheese margherita" },
    { name: "Veg Supreme Pizza", price: 99, category: "Main Course", isVeg: true, description: "Loaded veg pizza" },
    { name: "Country Side Pizza", price: 99, category: "Main Course", isVeg: true, description: "Rustic veggie pizza" },
    { name: "Vegetariana Pizza", price: 99, category: "Main Course", isVeg: true, description: "All veg pizza" },
    { name: "Cheese Corn Pizza", price: 149, category: "Main Course", isVeg: true, description: "Sweet corn and cheese" },
    { name: "Farm House Pizza", price: 149, category: "Main Course", isVeg: true, description: "Fresh farm veggies" },
    { name: "Olive Twist Pizza", price: 149, category: "Main Course", isVeg: true, description: "Olives and cheese" },
    { name: "Paneer Tadka Pizza", price: 229, category: "Main Course", isVeg: true, description: "Spicy paneer topping" },
    { name: "Paneer Tandoori Pizza", price: 199, category: "Main Course", isVeg: true, description: "Tandoori paneer flavor" },
    { name: "Spicy Chilly Paneer Pizza", price: 199, category: "Main Course", isVeg: true, description: "Chilly paneer fusion" },
    { name: "Veg Mexicana", price: 199, category: "Main Course", isVeg: true, description: "Mexican style spicy pizza" },
    { name: "Veg Extravaganza", price: 199, category: "Main Course", isVeg: true, description: "Overloaded veggies" },
    { name: "Cheese Chilli Corn Pizza", price: 199, category: "Main Course", isVeg: true, description: "Spicy corn and cheese" },
    { name: "Crowded House Pizza", price: 199, category: "Main Course", isVeg: true, description: "Everything on it" },
    { name: "Muffaletta Pizza", price: 229, category: "Main Course", isVeg: true, description: "Specialty pizza" },
    { name: "Cornachos Pizza", price: 199, category: "Main Course", isVeg: true, description: "Nachos on pizza" },

    // Garlic Bread (Snacks)
    { name: "Regular Garlic Bread", price: 99, category: "Snacks", isVeg: true, description: "Toasted garlic bread" },
    { name: "Cheesy Garlic Bread", price: 119, category: "Snacks", isVeg: true, description: "Garlic bread with cheese" },
    { name: "Veggie Garlic Bread", price: 129, category: "Snacks", isVeg: true, description: "Garlic bread with veggies" },

    // Fries (Snacks)
    { name: "Regular Fries", price: 79, category: "Snacks", isVeg: true, description: "Classic salted fries" },
    { name: "Spicy French Fries", price: 89, category: "Snacks", isVeg: true, description: "Peri peri spiced fries" },
    { name: "Cheese French Fries", price: 119, category: "Snacks", isVeg: true, description: "Fries topped with cheese" },

    // Quesadilla (Snacks)
    { name: "Cheese & Corn Quesadilla", price: 199, category: "Snacks", isVeg: true, description: "Mexican cheese corn tortilla" },
    { name: "BBQ Paneer Quesadilla", price: 199, category: "Snacks", isVeg: true, description: "BBQ paneer stuffed" }
];

const seedMenu = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const vendor = await User.findOne({ email: 'doughpaze@kletech.ac.in' });
        if (!vendor) {
            console.log('Vendor not found');
            process.exit(1);
        }

        console.log(`Found vendor: ${vendor.name}`);
        console.log(`Clearing ${vendor.menu.length} existing items...`);

        vendor.menu = menuItems;
        await vendor.save();

        console.log(`✅ Successfully added ${vendor.menu.length} new items!`);

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

seedMenu();

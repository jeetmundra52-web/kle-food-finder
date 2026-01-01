const User = require('../models/User');

// Helper to generate consistent mock data based on vendor name, BUT with real ratings if available
const getMockDetails = (name, menu = []) => {
    const images = [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1000&auto=format&fit=crop"
    ];

    // Simple hash to pick a consistent image
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Calculate real average rating from menu items
    let calculatedRating = 0;
    let totalRatedItems = 0;

    if (menu && menu.length > 0) {
        let sum = 0;
        menu.forEach(item => {
            if (item.averageRating > 0) {
                sum += item.averageRating;
                totalRatedItems++;
            }
        });
        if (totalRatedItems > 0) {
            calculatedRating = (sum / totalRatedItems).toFixed(1);
        }
    }

    return {
        image: images[hash % images.length],
        rating: calculatedRating > 0 ? calculatedRating : "New", // specific requirement from likely user intent
        deliveryTime: `${15 + (hash % 30)} min`,
        priceRange: "₹".repeat(1 + (hash % 3)),
        type: hash % 2 === 0 ? "Meals" : "Snacks",
        isVeg: hash % 3 === 0,
        isOpen: true,
        description: `Experience the best food at ${name}. Fresh, hygienic, and delicious.`
    };
};

exports.getOutlets = async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor' });

        let result = vendors.map(vendor => {
            const details = getMockDetails(vendor.name, vendor.menu);
            return {
                id: vendor._id,
                name: vendor.name,
                ...details,
                menu: [] // Placeholder menu
            };
        });

        const { search, type, isVeg, sort } = req.query;

        // Search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(o =>
                o.name.toLowerCase().includes(q) ||
                o.description.toLowerCase().includes(q)
            );
        }

        // Filter
        if (type) {
            result = result.filter(o => o.type === type);
        }
        if (isVeg === 'true') {
            result = result.filter(o => o.isVeg === true);
        }

        // Sort
        if (sort) {
            if (sort === 'rating') {
                result.sort((a, b) => {
                    const rA = a.rating === 'New' ? 0 : parseFloat(a.rating);
                    const rB = b.rating === 'New' ? 0 : parseFloat(b.rating);
                    return rB - rA;
                });
            } else if (sort === 'price_low') {
                result.sort((a, b) => a.priceRange.length - b.priceRange.length);
            } else if (sort === 'eta') {
                result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
            }
        }

        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getOutletById = async (req, res) => {
    try {
        const vendor = await User.findById(req.params.id);
        if (!vendor || vendor.role !== 'vendor') {
            return res.status(404).json({ msg: 'Outlet not found' });
        }
        const details = getMockDetails(vendor.name, vendor.menu);
        res.json({
            id: vendor._id,
            name: vendor.name,
            ...details,
            menu: vendor.menu,
            offers: vendor.offers || []
        });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Outlet not found' });
        }
        res.status(500).send('Server error');
    }
};

exports.getOutletMenu = async (req, res) => {
    try {
        const vendor = await User.findById(req.params.id);
        if (!vendor || vendor.role !== 'vendor') {
            return res.status(404).json({ msg: 'Outlet not found' });
        }
        res.json(vendor.menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add Menu Item
exports.addMenuItem = async (req, res) => {
    try {
        const vendor = await User.findById(req.user.id);
        if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });

        const newItem = req.body;
        vendor.menu.push(newItem);
        await vendor.save();

        res.json(vendor.menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete Menu Item
exports.deleteMenuItem = async (req, res) => {
    try {
        const vendor = await User.findById(req.user.id);
        if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });

        vendor.menu = vendor.menu.filter(item => item._id.toString() !== req.params.itemId);
        await vendor.save();

        res.json(vendor.menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add Offer
exports.addOffer = async (req, res) => {
    try {
        const vendor = await User.findById(req.user.id);
        if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });

        const newOffer = req.body;
        vendor.offers.push(newOffer);
        await vendor.save();

        res.json(vendor.offers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete Offer
exports.deleteOffer = async (req, res) => {
    try {
        const vendor = await User.findById(req.user.id);
        if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });

        vendor.offers = vendor.offers.filter(offer => offer._id.toString() !== req.params.offerId);
        await vendor.save();

        res.json(vendor.offers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

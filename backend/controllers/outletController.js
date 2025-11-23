const User = require('../models/User');

// Helper to generate consistent mock data based on vendor name
const getMockDetails = (name) => {
    const images = [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1000&auto=format&fit=crop"
    ];

    // Simple hash to pick a consistent image/rating
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return {
        image: images[hash % images.length],
        rating: (4 + (hash % 10) / 10).toFixed(1), // 4.0 to 4.9
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
            const details = getMockDetails(vendor.name);
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
                result.sort((a, b) => b.rating - a.rating);
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
        const details = getMockDetails(vendor.name);
        res.json({
            id: vendor._id,
            name: vendor.name,
            ...details,
            menu: vendor.menu
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

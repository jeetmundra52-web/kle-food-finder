const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role: role || 'student'
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Return JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
// Verify User (For Forgot Password - USN Check)
exports.verifyUser = async (req, res) => {
    const { email } = req.body; // email acts as USN

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'Invalid Email' });
        }
        res.json({ msg: 'Email Verified' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Reset Password (Direct Update)
exports.resetPasswordData = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.json({ msg: 'Password changed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

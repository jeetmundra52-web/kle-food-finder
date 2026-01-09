const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here'; // Fallback only if env missing

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        console.warn('[AuthMiddleware] No token provided');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        console.log(`[AuthMiddleware] User authenticated: ${req.user.id}`);
        next();
    } catch (err) {
        console.error('[AuthMiddleware] Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;

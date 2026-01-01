const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const outletRoutes = require('./routes/outlets');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080", // Allow frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Make io accessible to our router
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('KLE Food Finder API is running');
});

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinOutlet', (outletId) => {
        socket.join(outletId);
        console.log(`Client joined outlet room: ${outletId}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

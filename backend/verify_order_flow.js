const http = require('http');

// Helper to make HTTP requests
const request = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

const verifyFlow = async () => {
    try {
        const email = `test${Date.now()}@kletech.ac.in`;
        console.log('0. Registering new Student...');
        await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { name: 'Test Student', email, password: 'password123' });

        console.log('1. Logging in as Student...');
        const loginRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { email, password: 'password123' });

        if (loginRes.statusCode !== 200) throw new Error('Login failed');
        const token = loginRes.body.token;
        console.log('   Login successful.');

        console.log('2. Fetching Outlets...');
        const outletsRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/outlets',
            method: 'GET',
            headers: { 'x-auth-token': token }
        });

        const vendorList = outletsRes.body[0];
        console.log(`   Fetched outlet from list: ${vendorList.name}`);

        console.log('3. Fetching Outlet Details (Menu)...');
        const detailsRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: `/api/outlets/${vendorList.id}`,
            method: 'GET',
            headers: { 'x-auth-token': token }
        });
        const vendor = detailsRes.body;
        console.log(`   Fetched menu with ${vendor.menu.length} items.`);

        console.log('4. Placing Order...');
        const orderData = {
            vendorId: vendor.id,
            items: [{
                name: vendor.menu[0].name,
                quantity: 2,
                price: vendor.menu[0].price
            }],
            totalAmount: vendor.menu[0].price * 2,
            paymentMethod: 'UPI'
        };

        const orderRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/orders',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }, orderData);

        if (orderRes.statusCode === 200) {
            console.log('   Order placed successfully!');
            console.log(`   Order ID: ${orderRes.body._id}`);
            console.log(`   Total Amount: ₹${orderRes.body.totalAmount}`);
        } else {
            console.log('   Failed to place order:', orderRes.body);
        }

    } catch (err) {
        console.error('Verification failed:', err.message);
    }
};

verifyFlow();

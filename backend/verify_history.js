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

const verifyOrderHistory = async () => {
    try {
        console.log('1. Logging in as Student...');
        // Use the student created in previous step or create new if needed
        // For simplicity, let's register a new one to be sure
        const email = `history_test${Date.now()}@kletech.ac.in`;
        await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { name: 'History Student', email, password: 'password123' });

        const loginRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { email, password: 'password123' });

        const token = loginRes.body.token;
        console.log('   Login successful.');

        console.log('2. Fetching Orders (Should be empty)...');
        const emptyOrdersRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/orders',
            method: 'GET',
            headers: { 'x-auth-token': token }
        });
        console.log(`   Orders count: ${emptyOrdersRes.body.length}`);

        console.log('3. Placing an Order...');
        // Fetch vendor first
        const outletsRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/outlets',
            method: 'GET',
            headers: { 'x-auth-token': token }
        });
        const vendorList = outletsRes.body[0];
        const detailsRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: `/api/outlets/${vendorList.id}`,
            method: 'GET',
            headers: { 'x-auth-token': token }
        });
        const vendor = detailsRes.body;

        const orderData = {
            vendorId: vendor.id,
            items: [{
                name: vendor.menu[0].name,
                quantity: 1,
                price: vendor.menu[0].price
            }],
            totalAmount: vendor.menu[0].price,
            paymentMethod: 'Cash'
        };

        await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/orders',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }, orderData);
        console.log('   Order placed.');

        console.log('4. Fetching Orders (Should have 1)...');
        const ordersRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/orders',
            method: 'GET',
            headers: { 'x-auth-token': token }
        });
        console.log(`   Orders count: ${ordersRes.body.length}`);
        console.log(`   Order Status: ${ordersRes.body[0].status}`);

    } catch (err) {
        console.error('Verification failed:', err.message);
    }
};

verifyOrderHistory();

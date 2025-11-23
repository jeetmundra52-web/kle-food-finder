const http = require('http');

const data = JSON.stringify({
    email: 'spicestory@kletech.ac.in',
    password: 'Spice@123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            const parsed = JSON.parse(body);
            console.log('Login Successful!');
            console.log('User Name:', parsed.user.name);
            console.log('User Role:', parsed.user.role);
            console.log('User Email:', parsed.user.email);
        } else {
            console.log('Login Failed:', body);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();

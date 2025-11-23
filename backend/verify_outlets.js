const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/outlets',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let body = '';

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            const outlets = JSON.parse(body);
            console.log(`Fetched ${outlets.length} outlets.`);
            outlets.forEach(o => {
                console.log(`- ${o.name} (${o.type}) [Rating: ${o.rating}]`);
            });
        } else {
            console.log('Failed to fetch outlets:', body);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.end();

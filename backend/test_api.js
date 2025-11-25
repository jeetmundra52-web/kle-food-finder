const testApi = async () => {
    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'doughpaze@kletech.ac.in',
                password: 'Doughpaze@123'
            })
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.msg || 'Login failed');

        const token = loginData.token;
        const userId = loginData.user.id;
        console.log(`Login Success. Token: ${token.substring(0, 10)}...`);
        console.log(`User ID: ${userId}`);

        // 2. Fetch Outlet
        console.log(`\nFetching outlet details for ${userId}...`);
        const outletRes = await fetch(`http://localhost:5000/api/outlets/${userId}`, {
            headers: { 'x-auth-token': token }
        });

        const outletData = await outletRes.json();
        console.log('Response Status:', outletRes.status);
        console.log('Response Keys:', Object.keys(outletData));
        console.log('\n=== FULL RESPONSE ===');
        console.log(JSON.stringify(outletData, null, 2));
        console.log('\n=== OFFERS CHECK ===');
        console.log('Offers Field:', outletData.offers);
        if (outletData.offers) {
            console.log('Offers Length:', outletData.offers.length);
            console.log('First Offer:', outletData.offers[0]);
        } else {
            console.log('❌ OFFERS FIELD IS MISSING OR UNDEFINED!');
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
};

testApi();

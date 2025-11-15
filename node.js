// Example Node.js/Express Proxy Server Script (proxy.js)
const express = require('express');
const axios = require('axios'); // You'd need to install axios
const app = express();
const port = 3000;

const USER_AGENT = 'plaYtv/7.1.3 (Linux;Android 13) ygx/69.1 ExoPlayerLib/824.0';
const COOKIE_VALUE = '__hdnea__=st=1763204691~exp=1763291091~acl=/*~hmac=9bcb808e5c99ccccea5bf6b71d9b6ebb87703126746f29cf9d4df670c6cc149c';
const MPD_URL = 'https://jiotvpllive.cdn.jio.com/bpk-tv/Disney_Channel_BTS/output/index.mpd';

app.get('/stream', async (req, res) => {
    try {
        const response = await axios.get(MPD_URL, {
            responseType: 'stream', // Crucial for media data
            headers: {
                // *** Headers are sent directly from the server! ***
                'User-Agent': USER_AGENT,
                'Cookie': COOKIE_VALUE
            }
        });

        // Set CORS headers so the browser can accept the response
        res.set('Access-Control-Allow-Origin', '*');
        
        // Forward the original headers (like Content-Type)
        Object.keys(response.headers).forEach(key => {
            res.set(key, response.headers[key]);
        });
        
        // Pipe the stream content back to the browser
        response.data.pipe(res);
        
    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(500).send('Proxy failure.');
    }
});

app.listen(port, () => {
    console.log(`Proxy listening at http://localhost:${port}`);
});
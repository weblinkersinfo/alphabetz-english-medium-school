const https = require('https');

const shortUrl = 'https://maps.app.goo.gl/6v3YLGGdusY3NSTS7';

https.get(shortUrl, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Redirect Location:', res.headers.location);
}).on('error', (e) => {
    console.error(e);
});

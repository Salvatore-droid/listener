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
            res.end('Test OK');
        });
    } else {
        res.end('Send POST requests here');
    }
}).listen(8000, () => console.log('Listening on http://localhost:8000'));
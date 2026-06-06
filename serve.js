const http = require('http');
const fs = require('fs');
const path = require('path');

const base = process.cwd();
const port = 8000;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  
  if (reqPath === '/api/event') {
    const eventFile = path.join(base, 'event.json');
    if (req.method === 'GET') {
      fs.readFile(eventFile, 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json');
        if (err) return res.end(JSON.stringify(null));
        res.end(data);
      });
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      req.on('end', () => {
        fs.writeFile(eventFile, body, (err) => {
          res.setHeader('Content-Type', 'application/json');
          if (err) return res.end(JSON.stringify({ success: false }));
          res.end(JSON.stringify({ success: true }));
        });
      });
    } else if (req.method === 'DELETE') {
      fs.unlink(eventFile, (err) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      });
    }
    return;
  }

  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(base, reqPath);
  if (!filePath.startsWith(base)) {
    res.statusCode = 403;
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.statusCode = 404;
      return res.end('Not found');
    }

    const target = stat.isDirectory() ? path.join(filePath, 'index.html') : filePath;
    fs.readFile(target, (readErr, data) => {
      if (readErr) {
        res.statusCode = 404;
        return res.end('Not found');
      }
      const ext = path.extname(target).toLowerCase();
      res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
      res.end(data);
    });
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving ${base} at http://127.0.0.1:${port}`);
});

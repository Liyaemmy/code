const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const requestUrl = req.url;
    let filePath = path.join(__dirname, 'public', requestUrl === '/' ? 'index.html' : requestUrl);
    const extName = path.extname(filePath);
    let  contentType = 'text/html';

    switch (extName) {
        case '.css': {
            contentType = 'text/css';
            break;
        }
        case '.js': {
            contentType = 'text/javascript';
            break;
        }
        default: {
            contentType = 'text/html';
            break;
        }
    }

    if (!extName) {
        filePath += '.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error');
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': contentType,
                    });
                    res.end(content);
                }
            })
        }
        else {
            res.writeHead(200, {
                'Content-Type': contentType,
            });
            res.end(data);
        }
    })
});

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
});

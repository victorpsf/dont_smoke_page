const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const route = require('./route/index');
const mainPath = require.main.path;

const app = express();
const server = http.createServer(app);

app.use('/', express.static(path.join.apply(null, [mainPath, 'public', 'html'])))
app.use('/js', express.static(path.join.apply(null, [mainPath, 'public', 'js'])))
app.use('/css', express.static(path.join.apply(null, [mainPath, 'public', 'css'])))

app.use(bodyParser.urlencoded({ extended: true, limit: 500000000 }))
app.use(bodyParser.json({ limit: 500000000 }))
app.use('/api', route);

app.use((error, req, res, next) => {
    if (error.status === 404)
        res.redirect('/');

    else 
        res.json({
            code: error.status || 500,
            message: error.statusMessage || 'Internal server error'
        })
});

server.listen(3000, '0.0.0.0', () => console.log('server listening on http://localhost:3000'));

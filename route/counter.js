const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const mainPath = require.main.path;
const dataPath = path.join.apply(null, [mainPath, 'public', 'data']);

const route = Router();

route.get('/', (req, res) => {
    try {
        const files = fs.readdirSync(dataPath)
            .map(a => ({ name: a, stat: fs.statSync(path.join(dataPath, a)) }))
            .filter(a => a.stat.isFile());
    
        const { size = 10, page = 0 } = req.query;
    
        res.json(files.slice(
            page === 0 ? 0: (page * size),
            page === 0 ? size: ((page * size) + size)
        ).map(a => ({
            name: a.name,
            lastModified: a.atime,
            content: JSON.parse(fs.readFileSync(path.join(dataPath, a.name), 'utf-8')),
            type: 'application/json'
        })));
    
        res.end();
    }

    catch (e) {
        console.log(e);
        throw e;
    }
});

route.get('/now', (req, res) => {
    try {
        const date = new Date();
        const currentFile = path.join(dataPath, `${date.getFullYear()}${`00${(date.getMonth() + 1)}`.slice(-2)}${`00${date.getDate()}`.slice(-2)}.json`);
        var exists = fs.existsSync(currentFile);

        if (exists) res.json(JSON.parse(fs.readFileSync(currentFile, 'utf8')));
        else res.json([]);

        res.end();
    }

    catch (e) {
        console.log(e);
        throw e;
    }
});

route.post('/', (req, res) => {
    const date = new Date();
    const currentFile = path.join(dataPath, `${date.getFullYear()}${`00${(date.getMonth() + 1)}`.slice(-2)}${`00${date.getDate()}`.slice(-2)}.json`);
    var exists = fs.existsSync(currentFile);
    let content = [];

    if (exists) {
        content = JSON.parse(fs.readFileSync(currentFile, 'utf8'));
        content.push(date);
    }
    
    else content = [date];

    fs.writeFileSync(currentFile, JSON.stringify(content), 'utf-8');
    res.json(content);
    res.end();
});

module.exports = route;
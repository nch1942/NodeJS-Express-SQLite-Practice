const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./../database/tanks.db');

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.get('/api/tanks', (req, res) => {
    // res.send([1, 2, 3]);

    db.all('SELECT * FROM tanks', (err, rows) => {
        console.log(rows);
        res.send(rows);
    })
});

app.get('/api/tanks/id/:id', (req, res) => {
    let tankId = req.params.id;

    db.all('SELECT * FROM tanks WHERE id = $id',
    {
        $id: tankId
    },
    (err, rows) => {
        console.log(rows);
        if (rows.length > 0) res.send(rows[0]);
        else res.send({});
    })
});

app.get('/api/tanks/name/:name', (req, res) => {
    let tankName = req.params.name;

    db.all('SELECT * FROM tanks WHERE name = $name COLLATE NOCASE',
    {
        $name: tankName
    },
    (err, rows) => {
        console.log(rows);
        if (rows.length > 0) res.send(rows[0]);
        else res.send({});
    })
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Port ${port} is activated`));
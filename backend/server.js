const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const port = 3001;

const db = mysql.createPool({
    host: 'mysql_db',
    user: 'admin',
    password: 'admin',
    database: 'books'
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("books api");
});

app.get('/get', (req, res) => {
    const select = "SELECT * FROM books";
    db.query(select, (err, result) => {
        res.send(result);
    })
});

app.listen(port, () => {
    console.log(`Book Project Backend listening on port:${port}`);
});
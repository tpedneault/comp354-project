const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const port = 3001;

const db = mysql.createPool({
    host: 'mysql_db',
    user: 'root',
    password: 'password',
    database: 'books'
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("books api");
});

app.get('/api/books', (req, res) => {
    const select = "SELECT * FROM books LIMIT 5";
    db.query(select, (err, result) => {
        res.send(result);
    })
});

app.get('/api/:user/shelves', (req, res) => {
    const select = `SELECT DISTINCT name,  books.id, title, publisher, author, cover_url, category FROM book_shelves INNER JOIN shelves ON shelves.id=shelf_id INNER JOIN books ON books.id=book_id WHERE user_id=${req.params.user}`;
    db.query(select, (err, result) => {
        let shelves = [];
        result.forEach((book) => {
            // Does the current shelf already exist?
            if(shelves.filter(e => e.name == book.name).length == 0) {
                shelves.push({
                    name: book.name,
                    books: [ book ],
                });
            } else {
                for(let i = 0; i < shelves.length; i++) {
                    if(shelves[i].name == book.name) {
                        shelves[i].books.push(book);
                    }
                }
            }
        });
        res.send(shelves);
    });
});

app.get('/api/:user/shelves/:shelf', (req, res) => {
    const select = `SELECT DISTINCT name, books.id, title, publisher, author, cover_url, category FROM book_shelves INNER JOIN shelves ON shelves.id=shelf_id INNER JOIN books ON books.id=book_id WHERE user_id=${req.params.user} AND shelf_id=${req.params.shelf}`;
    db.query(select, (err, result) => {
        let shelves = [];
        result.forEach((book) => {
            // Does the current shelf already exist?
            if(shelves.filter(e => e.name == book.name).length == 0) {
                shelves.push({
                    name: book.name,
                    books: [ book ],
                });
            } else {
                for(let i = 0; i < shelves.length; i++) {
                    if(shelves[i].name == book.name) {
                        shelves[i].books.push(book);
                    }
                }
            }
        });
        res.send(shelves);
    });
});

app.get('/api/:user/favorites', (req, res) => {
    const select = `SELECT DISTINCT users.id, books.id, title, publisher, author, cover_url, category FROM users INNER JOIN book_favorites, books WHERE users.id=${req.params.user} AND book_id = books.id`
    db.query(select, (err, result) => {
        res.send(result);
    });
})
app.get('/api/signin/:email/:password', (req, res) => {
    const select = `SELECT * FROM users WHERE email='${req.params.email}' AND password_md5='${req.params.password}'`;
    db.query
    (select, (err, result) => {
        res.send(result);
    });
});
app.listen(port, () => {
    console.log(`Book Project Backend listening on port:${port}`);
});
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(express());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Get all cafes
app.get('/cafes',(req, res)=>{
    connection.query('SELECT * FROM cafes',(error,results)=>{
        res.send(results);
    });
});

//Get all users
app.get('/users',(req, res)=>{
    connection.query('SELECT * FROM users',(error,results)=>{
        res.send(results);
    });
});

//Get user by user_id
app.get('/user/:user_id', (req,res)=>{
    const user_id = req.params.user_id;
    connection.query('SELECT * FROM users WHERE user_id = ?',
        [user_id],
        (error, results)=>{
            res.send(results);
        });
});

//Get cafe by cafe_id
app.get('/cafe/:cafe_id', (req,res)=>{
    const cafe_id = req.params.cafe_id;
    connection.query('SELECT * FROM cafes WHERE cafe_id = ?',
        [cafe_id],
        (error, results)=>{
            res.send(results);
        });
});

//Get info about all cafes
app.get('/info',(req, res)=>{
    connection.query('SELECT cafe_name, info FROM cafes INNER JOIN details ON cafes.cafe_id = details.cafe_id',(error,results)=>{
        res.send(results);
    });
});

//Get info about specific cafe by cafe_id
app.get('/details/:cafe_id', (req,res)=>{
    const cafe_id = req.params.cafe_id;
    connection.query('SELECT * FROM details WHERE cafe_id = ?',
        [cafe_id],
        (error, results)=>{
            res.send(results);
        });
});

//Search cafes by city
//Search example: /cafes/search?city=København
app.get('/cafes/search', (req,res)=>{
    const city = req.query.city;

    connection.query('SELECT * FROM cafes WHERE cafe_city = ?',
        [city],
        (error, results)=>{
            res.send(results);
        });
});

//Create new user
app.post('/new/user',(req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    connection.query(
        'INSERT INTO `users` (user_firstname, user_lastname) VALUES (?,?)',
        [firstname, lastname],
        function (error, results) {
            res.send(results)
        }
    )
});

//Create new cafe
app.post('/new/cafe',(req,res)=>{
    const name = req.body.name;
    const city = req.body.city;

    connection.query(
        'INSERT INTO `cafes` (cafe_name, cafe_city) VALUES (?,?)',
        [name, city],
        function (error, results) {
            res.send(results)
        }
    )
});

//Add details to the new cafe
app.post('/new/details',(req,res)=>{
    const cafe_id = req.body.cafe_id;
    const opening_hours = req.body.opening_hours;
    const address = req.body.address;
    const price_range = req.body.price_range;
    const wifi = req.body.wifi;
    const info = req.body.info;

    connection.query(
        'INSERT INTO `details` (cafe_id, opening_hours, address, price_range, wifi, info) VALUES (?,?,?,?,?,? )',
        [cafe_id, opening_hours, address, price_range, wifi, info],
        function (error, results) {
            res.send(results)
        }
    )
});

//Add a favorite cafe
app.post('/new/favorite',(req,res)=>{
    const user_id = req.body.user_id;
    const cafe_id = req.body.cafe_id;

    connection.query(
        'INSERT INTO `favorites` (user_id, cafe_id) VALUES (?,?)',
        [user_id, cafe_id],
        function (error, results) {
            res.send(results)
        }
    )
});

app.get('*',(req,res) =>{
    res.sendStatus(404);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

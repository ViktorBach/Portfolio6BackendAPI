const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(express());
app.use(express.json());
app.use(cors());

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
    const userId = req.params.user_id;
    connection.query('SELECT * FROM users WHERE user_id = ?',
        [userId],
        (error, results)=>{
            res.send(results);
        });
});

// Login user check
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Query the database, checking if email and password match
    connection.query('SELECT * FROM users WHERE user_email = ? AND user_password = ?',
        [email, password],
        (error, results) => {
            if (results.length > 0) {
                const user = results[0].user_email;
                console.log("User logged in" + user);
                res.send(results);
            } else {
                console.log("Login attempt was made, but no matching user/password found");
                res.send(results);
            }
        })
})

// Create new user
app.post('/createuser', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    // Query the database, check if email exist
    connection.query('SELECT * FROM users WHERE user_email = ?',
        [email],
        (error, results) => {
            if (results.length > 0) {
                console.log("Email exist")
                res.send(false);
            } else {
                console.log("Email available, creating account");
                connection.query('INSERT INTO cafe_finder.users (user_firstname, user_lastname, user_email, user_password) ' +
                    'VALUES (?, ?, ?, ?)',
                    [firstname, lastname, email, password],
                    (error, results) => {
                        console.log("User created")
                        res.send(true);
                    })
            }
        })
})

//Get cafe by cafe_id
app.get('/cafe/:cafe_id', (req,res)=>{
    const cafeId = req.params.cafe_id;
    connection.query('SELECT * FROM cafes WHERE cafe_id = ?',
        [cafeId],
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
    const cafeId = req.params.cafe_id;
    connection.query('SELECT * FROM details WHERE cafe_id = ?',
        [cafeId],
        (error, results)=>{
            res.send(results);
        });
});

//Search cafes by city
//Search example: /cafes/search?city=København
app.get('/cafes/search', (req,res)=>{
    const city = req.query.city;

    connection.query('SELECT cafe_name, city, address FROM cafes INNER JOIN details ON details.cafe_id = cafes.cafe_id WHERE city = ?',
        [city],
        (error, results)=>{
            res.send(results);
        });
});

//Create new user
app.post('/new/user',(req,res)=>{
    const firstname = req.body.user_firstname;
    const lastname = req.body.user_lastname;
    const email = req.body.user_email;
    const password = req.body.user_password;

    const q = 'INSERT INTO `users` (user_firstname, user_lastname, user_email, user_password) VALUES (?,?,?,?)';

    connection.query(
        q,
        [firstname, lastname, email, password],
        function (error, results) {
            if(error){
                console.log(error)
            }

            res.send(results)
        }
    )
});

//Create new cafe
app.post('/new/cafe',(req,res)=>{
    const name = req.body.name;
    const openingHours = req.body.open;
    const closingHours = req.body.close;
    const city = req.body.city;
    const address = req.body.address;
    const priceRange = req.body.price;
    const wifi = req.body.wifi;
    const info = req.body.info;

    //Check if name of cafe already exists:
    connection.query('SELECT * FROM cafes WHERE cafe_name = ?', [name], (error, results) => {
        if (results.length > 0) {
            console.log("The Cafe already exists");
            res.send(false);
        } else {
            console.log("Creating cafe now!");
            connection.query(
                'INSERT INTO `cafes` (cafe_name) VALUES (?)',
                [name],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.send(error);

                    connection.query(
                        'SELECT * FROM cafes WHERE cafe_name = ?',
                        [name],
                        (error, results) => {
                            const cafeId = results[0].cafe_id;
                            connection.query(
                                'INSERT INTO `details` (cafe_id, opening_hours, closing_hours, city, address, price_range, wifi, info) VALUES (?,?,?,?,?,?,?,?)',
                                [cafeId, openingHours, closingHours, city, address, priceRange, wifi, info],
                                (error, results) => {
                                    if (error) {
                                        throw error;
                                    }
                                    res.send(error);
                                })
                        }
                    );
                }
            );
        }
    });
});
   /* connection.query('SELECT * FROM cafes WHERE cafe_name = ?'),
        [name],
        (error, results) => {
            if (results.length > 0) {
                console.log("The Cafe already exist")
                res.send(false);
            } else {
                console.log("Creating cafe now!")
                connection.query(
                    'INSERT INTO `cafes` (cafe_name) VALUES (?)',
                    [name],
                    'INSERT INTO `details` (opening_hours, closing_hours, city, address, price_range, wifi, info) VALUES (?,?,?,?,?,?,?)',
                        [openingHours, closingHours, city, address, priceRange, wifi, info],
                    function (error, results) {
                        res.send(results)
                    }
                )}
            }
        })
*/
//Add details to the new cafe
app.post('/new/details',(req,res)=>{
    const cafeId = req.body.cafe_id;
    const openingHours = req.body.opening_hours;
    const closingHours = req.body.closing_hours;
    const city = req.body.city;
    const address = req.body.address;
    const priceRange = req.body.price_range;
    const wifi = req.body.wifi;
    const info = req.body.info;

    connection.query(
        'INSERT INTO `details` (cafe_id, opening_hours, closing_hours, city, address, price_range, wifi, info) VALUES (?,?,?,?,?,?,?,?)',
        [cafeId, openingHours, closingHours, city, address, priceRange, wifi, info],
        function (error, results) {
            res.send(results)
        }
    )
});

//Add a favorite cafe
app.post('/new/favorite',(req,res)=>{
    const userId = req.body.user_id;
    const cafeId = req.body.cafe_id;

    connection.query(
        'INSERT INTO `favorites` (user_id, cafe_id) VALUES (?,?)',
        [userId, cafeId],
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

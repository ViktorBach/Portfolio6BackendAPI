// Import libraries / middleware
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Bcrypt, used for hashing and salting user passwords for security
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 3000;

// Use library stuff
app.use(express());
app.use(express.json());
app.use(cors());

// MySQL server connection
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
    const enteredPassword = req.body.password;

    // Query the database, checking if email and password match
    connection.query('SELECT * FROM users WHERE user_email = ?',
        [email],
        (error, results) => {
            if (error) {
                console.error("Database error: ", error);
                return res.status(500).json({success: false, message: "Internal server error"});
            }

            if (results.length > 0) {
                const salt = results[0].user_salt;
                const hashedPassword = results[0].user_password;
                const isPasswordCorrect = bcrypt.compareSync(enteredPassword + salt, hashedPassword);

                if (isPasswordCorrect) {
                    console.log("User logged in: " + results[0].user_email);
                    return res.status(200).json({success: true, email: results[0].user_email, name: results[0].user_firstname, lastname: results[0].user_lastname, userId: results[0].user_id});

                } else {
                    console.log("Login attempt was made, but password don't match");
                    return res.status(401).json({success: false, message: "Invalid email or password"});
                }
            } else {
                console.log("Login attempt was made, but no matching email found");
                return res.status(401).json({success: false, message: "Invalid email or password"});
            }
        });
});

// Create new user
app.post('/createuser', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    // Salt and Hash password
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(rawPassword + salt, saltRounds);

    // Query the database, check if email exist
    connection.query('SELECT * FROM users WHERE user_email = ?',
        [email],
        (error, results) => {
            if (error) {
                console.error("Database error: ", error);
                return res.status(500).json({success: false, message: "Internal server error"});
            }

            if (results.length > 0) {
                console.log("Account creation attempt was made with: " + email + ", but email already exists in DB")
                return res.status(409).json({success: false, message: "Email is already in use"});
            } else {
                console.log("Email available: " + email + ", creating account");
                connection.query('INSERT INTO cafe_finder.users (user_firstname, user_lastname, user_email, user_password, user_salt) ' +
                    'VALUES (?, ?, ?, ?, ?)',
                    [firstname, lastname, email, hashedPassword, salt],
                    (error, results) => {
                        console.log("User created")
                        return res.status(200).json({success: true, message: "Account successfully created - you can now login!"});
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

app.get('/listfilter',(req,res) =>{
    const open = req.query.opening_hours;
    const close = req.query.closing_hours;
    const location = req.query.city;
    const price = req.query.price_range;
    const wifi = req.query.wifi;

    connection.query('SELECT * FROM details INNER JOIN cafes ON cafes.cafe_id = details.cafe_id WHERE opening_hours <= ? AND closing_hours >= ? AND city = ? AND price_range = ? AND wifi = ?',
        [open, close, location, price, wifi],
        (error, result) => {
            res.send(result)
    });
});

app.get('/details', (req, res) => {
    connection.query('SELECT * FROM details INNER JOIN cafes ON cafes.cafe_id = details.cafe_id',
        (error, results) => {
            res.send(results)
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

//Create new cafe
app.post('/new/cafe',(req,res)=>{
    const name = req.body.name;
    const openingHours = req.body.open;
    const closingHours = req.body.close;
    const city = req.body.city;
    const address = req.body.address;
    const priceRange = req.body.price;
    let wifi = req.body.wifi;
    if(wifi === 'on'){
        wifi = 1
    }  else {
        wifi = 0
    }
    const info = req.body.info;
    console.log(name)
    console.log(openingHours)
    console.log(closingHours)
    //Check if name of cafe already exists:
    connection.query('SELECT * FROM cafes WHERE cafe_name = ?', [name], (error, results) => {
        if (results.length > 0) {
            console.log("The Cafe already exists");
            res.json(false);
        } else {
            console.log("Creating cafe now!");
            connection.query(
                'INSERT INTO `cafes` (cafe_name) VALUES (?)',
                [name],
                (error, results) => {
                    if (error) {
                        throw error;
                        res.json(error);
                    }
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
                                        res.json(error);
                                    }

                                    res.json(true);
                                })
                        }
                    );
                }
            );
        }
    });
});

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

    connection.query('SELECT * FROM favorites WHERE user_id = ? AND cafe_id = ?',
        [userId, cafeId],
        function (error, results) {
        if (results.length > 0) {
            res.status(418).send('cafe is already favorited')
        } else {
            connection.query(
                'INSERT INTO `favorites` (user_id, cafe_id) VALUES (?,?)',
                [userId, cafeId],
                function (error, results) {
                    res.send(results)
                }
            )
        }
    });
});

//Rate a café
app.post('/rating', (req, res) => {
    const userId = req.body.user_id;
    const cafeId = req.body.cafe_id;
    const ratingValue = req.body.rating_value;

    connection.query(
        'INSERT INTO `ratings` (user_id, cafe_id, rating_value) VALUES (?,?,?)',
        [userId, cafeId, ratingValue],
        function (error, results) {
            console.log(results)
            res.send(results)
        }
    )
})

app.get('*',(req,res) =>{
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

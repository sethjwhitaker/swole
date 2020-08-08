import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';
import bcrypt from 'bcrypt';


const app = express();

// parse application/json from post requests
const jsonParser = bodyParser.json();

// pool of connections to sql server 
// (Change to single connection? Why did I do it this way)
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'TempPassword', // Update password
    database: 'swole'
});

// allow access from client server for all requests
app.use(cors());

// start listening on port 8080
const server = app.listen(8080, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(host + " listening on port ", port);
});

// Not sure if I need this 
app.get('/', (req, res) => {
    res.send('Go to /users to view data');
});

// Will definitely get rid of this. 
// It is a nice way to view the database for testing though
app.get('/users', (req, res) => {
    // Display all user info
    const SELECT_ALL_FROM_USERS_QUERY = "SELECT * FROM users;";
    pool.query(SELECT_ALL_FROM_USERS_QUERY, (err, results) => {
        if(err) 
            return res.send(err);
        else {
            res.send(results);
        }
    });
});

// add user to database
app.post('/users/add', jsonParser, async (req, res) => {
    
    console.log(req.body); // just for debugging

    // access request body
    const {first_name, last_name, email_address, password} = req.body;
    
    // hash the newly created password
    const salt = await bcrypt.genSalt(10); // TODO: make salt number a global constant value somewhere
    const hash = await bcrypt.hash(password, salt);

    // insert new user into the database
    const INSERT_USER_QUERY = `INSERT INTO users (first_name, last_name, email_address, password_hash, password_salt, password_hash_algorithm) 
        VALUES('${first_name}', '${last_name}', '${email_address}', '${hash}', '${salt}', 'bcrypt')`;
    
    pool.query(INSERT_USER_QUERY, (err) => {
        const response = {
            success: undefined,
            error: undefined
        }
        if(err) {
            console.log(err);
            response.success = false;
            response.error = err;
        } else {
            response.success = true;
        }
        res.send(response);
    });
    
});

app.post('/users/login', jsonParser, async (req, res) => {
    const {email_address, password} = req.body;

    const query = `SELECT password_hash FROM users WHERE email_address='${email_address}'`;
    pool.query(query, async (err, results) => {
        const response = {
            success: undefined,
            error: undefined,
            passwordAuthenticated: undefined
        }

        if(err) {
            response.success = false;
            response.error = err;
        } else {
            response.success = true;
            // send results of password
            console.log(password);
            console.log(results[0].password_hash);
            response.passwordAuthenticated = await bcrypt.compare(password, results[0].password_hash);
        }
        res.send(response);
    });
});
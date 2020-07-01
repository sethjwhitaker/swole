import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();

const SELECT_ALL_FROM_USERS_QUERY = "SELECT * FROM users;";

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'TempPassword', // Update password
    database: 'swole'
});

app.use(cors());

const server = app.listen(8080, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Swole Server listening on port ", port);
});

app.get('/', (req, res) => {
    res.send('Go to /users to view data');
});

app.get('/users', (req, res) => {
    pool.query(SELECT_ALL_FROM_USERS_QUERY, (err, results) => {
        if(err) 
            return res.send(err);
        else {
            res.json({
                data: results
            })
        }
    });
});

app.get('/users/add', (req, res) => {
    const {first_name, last_name, email_address, password_hash} = req.query;
    const INSERT_USER_QUERY = `INSERT INTO users (first_name, last_name, email_address, password_hash) 
        VALUES(${first_name}, ${last_name}, ${email_address}, ${password_hash})`;
    
    pool.query(INSERT_USER_QUERY, (err, results) => {
        if(err) {
            console.log(err);
            return res.send(err);
        } else
            res.send("Successfully added user.");
    });
});

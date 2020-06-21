const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

const server = app.listen(8080, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Swole Server listening on port ", port);
})
// create web server

// import express
const express = require('express');

// import file system
const fs = require('fs');

// import path
const path = require('path');

// import body-parser
const bodyParser = require('body-parser');

// create express app
const app = express();

// set port
const port = 3000;

// set path for static files
app.use(express.static(path.join(__dirname, 'public')));

// set path for body parser
app.use(bodyParser.urlencoded({ extended: false }));

// set path for comments.json
let commentsPath = path.join(__dirname, 'data', 'comments.json');

// get request
app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        res.send(comments);
    });
});

// post request
app.post('/comments', (req, res) => {
    let name = req.body.name;
    let comment = req.body.comment;
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        comments.push({
            name: name,
            comment: comment
        });
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.send(comments);
        });
    });
});

// listen to port
app.listen(port, () => console.log(`Server listening on port ${port}!`));
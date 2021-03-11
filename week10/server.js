// load the things we need
require('dotenv').config();
var express = require('express');
const path = require('path');
const { Pool } = require('pg')
var app = express();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

// home page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/getData', function(req, res) {
    res.render('pages/getData');
});

app.get('/getBooks', getBooks);
app.get('/getAuthors', getAuthors);


var sql = "SELECT * FROM bookshelf.books";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);


});  

app.listen(PORT);
console.log('server running at ' + PORT);

function getBooks(req, res) {
    var sql = "SELECT * FROM bookshelf.books";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.json(JSON.stringify(result.rows))
    });
}

function getAuthors(req, res) {
    var sql = "SELECT * FROM bookshelf.authors";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.json(JSON.stringify(result.rows))
    });
}

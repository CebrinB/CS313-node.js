// load the things we need
require('dotenv').config();
var express = require('express');
const path = require('path');
const { Pool, Client } = require('pg')
var app = express();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/', function(req, res) {
    res.render('pages/index');
});

var sql = "SELECT * FROM team10.person";

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
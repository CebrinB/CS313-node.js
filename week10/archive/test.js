// load the things we need
require('dotenv').config();
var express = require('express');
const path = require('path');
const { Pool, Client } = require('pg')
var app = express();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL || 'postgres://wzugineshqbrnc:0a72366e716563a65008ef53893d7198a60dc48a6e54a5db8c943457ce077f99@ec2-54-160-7-200.compute-1.amazonaws.com:5432/d87li9ukltjnal?ssl=true';
const pool = new Pool(
    {connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false 
      }
});

const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();
  
  client.query('SELECT * FROM bookshelf.authors;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });

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

app.listen(PORT);
console.log('server running at ' + PORT);

function getBooks(req, res) {
    var sql = "SELECT * FROM bookshelf.books;";

    const client = new Client({
        connectionString: connectionString,
        ssl: {
          rejectUnauthorized: false
        }
      });
      
      client.connect();
      
      client.query(sql, (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
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

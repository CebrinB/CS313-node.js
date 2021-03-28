// load the things we need
require('dotenv').config();
var functions = require('./public/js/serverside');
var express = require('express');
var ejs = require('ejs');
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

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// default home page
app.get('/', function(req, res) {
    res.render('pages/index');
});

//ajax home
app.get('/home', function(req, res) {
    //render the sign in page    
    ejs.renderFile(__dirname + '/views/pages/home.ejs', function(err, data) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.send(data);
    });
});

//ajax login
app.get('/login', function(req, res) {
    //render the sign in page    
    ejs.renderFile(__dirname + '/views/pages/login.ejs', function(err, data) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.send(data);
    });
});

app.post('/signin', function(req, res) {
    //logic to check if a data item exists in the user's database
      //esp. a particular book, or a username
      console.log("Verifying username exists...")
    console.log(req.body);

});

app.get('/library', function(req, res) {
    //render the library page    
    ejs.renderFile(__dirname + '/views/pages/library.ejs', function(err, data) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.send(data);
    });
});






app.get('/getLibrary', getUserId, getLibrary);

app.get('/addBooks', function(req, res) {
    //render the library page    
    ejs.renderFile(__dirname + '/views/pages/addBooks.ejs', function(err, data) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.send(data);
    });
});




app.get('/logout', function(req, res) {
    
    //logout the user
    
    res.render('pages/logout');
});

app.get('/getData', function(req, res) {
    res.render('pages/getData');
});

app.get('/getBooks', getBooks);
app.get('/getAuthors', getAuthors);

app.get('/addAuthor', function(req, res) {
    let name = 'Kevin Billings';
    var sql = "INSERT INTO bookshelf.authors (name) VALUES ('" + name + "')";
  
    pool.query(sql, function(err, result) {
      // If an error occurred...
      if (err) {
          console.log("Error in query: ")
          console.log(err);
      }
  
      // Log this to the console for debugging purposes.
      console.log("author inserted to database");
  });
});


app.listen(PORT);
console.log('server running at ' + PORT);


function getUserId(req, res, next) {

    var sql = "SELECT * FROM bookshelf.users WHERE username = $1";

    pool.query(sql, [req.query.user], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        req.query.user = result.rows[0].user_id;
        next();        
    });
}

function getLibrary(req, res) {

    sql = "SELECT * " +  
          "FROM bookshelf.library " +
          "FULL JOIN bookshelf.books on library.book_id = books.book_id " +
          "FULL JOIN bookshelf.authors on books.author_id = authors.author_id " + 
          "WHERE library.user_id = $1::int";
    
    pool.query(sql, [req.query.user], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.json(JSON.stringify(result.rows));
    });
    
}


function addAuthor(req, res) {
    let name = 'Kevin Billings';
    var sql = "INSERT INTO bookshelf.authors (name) VALUES ('" + name + "')";
  
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

function verifyUsername(req, res) {
    //logic to check if a data item exists in the user's database
      //esp. a particular book, or a username
      console.log("Verifying username exists...")
        var record = [req.query.username];
        console.log(req);
    
        const sql = "SELECT * FROM bookshelf.users WHERE username = $1";
        pool.query(sql, record, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log(result.rows);
        res.json(JSON.stringify(result.rows))
    
        })

  }

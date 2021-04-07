// load the things we need
require('dotenv').config();
const session = require('express-session')
var express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg')
const path = require('path');
var ejs = require('ejs');
var app = express();
var users = [];
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false 
        }
});

// set the view engine to ejs, etc.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
        secret: 'zesty skills',
        resave: true,
        saveUninitialized: true,
        cookie : {
            maxAge:(172800)
        }
    }));

// default home page
app.get('/', getUsernames, function(req, res) {
    res.render('pages/index');
});

app.get('/session', function(req, res) {
    console.log('session requested', req.session);
    res.json(JSON.stringify(req.session));
});

//view home
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

//view login
app.get('/getLogin', function(req, res) {
    //render the sign in page    
    ejs.renderFile(__dirname + '/views/pages/login.ejs', function(err, data) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.send(data);
    });
});

//view signup
app.get('/getSignup', function(req, res) {
    //render the sign in page    
    ejs.renderFile(__dirname + '/views/pages/signup.ejs', function(err, data) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.send(data);
    });
});

app.post('/createAccount', isUsernameAvailable, hashPassword, addUser, getUserId, function(req, res) {   
    res.json(req.session);
});

app.post('/login', login);

app.post('/logout', function(req, res) {
    // destroy session data
    req.session.destroy();
    console.log('user session destroyed');
    res.send();
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

//CRUD functionality for user's library books
app.get('/getLibrary', verifyUser, getLibrary);
app.post('/addBookManual', verifyUser, isMissingTitle, isExistingAuthor, isExistingBook, addLibrary);
app.put('/updateBook', verifyUser, isMissingTitle, isUnchanged, routeAuthor, updateAuthor, routeBook, updateBook);
app.delete('/deleteBook', deleteBook);


app.listen(PORT);
console.log('server running at ' + PORT);

//*********************************//
//  USER AUTHENTICATION FUNCTIONS  //
//*********************************//
function getUsernames(req, res, next) {
    var sql = "SELECT username FROM bookshelf.users";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        if (result.rowCount > 0) {
            result.rows.forEach(
                (row) => {
                    users.push(row.username);
                });
        } else {
            console.log('no users in database');
        }
        next();    
    });
}

function isUsernameAvailable(req, res, next) {
    console.log('check if username is available');
    //check if username is available
    if (users.find(user => user === req.body.user)) {
        console.log('duplicate username')
            res.status(406).json({
                'message': 'Sorry, that username is already taken.'
            });
            return;
    } else next();
}

function hashPassword(req, res, next) {
    console.log('hash the password')

    let saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.body.password = hash;
            next();
        });
    });
}

function addUser(req, res, next) {
    console.log('insert new user');

    //username is available, add new user to database
    var sql = 'INSERT INTO bookshelf.users (username, password) VALUES ($1, $2)';

    pool.query(sql, [req.body.user, req.body.password], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            res.statusMessage = "Unable to create account. Please try again.";
            res.status(400).json({
                'message': res.statusMessage
            });
            return;
        }    

        // Log this to the console for debugging purposes.
        if (result.rowCount > 0) {
            console.log('new user successfully inserted');
            req.session.username = req.body.user;
            next();
        }    
    });
}

function login(req, res) {
    console.log('login');

    var sql = "SELECT * FROM bookshelf.users WHERE username = $1";

    pool.query(sql, [req.body.user], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result: " + result.rowCount);
        if (result.rowCount) { //username exists
            bcrypt.compare(req.body.password, result.rows[0].password, function(err, match) {
                console.log(match);
                if (match){
                    console.log('Passwords match!');
                    req.session.username = req.body.user;
                    req.session.user_id = result.rows[0].user_id;
                    res.json({
                        'message': 'Successfully logged in!',
                        'username': req.session.username,
                        'user_id': req.session.user_id
                    });
                } else {
                    console.log('Passwords do not match!');
                    res.status(401).json({
                        'message': 'Incorrect password!',
                    });
                }
            });
        } else { //username does not exist
            console.log('Username does not exist!');
            res.status(404).json({
                'message': 'Username does not exist!',
            });
        }
    });
}

function verifyUser(req, res, next) {
    //check if we already have the user_id
    if (req.session.user_id > 0) {
        console.log('have user_id')
        next();
    } else {
        console.log('user is not signed in');
        res.status(401).json({
            'message': 'You must sign in first!'
        });
        return;
    }
}

//*************************//
//  GET FUNCTIONS          //
//*************************//
function getUserId(req, res, next) {
    console.log('get user_id');

    //get user_id from database
    var sql = "SELECT * FROM bookshelf.users WHERE username = $1";

    pool.query(sql, [req.body.user], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
    
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        if (result.rowCount > 0) {
            console.log(result.rows);
            req.session.user_id = result.rows[0].user_id;
            next();
        } else {
            //missing user information, abort
            console.log('user does not exist or is not signed in');
            res.statusMessage = "You must be signed in to do that!";
            res.status(401).json({
                'message': res.statusMessage
            });
            return;
        }    
    });
}

function getLibrary(req, res) {
    //sql query to retrieve user's library of books from database
    sql = "SELECT * " +  
          "FROM bookshelf.library " +
          "FULL JOIN bookshelf.books on library.book_id = books.book_id " +
          "FULL JOIN bookshelf.authors on books.author_id = authors.author_id " + 
          "WHERE library.user_id = $1::int "
          "ORDER BY books.title ASC";
    
    //pool.query(sql, [req.query.user], function(err, result) {
    pool.query(sql, [req.session.user_id], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rowCount);
        if (result.rowCount > 0) {
            console.log(result.rows);
            res.json(result.rows);
        } else {
            res.status(404).json({'message': "You don't have any books in your library yet!"});
        }
    });   
}

//*********************************//
//  ADD BOOK TO LIBRARY FUNCTIONS  //
//*********************************//
function isMissingTitle(req, res, next) {
    if (req.body.title.length === 0) {
        //title is blank, quit
        console.log('Missing title field, abort');
        res.statusMessage = "Book title is a required field!";
        res.status(401).json({
            'message': res.statusMessage
        });
        return;
    } else {
        console.log('has a title')
        next();
    }
}

function isExistingAuthor(req, res, next) {    
    //first, check if author field was entered
    if (req.body.author.length === 0) {
        console.log('missing author');
        req.body.author = 0;
        next();
    } else {
        //second, check if author already exists
        var sql = "SELECT * FROM bookshelf.authors WHERE name = $1";

        pool.query(sql, [req.body.author], function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
            if (result.rowCount > 0) {
                //author exists, continue
                console.log('author exists, continue');
                req.body.author = result.rows[0].author_id;
                next();
            } else addAuthor(req, res, next);
        });
    }
}

function addAuthor(req, res, next) {
    console.log('author name: ' + req.body.author);

    console.log('new author');

    //author doesn't exist, create new author
    var sql = "INSERT INTO bookshelf.authors (name) VALUES ($1)";

    pool.query(sql, [req.body.author], function(err, result) {
    // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        
        // Log this to the console for debugging purposes.
        console.log("author inserted into database");
        isExistingAuthor(req, res, next);
    });
}

function isExistingBook(req, res, next) {
    //check if book already exists
    console.log('check if book exists')
    var sql = "SELECT * FROM bookshelf.books WHERE title = $1";

    pool.query(sql, [req.body.title], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        if (result.rowCount > 0) {
            //book exists, continue
            //TODO: add some logic to check for same title, different author?
            req.body.title = result.rows[0].book_id;
            req.body.publisher = result.rows[0].publisher;
            req.body.year = result.rows[0].year;
            console.log('book title already exists');
            isExistingLibrary(req, res, next);
        } else addBook(req, res, next);
    });
}

function addBook(req, res, next) {
    //insert new book title into database
    console.log('new book title'); 
    
    //check for missing info
    if (req.body.year === '' || !Number.isFinite(req.body.year)) {
        req.body.year = 0;
    }
        
    var sql = "INSERT INTO bookshelf.books (title, publisher, year, author_id) VALUES ($1, $2, $3, $4)";

    pool.query(sql, [req.body.title, req.body.publisher, req.body.year, req.body.author], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        if (result.rowCount > 0) {
            //book successfully inserted, continue
            console.log('book added to database');
            isExistingBook(req, res, next);
        }
        //TODO: possible error response for failure to create new record?
    });
}

function isExistingLibrary(req, res, next) {
    //check if user already has book in library
    console.log('existing library check')
    var sql = "SELECT * FROM bookshelf.library WHERE user_id = $1 AND book_id = $2";

    pool.query(sql, [req.session.user_id, req.body.title], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        
        if (result.rowCount > 0) {
            //user library already has this book, abort
            console.log('duplicate library book');
            res.statusMessage = "You already have this book!";
            res.status(401).json({
                'message': res.statusMessage
            });
            return;
        } else next();
    });
}

function addLibrary(req, res) {
    console.log('addlibrary')
    
    //insert new book into user's library
    var sql = "INSERT INTO bookshelf.library (user_id, book_id) VALUES ($1, $2)";

    pool.query(sql, [req.session.user_id, req.body.title], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        
        //Logging to console for debugging purposes
        if (result.rowCount > 0) {
            //book successfully inserted, continue
            console.log('book added to library');
            res.statusMessage = 'Book added to library!';
            res.json({
                'message': res.statusMessage
            });
        } else {
            console.log('oops, there was a problem adding library');
            console.log(res.statusMessage);
            res.status(400).json({
                'message': res.statusMessage
            });
        }
    });            
}

//*************************//
//  UPDATE BOOK FUNCTIONS  //
//*************************//
function isUnchanged(req, res, next) {
    //parse old book info
    req.body.oldBook = JSON.parse(req.body.string);

    console.log(req.body.oldBook)

    //check if new info and old info are the same
    if (req.body.title !== req.body.oldBook.title) {
        console.log('title is different')
        next();
    } else if (req.body.author !== req.body.oldBook.name) {
        console.log('author is different')
        next();
    } else if (req.body.publisher !== req.body.oldBook.publisher) {
        console.log('publisher is different')
        next();
    } else if (parseInt(req.body.year) !== parseInt(req.body.oldBook.year)) {
        console.log('year is different')
        console.log(isFinite(req.body.year), req.body.year);
        
        if (isFinite(req.body.year)) {
            console.log('valid year');
            next();
        } else {
            res.statusMessage = "Year must be a number!";
            res.status(401).json({
                'message': res.statusMessage
            });
            return;
        }
    } else {
        //info is all the same, abort
        console.log('info is all the same as before, abort');
        res.statusMessage = "Nothing to update!";
        res.status(401).json({
            'message': res.statusMessage
        });
        return;           
    }
}

function routeAuthor(req, res, next) {
    //check to see if author changed
    if (req.body.author === req.body.oldBook.name) {
        console.log("author didn't change");
        req.body.author = req.body.oldBook.author_id;
        next();
    } else {  //check to see if the new author already exists
        isExistingAuthor(req, res, next);
    }
}

function updateAuthor(req, res, next) {

    //check if unnecessary to update
    if (req.body.author === req.body.oldBook.author_id) {
        console.log('author update unnecessary');
        next();
    } else { //update author in the database
        var sql = "UPDATE bookshelf.books SET author_id = $1 WHERE book_id = $2";

        pool.query(sql, [req.body.author, req.body.oldBook.book_id], function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
        
            // Log this to the console for debugging purposes.
            console.log("author updated successfully");
            next();
        });
    }
}

function routeBook(req, res, next) {
    //check to see if title is unchanged
    if (req.body.title === req.body.oldBook.title) {
        console.log("title didn't change");
        next();
    } else {  //check to see if new title exists
        isExistingBook(req, res, next);
    }
}

function updateBook(req, res) {
    console.log('updateBook');

    //if title didn't change, update other info
    if (req.body.title === req.body.oldBook.title) { //book title didn't change, update other info
        console.log('book title didnt change, update other info');
        
        if (!isFinite(req.body.year) || req.body.year === '') {
            req.body.year = 0;
        }

        var sql = "UPDATE bookshelf.books SET publisher = $1, year = $2 WHERE book_id = $3";

        pool.query(sql, [req.body.publisher, req.body.year, req.body.oldBook.book_id], function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
        
            // Log this to the console for debugging purposes.
            console.log("book updated successfully");
            res.statusMessage = "Book info updated successfully!";
            res.json({
                'message': res.statusMessage
            });
            return;
        });
    } else if (req.body.title !== req.body.oldBook.title) { //new book title, existing book_id, update library record
        //TODO: check if new book_id already has a record with this library
        var sql = "UPDATE bookshelf.library SET book_id = $1 WHERE library_id = $2";

        pool.query(sql, [req.body.title, req.body.oldBook.library_id], function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
        
            // Log this to the console for debugging purposes.
            console.log("library record updated successfully");
            res.statusMessage = "Book info updated successfully!";
            res.json({
                'message': res.statusMessage
            });
            return;
        });
    }
}

//*************************//
//  DELETE BOOK FUNCTIONS  //
//*************************//
function deleteBook(req, res) {
    let book = JSON.parse(req.body.book);

    var sql = "DELETE FROM bookshelf.library WHERE library_id = $1";

    pool.query(sql, [book.library_id], function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            res.statusMessage = "Failed to remove book from library!";
            res.status(400).json({
                'message': res.statusMessage
            });
            return;
        }
    
        // Log this to the console for debugging purposes.
        console.log("book deleted successfully");
        res.statusMessage = "Book removed from your library!";
        res.json({
            'message': res.statusMessage
        });
        return;
    });
}

const express = require('express')
const path = require('path')
const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcrypt');
const session = require('express-session')
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString, 
ssl: {
rejectUnauthorized: false
}
});

var myLogger = function (req, res, next) {
  console.log("Received a request for: " + req.url);
  next()
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({
    extended: true
  }))
  .use(express.json())
  .use(session({ secret: 'keyboard cat'}))
  .use(myLogger)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/login', login)
  .post('/logout', logout)
  .get('/getServerTime', verifyLogin, getServerTime)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function login(req, res) {
  console.log(req.body);
  let success = false;
  let username = req.body.username;
  var sql = "SELECT password  FROM users WHERE username = $1";

  pool.query(sql, [username], function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows[0].password);
    bcrypt.compare('password', result.rows[0].password, function(err, match) {
      console.log
      console.log(match);
      if (match){
        success = true
        req.session.username = username;
      }
    });


    console.log(success);
    res.json({'success': success});
  });
  
  //   if (req.body.username === "admin" && req.body.password === "password"){
  //     success = true
  //     req.session.username = username;
  //   }
  //   console.log(success);
  //   res.json({'success': success});
  // }
}
  

  function logout(req, res) {
    let success = false;
   
    if (req.session.username){
      success = true
      req.session.destroy();
    }
    console.log(req.session);
    res.json({'success': success});
  }

  function getServerTime(req, res){
    let response = {
      'success': true,
      'time': new Date()
    }
    
    
    res.json(response);
  }

  function verifyLogin(req, res, next){
    if (req.session.username){
      next();
    }
    res.status(401).json("could not verify")
  }

  function storeUser() {
    let saltRounds = 10;
    let hashedPassword;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash('password', salt, function(err, hash) {
          hashedPassword = hash;

          bcrypt.compare("password", hashedPassword, function(err, result) {
            // result == true
            console.log(result);
        });
      });
  });

  
  }

  storeUser();
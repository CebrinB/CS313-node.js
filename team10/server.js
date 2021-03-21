require('dotenv').config();
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || "postgres://iwwwnhlhnjpbba:b38a59714f35c20b76dcf50b22805f9c5710a465fe02bb1585d285b5760f6751@ec2-54-164-241-193.compute-1.amazonaws.com:5432/d1lpaus8o6g7ld?ssl=true";
const pool = new Pool({connectionString: connectionString});



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'pages'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .get('/person', (req, res) => res.render('person'))
  .get('/getPeople', getPeople)
  .get('/getPerson', getPerson)
  .get('/getParent', getParent)
  .get('/getChild', getChild)


  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



function getPeople(req, res){
    var sql = "SELECT * FROM team10.person";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        res.json(result.rows)


    })
}

function getPerson(req, res){
    console.log("Getting persons....")
    var id = [req.query.id];

    const sql = "SELECT * FROM team10.person WHERE personid = $1::int";
    pool.query(sql, id, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }
    res.json(JSON.stringify(result.rows))

    })

}

function getParent(req, res){
    console.log("Getting parent....")
    var id = [req.query.id];

    const sql = "SELECT parent FROM team10.relationship WHERE child = $1::int";
    pool.query(sql, id, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }
    res.json(JSON.stringify(result.rows))

    })

}

function getChild(req, res){
    console.log("Getting child....")
    var id = [req.query.id];

    const sql = "SELECT child FROM team10.relationship WHERE parent = $1::int";
    pool.query(sql, id, function(err, result) {
    // If an error occurred...
    if (err || result == null) {
        console.log("Error in query: ")
        console.log(err);
    }
    res.json(JSON.stringify(result.rows))

    })

}
module.exports = {

  returnName : function(name) {
    return name;
  },

  verifyUsername : function(req, res) {
    //logic to check if a data item exists in the user's database
      //esp. a particular book, or a username
      console.log("Verifying username exists...")
        var record = [req.query.username];
    
        const sql = "SELECT * FROM bookshelf.users WHERE username = $1";
        pool.query(sql, record, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        res.json(JSON.stringify(result.rows))
    
        })

  }
}






// function getBooks(req, res) {
//   var sql = "SELECT * FROM bookshelf.books";

//   pool.query(sql, function(err, result) {
//       // If an error occurred...
//       if (err) {
//           console.log("Error in query: ")
//           console.log(err);
//       }

//       // Log this to the console for debugging purposes.
//       console.log("Back from DB with result:");
//       console.log(result.rows);
//       res.json(JSON.stringify(result.rows))
//   });
// }

// function getAuthors(req, res) {
//   var sql = "SELECT * FROM bookshelf.authors";

//   pool.query(sql, function(err, result) {
//       // If an error occurred...
//       if (err) {
//           console.log("Error in query: ")
//           console.log(err);
//       }

//       // Log this to the console for debugging purposes.
//       console.log("Back from DB with result:");
//       console.log(result.rows);
//       res.json(JSON.stringify(result.rows))
//   });
// }

// function addAuthor(name) {
//   var sql = "INSERT INTO bookshelf.authors (name) VALUES ('" + name + "')";

//   pool.query(sql, function(err, result) {
//     // If an error occurred...
//     if (err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }

//     // // Log this to the console for debugging purposes.
//     // console.log("Back from DB with result:");
//     // console.log(result.rows);
//     // res.json(JSON.stringify(result.rows))
// });

// pool.query('SELECT * FROM bookshelf.authors', function(err, result) {
//   // If an error occurred...
//   if (err) {
//       console.log("Error in query: ")
//       console.log(err);
//   }

//   // Log this to the console for debugging purposes.
//   console.log("Back from DB with result:");
//   console.log(result.rows);
//   res.json(JSON.stringify(result.rows))
// });
// }
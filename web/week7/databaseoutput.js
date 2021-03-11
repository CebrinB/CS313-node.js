/****************************
 * Query Database AJAX Request
 ****************************/
function generateTable()
    {
      console.log('checkout run');
      
      $.ajax({
        url: '/databaseitems.php',
        type: 'GET',
        dataType: 'json', //will parse json into javascript object
        //callback called when suceed
        success: (data) => {
          console.log('ajax success!', data);
             product = "";
             product += "<table class='table table-hover table-bordered table-striped'>";
             product += "<tr><th>User ID</th><th> Username</th><th>User Pass</th></tr>";
            
          $.each(data, function (index, value) {
            
            
            product += "<tr>";
            product += "<td>"+ this.user_id + "</td>";
            product += "<td>"+ this.username + "</td>";
            product += "<td>" + "$" + this.user_pass + "</td>";
            product += "</tr>";
          });// END LOOP
           
            product += "</table>";
        //added end
          result = "";
          result = product;
          //select status id element display in html
          $('#results').html(result);
        }//sucess data call
        
      });//ajax function call
     
    }// End function


    
    //Erase 
    function erase(){

        result = "";
        $('#results').html(result);
    }

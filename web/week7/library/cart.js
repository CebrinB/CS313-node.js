
//adds an item to cart when the user clicks on it
function addToCart(item_id) {
  username = document.querySelector('.username').innerHTML;

  selector = "#quantity" + item_id;
  
  quantity = document.querySelector(selector).value;
  data = {};
  data["username"] = username;
  data["item_id"] = item_id;
  data["quantity"] = quantity;
  $.ajax({
        type: 'POST',
        url: "../support/addtocart.php",
        data: data,  
        success:function(data) {
            console.log("Ajax successful! Items added to cart");
        }
 });
 document.querySelector(selector).value = '';
}

//totals the price of items in the cart
function subtotal() {
  total = 0;
  const priceArray = document.querySelectorAll('.subtotal');
    priceArray.forEach(price => {
      total += parseFloat(price.innerHTML);
     });
  format = (total).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  });

  document.querySelector('#total').innerHTML = format;
}

//generates HTML to display a user's cart
function getCart()
  {
    console.log('checkout run');
    data = {};
    data['username'] = document.querySelector('.username').innerHTML;
    console.log(data['username']);

    $.ajax({
      url: '../support/loadCart.php',
      type: 'GET',
      data: data,
      dataType: 'json', //will parse json into javascript object
      //callback called when succeed
      success: (data) => {
        console.log('ajax success!', data);
           product = "";
           product += "<table class='table table-hover table-bordered table-striped'>";
           product += "<tr><th>Quantity</th><th>Item</th><th>Price</th><th>Subtotal</th></tr>";
          
        $.each(data, function (index, value) {
          
          
          product += "<tr>";
          product += "<td>"+ this.quantity + "</td>";
          product += "<td>"+ this.item_name + "</td>";
          product += "<td>" + "$" + this.item_price + "</td>";
          product += "<td>$<span class='subtotal'>" + (this.item_price * this.quantity) + "</span></td>";
          product += "</tr>";
        });// END LOOP
         
          product += "<td></td><td></td><td>Total: </td><td><span id='total'></span></td>";
          product += "</table>";
          product += "<button class='btn' onclick='subtotal()'>Update Total</button>";
      //added end
        result = "";
        result = product;
        //select status id element display in html
        $('#cart').html(result);
      }//success data call
      
    });//ajax function call
   
    $('#cart').removeClass("username");
  }// End function


  
  //Erase the cart HTML
  function erase(){
      result = "";
      $('#results').html(result);
  }

  window.addEventListener("load", () => {
    getCart();
    
    username = document.querySelector('.username').innerHTML;
    stored = JSON.parse(localStorage.getItem('bsUsername'));

    if (username.length > 0) {
      localStorage.setItem('bsUsername', JSON.stringify(username));
    } else if (stored.length > 0) {
      document.querySelector('.username').innerHTML = stored;
    }
 });
<?php
  // Start the session
  session_start();

  include '../support/database.php';
 
  $msg = 'Please <a href="login.php">login</a> 
          to view your cart. If you do not have an account, 
          you can <a href="signUp.php">create one here</a>.';
  
  include 'head.php';

?>

  <body>
    <?php include 'navbar.php'; ?>
    
    <!-- Page Content -->
    <div class="container">
      <div class="row">
        <div class="col-md-2"></div>
        
        
        <div class="col-md-8">
          <div><h2>Items in your cart</h2></div>
          <div>
            <?php if (!isset($_SESSION['username'])) { 
                    echo $msg;
                  } 
                  echo '<div id="cart" class="username">'.$_SESSION['username'].'</div>'; ?>
          </div>
        </div> <!-- close column -->
        
        
        <div class="col-md-2"></div>
      </div> <!-- close row -->
    </div> <!-- close container -->

    <?php include 'footer.php'; ?>
    <script src="../library/cart.js"></script>
  </body>
</html>
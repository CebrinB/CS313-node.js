<?php
// Start the session
session_start();

?>
<!DOCTYPE html>
<html lang="en">
  <?php

  include '../head.php';

  ?>
  <body>
    <?php

      include '../navbar.php';

    ?>

    <link rel="stylesheet" href="week3Styles.css">

    <a href="browseItems.php"><button class="btn btn-primary btn-sm">Continue Shopping</button></a>
    <a href="checkout.php"><button class="btn btn-primary btn-sm">Go to Checkout</button></a>
    <div>Items in Cart: <?php echo $_SESSION["items"] ?></div>

    <!-- Check for an empty cart, display redirect message to user if empty -->
    <div id="emptyCart" style="display:none"><?php echo $_SESSION['items']; ?></div>
    <h3 id="emptyCartLink">There are no items in your cart. Check out items for purchase at our <a href="/week3/browseItems.php">store page.</a></h3>
    
    <!-- See main.js for dynamically generated HTML here -->
    <!-- List of items in cart -->
    <div id="saddles" style="display:none"><?php echo $_SESSION['saddle']; ?></div>
    <div id="bridles" style="display:none"><?php echo $_SESSION['bridle']; ?></div>
    <div id="blankets" style="display:none"><?php echo $_SESSION['blanket']; ?></div>

    <div id="main">
        <ul id="items">
        </ul>
      </div>

    <?php

      include '../footer.php';

    ?>
    <script src="/week3/main.js" type="module"></script>
  </body>
</html>
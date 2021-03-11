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

      $qty = 0;

      if(isset($_POST['saddle'])){
        $_SESSION['saddle'] += $_POST['saddle'];
        $qty += $_POST['saddle'];

      }
      if(isset($_POST['bridle'])){
        $_SESSION["bridle"] += $_POST["bridle"];
        $qty += $_POST['bridle'];
      }
      if(isset($_POST['blanket'])){
        $_SESSION["blanket"] += $_POST["blanket"];
        $qty += $_POST['blanket'];
      }

      $_SESSION['items'] += $qty;

    ?>
    
    <link rel="stylesheet" href="week3Styles.css">

    <!-- Page Content -->
    <a href="viewCart.php"><button class="btn btn-primary btn-sm">View Cart</button></a>
    <a href="checkout.php"><button class="btn btn-primary btn-sm">Go to Checkout</button></a>
    <div>Items in Cart: <?php echo $_SESSION["items"] ?></div>

    <form action="browseItems.php" method="POST">
      <ul class="list-group">
        <li class="list-group-item">
          <a href="#"><img class="card-img-top" src="saddle.jfif" width="125" height="125" alt="Horse Saddle"></a>
          <span><h5>Saddle</h5></span>
          <span><h5>Price: $899.95</h5></span>
          <input type="number" name="saddle" placeholder="Quantity">
        </li>
        <li class="list-group-item">
          <a href="#"><img class="card-img-top" src="bridle.jfif" width="125" height="125" alt="Horse Bridle"></a>
          <span><h5>Bridle</h5></span>
          <span><h5>Price: $399.95</h5></span>
          <input type="number" name="bridle" id="bridle" placeholder="Quantity">
        </li>
        <li class="list-group-item">
        <a href="#"><img class="card-img-top" src="blanket.jfif" width="125" height="125" alt="Horse Blanket"></a>
        <span><h5>Blanket</h5></span>
          <span><h5>Price: $199.95</h5></span>
          <input type="number" name="blanket" id ="blanket" placeholder="Quantity">
        </li>
      </ul>
      <button type="submit" class="btn btn-primary btn-sm">Add to Cart</button>
    </form>

    <a href="viewCart.php"><button class="btn btn-primary btn-sm">View Cart</button></a>
    <a href="checkout.php"><button class="btn btn-primary btn-sm">Go to Checkout</button></a>


    <?php

      include '../footer.php';

    ?>
  </body>
</html>
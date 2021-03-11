<nav class="navbar">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <i class="fas fa-chevron-circle-down"></i>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand white" href="home.php"><h3>Billings Saddlery</h3></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a class="white" href="home.php">Home</a></li>
        <li><a class="white" href="about.php">About</a></li>
        <li><a class="white" href="shop.php">Shop</a></li>
        <li><a class="white" href="contact.php">Contact</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a class="white" href="cart.php"><span class="glyphicon glyphicon-shopping-cart"></span> Cart <?php echo $_SESSION['cart']; ?></a></li>
        <li><a class="white" href="login.php"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        <li><a class="white quiet-link"><?php echo $_SESSION['username']; ?></a></li>
      </ul>
    </div>
  </div>
</nav>
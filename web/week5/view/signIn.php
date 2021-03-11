<?php include 'head.php' ?>
<body class="text-center">
  <?php include 'navbar.php'; ?>
  <div class="container-fluid">
    <div class="row" id="padrow">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 well">
        <h1>Please sign in</h1>
        <?php
          if (isset($_SESSION['message'])) {
            echo $_SESSION['message'];
          } ?>
        <form method="post" action="login.php" class="form-signin">
          <label for="username" class="sr-only">Username:</label><br>
          <input class="form-control" name="username" id="username" type="text" placeholder="Username" required autofocus><br>
          <label for="password" class="sr-only">Password:</label><br>
          <input class="form-control" name="password" id="password" type="password" placeholder="Password" required><br>
          <button class="btn btn-lg btn-block" type="submit">Sign In</button>
          <input type="hidden" name="action" value="signIn">
        </form></br>
        <div>Don't have an account?<br><a href="signUp.php" id="aboutlocation">Sign up today!</a></div>
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
  <?php include 'footer.php'; ?>
</body>
</html>
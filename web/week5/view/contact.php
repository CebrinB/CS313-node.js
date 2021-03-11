<?php
  // Start the session
  session_start();

  include '../support/database.php';
  
  include 'head.php';

?>

  <body>
    <?php include 'navbar.php'; ?>

    <!-- Page Content -->
    <div class="container-fluid">
      <div class="row content">
        <!-- SideNav -->
        <div class="col-sm-3 sidenav">
          <h4>Locations</h4>
          
            <ul class="nav nav-pills nav-stacked" id="locations">
              
            <!-- This content is dynamically filled using contact.js -->

            </ul><br>
          
        </div>
        <div class="col-md-8" id="info">
        </div>
      </div>
    </div>


    <?php include 'footer.php'; ?>
    <script src="../library/contact.js"></script>
  </body>
</html>
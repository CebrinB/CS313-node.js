<?php
  // Start the session
  session_start();
  
  include 'head.php';

?>

  <body>
    <?php include 'navbar.php'; ?>
    

    <!-- Page Content -->
    <div class="container text-center about">
      <div class="col-sm-2"></div>
      <div class="col-lg-8">
        <div><h4>At Billings Saddlery we strive to create a streamlined online shopping experience that provides
            affordability, visibility, and competitive pricing for our customers.</h4> 
        </div>
        <div><h4>Thank you for visiting our online store!</h4></br></br></div>
        <div><a id="aboutlocation" href="contact.php">Find a location</a></div>
      </div>
      <div class="col-sm-2"></div>
    </div>


    <?php include 'footer.php'; ?>
  </body>
</html>
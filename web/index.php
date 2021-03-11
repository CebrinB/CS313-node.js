<!DOCTYPE html>
<html lang="en">
  <?php

  include 'head.php';

  ?>
  <body>
    <?php

      include 'navbar.php';

    ?>
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="summer-783347_1920.jpg" alt="Summer garden with flowers">
          <div class="carousel-caption">
            <h2>I love to</h2>
            <h1>garden</h1>
          </div>      
        </div>

        <div class="item">
          <img src="cookies-1835414_1920.jpg" alt="Blueberry cookies with flowers on the side">
          <div class="carousel-caption">
            <h2>I love to </h2>
            <h1>bake treats</h1>
          </div>      
        </div>
      </div>

      <!-- Left and right controls -->
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  
    <div class="container text-center">    
      <h3>What I Do</h3><br>
      <div class="row">
        <div class="col-sm-4">
          <img src="mom-863055_1920.jpg" class="img-responsive" style="width:100%" alt="Image">
          <p>Find Joy Raising my Children by Day</p>
        </div>
        <div class="col-sm-4"> 
          <img src="monkey-1197100_1920.jpg" class="img-responsive" style="width:100%" alt="Image">
          <p>Code Monkey by Night</p>    
        </div>
        <div class="col-sm-4">
          <div class="well">
          <p>See previous assignments at my <a href="https://cebrinb.github.io/"><i class="fab fa-github-square"></i> GitHub</a></p>
          </div>
          <div class="well">
          <p>Check me out on <a href="https://www.linkedin.com/in/cebrinbillings/"><i class="fab fa-linkedin"></i> LinkedIn</a></p>
          </div>
        </div>
      </div>
    </div><br>
    <div class="container-fluid text-center">
      <p>Garden image by <a href="https://pixabay.com/users/jillwellington-334088/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=783347">Jill Wellington</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=783347">Pixabay</a></p>
      <p>Cookie image by <a href="https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1835414">Pexels</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1835414">Pixabay</a></p>
      <p>Mother image by <a href="https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=863055">Free-Photos</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=863055">Pixabay</a></p>
      <p>Monkey image by <a href="https://pixabay.com/users/joelfotos-767874/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1197100">Joel santana Joelfotos</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1197100">Pixabay</a></p>
    </div>
    <?php
      include 'footer.php';
    ?>
    <script src="main.js" type="module"></script>
  </body>
</html>
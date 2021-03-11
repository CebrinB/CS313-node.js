<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cebrin Billings</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://kit.fontawesome.com/b631726285.js" crossorigin="anonymous"></script>
  <script>
      function addToCart() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(document.querySelector('#saddle').value);
            }
        };
        xmlhttp.open("GET", "functions.php", true);
        xmlhttp.send();
      }

    </script>
  <link rel="shortcut icon" href="/floral-favicon.png" type="image/x-icon">
  <link rel="stylesheet" href="/styles.css">
</head>
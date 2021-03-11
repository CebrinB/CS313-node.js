<?php 
    
    session_start();
  
    //get the model & database
    require_once '../model/model.php';
    include '../support/database.php';

    $action = filter_input(INPUT_GET, 'action');
    if ($action == NULL) {
        $action = filter_input(INPUT_POST, 'action');
    }

  switch ($action) {
    case 'signUp':
       $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
       $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
       $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);
       $pattern = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/';
       
       if (!preg_match($pattern, $password)) {
           $_SESSION['message'] = "Password must contain 7 characters and number";
           include "signUp.php";
           exit;
       }
       if ($password != $password2){
           $_SESSION['message'] = "<p class='notice'>Passwords don't match</p>";
           $mark = true;
           include "signUp.php";
           exit;
       }
       $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
       $signUp = signUpUser($db, $username, $hashedPassword);
       if ($signUp > 0) {
         $_SESSION['username'] = $username;
       }
         header('Location: shop.php');
         exit;
         break;
   case 'signIn':
       $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
       $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
       $userPassword = getPassword($db, $username);
       
       if ($userPassword['password'] == '') {
           echo 'Username does not exist!';
           include 'signIn.php';
           exit;
       }

       if (password_verify($password, $userPassword['password'])) {
           echo 'Password is valid!';
           $_SESSION['username'] = $username;
           header('Location: shop.php');
           exit;
       } else {
           echo 'Invalid password.';
           include 'signIn.php';
           exit;
       }
       
       break;
   default:
   include "signIn.php";
   break;
}

?>

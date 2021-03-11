<?php


session_start();

require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $user_name = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
  $item_id = filter_input(INPUT_POST, 'item_id', FILTER_SANITIZE_NUMBER_INT);
  $quantity = filter_input(INPUT_POST, 'quantity', FILTER_SANITIZE_NUMBER_INT);
}

$sql = 'SELECT user_id FROM ecommerce.user WHERE user_name = \''.$user_name.'\'';
$stmt = $db->prepare($sql);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);


$sql = "INSERT INTO ecommerce.cart (user_id, item_id, quantity) VALUES
        (:user_id, :item_id, :quantity);";
$stmt = $db->prepare($sql);
$stmt->bindValue(':user_id', $user['user_id'], PDO::PARAM_INT);
$stmt->bindValue(':item_id', $item_id, PDO::PARAM_INT);
$stmt->bindValue(':quantity', $quantity, PDO::PARAM_INT);
$stmt->execute();

$stmt->closeCursor();

//error handling output a resposne to the user if there is a problem


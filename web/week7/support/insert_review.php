<?php

session_start();

require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $user_name = filter_input(INPUT_POST, 'user_name', FILTER_SANITIZE_STRING);
  $rating = filter_input(INPUT_POST, 'rating', FILTER_SANITIZE_NUMBER_INT);
  $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
  $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_STRING);
  $item_id = filter_input(INPUT_POST, 'item_id', FILTER_SANITIZE_NUMBER_INT);
}

$sql = 'SELECT * FROM ecommerce.user WHERE user_name = \''.$user_name.'\'';
$stmt = $db->prepare($sql);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

$sql = "INSERT INTO ecommerce.review (user_id, rating, title, content, item_id) VALUES
        (:user_id, :rating, :title, :content, :item_id);";
$stmt = $db->prepare($sql);
$stmt->bindValue(':user_id', $user['user_id'], PDO::PARAM_INT);
$stmt->bindValue(':rating', $rating, PDO::PARAM_INT);
$stmt->bindValue(':title', $title, PDO::PARAM_STR);
$stmt->bindValue(':content', $content, PDO::PARAM_STR);
$stmt->bindValue(':item_id', $item_id, PDO::PARAM_INT);
$stmt->execute();

$stmt->closeCursor();

$new_page = "../view/item.php?item_id=$item_id";

header("Location: $new_page");
die();
?>
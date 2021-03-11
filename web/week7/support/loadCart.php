<?php

session_start();

require_once 'database.php';

$username = filter_input(INPUT_GET, 'username', FILTER_SANITIZE_STRING);

$sql = 'SELECT * FROM ecommerce.user WHERE user_name = \''.$username.'\'';
$stmt = $db->prepare($sql);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

$sql = "SELECT * FROM ecommerce.cart 
        FULL JOIN ecommerce.item on cart.item_id = item.item_id 
        WHERE cart.user_id = '".$user['user_id']."'";
$stmt = $db->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

$stmt->closeCursor();

?>
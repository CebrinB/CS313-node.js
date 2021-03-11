<?php

session_start();

require_once 'database.php';

$sql = 'SELECT location.location_name, location.location_phone, 
        address.address, address.city, address.state, address.zip 
        FROM ecommerce.location JOIN ecommerce.address 
        ON location.location_address = address.address_id';
$stmt = $db->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;

$stmt->closeCursor();

//error handling output a resposne to the user if there is a problem


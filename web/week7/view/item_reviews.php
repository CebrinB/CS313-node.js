<?php

session_start();

include '../support/database.php';

$item_id = htmlspecialchars($_GET['item_id']);

$sql = '';
            if (isset($_GET['item_id'])) {
              $sql = 'SELECT * FROM ecommerce.review WHERE item_id LIKE :filter';
            } else die("No reviews.");
            $stmt = $db->prepare($sql);
            $stmt->bindValue(':filter', '%'.$_GET['item_id'].'%', PDO::PARAM_STR);
            $stmt->execute();
            $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt->closeCursor();

            foreach ($reviews as $review) {
              echo $review['title'];
            }

?>
<?php 
function signUpUser($db, $username, $password) {
    $sql = 'INSERT INTO ecommerce.user (user_name, password) VALUES (:username, :password);';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':username', $username, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);
    $stmt->execute();
    $rowsChanged = $stmt->rowCount();
    $stmt->closeCursor();
    return $rowsChanged;  
}

function getPassword($db, $username) {
    $sql = 'SELECT password FROM ecommerce.user WHERE user_name = :username';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':username', $username, PDO::PARAM_STR);
    $stmt->execute();
    $userPassword = $stmt->fetch(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    return $userPassword;  
}


?>
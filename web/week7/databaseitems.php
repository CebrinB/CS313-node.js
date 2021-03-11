<?php
include "./db/dbConnect.php";
$db = get_db();
?>



<?php
// Grab info from database
$stmt = $db->prepare("SELECT * from public.user");
$stmt -> execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
// Echo data as JSON
echo $json;
?>


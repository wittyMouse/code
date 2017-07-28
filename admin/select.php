<?php
include "Function.php";
function db_connect()
{
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $sql = "SELECT classify_name FROM classify";
    $result = $db->query($conn, $sql);
    while ($data = mysqli_fetch_array($result)) {
        $temp[] = $data['classify_name'];
    }

    $db->close($conn);
    return $temp;
}

$data = db_connect();
$data = json_encode($data);
echo $data;
?>
<?php
include "Function.php";
function db_connect($data)
{
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $sql = "SELECT model_name FROM model WHERE goods_id = '".$data."'";
    $result = $db->query($conn, $sql);
    while ($data = mysqli_fetch_array($result)) {
        $temp[] = $data['model_name'];
    }

    $db->close($conn);
    return $temp;
}

session_start();
if(isset($_SESSION["goods"])) {
    $data = db_connect($_SESSION["goods"]);
}
echo json_encode($data);
?>
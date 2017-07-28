<?php
include "Function.php";
function db_connect($number)
{
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $sql = "SELECT * FROM admin";
    $result = $db->query($conn, $sql);
    $temp['sum'] = mysqli_num_rows($result);
    $sql = "SELECT * FROM admin LIMIT " . (($number['number'] - 1) * 5) . ",5";
    $result = $db->query($conn, $sql);
    while ($data = mysqli_fetch_array($result)) {
        $temp[] = $data;
    }
    $db->close($conn);
    return $temp;
}

$result = array();
$data = $_POST;
$result = db_connect($data);
if (!empty($result)) {
    $result['judge'] = true;
} else {
    $result['judge'] = false;
}
echo json_encode($result);
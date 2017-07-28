<?php
include "Function.php";
function db_connect($data){
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "SELECT * FROM user WHERE username = '".$data."'";
    $result = $db->query($conn,$sql);
    $temp = mysqli_fetch_array($result);
    $db->close($conn);
    return $temp;
}
session_start();
$result = array();
if(isset($_SESSION["user"])){
    $result = db_connect($_SESSION["user"]);
    $result['judge'] = true;
}else{
    $result['judge'] = false;
}
echo json_encode($result);

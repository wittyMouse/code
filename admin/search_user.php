<?php
include "Function.php";
function db_connect($user){
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "SELECT * FROM user WHERE username = '".$user."'";
    $result = $db->query($conn,$sql);
    $temp['user'] = mysqli_fetch_array($result);
    $sql = "SELECT * FROM address WHERE username = '".$user."'";
    $result = $db->query($conn,$sql);
    while ($data = mysqli_fetch_array($result)){
        $temp['address'][] = $data;
    }
    return $temp;
}

session_start();
$result = array();
if(!empty($_SESSION['user'])){
    $data = $_SESSION['user'];
    $result = db_connect($data);
    $result["judge"] = true;
}else{
    $result["judge"] = false;
}
echo json_encode($result);
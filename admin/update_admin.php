<?php
include "Function.php";
function db_connect($data){
    $temp = "";
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "UPDATE admin SET admin = '".$data['adminid']."',password = '".$data['password']."',phone = '".$data["phone"]."',email = '".$data['email']."' WHERE admin = '".$data['admin']."'";
    $db->query($conn,$sql);
    $temp = true;
    $db->close($conn);
    return $temp;
}

$result = "";
session_start();
if(isset($_SESSION["admin"])) {
    if(!empty($_POST)){
        $data = $_POST;
        $data['admin'] = $_SESSION["admin"];
        $data['password'] = md5($data['password']);
        $result = db_connect($data);
    }
    else {
        $result = false;
    }
}else {
    $result = false;
}
echo $result;
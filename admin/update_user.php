<?php
include "Function.php";
function db_connect($data){
    $temp = "";
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "UPDATE user SET username = '".$data['username']."',password = '".$data['password']."',nickname = '".$data['nickname']."',phone = '".$data["phone"]."',email = '".$data['email']."',realname = '".$data['realname']."',gender = '".$data['gender']."',birthday = '".$data['birthday']."' WHERE username = '".$data['user']."'";
    $db->query($conn,$sql);
    $temp = true;
    $db->close($conn);
    return $temp;
}

$result = "";
session_start();
if(isset($_SESSION["user"])) {
    if(!empty($_POST)){
        $data = $_POST;
        $data['user'] = $_SESSION["user"];
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
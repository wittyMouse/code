<?php
include "Function.php";
function db_connect($data){
    $temp = "";
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "SELECT username FROM user WHERE username = '".$data['username']."'";
    $result = $db->query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
        $temp = false;
    }else{
        $sql = "INSERT INTO user SET username = '".$data['username']."',password = '".$data['password']."',nickname = '".$data['nickname']."',phone = '".$data["phone"]."',email = '".$data['email']."',regist_day = '".$data['regist_day']."',realname = '".$data['realname']."',gender = '".$data['gender']."',birthday = '".$data['birthday']."'";
        $db->query($conn,$sql);
        $temp = true;
    }
    $db->close($conn);
    return $temp;
}

$result = "";
if(!empty($_POST)){
    $data = $_POST;
    $data['password'] = md5($data['password']);
    $data['regist_day'] = date("Y-m-d", time());
    $result = db_connect($data);
}else{
    $result = false;
}
echo $result;
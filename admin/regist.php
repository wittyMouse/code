<?php
include "Function.php";
function db_connect($data)
{
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $sql = "SELECT admin FROM admin WHERE admin = '" . $data['username'] . "'";
    $result = $db->query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $temp['message'] = "该管理员已存在";
    } else {
        $sql = "INSERT INTO admin SET admin = '" . $data['username'] . "',password = '" . $data['password'] . "',phone = '" . $data['phone'] . "',email = '" . $data['email'] . "',regist_day = '".$data['regist_day']."'";
        $db->query($conn, $sql);
        $temp['message'] = "注册成功";
    }
    return $temp;
}

$result = array();
if(!empty($_POST)){
    $data = $_POST;
    $data['password'] = md5($data['password']);
    $data['regist_day'] = date("Y-m-d", time());
    $result = db_connect($data);
}else{
    $result['message'] = "没有收到数据";
}
echo json_encode($result);

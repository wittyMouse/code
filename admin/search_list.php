<?php
include "Function.php";
function db_connect($list){
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "SELECT l.list_id,s.status_name,a.username,l.sum_price,l.delivery,l.arrive_time FROM list AS l,status_list AS s,address AS a WHERE l.status_id = s.status_id AND l.address_id = a.address_id AND l.list_id = '".$list."'";
    $result = $db->query($conn,$sql);
    $temp['list'] = mysqli_fetch_array($result);
    $sql = "SELECT g.goods_name,c.goods_count,c.title_price FROM child_list AS c,goods AS g WHERE c.goods_id = g.goods_id AND c.list_id = '".$list."'";
    $result = $db->query($conn,$sql);
    while ($data = mysqli_fetch_array($result)){
        $temp['child_list'][] = $data;
    }
    return $temp;
}

session_start();
$result = array();
if(!empty($_SESSION['list'])){
    $data = $_SESSION['list'];
    $result = db_connect($data);
    $result["judge"] = true;
}else{
    $result["judge"] = false;
}
echo json_encode($result);
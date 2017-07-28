<?php
include "Function.php";
function db_connect($data){
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "UPDATE goods AS g SET g.goods_id = '".$data['goods_id']."',g.goods_name = '".$data['goods_name']."',g.classify_id = (SELECT classify_id FROM classify WHERE classify_name = '".$data['classify_name']."'),g.price = '".$data['price']."',g.store = '".$data['store']."',g.sales = '".$data['sales']."',g.description = '".$data['description']."' WHERE g.goods_id = '".$data['goods']."'";
    $db->query($conn,$sql);
    $sql = "UPDATE model AS m SET m.color = '".$data['color']."',m.version = '".$data['version']."',m.classify_id = (SELECT classify_id FROM classify WHERE classify_name = '".$data['classify_name']."'),m.goods_id = '".$data['goods_id']."' WHERE m.goods_id = '".$data['goods']."' AND m.model_name = '".$data['model']."'";
    $db->query($conn,$sql);
    $sql = "UPDATE images AS i SET i.goods_id = '".$data['goods_id']."' WHERE goods_id = '".$data['goods']."'";
    $db->query($conn,$sql);
}
$result = "";
session_start();
if(isset($_SESSION["goods"])) {
    if (!empty($_POST)) {
        $data = $_POST;
        $data['goods'] = $_SESSION["goods"];
        db_connect($data);
        $result = true;
    } else {
        $result = false;
    }
}else{
    $result = false;
}
echo $result;
<?php
include "Function.php";
function db_connect($data){
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "SELECT g.goods_id,g.goods_name,c.classify_name,g.price,g.store,g.sales,g.description FROM goods AS g,classify AS c,model AS m WHERE g.classify_id = c.classify_id AND g.goods_id = m.goods_id AND g.goods_id = '".$data['goods']."'";
    if(isset($data['model'])){
        $sql = "SELECT color,version FROM model WHERE goods_id = '".$data['goods']."' AND model_name = '".$data['model']."'";
    }
    $result = $db->query($conn,$sql);
    $temp = mysqli_fetch_array($result);
    $db->close($conn);
    return $temp;
}

session_start();
$result = array();
if(isset($_SESSION["goods"])){
    $data['goods'] = $_SESSION["goods"];
    if(!empty($_POST)){
        $data['model'] = $_POST["model"];
    }
    $result = db_connect($data);
    $result['judge'] = true;
}else{
    $result['judge'] = false;
}
echo json_encode($result);

<?php
include "Function.php";
function db_connect($data){
    $temp = "";
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "UPDATE classify SET classify_id = '".(int)$data['classify_id']."',classify_name = '".$data['classify_name']."',child_classify_id = '".(int)$data['child_classify_id']."' WHERE classify_name = '".$data['classify']."'";
    if($data['classify_id'] == ""){
        $sql = "UPDATE classify SET classify_name = '".$data['classify_name']."',child_classify_id = '".(int)$data['child_classify_id']."' WHERE classify_name = '".$data['classify']."'";
        if($data['child_classify_id'] == ""){
            $sql = "UPDATE classify SET classify_name = '".$data['classify_name']."' WHERE classify_name = '".$data['classify']."'";
        }
    }else if($data['child_classify_id'] == ""){
        $sql = "UPDATE classify SET classify_id = '".(int)$data['classify_id']."',classify_name = '".$data['classify_name']."' WHERE classify_name = '".$data['classify']."'";
    }
    $db->query($conn,$sql);
    $temp = true;
    $db->close($conn);
    return $temp;
}

$result = "";
session_start();
if(isset($_SESSION["classify"])) {
    if(!empty($_POST)){
        $data = $_POST;
        $data['classify'] = $_SESSION["classify"];
        $result = db_connect($data);
    }
    else {
        $result = false;
    }
}else {
    $result = false;
}
echo $result;
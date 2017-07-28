<?php
include "Function.php";
function db_connect($data){
    $temp = "";
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $sql = "SELECT classify_name FROM classify WHERE classify_name = '".$data['classify_name']."'";
    $result = $db->query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
        $temp = false;
    }else{
        $sql = "INSERT INTO classify SET classify_name = '".$data['classify_name']."',child_classify_id = '".(int)$data['child_classify_id']."',add_day = '".$data['add_day']."'";
        if($data['child_classify_id'] == ''){
            $sql = "INSERT INTO classify SET classify_name = '".$data['classify_name']."',add_day = '".$data['add_day']."'";
        }
        $db->query($conn,$sql);
        $temp = true;
    }
    $db->close($conn);
    return $temp;
}

$result = "";
if(!empty($_POST)){
    $data = $_POST;
    $data['add_day'] = date("Y-m-d", time());
    $result = db_connect($data);
}else{
    $result = false;
}
echo $result;
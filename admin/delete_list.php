<?php
include "Function.php";
function db_connect($data){
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $length = count($data);
    for($i = 0;$i < $length;$i++){
        $sql = "DELETE FROM list WHERE list_id = '".$data[$i]."'";
        $db->query($conn,$sql);
        $sql = "DELETE FROM child_list WHERE list_id = '".$data[$i]."'";
        $db->query($conn,$sql);
    }
    $db->close($conn);
}

$result = "";
if(!empty($_POST)){
    $data = $_POST;
    db_connect($data);
    $result = true;
}else{
    $result = false;
}
echo $result;

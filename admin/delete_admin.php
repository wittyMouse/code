<?php
include "Function.php";
function db_connect($data){
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn,"utf8");
    $length = count($data);
    for($i = 0;$i < $length;$i++){
        $sql = "DELETE FROM admin WHERE admin = '".$data[$i]."'";
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

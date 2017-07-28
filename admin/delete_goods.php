<?php
include "Function.php";
function db_connect($data)
{
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $length = count($data);
    for($i = 0;$i < $length;$i++) {
        $sql = "SELECT image_url FROM images WHERE goods_id = '" . $data[$i] . "'";
        $result = $db->query($conn,$sql);
        while($url = mysqli_fetch_array($result)){
            $temp[$i][] = $url['image_url'];
        }
        $sql = "DELETE FROM goods WHERE goods_id = '".$data[$i]."'";
        $db->query($conn,$sql);
        $sql = "DELETE FROM model WHERE goods_id = '".$data[$i]."'";
        $db->query($conn,$sql);
        $sql = "DELETE FROM images WHERE goods_id = '".$data[$i]."'";
        $db->query($conn,$sql);
    }
    return $temp;
}
function delete($data)
{
    for($j = 0;$j<count($data);$j++){
    for($i = 0;$i < count($data[$j]);$i++){
        $temp = explode("/", $data[$j][$i],5);
        $filepath = end($temp);
        $filepath = dirname(dirname($_SERVER['SCRIPT_FILENAME'])) ."/".$filepath;
        if (is_file($filepath)) {
            unlink($filepath);
        }
    }
    rmdir(dirname($filepath));
    }
}

$result = "";
if(!empty($_POST)){
    $data = $_POST;
    $temp = db_connect($data);
    delete($temp);
    $result = true;
}else{
    $result = false;
}
echo json_encode($result);
<?php
session_start();
$result = array();
if(isset($_SESSION['username'])) {
    $result['judge'] = true;
    $result['message'] = $_SESSION['username'];
}else{
    $result['judge'] = false;
}
$result = json_encode($result);
echo $result;
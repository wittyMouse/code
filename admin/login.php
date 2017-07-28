<?php
include "Function.php";
function db_connect($uname, $pword)
{
    $temp['judge'] = false;

    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $sql = "SELECT admin FROM admin WHERE admin = '" . $uname . "'";
    $result = $db->query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $sql = "SELECT admin FROM admin WHERE admin = '" . $uname . "' AND password = '".$pword."'";
        $result = $db->query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $temp['judge'] = true;
            $temp['message'] = "登录成功";
        } else {
            $temp['message'] = "密码错误";
        }
    } else {
        $temp['message'] = "账号错误";
    }

    $db->close($conn);
    return $temp;
}

session_start();
$result = array();
if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
    $result = db_connect($_SESSION['username'], $_SESSION['password']);
} else {
    if (isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) == "xmlhttprequest") {
        if (!empty($_POST)) {
            $data = $_POST;
            $data['password'] = md5($data['password']);
            $result = db_connect($data['username'], $data['password']);
            if ($result['judge']) {
                $_SESSION['username'] = $data['username'];
                $_SESSION['password'] = $data['password'];
            }
        }else{
            $result['judge'] = false;
            $result['message'] = "POST未传值";
        }
    } else {
        $result['judge'] = false;
        $result['message'] = "非ajax方法";
    }
}
$result = json_encode($result);
echo $result;
?>
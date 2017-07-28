<?php
include "Function.php";
function db_connect($data)
{
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $sql = "SELECT goods_id FROM goods WHERE goods_name = '" . $data['goods_name'] . "'";
    $result = $db->query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $temp['judge'] = false;
    } else {
        $sql = "INSERT INTO goods SET goods_name = '" . $data['goods_name'] . "',classify_id = (SELECT classify_id FROM classify WHERE classify_name = '" . $data['classify_name'] . "'),price = '" . $data['price'] . "',store = '" . $data['store'] . "',sales = '" . $data['sales'] . "',shelves_time = '" . $data['time'] . "',description = '" . $data['description'] . "'";
        $db->query($conn, $sql);
        $temp['judge'] = true;
    }
    $sql = "SELECT model_id FROM model WHERE model_name = '" . $data['model'] . "' AND goods_id = (SELECT goods_id FROM goods WHERE goods_name = '" . $data['goods_name'] . "')";
    $result = $db->query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $temp['message'] = "商品已存在";
    } else {
        $temp['judge'] = true;
        $sql = "INSERT INTO model SET model_name = '" . $data['model'] . "',color = '" . $data['color'] . "',version = '" . $data['version'] . "',classify_id = (SELECT classify_id FROM classify WHERE classify_name = '" . $data['classify_name'] . "'),goods_id = (SELECT goods_id FROM goods WHERE goods_name = '" . $data['goods_name'] . "')";
        $db->query($conn, $sql);
    }
    if ($temp['judge']) {
        if(!empty($data['imageurl'])){
            for ($i = 0; $i < count($data['imageurl']); $i++) {
                $sql = "INSERT INTO images SET image_url = '" . $data['imageurl'][$i] . "',goods_id = (SELECT goods_id FROM goods WHERE goods_name = '" . $data['goods_name'] . "')";
                $db->query($conn, $sql);
            }
            $temp['message'] = "商品添加成功";
        }else{
            $temp['message'] = "没有图片地址";
        }
    }

    $db->close($conn);
    return $temp;
}

function upload($dir_name)
{
    $result = array();
    if (!empty($_FILES)) {
        $success = 0;
        $url = array();
        for ($i = 0; $i < count($_FILES['image']['name']); $i++) {
            if ($_FILES['image']['error'][$i] > 0) {
            } else {
                $web_dir = "http://" . $_SERVER['HTTP_HOST'] . dirname(dirname($_SERVER['PHP_SELF'])) . "/images/" . $dir_name;
                $web_path = $web_dir . "/" . basename($_FILES["image"]["name"][$i]);
                $rea_dir = dirname(dirname($_SERVER['SCRIPT_FILENAME'])) . "/images/" . $dir_name;
                $rea_path = $rea_dir . "/" . basename($_FILES["image"]["name"][$i]);
                if (is_file($rea_path)) {
                } else {
                    if (is_uploaded_file($_FILES['image']['tmp_name'][$i])) {
                        if (!is_dir($rea_dir)) {
                            mkdir($rea_dir);
                        }
                        if (move_uploaded_file($_FILES['image']['tmp_name'][$i], $rea_path)) {
                            $success++;
                            $url[] = $web_path;
                        } else {
                        }
                    } else {
                    }
                }
            }
            clearstatcache();
        }
        if ($success > 0) {
            $result['judge'] = true;
            $result['success'] = $success;
            $result['url'] = $url;
        } else {
            $result['judge'] = false;
        }
    } else {
        $result['judge'] = false;
    }
    return $result;
}

$result = array();
if (!empty($_POST)) {
    $data = array();
    $count = 0;
    $data = $_POST;
    $data["time"] = date("Y-m-d", time());
    $result = upload($data['model']);
    if ($result['judge']) {
        $count = $result['success'];
        $data["imageurl"] = $result["url"];
    }
    $result = db_connect($data);
    $result['success'] = $count;
} else {
    $result['judge'] = false;
    $result['message'] = "没有收到数据";
}
echo json_encode($result);
?>
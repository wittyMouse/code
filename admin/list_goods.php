<?php
include "Function.php";
function db_connect($number)
{
    $temp = array();
    $db = new DB();
    $conn = $db->connect();
    $db->encode($conn, "utf8");
    $sql = "SELECT goods_id FROM goods";
    $result = $db->query($conn, $sql);
    $temp['sum'] = mysqli_num_rows($result);
    $sql = "SELECT g.goods_id,g.goods_name,c.classify_name,g.price,g.store,g.sales,g.shelves_time FROM goods AS g,classify AS c,model AS m WHERE g.classify_id = c.classify_id AND g.goods_id = m.goods_id GROUP BY g.goods_id LIMIT " . (($number['number'] - 1) * 5) . ",5";
    $result = $db->query($conn, $sql);
    $i = 0;
    while ($data = mysqli_fetch_array($result)) {
        $temp[] = $data;
        $sql = "SELECT model_name FROM model WHERE goods_id = '".$temp[$i]['goods_id']."'";
        $model = $db->query($conn, $sql);
        $temp[$i]['model'] = mysqli_num_rows($model);
        $sql = "SELECT image_url FROM images WHERE goods_id = '".$temp[$i]['goods_id']."'";
        $image = $db->query($conn, $sql);
        $temp[$i]['image'] = mysqli_num_rows($image);
        $i++;
    }
    $db->close($conn);
    return $temp;
}

$result = array();
$data = $_POST;
$result = db_connect($data);
if (!empty($result)) {
    $result['judge'] = true;
} else {
    $result['judge'] = false;
}
echo json_encode($result);
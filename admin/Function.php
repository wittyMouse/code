<?php

class DB
{
    //连接数据库
    function connect()
    {
        $servername = "localhost";
        $username = "root";
        $password = "505357658";
        $dbname = "zero";

        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            die("connect error:" . mysqli_connect_error());
        } else {
            return $conn;
        }
    }

    //执行sql语句
    function query($conn, $sql)
    {
        $result = mysqli_query($conn, $sql);
        return $result;
    }

    //设置编码方式
    function encode($conn, $code)
    {
        $sql = "SET NAMES " . $code;
        $result = $this->query($conn, $sql);
        return $result;
    }

    //关闭数据库
    function close($conn)
    {
        $result = mysqli_close($conn);
        return $result;
    }

    //获取图片
    function getImages($g_name)
    {
        $temp = array();
        $conn = $this->connect();
        $this->encode($conn, 'utf8');
        $sql = "SELECT image_url FROM images WHERE goods_id = (SELECT goods_id FROM goods WHERE goods_name = '" . $g_name . "');";
        $result = $this->query($conn, $sql);
        while ($data = mysqli_fetch_row($result)) {
            $temp[] = $data[0];
        }
        $this->close($conn);
        return $temp;
    }
}

class DATA
{
    // input (数据库连接号，商品名称)  return 商品图片地址数组 若数据不存在则返回false
    function getImages($conn, $g_name)
    {
        $temp = array();
        $sql = "SELECT image_url FROM images WHERE goods_id = (SELECT goods_id FROM goods WHERE goods_name = '" . $g_name . "')";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            while ($data = mysqli_fetch_row($result)) {
                $temp[] = $data[0];
            }
        } else {
            $temp = false;
        }
        return $temp;
    }

    // input (数据库连接号，名称，类型)  return 商品编号 若数据不存在则返回false
    function getGoods_id($conn, $name, $type)
    {
        $temp = '';
        switch ($type) {
            case 'gooos':
                $sql = "SELECT goods_id FROM goods WHERE goods_name = '" . $name . "'";
                break;
            case 'model':
                $sql = "SELECT goods_id FROM model WHERE model_name = '" . $name . "'";
                break;
            case 'image' :
                $sql = "SELECT goods_id FROM images WHERE image_url = '" . $name . "'";
                break;
        }
        $result = mysqli_query($conn, $sql);
        if ($data = mysqli_fetch_row($result)) {
            $temp = $data[0];
        } else {
            $temp = false;
        }
        return $temp;
    }
}


//$db = new DB();
//$conn = $db->connect();
//$sql = "SHOW TABLES";
//$result = $db->query($conn, $sql);
//echo "<table border='1'>";
//echo "<tr><th>Tables_in_zero</th></tr>";
//while($data = mysqli_fetch_array($result)){
//    echo "<tr><td>".$data['Tables_in_zero']."</td></tr>";
//}
//echo "</table>";
//$db->close($conn);
?>
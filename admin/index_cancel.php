<?php
session_start();
session_unset();
if(isset($_COOKIE[session_name()])){
    $time = time()-3600;
    foreach ($_COOKIE as $key=>$value) {
        setcookie($key, "", $time);
    }
}
session_destroy();
echo true;

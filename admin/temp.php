<?php
session_start();
if(!empty($_POST)){
    $data = $_POST;
    if(isset($data['user'])){
        $_SESSION['user'] = $data['user'];
    }else if(isset($data['admin'])){
        $_SESSION['admin'] = $data['admin'];
    } else if(isset($data['classify'])){
        $_SESSION['classify'] = $data['classify'];
    }else if(isset($data['goods'])){
        $_SESSION['goods'] = $data['goods'];
    } else if(isset($data['list'])){
        $_SESSION['list'] = $data['list'];
    }
}


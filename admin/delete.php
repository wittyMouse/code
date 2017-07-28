<?php
session_start();
if (!empty($_POST)) {
    $data = $_POST;
    if (isset($data['user'])) {
        unset($_SESSION['user']);
    } else if (isset($data['admin'])) {
        unset($_SESSION['admin']);
    } else if (isset($data['classify'])) {
        unset($_SESSION['classify']);
    } else if (isset($data['goods'])) {
        unset($_SESSION['goods']);
    }else if (isset($data['list'])) {
        unset($_SESSION['list']);
    }
}
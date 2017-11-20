<?php
/**
 * Created by PhpStorm.
 * User: intellyze labs
 * Date: 10-05-2017
 * Time: 11:33 AM
 */

session_start();
if(!isset($_SESSION["role"])) {
   
    session_destroy();
    header('Location: login.php');
}else{
    session_destroy();
    header('Location: login.php');
}

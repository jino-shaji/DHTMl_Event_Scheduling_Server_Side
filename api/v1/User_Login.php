<?php
/**
 * Created by Jino.
 * User: Jino Shaji
 * Date: 10-05-2017
 * Time: 10:49 AM
 */

require_once '../include/DbOperation.php';

session_start();
if($_SERVER['REQUEST_METHOD']=='POST') {
    $username=$_POST["username"];
    $password= $_POST["password"];
    
    //$remember_me= $_POST["remember_meV"];
    $db = new DbOperation();
    $response = array();
    $result = $db->user_login($username, $password);
    // echo $result;
    // return;
    $response = array();
    $response['error'] = false;
    $response['user_info'] = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $temp = array();
                $_SESSION["username"]=$row['username'];
                $_SESSION["user_id"]=$row['id'];
                $_SESSION["role"]=$row['role'];
                $_SESSION['timeout'] = time() + (60*20);
            $temp['user_id'] = $_SESSION["user_id"];
            $temp['username'] = $_SESSION["username"];
            $temp['role'] = $row['role'];
            array_push($response['user_info'],$temp);
        } 

    } else {
        $response['error'] = true;
        $response['message'] = "No data found";
        //  echo "0 results";
    }
  //  echoResponse(200,$response);
 echo   json_encode($response);

}else {
    $response['error'] = true;
    $response['message'] = "Not a post method";
    echo   json_encode($response);
    //  echo "0 results";
}


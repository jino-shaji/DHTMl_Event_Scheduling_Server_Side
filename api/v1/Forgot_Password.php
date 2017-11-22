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
    $response = array();


    $now = time();
    ini_set('session.gc_maxlifetime',20);
    $timeout = 20; // Number of seconds until it times out.
    
    // Check if the timeout field exists.
    if(isset($_SESSION['timeout'])) {
       // See if the number of seconds since the last
       // visit is larger than the timeout period.
       $duration = time() - (int)$_SESSION['timeout'];
       if($duration > $timeout) {
           // Destroy the session and restart it.
           session_destroy();
           session_start();
           $response['error'] = true;
           $response['message'] = "Session Expired please login to continue.";
           echo   json_encode($response);
          return;
       }
    }
     
    
    // either new or old, it should live at most for another hour
    
    if (!(isset($_SESSION['role']))){
        $response['error'] = true;
        $response['message'] = "Session Expired please login to continue.";
        echo   json_encode($response);

    return;
    } 

    

    $userId=$_POST["userId"];
    $Password= $_POST["password"];
    $Oldpassword= $_POST["Oldpassword"];
    
    //$remember_me= $_POST["remember_meV"];
    $dbMember = new DbOperation();
    $dbMemberChck = new DbOperation();
    $resultCheck = $dbMemberChck->user_loginCheck($userId,trim($Oldpassword));
   
    if ($resultCheck->num_rows <= 0)   {
        $response['error'] = true;
        $response['message'] = "Password Mismatch";
        echo   json_encode($response);

    return;
    }

    $result = $dbMember-> updateLogin($userId,trim($oldPassword), trim($Password));
 
    if (!$result)   {
        $response['error'] = true;
        $response['message'] = "Unexpected error. Counld not update password";
    }else{
            $response['error'] = false;
            $response['message'] = "Password Changed successfully";
        }  
    
        echo   json_encode($response);
     
  //  echoResponse(200,$response);
 

}else {
    $response['error'] = true;
    $response['message'] = "Not a post method";
    echo   json_encode($response);
    //  echo "0 results";
}


<?php

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


    $roomno=$_POST["addRoomNumber"];
    $prefix= $_POST["addRoomPrefix"];
    $dbRoom = new DbOperation();
    $dbRoomChck = new DbOperation();
    $resultCheck = $dbRoomChck->room_Check($roomno,$prefix);
   
    if ($resultCheck->num_rows > 0)   {
        $response['error'] = true;
        $response['message'] = "Room with the same no and prefix already exists.";
        echo   json_encode($response);
       return;
    }

    $result = $dbRoom->add_NewRoom($roomno,$prefix);
    if (!$result)   {
        $response['error'] = true;
        $response['message'] = "Counld not Save Room Data";
    }
    else
    {
           $response['error'] = false;
            $response['message'] = "Room Saved";
    }
        echo   json_encode($response);
  //  echoResponse(200,$response);
 }
 else {
    $response['error'] = true;
    $response['message'] = "Not a post method";
    echo   json_encode($response);
    //  echo "0 results";
}


?>
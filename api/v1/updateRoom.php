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
   
    $roomno=$_POST["editRoomNumber"];
    $prefix= $_POST["editRoomPrefix"];
    $id= $_POST["editRoomNumberId"];
    $dbRoom = new DbOperation();
    $dbRoomChck = new DbOperation();
    $dbRoomData = new DbOperation();
   
    $resultRoomData = $dbRoomData->room_dataById($id);

   
    if ($resultRoomData->num_rows <= 0)   {
        $response['error'] = true;
        $response['message'] = "Room data not exits.";
        echo   json_encode($response);
       return;
    } 
    $OldroomData =$resultRoomData->fetch_all(MYSQLI_ASSOC); ;
    // echo  $OldroomData[0]['roomno'];
    // return;
    $Oldroomno=$OldroomData[0]['roomno'];
    $Oldprefix=$OldroomData[0]['prefix'];

      if($Oldroomno!=$roomno || $Oldprefix!=$prefix)
      {
            
            $resultCheck = $dbRoomChck->room_Check($roomno,$prefix);

        if ($resultCheck->num_rows >0)   {
            $response['error'] = true;
            $response['message'] = "Room with the same no and prefix already exists.";
            echo   json_encode($response);
            return;
        }
      }

    $result = $dbRoom->update_Room($id,$roomno,$prefix);
    if (!$result)   {
        $response['error'] = true;
        $response['message'] = "Counld not Update Room Data";
    }else{
            $response['error'] = false;
            $response['message'] = "Room Updated";
        }  
    
        echo   json_encode($response);
  //  echoResponse(200,$response);
}else {
    $response['error'] = true;
    $response['message'] = "Not a post method";
    echo   json_encode($response);
    //  echo "0 results";
}

?>
<?php

//including the required files
require_once '../include/DbOperation.php';
require '.././libs/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->post('/NewBooking',function() use ($app){
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    //echoResponse(200,$data["start_date"]);
   // return;
   // $Id = $data['id'];
   $start_date=$data['start_date'];
   $Description=$data['Description'];
    
    $end_date = $data['end_date'];
    $room_type=$data['room_type'];
    $room=$data['room'];
    $status=$data['status'];
    $is_paid=$data['is_paid'];
    $Name=$data['Name'];
    $Email=$data['Email'];
    $ReferredBy = $data['ReferredBy'];
    $Category = $data['Category'];
    $bed_type = $data['bed_type'];
    $No_of_guests = $data['No_of_guests'];
    $No_of_male = $data['No_of_male'];
    $No_of_female = $data['No_of_female'];
    $Arrival_flight_details = $data['Arrival_flight_details'];
    $Departure_flight_details = $data['Departure_flight_details'];
    $is_taxi = $data['is_taxi'];
    //$new_date = date('Y-m-d H:i:s', $start_date);   
    
   // echo $new_date;
    //return;
    
    $response = array();
    $dbMember = new DbOperation();
    $result = $dbMember->add_New_Booking($start_date, $end_date, $room_type,$bed_type,$No_of_guests,$No_of_male,$No_of_female,$Arrival_flight_details,$Departure_flight_details, $room,$status,$is_taxi,$is_paid,$Name,$Email,$ReferredBy,$Category,$Description);



    if (!$result) {
        $response['error'] = true;
        $response['message'] = "Counld not Save event";
    }else{
            $response['error'] = false;
            $response['message'] = "Event Saved successfully";
        }  
    
    echoResponse(200,$response);
});
 
$app->post('/updateLogin',function() use ($app){
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    $userId = $data['userId'];
    $oldPassword=$data['Oldpassword'];
    $Password=$data['password'];
    
    $response = array();
    $dbMember = new DbOperation();
    $dbMemberChck = new DbOperation();
    $resultCheck = $dbMemberChck->user_loginCheck($userId,$oldPassword);
   
    if ($resultCheck->num_rows <= 0)   {
        $response['error'] = true;
        $response['message'] = "Password Mismatch";
    echoResponse(200,$response);

    return;
    }

    $result = $dbMember-> updateLogin($userId,$oldPassword, $Password);
 
    if (!$result)   {
        $response['error'] = true;
        $response['message'] = "Unexpected Error.";
    }else{
            $response['error'] = false;
            $response['message'] = "Password Changed!";
        }  
    
    echoResponse(200,$response);
});


$app->post('/UpdateBooking',function() use ($app){
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    //echoResponse(200,$data["start_date"]);
   // return;
    $Id = $data['id'];
    
    $Description=$data['Description'];
    $start_date=$data['start_date'];
    $end_date = $data['end_date'];
    $room_type=$data['room_type'];
    $room=$data['room'];
    $status=$data['status'];
    $is_paid=$data['is_paid'];
    $Name=$data['Name'];
    $Email=$data['Email'];
    $ReferredBy = $data['ReferredBy'];
    $Category = $data['Category'];
    $bed_type = $data['bed_type'];
    $No_of_guests = $data['No_of_guests'];
    $No_of_male = $data['No_of_male'];
    $No_of_female = $data['No_of_female'];
    $Arrival_flight_details = $data['Arrival_flight_details'];
    $Departure_flight_details = $data['Departure_flight_details'];
    $is_taxi = $data['is_taxi'];
  
    //$new_date = date('Y-m-d H:i:s', $start_date);   
    
   // echo $new_date;
    //return;
    
    $response = array();
    $dbMember = new DbOperation();
    $result = $dbMember-> update_New_Booking($Id,$start_date, $end_date, $room_type,$bed_type,$No_of_guests,$No_of_male,$No_of_female,$Arrival_flight_details,$Departure_flight_details, $room,$status,$is_taxi,$is_paid,$Name,$Email,$ReferredBy,$Category,$Description);

    if (!$result) {
        $response['error'] = true;
        $response['message'] = "Counld not update event";
    }else{
            $response['error'] = false;
            $response['message'] = "Event updated successfully";
        }  
    
    echoResponse(200,$response);
});

   
 
 

$app->post('/delete_rooms',function() use ($app){
    $json = $app->request->getBody();
 $data = json_decode($json, true); // parse the JSON into an assoc. array
 //echoResponse(200,$data["start_date"]);
// return;
 
 $id = $data['dataId'];
 
  $db = new DbOperation();
 $response = array();

if($db->delete_rooms($id)=="true"){
     $response['error'] = false;
     $response['message'] = "Rooms Deleted successfully";
 }else{
     $response['error'] = true;
     $response['message'] = "Could not Delete Room";
 }
 echoResponse(200,$response);
});


$app->post('/delete_bookings',function() use ($app){
       $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    //echoResponse(200,$data["start_date"]);
   // return;
    $bookingid = $data['bookingid'];

     $db = new DbOperation();
    $response = array();

   if($db->delete_bookings($bookingid)=="true"){
        $response['error'] = false;
        $response['message'] = "Booking Deleted successfully";
    }else{
        $response['error'] = true;
        $response['message'] = "Could not Delete Booking";
    }
    echoResponse(200,$response);
});

$app->post('/List_Room_BookingInfo',function() use ($app){
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    //echoResponse(200,$data["start_date"]);
   // return;
    $location = $data['location'];
    $start_date=$data['start_date'];
    $end_date = $data['end_date'];
     
   $dbRooms = new DbOperation();
    
   $resultRooms = $dbRooms->ListRoom_Bookings_info($location,$start_date,$end_date);
   
   $response = array();
   $response['error'] = false;
   $response['data'] = array();
   if ($resultRooms->num_rows > 0)  
       $response["data"]=$resultRooms->fetch_all(MYSQLI_ASSOC);
     else {
       $response['error'] = true;
       $response['message'] = "No data found";
   }
 echoResponse(200,$response);
});



$app->post('/List_analytics',function() use ($app){
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    
    $start_date=$data['start_date'];
    $end_date = $data['end_date'];
     
   $dbRooms = new DbOperation();
    //call analytics('2017-11-07','2017-11-07')
    $resultRooms = $dbRooms->List_analytics("call analytics('".$start_date."','".$end_date."')");
     
    echoResponse(200,$resultRooms);
return;
   $response = array();
   $response['error'] = false;
   $response['data'] = array();
   if ($resultRooms->num_rows > 0)  
    {   $response["data"]=$resultRooms->fetch_all();
      // $resultRooms->nextRowset();
       //$response["data2"]=$resultRooms->fetch_all(MYSQLI_ASSOC);
    } 
     else {
       $response['error'] = true;
       $response['message'] = "No data found";
   }
 echoResponse(200,$response);
});


$app->post('/List_Disctinct_Prefix',function() use ($app){
     
    $dbRooms = new DbOperation();
    $resultRooms = $dbRooms->List_Disctinct_Prefix();
    $response = array();
    $response['error'] = false;
    $response['data'] = array();
    if ($resultRooms->num_rows > 0)  
        $response["data"]=$resultRooms->fetch_all(MYSQLI_ASSOC);
      else {
        $response['error'] = true;
        $response['message'] = "No data found";
    }
  echoResponse(200,$response);
});

$app->post('/list_rooms',function() use ($app){
    
    $dbRooms = new DbOperation();
    $resultRooms = $dbRooms->ListRoom();
 

    $response = array();
    $response['error'] = false;
    $response['data'] = array();
   // $temp = array();
   // $temp['collections'] = '';
      
    if ($resultRooms->num_rows > 0) {
        $response["data"]=$resultRooms->fetch_all(MYSQLI_ASSOC);
        $response['message'] = "Success";
        
    } else {
        $response['error'] = true;
        $response['message'] = "No data found";
        //  echo "0 results";
    }
    echoResponse(200,$response);
});

$app->post('/list_roomData',function() use ($app){
    $db = new DbOperation();
    $result = $db->ListRoom_Bookings();

    $dbRooms = new DbOperation();
    $resultRooms = $dbRooms->ListRoom();

    $dbBookigStats = new DbOperation();
    $resultBookingStats = $dbBookigStats->ListbookingStatus();


    $response = array();
    $response['error'] = false;
    $response['data'] = array();
   // $temp = array();
   // $temp['collections'] = '';
    $temp['room'] = array();
    $temp['bookingStatus'] = array();
    if ($resultRooms->num_rows > 0)  
        $temp["room"]=$resultRooms->fetch_all(MYSQLI_ASSOC);
    if ($resultBookingStats->num_rows > 0)  
        $temp["bookingStatus"]=$resultBookingStats->fetch_all(MYSQLI_ASSOC);
  
    if ($result->num_rows > 0) {
        $response["data"]=$result->fetch_all(MYSQLI_ASSOC);
        // output data of each row
        // while($row = $result->fetch_assoc()) {
        //     $temp = array();
        //     $temp['FullName'] = $row['title'] .$row['name'] ;
	    //     $temp['mobile_no'] = $row['mobile_no'];		 
        //     array_push($response['Member_info'],$temp);
        // }
    } else {
        $response['error'] = true;
        $response['message'] = "No data found";
        //  echo "0 results";
    }
     $response['collections']=$temp;
    echoResponse(200,$response);
});
 


function echoResponse($status_code, $response)
{
    $app = \Slim\Slim::getInstance();
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response);
}


function verifyRequiredParams($required_fields)
{
    $error = false;
    $error_fields = "";
    $request_params = $_REQUEST;

    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $app = \Slim\Slim::getInstance();
        parse_str($app->request()->getBody(), $request_params);
    }

    foreach ($required_fields as $field) {
        if (!isset($request_params[$field]) || strlen(trim($request_params[$field])) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["error"] = true;
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(400, $response);
        $app->stop();
    }
}
 

$app->run();


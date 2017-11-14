<?php

//including the required files
require_once '../include/DbOperation.php';
require '.././libs/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


/**
 * Method Type : POST
 * URL: http://YOUR DOMAIN/event/api/v1/NewBooking
 * parameters as json
 {"room":"3","start_date":"2017-03-06 07:10:00","end_date":"2017-03-09 09:20:00","text":"A-45","id":"2","status":"Progress","is_paid":"1","Name":"Jino S","Email":"jinoshajiv@gmail.com","ReferredBy":"Jibin","Category":"Indian Standard"}
 */
 
$app->post('/NewBooking',function() use ($app){
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    //echoResponse(200,$data["start_date"]);
   // return;
   // $Id = $data['id'];
    $start_date=$data['start_date'];
    $end_date = $data['end_date'];
    $text=$data['text'];
    $room=$data['room'];
    $status=$data['status'];
    $is_paid=$data['is_paid'];
    $Name=$data['Name'];
    $Email=$data['Email'];
    $ReferredBy = $data['ReferredBy'];
    $Category = $data['Category'];
  
    //$new_date = date('Y-m-d H:i:s', $start_date);   
    
   // echo $new_date;
    //return;
    
    $response = array();
    $dbMember = new DbOperation();
    $result = $dbMember->addNewRoom($start_date, $end_date, $text,$room,$status,$is_paid,$Name,$Email,$ReferredBy,$Category);



    if (!$result) {
        $response['error'] = true;
        $response['message'] = "Counld not Save event";
    }else{
            $response['error'] = false;
            $response['message'] = "Event Saved successfully";
        }  
    
    echoResponse(200,$response);
});

$app->post('/UpdateBooking',function() use ($app){
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    //echoResponse(200,$data["start_date"]);
   // return;
    $Id = $data['id'];
    $start_date=$data['start_date'];
    $end_date = $data['end_date'];
    $text=$data['text'];
    $room=$data['room'];
    $status=$data['status'];
    $is_paid=$data['is_paid'];
    $Name=$data['Name'];
    $Email=$data['Email'];
    $ReferredBy = $data['ReferredBy'];
    $Category = $data['Category'];
  
    //$new_date = date('Y-m-d H:i:s', $start_date);   
    
   // echo $new_date;
    //return;
    
    $response = array();
    $dbMember = new DbOperation();
    $result = $dbMember->updateRoom($Id,$start_date, $end_date, $text,$room,$status,$is_paid,$Name,$Email,$ReferredBy,$Category);

    if (!$result) {
        $response['error'] = true;
        $response['message'] = "Counld not update event";
    }else{
            $response['error'] = false;
            $response['message'] = "Event updated successfully";
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


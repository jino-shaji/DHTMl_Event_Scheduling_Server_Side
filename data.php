<!-- <?php
	/*require_once('./lib/dhtmlxScheduler/connector/scheduler_connector.php');
	include ('./config.php');

	$roomtypes = new JSONOptionsConnector($res, $dbtype);
	$roomtypes->render_table("room_types","id","id(value),name(label)");
	
	$roomstatuses = new JSONOptionsConnector($res, $dbtype);
	$roomstatuses->render_table("room_statuses","id","id(value),name(label)");

	$bookingstatuses = new JSONOptionsConnector($res, $dbtype);
	$bookingstatuses->render_table("booking_statuses","id","id(value),name(label)");

	$rooms = new JSONOptionsConnector($res, $dbtype);
	$rooms->render_table("rooms","id","id(value),label(label),type(type),status(status)");

	$scheduler = new JSONSchedulerConnector($res, $dbtype);

	$scheduler->set_options("roomType", $roomtypes);
	$scheduler->set_options("roomStatus", $roomstatuses);
	$scheduler->set_options("bookingStatus", $bookingstatuses);
	$scheduler->set_options("room", $rooms);

	 
	$scheduler->render_table("bookings","id","start_date,end_date,text,room,status,is_paid");
*/

?>
 -->

 <?php
   require_once('../lib/dhtmlxScheduler/connector/scheduler_connector.php');
   include ('../config.php');
//    include ('../libs/dhtmlxScheduler/scheduler_connector.php');
    
$res = mysqli_connect($mysql_server,$mysql_user,$mysql_pass,$mysql_db);
	
	// Check connection
	if ($res->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	

	  $sql = "SELECT room,start_date,end_date,text,id,status,is_paid,Name,Email,ReferredBy,Category FROM bookings";

	  $RoomListsql = "SELECT id,id as value,concat(prefix,'-',roomno) as label,type,status FROM rooms";
	  $bookingStatusSql= "SELECT id,name FROM booking_statuses";

	  $result = $res->query($sql);
	  $resultRooms = $res->query($RoomListsql);
	  $bookingStatus = $res->query($bookingStatusSql);

	  $roomData["data"]=array();
	//  $roomData["collections"]='';
	 // $roomData["bookingStatus"]='';
	  
	  $collections["room"]=array();
	  $collections["bookingStatus"]=array();

	  if ($resultRooms->num_rows > 0) {
		$collections["room"]=$resultRooms->fetch_all(MYSQLI_ASSOC);
		
	 ///	array_push($roomData["collections"],$roomList["room"]);
	  }

	  if ($bookingStatus->num_rows > 0) {
		$collections["bookingStatus"]=$bookingStatus->fetch_all(MYSQLI_ASSOC);
		//$roomData["bookingStatus"]=$collections;
		//$roomData["collections"]=$roomData["collections"]+$bookingStatusList;
		//array_push($roomData["collections"],$bookingStatusList["bookingStatus"]);
	  }

		$roomData["collections"]=$collections;
		
	  if ($result->num_rows > 0) {
	     $roomData["data"]=$result->fetch_all(MYSQLI_ASSOC);
	  }  
		echo json_encode($roomData);
		
	  $res->close();

//	$scheduler = new schedulerConnector($res);
	//$scheduler->enable_log("log.txt",true);
  //  $scheduler->render_table("events","event_id","start_date,end_date,event_name,details");
    
    ?>
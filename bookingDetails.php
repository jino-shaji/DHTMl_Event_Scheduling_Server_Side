
<?php
/**
 * Created by Jino SHaji.
 * User: Jino Shaji
 * Date: 19-11-2017
 * Time: 01:02 AM
 */
session_start();
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
   }
}
 

// either new or old, it should live at most for another hour

if (!(isset($_SESSION['role']))){
    header('Location: login.php');
} 
if((isset($_SESSION['role']) &&($_SESSION['role']!="admin") )){
    header('Location: user.php');
  }
?>
<html>
    <head>

        <title>Calendar</title>
        <script src="Assets/jquery/jquery_source.js"></script>
        <script src="Assets/jquery/jquery-ui.js"></script>       
        <script src="Assets/bootstrap/js/bootstrap.js"></script>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.css"/>
        <link href="Assets/css/loading.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="Assets/jquery/jquery-ui.css"/>
        <link href="Assets/libraries/datatables/datatables.min.css" rel="stylesheet" type="text/css"/>
        <script src="Assets/libraries/datatables/datatables.min.js" type="text/javascript"></script>




    </head>
    <body onload="initial()" style="background: #F1F1F1;" >
        <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li><a href="">Home</a></li>
        <li><a href ="">Room Setting</a></li>
        <li><a href="analytics.html">Analytics</a></li>
        
        <li><a href="logout.php">Log Out</a></li>
              </ul>
        
        

        
    </div>
  </div>
        <div class="container">
            <div class="row">
                <div id="loading" class="container">
                    <img src="Assets/img/Loading_icon.gif"/>
                </div>                           

                <div class="col-xs-4">
                    <strong>From Date</strong>
                    <input type="text" placeholder="yyyy-mm-dd" id="fromDate" class="form-control" required Name="fromDate"><br>
                </div>

                <div class="col-xs-4">
                    <strong>To Date</strong>
                    <input type="text" placeholder="yyyy-mm-dd" id="toDate" class="form-control" required Name="toDate"><br>
                </div>
				<div class="col-xs-2 " >
                    <strong >Select Location</strong>
                    <select class="form-control"id='selectLocation'>
					<option value='0'>All</option>
					</select>
                </div>
                <div class="col-xs-2">
                    <br>
                    <input type="button"  value="Filter" id="filter" class="sub btn btn-primary form-control" >
                </div>
            </div>
            <div>
                <table class="table table-striped" id="tableDetails">
                    <thead>
                    <th>Arrival Date</th>
                    <th>Name</th>
                    <th>Flight Details</th>
                    <th>Guests</th>
                    <th>Room</th>
                    <th>Room Type</th>
                    <th>Bed Type</th>
                    <th>Departure</th>
                    <th>Flight Details</th>
                    <th>Location</th>
                    </thead>
                </table>
            </div>
        </div>
        <script>
            var table=Number(1);
            function initial() {
                $('#fromDate').datepicker({dateFormat: 'yy-mm-dd'}).datepicker("setDate", -30);
                $('#toDate').datepicker({dateFormat: 'yy-mm-dd'}).datepicker("setDate", new Date());
				fillSelectLocation();	
                getData();

            }
            $(function () {
                $('#filter').on('click', function () {
                    if ($("#fromDate").val().length != 10 || $("#toDate").val().length != 10) {
                        alert("Enter Dates!");
                        return;
                    }
                    getData();
                });
            });
			function fillSelectLocation(){

                $.ajax({
            type: "POST", //rest Type
            dataType: 'json', //mispelled
            url: "api/v1/List_Disctinct_Prefix",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
				var dataResult=(result);  
				data=result;
				if(result.error==false)
				{
                    $("#selectLocation").empty();
                    $.each( result.data, function( key, value ) {
                      // alert( key + ": " + value.prefix );
                       $("#selectLocation").append("<option value='"+value.prefix +"'>"+value.prefix  +"</option>");
                    });
                    $("#selectLocation").append("<option value='All'>All</option>");
                    $("#selectLocation").val('All');
			    }
             }
         });
       
			//ajax call
			//add data to $("#selectLocation")
			}
function getData(){
    if(table!=1){
                 table.destroy();
             }

             
var searchData={
    location:$("#selectLocation").val(),
    start_date:$("#fromDate").val(), 
    end_date:$("#toDate").val()
};
console.log(JSON.stringify(searchData));
             $.ajax({
            type: "POST", //rest Type
            dataType: 'json', //mispelled
            data:JSON.stringify(searchData), //mispelled
            url: "api/v1/List_Room_BookingInfo",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
				var dataResult=(result);  
                data=result;
				if(result.error==false)
				{
                console.log(result.data);
                    
    table= $("#tableDetails").DataTable( {
        "data": result.data,
        "columns": [
            { "data": "start_date" },
            { "data": "Name" },
            { "data": "Arrival_flight_details" },
            { "data": "noGuests" },
            { "data": "room" },
            { "data": "room_type" },
            { "data": "bed_type" },
            { "data": "end_date"},
            { "data": "prefix"},
            { "data": "Departure_flight_details"},
            
        ],
        dom: 'Bfrtip'
    } );
    $("#loading").hide();
                }
                
    $("#loading").hide();
                
             }
         });


    var data=[{start_date:'2017/7/4',Name:"Name",Arrival_flight_details:"arrivl flight fetails",noGuests:"5(M:3,F:2)",
        room:"2",room_type:"AC",bed_type:"Double",end_date:"2017/7/10",Departure_flight_details:"depature details" }];
    
//           $("#loading").show();
//        $("#filter").prop('disabled', true);
//    $.ajax({
//        url: 'stExcel',
//        type: 'POST',
//        data: {fromDate:fromDate,toDate:toDate,location:$("#selectLocation").val()},
//        success: function (data, textStatus, jqXHR) {
//                    $("#loading").hide();
//                    $("#filter").prop('disabled', false);
//    
//},
//error: function (jqXHR, textStatus, errorThrown) {
//                alert("Unexpected Error");        
//                    }
//                    });
                }
        </script>
    </body>
</html>
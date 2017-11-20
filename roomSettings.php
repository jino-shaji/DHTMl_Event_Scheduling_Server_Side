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

        
    <link href="assets/libraries/sweetalert/sweetalert.css" rel="stylesheet" type="text/css"/>

        

    <script src="assets/libraries/sweetalert/sweetalert.min.js"></script>

    </head>
    <body onload="initial()">
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
        <li><a href="">Log Out</a></li>
              </ul>
        
        

        
    </div>
  </div>
         <div>
                  <div id="loading" class="container">
             <img src="Assets/img/Loading_icon.gif"/>
        </div> 
             <button id="addRoom" class="btn ">New Room</button>
             <table class="table table-striped" id="tableRoom">
                 <thead>
                 <th>Room</th>
                 <th>Actions</th>
                 </thead>
             </table>
         </div>
        
        <div id="modalAddRoom" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">New Room</h4>
      </div>
      
      
      <div class="modal-body">
        <form id="FrmRoomSettings"  method="POST">
          <div class="container">

                <div class="row">
                   
                    <div class="col-md-4 personal-info">
                        <div class="form-group">
                            <label class="col-lg-6 control-label">Prefix</label>
                            <div class="col-lg-6">
                                <input class="form-control" id="addRoomPrefix" name="addRoomPrefix" placeholder="required">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-6 control-label">Room Number</label>
                            <div class="col-lg-6">
                                <input class="form-control" id="addRoomNumber" name="addRoomNumber" type="number" placeholder="required">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-6 control-label"></label>
                            <div class="col-lg-6">
                                
                                <button id =saveRoom>Save</button>
                                
                            </div>
                        </div>
                    </div>
                </div>

            
        </div>
          

      </div>
      <div class="modal-footer">
     
        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      </form>
    </div>

  </div>
</div>
        
           <div id="modalEditRoom" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit Room</h4>
      </div>
      <form id="FrmRoomSettingsEdit"  method="POST">
      
      <div class="modal-body">
          <div class="container">
<input  id="editRoomId" name="editRoomId"  required maxlength="45" hidden>
            
                
                <div class="row">


                    <!-- edit form column -->
                    <div class="col-md-4 personal-info">
                        <div class="form-group">
                            <label class="col-lg-6 control-label">Prefix</label>
                            <div class="col-lg-6">
                                <input class="form-control" id="editRoomPrefix" name="editRoomPrefix" placeholder="required">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-6 control-label">Room Number</label>
                            <div class="col-lg-6">
                            <input class="form-control" id="editRoomNumberId" name="editRoomNumberId" type="hidden">
                                <input class="form-control" id="editRoomNumber" name="editRoomNumber" type="number" placeholder="required">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-6 control-label"></label>
                            <div class="col-lg-6">
                                
                                <button id ="editSaveRoom">Save</button>
                                
                            </div>
                        </div>
                    </div> 
                </div>

          
        </div>
          

      </div>
      <div class="modal-footer">
        <button type="button" id="btnCloseEdit" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      </form>
    </div>

  </div>
</div>
     <script>
         var table;
         function initial(){
             fillTable();
         }
         function fillTable(){
             
    //             table=         $("#tableRoom").DataTable( {
    //     "data": data,
    //     "columns": [
    //         { "data": "name" },
            
    //         {
    //   "data": null,
    //   "defaultContent": "<button class='btn edit'>Edit</button>&nbsp;&nbsp;<button class='btn btn-danger delete'>Delete</button>"
    // }
    //     ],
    //     dom: 'Bfrtip',
    // buttons: [
       
    // ]
    // } );
            $.ajax({
                type: 'POST',
                url: "api/v1/list_rooms",
                success: function (data, textStatus, jqXHR) {
                               $("#loading").hide();
                               $("#tableRoom").DataTable().destroy();
   table=         $("#tableRoom").DataTable( {
       "data": data.data,
       "columns": [
           { "data": "label" },
           
           {
     "data": null,
     "defaultContent": "<button  class='btn edit'>Edit</button>&nbsp;&nbsp;<button class='btn btn-danger delete'>Delete</button>"
   }
       ],
       dom: 'Bfrtip',
   buttons: [
      
   ]
   } );
                   },
                   error: function (jqXHR, textStatus, errorThrown) {
                       alert("Unexpected Error");
                       console.log(jqXHR+" "+errorThrown);
                   }
            });
         }
         
         $(function (){
             $('#tableRoom').on('click', '.delete', function () {
var data = table.row( $(this).parents('tr') ).data();
        var id =data["id"];
    var row=$(this);
        var c=confirm("You will loose all data associated with this room. Confirm");
              if(c){
             
             row.prop('disabled',true);

             var value = {
                roomId:id,
         
    };
    console.log(value);
    var request=  $.ajax(
        {
            url:   "api/v1/deleteRoom.php",
            data : "roomId="+id,
            type: 'POST',
            success: function(data, textStatus, jqXHR)
            {
                console.log(data);
             var data = jQuery.parseJSON(data);
                if(!data.error) {
                    fillTable();
                    // window.location.replace("index.php");
                }
                else{
                    swal("Warning!", data.message, "error");
                    return;
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                swal("Error!", textStatus, "error");
            }
        });


    //        $.ajax({
    //         url:   "api/v1/delete_rooms",
    //        type: 'POST',
    //        data: JSON.stringify({id:id}),
    //        cache:        false,
    //        async: false,
    //        dataType: 'json', 
    //         contentType: "application/json; charset=utf-8",
    //        success: function (data, textStatus, jqXHR) {
               
    //         if(!data.error) {
    //             $(row).prop('disabled', false);
    //              $(row).closest('tr').remove();
    //              swal("Deleted", data.message, "success");
                 
    //                 // window.location.replace("index.php");
    //             }
    //             else{
    //                 swal("Warning!", data.message, "error");
    //                 return;
    //             }


    //        // alert("Batch Deleted");
               
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            alert("Error");
    //            console.log(textStatus + " " + errorThrown);
    //            $(row).prop('disabled', false);
    //        }
    //    });
    }     
        
       
});

$('#tableRoom').on('click', '.edit', function () {
var data = table.row( $(this).parents('tr') ).data();
        var id =data["id"];
        var prefix =data["prefix"];
        var roomNumber =data["roomno"];
        $("#editRoomPrefix").val(prefix);
        $("#editRoomNumber").val(roomNumber);
		$("#editRoomNumberId").val(id);
		$("#editRoomId").val(id);
		
    var row=$(this);
                 
  $("#modalEditRoom").modal('show');      
       
});

$("#addRoom").on('click',function (){
   $("#modalAddRoom").modal('show');
});
$(document).on("submit","#FrmRoomSettings",function(e){
    
e.preventDefault();
// $("#saveRoom").on('click',function(){
   if($("#addRoomPrefix").val().trim().length<1){
       swal("Warning!", "Enter prefix", "warning");
       return;
   } 
   if($("#addRoomNumber").val().trim().length<1){
      swal("Warning!", "Enter Room No", "warning");
       return;
   }
   var prefix=$("#addRoomPrefix").val().trim();
   var roomNumber=$("#addRoomNumber").val().trim();
 
    var value = {
        roomno: roomNumber,
        prefix:prefix
    };
    
    var request=  $.ajax(
        {
            url:   "api/v1/addRoom.php",
            data : $("#FrmRoomSettings").serialize(),
            type: 'POST',
            success: function(data, textStatus, jqXHR)
            {
                console.log(data);
               var data = jQuery.parseJSON(data);
                if(!data.error) {
                    $("#addRoomPrefix").val("");
                    $("#addRoomNumber").val("");
                    $("#btnClose").click();
                    fillTable();
                    swal("Saved", data.message, "success");
                   
                    // window.location.replace("index.php");
                }
                else{
                    swal("Warning!", data.message, "error");
                    return;
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                swal("Error!", textStatus, "error");
            }
        });

});
$(document).on("submit","#FrmRoomSettingsEdit",function(e){
    
e.preventDefault();
// $("#editSaveRoom").on('click',function(){
   if($("#editRoomPrefix").val().trim().length<1){
      swal("Warning!", "Enter prefix", "warning");
       return;
   } 
   if($("#editRoomNumber").val().trim().length<1){
      swal("Warning!", "Enter Room No", "warning");
       return;
   }
   var prefix=$("#editRoomPrefix").val().trim();
   var roomNumber=$("#editRoomNumber").val().trim();
   var id=$("#editRoomNumberId").val();

    var value = {
        id:id,
        roomno: roomNumber,
        prefix:prefix
    };
    console.log(JSON.stringify(value));
    var request=  $.ajax(
        {
            url:   "api/v1/updateRoom.php",
            data : $("#FrmRoomSettingsEdit").serialize(),
            type:         'POST',
            success: function(data, textStatus, jqXHR)
            {
                console.log(data);
              var data = jQuery.parseJSON(data);
                if(!data.error) {
                    $("#editRoomPrefix").val("");
                    $("#editRoomNumber").val("");
                    $("#editRoomNumberId").val('');
                    $("#btnCloseEdit").click();
                    fillTable();
                    swal("Updated", data.message, "success");
                    // window.location.replace("index.php");
                }
                else{
                    swal("Warning!", data.message, "error");
                    return;
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                swal("Error!", textStatus, "error");
            }
        });
   });
         })
     </script>
     </body>
     
</html>
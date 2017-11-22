
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
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Calendar</title>
        <script src="Assets/jquery/jquery_source.js"></script>
        <script src="Assets/jquery/jquery-ui.js"></script>       
        <script src="Assets/bootstrap/js/bootstrap.js"></script>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.css"/>
        <link href="Assets/css/loading.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="Assets/jquery/jquery-ui.css"/>

        <link href="Assets/css/material-dashboard.css" rel="stylesheet" />
    <link href="Assets/css/demo.css" rel="stylesheet" />
    <!--     Fonts and icons     -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>

    <script src="Assets/scripts/material.min.js" type="text/javascript"></script>

<script src="Assets/scripts/chartist.min.js"></script>
<link href="Assets/css/chartist-plugin-tooltip.css" rel="stylesheet" type="text/css"/>
<script src="Assets/scripts/chartist-plugin-tooltip.js" type="text/javascript"></script>

    </head>
 <body   style="background: #F1F1F1;"  >
         <div>
            <form class="form-horizontal container" role="form" id="filterForm" name="filterForm">
                
        <div class="container">
            <div class="row">
 <div id="loading" class="container">
             <img src="Assets/img/Loading_icon.gif"/>
        </div>                           
                
                            <div class="col-xs-4">
                                <strong>From Date</strong>
                                <input type="text" placeholder="yyyy-mm-dd" id="start_date" class="form-control" required name="start_date"><br>
                            </div>
                
                            <div class="col-xs-4">
                                <strong>To Date</strong>
                                <input type="text" placeholder="yyyy-mm-dd" id="end_date" class="form-control" required name="end_date"><br>
                            </div>
                  <div class="col-xs-2">
                      <br>
                      <input type="submit"  value="Filter" id="filter" class="sub btn btn-primary form-control" >
                            </div>
                
            </div>
        </div>
            </form>
   
           
        </div>
<script>
    $(function(){
       
        $("#filterForm").unbind('submit').bind('submit',function (){
      event.preventDefault();
      $(".sub").prop('disabled',true);
      var data={
        start_date:$("#start_date").val(),
        end_date:$("#end_date").val(),
      }
    $.ajax({
            url: "api/v1/List_analytics",
            type: 'POST',
            data:JSON.stringify(data),
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $(".sub").prop('disabled',false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                        
                    }
    });
});
    });
</script>        
</body>

</html>
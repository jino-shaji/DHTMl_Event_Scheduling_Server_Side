<?php
/**
 * Created by Jino SHaji.
 * User: Jino Shaji
 * Date: 19-11-2017
 * Time: 01:02 AM
 */
session_start();
$now = time();
ini_set('session.gc_maxlifetime',1);
$timeout = 1; // Number of seconds until it times out.

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

<!doctype html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <title>Hotel Room Reservation</title>

  <script src='./lib/dhtmlxScheduler/dhtmlxscheduler.js'></script>
  <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_limit.js'></script>
  <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_collision.js'></script>
  <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_timeline.js'></script>
  <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_editors.js'></script>
  <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_minical.js'></script>
  <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_tooltip.js'></script>
  <script src='./js/mock_backend.js'></script>     
 <script src='./js/scripts.js'></script>
 <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<!--TImeline-->
<!-- <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_treetimeline.js'></script> -->
<!-- <script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_daytimeline.js'></script>
<script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_multiselect.js'></script>
<script src='./lib/dhtmlxScheduler/ext/dhtmlxscheduler_active_links.js'></script> -->

<script type="text/javascript" charset="utf-8">
	// function init() {
	// 	scheduler.config.xml_date="%Y-%m-%d %H:%i";
  //       scheduler.config.prevent_cache = true;
	// 	scheduler.config.lightbox.sections=[	
	// 		{name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
	// 		{name:"location", height:43, type:"textarea", map_to:"details" },
	// 		{name:"time", height:72, type:"time", map_to:"auto"}
	// 	]
	// 	scheduler.config.first_hour=4;
	// 	scheduler.locale.labels.section_location="Location";
	// 	scheduler.config.details_on_create=true;
	// 	scheduler.config.details_on_dblclick=true;
	// 	scheduler.init('scheduler_here',new Date(2009,10,1),"month");
	// 	scheduler.load("./data.php?uid="+scheduler.uid());
	// 	var dp = new dataProcessor("./data.php");
	// 	dp.init(scheduler);
	// }
</script>
<!--ENd-->
  <link rel='stylesheet' href='./lib/dhtmlxScheduler/dhtmlxscheduler_flat.css'>
  <link rel='stylesheet' href='./css/styles.css'>
  
</head>

<body onload="init()">
    
      <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
          <div class="dhx_cal_navline">
            <div class="row" style="font-size:16px;padding:4px 20px;">
                Show rooms:
                <select id="room_filter" onchange='updateSections(this.value)'></select>
            </div>
              <div class="dhx_cal_prev_button">&nbsp;</div>
              <div class="dhx_cal_next_button">&nbsp;</div>
              <div class="dhx_cal_today_button"></div>
              <!-- <div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
              <div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
              <div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
              <div class="dhx_cal_tab" name="timeline_tab" style="right:280px;"></div>
               -->
              <div class="dhx_cal_date"></div>
          </div>
          <div class="dhx_cal_header">
          </div>
          <div class="dhx_cal_data">
          </div>      
      </div>
  </body>
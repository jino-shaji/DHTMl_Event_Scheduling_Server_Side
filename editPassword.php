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
<!DOCTYPE html>
<html>
    <head>
        <title>GAS</title>
        <script src="Assets/jquery/jquery_source.js"></script>
        <script src="Assets/jquery/jquery-ui.js"></script>       
        <script src="Assets/bootstrap/js/bootstrap.js"></script>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.css"/>
        <link href="Assets/css/loading.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="Assets/jquery/jquery-ui.css"/>
        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
        <link href="assets/libraries/sweetalert/sweetalert.css" rel="stylesheet" type="text/css"/>

        <!-- <script src="Assets/scripts/change_password.js" type="text/javascript"></script> -->
    </head>
 <body  style="background: #F1F1F1;">
     
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
      <div class="container">
    <div class='row'>
        <div class='col-sm-4 col-md-offset-4'>
            <form id="FrmPasswrd" method="post">
              
            <div class='form-row'>
              <div class='col-xs-12 form-group required'>
                <label class='control-label'>Current password</label>
                <input type="hidden" id="hiddusrId" value="<?php echo $_SESSION["user_id"] ?>">
                <input class='form-control' autocomplete='off' maxlength="45" size='20' type='password' id="cpassword" name="cpassword" required>
                <p id="oldp" style="color: red"></p>
              </div>
            </div>
            <div class='form-row'>
              <div class='col-xs-12 form-group card required'>
                <label class='control-label'>New password</label>
                <input autocomplete='off' class='form-control card-number' maxlength="45" size='20' name="newPassword" id="newPassword" type='password'>
              </div>
            </div>
             <div class='form-row'>
              <div class='col-xs-12 form-group card required'>
                <label class='control-label'>Repeat password</label>
                <input autocomplete='off' class='form-control' size='20' id="confirmPassword" name="confirmPassword" type='password'><p id="pp" style="color: red"></p>
              </div>
            </div>    
           
            <div class='form-row'>
              <div class='col-md-12 form-group'>
                <button class='form-control btn btn-primary submit-button' type='submit' id="save">Change Password</button>                
              </div>
            </div>
          </form>
        </div>
    </div>
</div>

<br>

<script src="js/user_login.js"></script>
<script src="assets/libraries/sweetalert/sweetalert.min.js"></script>

</body>
</html>

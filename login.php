<?php
/**
 * Created by Jino SHaji.
 * User: Jino Shaji
 * Date: 19-11-2017
 * Time: 01:02 AM
 */
session_start();

if ((isset($_SESSION['role']))){
    header('Location: user.php');
    return;
}
?>
<html>
    <head>
  <script src="Assets/jquery/jquery_source.js"></script>
        <script src="Assets/jquery/jquery-ui.js"></script>       
        <script src="Assets/bootstrap/js/bootstrap.js"></script>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.css"/>
        <link href="Assets/css/loading.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="Assets/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="Assets/jquery/jquery-ui.css"/>
        <link href="Assets/css/login.css" rel="stylesheet" type="text/css"/>
        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>

    <link href="assets/libraries/sweetalert/sweetalert.css" rel="stylesheet" type="text/css"/>


        <title>Calendar</title>
        
       
    </head>

    <body> 
<div class = "container">

<div class="row">
    <div class="col-md-10 col-sm-offset-2 text" >
                            <h1 style="color:#000; letter-spacing:1px;"><strong style="color:#000;">Madukkakuzhy</strong>  Ayurveda Room Reservation System</h1>
                            <div class="description">
<!--                                <img src="ASSETS/images/cal.png" class="img-responsive" style="alignment-adjust:text-after-edge; float:right;" /> -->
                            	
                            </div>
                        </div>
                    </div>
	<div class="wrapper">
            
		<form method="post" name="Login_Form" id="frmlogin" action="#" class="form-signin">       
		    <h3 class="form-signin-heading"> <h3>Login to our system</h3>
                            		<p>Enter username and password</p></h3>
                    <hr class="colorgraph">
                    	  
			  <input type="text" class="form-control" name="txtUserName" id="txtUserName" placeholder="User Name" required="" autofocus="" />
                          <br>
			  <input type="password" class="form-control" name="txtPassword" id="txtPassword" placeholder="Password" required=""/>     		  
			 
			  <button class="btn btn-lg btn-primary btn-block"  name="Submit" value="Login" type="Submit" style="background:#de995e;">Login</button>  			
		</form>			
	</div>
</div>
<script src="js/user_login.js"></script>
<script src="assets/libraries/sweetalert/sweetalert.min.js"></script>
</body>
</html>


</html>
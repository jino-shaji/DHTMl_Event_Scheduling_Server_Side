<html>
<head>
<?php
include('dbconnect.php');
if(ISSET($_POST['submit']))
{
	$admno=$_POST["admno"];
	$name=$_POST["name"];
	$gender=$_POST["gender"];
	$course=$_POST["course"];
	$hostel=$_POST["hostel"];
	$email=$_POST["email"];
	$mobile=$_POST["mobile"];
	$username=$_POST["username"];
	$password=$_POST["password"];
	
	$sql="insert into tbl_reg(admno,name,gender,course,hostel,email,mobile,u_name,u_pass,u_type,u_status) values('$admno','$name','$gender','$course','$hostel','$email','$mobile','$username','$password',1,'registered')" or die(mysql_error());
	if(mysql_query($sql)){
        echo "Registered Successfully";
    }
	$result=mysql_query($sql,$con);
$result=mysql_query("select max(reg_id) as reg_id from tbl_reg",$con);
	$row=mysql_fetch_array($result);
	$reg_id=$row['reg_id'];
	$sql="insert into tbl_login(u_id,u_password,u_name,u_type,u_status) values('$email','$password','$name',1,1)";
    $result=mysql_query($sql,$con);
    }
	
?>
<title>Laundry Service</title>
</head>
<body bgcolor=white width="90%" height="10%">
<marquee><h2>Cleanflow Laundry Service</h2></marquee>
<center>
<br><br>
<table align="left" bgcolor=lightblue border=0 width=100% height=10%>
<tr><td>
<table border=0><tr><td><font size=8><img src="../img/img1.jpg">
</table>
<td><table align="right" bgcolor=lightblue border=0 width=80% height=10%>
<tr><td align="center" width=30% ><a style=text-decoration:none; href="home.php">Home</a>
<td><a style=text-decoration:none; href="register.php">Register</a>
<td><a style=text-decoration:none; href="signin.php">SignIn</a>
<td><a style=text-decoration:none; href="contact.php">Contact us</a>
<td><a style=text-decoration:none; href="logout.php">Logout</a>
</table>
</table>
<img align=left src="../img/gif2.gif">
<br><br><br><br><br><br><br><br><br><br><br><br><br>
<form action="register.php" method="POST">
<table cellpadding="2" width=20% height=10% bgcolor="lightblue" align="center"
cellspacing="2">

<tr>
<td colspan=2>
<center><font size=4><b>Student Registration Form</b></font></center>
</td>
</tr>
<tr>

<td>Adm No</td>
<td><input type=text name=admno id="textname" size="30" required></td>
</tr>

<tr>
<td>Name</td>
<td><input type=text name=name id="textname" size="30" required></td>
</tr>


<tr>
<td>Gender</td>
<td><input type="radio" name=gender value="male" size="10">Male
<input type="radio" name=gender value="Female" size="10">Female</td>
</tr>

<tr>
<td>Course</td>
<td><select name=course>
<option value="btech" selected>Btech</option>
<option value="Mtech">Mtech</option>
<option value="mca">MCA</option>
</select></td>
</tr>

<tr>
<td>Hostel</td>
<td><select name=hostel>
<option value="amala" selected>Amala hostel</option>
<option value="santhom">Santhom hostel</option>
</select></td>
</tr>

</tr>
<tr>
<td>EmailId</td>
<td><input type="email" name=email id="email" size="30" required></td>
</tr>

<tr>
<td>MobileNo</td>
<td><input type="text" name=mobile id="mobile" size="30" required></td>
</tr>
<tr>
<td>Username</td>
<td><input type="text" name=username id="username" size="30" required></td>
</tr>
<tr>
<td>Password</td>
<td><input type="password" name=password id="password" size="30" required></td>
</tr>
<tr>
<td><input type="reset"></td>
<td colspan="2"><input type="submit" name=submit value="Submit" /></td>
</tr>
</table>
</form>
<br><br>
<table align="left" bgcolor=lightblue border=0 width=100%>
<tr align="right"><td><font-size=3><b>ANNU JACOB</b></tr></table>
</body>
</html>
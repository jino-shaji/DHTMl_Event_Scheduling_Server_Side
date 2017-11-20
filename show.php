<?php session_start();
include('dbconnect.php');
//include('header.php');
$u_id=$_POST['user_name'];
$u_pass=$_POST['u_pass'];
//$u_id=(isset($_POST['user_name']) ? $_POST['user_name'] : '');
//$u_pass=(isset($_POST['u_pass']) ? $_POST['u_pass'] : '');
//echo "hai show";
$sql="select * from tbl_login where u_id='$u_id'";
$result=mysql_query($sql,$con);
$rowcount=mysql_num_rows($result);
if($rowcount!=0)
{
   while($row=mysql_fetch_array($result))
	{
		   $dbu_id=$row['u_id'];
		   $dbu_pass=$row['u_password'];
		   $dbu_type=$row['u_type'];
		   
	       if($dbu_id==$u_id && $dbu_pass==$u_pass)
	       {
		   $_SESSION['u_id']=$dbu_id;

         //$_SESSION['u_pass']=$dbu_pass;
         $_SESSION['u_name'] =$row['u_name'];

	                             if($dbu_type==0) 
			   {
				   $_SESSION['u_type']="Admin";
			   header("location:../admin/admhome.php");
		       }
			   else if($dbu_type==1)
			   { 
		          $_SESSION['u_type']="User";
			   header("location:../user/select.php");
	           }
			   }
			   
              else
              {
			  header("location:../user/signin.php?error=wrong password");
	           echo "wrong";
              }
   }
   }

else
{
	echo "not found";	
}
?>

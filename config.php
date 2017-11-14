<?php

	// require_once(dirname(__FILE__).'/lib/dhtmlxScheduler/connector/db_pdo.php');
	// $dbtype = "PDO";
	// $res = new PDO("mysql:host=127.0.0.1;dbname=hotel-rooms", "root", "");

 
	
	$mysql_server="127.0.0.1";
	$mysql_user = "root";
	$mysql_pass = "";
	$mysql_db = "roombooking";

	require_once(dirname(__FILE__).'/lib/dhtmlxScheduler/connector/db_mysqli.php');
	$dbtype = "mysqli";
	$res = mysqli_connect($mysql_server,$mysql_user,$mysql_pass,$mysql_db);

//	$excel_file = "../common/excel_sample.xls";
	
	// //necessary for PostgreSQL related samples only 
	// $postrgre_connection = "host=localhost port=5432 dbname=sampleDB user=root password=1234";
	// //necessary for Oracle related samples only 
	// $oci_connection = "some here";
	// //necessart for SQL Anywhere connection
	// $sasql_conn = "uid=DBA;pwd=sql";


?>
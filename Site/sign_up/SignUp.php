<?php

$username = "jperreau";
$password = "jp6249";
#username and database name are the same for me
$database = new mysqli( 'localhost', $username, $password, $username );
if ( $database->connect_errno > 0 ) {
   die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
}

$check_username = $_POST['Username'];
	
$sql = 'SELECT username FROM beta_acct WHERE username="' . $check_username . '"';

if ( ! $result = $database->query( $sql ) ) {
   die( '<p>Error retrieving data from check if exists [' . $database->error . ']</p>' );
}

$response = array();

if(mysqli_num_rows($result)>=1){
	$response['status'] = 'error';
	$response['message'] = 'username already exists';
}
else	
{
	$uName = $_POST['Username'];
	$pWord = $_POST['Password'];
	$eMail = $_POST['Email'];
	
	$sql = 'INSERT INTO beta_acct 
	(`index`, `firstname`, `lastname`, `username`, `email`, `password`, `phonenumber`, `college`, `state`) 
	VALUES 
	( null, "'. $_POST['FirstName'] .'" , "'. $_POST['LastName'] .'", "'. $_POST['Username'] .'" , "'. $_POST['Email'] .'", "'. $_POST['Password'] .'", 0, 0, 0  )'; 	

	if ( ! $result = $database->query( $sql ) ) {
		die( '<p>Error retrieving data [' . $database->error . ']</p>' );
	}
	
	$response['status'] = 'success';
	$response['message'] = 'acc created';
	
	session_start();
	$_SESSION['bLogged'] = true;
	$_SESSION['username'] = $uName;
	
}
	
	echo json_encode($response);
	
?>
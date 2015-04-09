<?php
	session_start();
	
	$username = "jperreau";
	$password = "jp6249";
	#username and database name are the same for me
	$database = new mysqli( 'localhost', $username, $password, $username );
	if ( $database->connect_errno > 0 ) {
	   die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
	}
	
	$phoneNumber = $_POST['phoneNumber'];
	
	$sql = 'UPDATE beta_acct SET phonenumber="' . $phoneNumber . '" WHERE username="' . $_SESSION['username'] . '"';
	
	if ( ! $result = $database->query( $sql ) ) {
		die( 'username not found in DB' );
	}	
	
?>
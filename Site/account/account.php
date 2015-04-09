<?php
	session_start();
	
	$username = "jperreau";
	$password = "jp6249";
	#username and database name are the same for me
	$database = new mysqli( 'localhost', $username, $password, $username );
	if ( $database->connect_errno > 0 ) {
	   die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
	}

	
	#retrieves all info for the user
	$select = 'SELECT * FROM beta_acct WHERE username ="' . $_SESSION['username'] . '"';      #' . $_SESSION['username']  . '"';
	if ( ! $result = $database->query( $select ) ) {
		die( 'username not found in DB' );
	}	
		
	#add all results to an array and json encode it to send it back to the js
	$accountData = array();
	while ( $row = $result->fetch_assoc() ) {
		$accountData[] = $row;
	}

	echo json_encode($accountData);
	
?>
<?php
	$username = "jperreau";
	$password = "jp6249";
	#username and database name are the same for me
	$database = new mysqli( 'localhost', $username, $password, $username );
	if ( $database->connect_errno > 0 ) {
	   die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
	}
	
	$uName = $_GET['Username'];
	$pWord = $_GET['Ipassword'];
	#echo "\n";
	#echo $uName;
	#echo "\n";
	#echo $pWord;
	#echo "\n";
	$select = 'SELECT * FROM alpha_acct WHERE username ="' . $uName . '" AND password = "' . $pWord . '"';
	#$select = 'SELECT * FROM alpha_acct WHERE username = "u_name" AND password = "pw"';
	if ( ! $result = $database->query( $select ) ) {
		die( 'Error with query' );
	}	
	
	#while ( $row = $result->fetch_assoc() ) {
	#	$arr[] = $row;
	#}
	
	if ( $result->fetch_assoc() ) {
		echo "match";
	}
	else {
		echo "no match";
	}
?>
<?php
	$username = "jperreau";
    $password = "jp6249";

    #username and database name are the same for me
    $database = new mysqli( 'localhost', $username, $password, $username );
    if ( $database->connect_errno > 0 ) {
       die( "Unable to establish a connection");
    }
	
	if ( !isset( $_POST['comment'] ) || !isset( $_POST['id'] ) || !isset( $_POST['user'] )) {
		die ("No data received");
	}
	$comment = $_POST['comment'];
	$id = $_POST['id'];
	$user = $_POST['user'];
	
	$insert = 'INSERT INTO post' . $id . '_comments VALUES ( null, "' . $user . '", "' . $comment . '" )' ;
    if ( ! $result = $database->query( $insert ) ) {
		die( "Error with INSERT" );
    }
	
	echo "PHP Success!"
	#$params = json_decode(file_get_contents('php://input'), true);
	#echo $params;
?>
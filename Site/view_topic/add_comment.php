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
	$time_posted = date( 'Y-m-d H:i:s' );
	
	$insert = 'INSERT INTO beta_post' . $id . '_comments VALUES ( null, "' . $user . '", "' . $comment . '", "' . $time_posted . '" )' ;
    if ( ! $result = $database->query( $insert ) ) {
		die( "Error with INSERT" );
    }
	
	$newdate = date( 'Y-m-d H:i:s' );
	$update = 'UPDATE beta_topic_resevoir SET time_updated="' . $newdate . '" WHERE id="' . $id . '"';
    if ( ! $result = $database->query( $update ) ) {
		die( "Error with UPDATE" . $database->error );
    }
	
	echo "PHP Success! Post Id = " . $id;
	#$params = json_decode(file_get_contents('php://input'), true);
	#echo $params;
?>
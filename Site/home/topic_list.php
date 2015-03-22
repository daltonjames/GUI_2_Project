<?php
    $username = "jperreau";
    $password = "jp6249";

    #username and database name are the same for me
    $database = new mysqli( 'localhost', $username, $password, $username );
    if ( $database->connect_errno > 0 ) {
       die( 'Unable to connect to database');
    }

	#selects all topics that exist
	$select = "SELECT * FROM alpha_topic_resevoir";
    if ( ! $result = $database->query( $select ) ) {
       die( 'Error retreving data' );
    }
	
	#add all results to an array and json encode it to send it back to the js
	$postData = array();
	while ( $row = $result->fetch_assoc() ) {
		$postData[] = $row;
	}

	echo json_encode($postData);
?>
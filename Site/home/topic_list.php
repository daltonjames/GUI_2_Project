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

	$tagArr = array();
	$numOfComments = 0;
	foreach( $postData as $post ) {
		$select = 'SELECT * FROM beta_tags WHERE postId="' . $post['id'] . '"';
		if ( ! $result = $database->query( $select ) ) {
		   die( 'Error loading tags' );
		}
		$tempArr = array();
		while ( $row = $result->fetch_assoc() ) {
		   $tempArr[] = $row;
		}
		$tagArr[] = $tempArr;
		
		/*$select = 'SELECT COUNT(*) FROM post' . $post['id'] . '_comments';
		if ( ! $result = $database->query( $select ) ) {
		   die( 'Error counting tags' );
		}
		$numOfComments = $result;*/
	}
	
	$arr = array();
	$arr[] = $postData;
	$arr[] = $tagArr;
	echo json_encode($arr);
?>
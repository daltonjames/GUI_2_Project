<?php
	if ( !isset( $_GET['limit'] ) || !isset( $_GET['lastId'] ) ) {
		die ("No data received");
	}

    $username = "jperreau";
    $password = "jp6249";
	
	$limit = $_GET['limit'];
	$lastId = $_GET['lastId'];

    #username and database name are the same for me
    $database = new mysqli( 'localhost', $username, $password, $username );
    if ( $database->connect_errno > 0 ) {
       die( 'Unable to connect to database');
    }

	#selects all topics that exist
	$select = "SELECT * FROM beta_topic_resevoir WHERE id > " . $lastId . " ORDER BY id LIMIT " . $limit;
    if ( ! $result = $database->query( $select ) ) {
       die( 'Error retrieving data' );
    }
	
	#add all results to an array and json encode it to send it back to the js
	$postData = array();
	while ( $row = $result->fetch_assoc() ) {
		$postData[] = $row;
	}

	foreach( $postData as &$post ) {
		$tagArr = array();
		$select = 'SELECT * FROM beta_tags WHERE postId="' . $post['id'] . '"';
		if ( ! $result = $database->query( $select ) ) {
		   die( 'Error loading tags' );
		}
		while ( $row = $result->fetch_assoc() ) {
		   $tagArr[] = $row;
		}
		
		$select = 'SELECT postIndex FROM beta_post' . $post['id'] . '_comments';
		if ( ! $result = $database->query( $select ) ) {
		   die( 'Error counting tags' );
		}
		$post['commentsNum'] = $result->num_rows;
		$post['tagList'] = $tagArr;
	}
	
	$arr = array();
	$arr[] = $postData;
	$arr[] = $limit;
	$arr[] = $lastId;
	echo json_encode($arr);
?>

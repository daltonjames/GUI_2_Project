<?php
	if ( !(isset( $_GET['id']) ) ){
		die("id value not received!");
	}

    $username = "jperreau";
    $password = "jp6249";
	$idCode = $_GET['id'];

    #username and database name are the same for me
    $database = new mysqli( 'localhost', $username, $password, $username );
    if ( $database->connect_errno > 0 ) {
       die( 'Unable to connect to database' );
    }

   $select = 'SELECT * FROM alpha_topic_resevoir WHERE id= ' . intval($idCode);
    if ( ! $result = $database->query( $select ) ) {
       die( 'Error loading post from reservoir' );
    }
   $postData = array();
   while ( $row = $result->fetch_assoc() ) {
       $postData[] = $row;
   }
	
	$select = "SELECT * FROM post" . $idCode . "_comments";
    if ( ! $result = $database->query( $select ) ) {
       die( 'Error loading comments' );
    }
   $commentData = array();
   while ( $row = $result->fetch_assoc() ) {
       $commentData[] = $row;
   }
   
	$select = 'SELECT * FROM beta_tags WHERE postId="' . $idCode . '"';
	if ( ! $result = $database->query( $select ) ) {
       die( '<Error loading tags' );
    }
	$tagArr = array();
	while ( $row = $result->fetch_assoc() ) {
	   $tagArr[] = $row;
	}

	$arr = array();
	$arr[] = $postData;
	$arr[] = $commentData;
	$arr[] = $idCode;
	$arr[] = $tagArr;
    echo json_encode($arr);
?>

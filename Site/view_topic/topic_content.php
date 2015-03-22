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
       die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
    }

   $select = 'SELECT * FROM alpha_topic_resevoir WHERE id= ' . intval($idCode);
    if ( ! $result = $database->query( $select ) ) {
       die( '<p>Error retrieving data [' . $database->error . ']</p>' );
    }
   $postData = array();
   while ( $row = $result->fetch_assoc() ) {
       $postData[] = $row;
   }
	
	$select = "SELECT * FROM post" . $idCode . "_comments";
    if ( ! $result = $database->query( $select ) ) {
       die( '<p>Error retrieving data [' . $database->error . ']</p>' );
    }
   $commentData = array();
   while ( $row = $result->fetch_assoc() ) {
       $commentData[] = $row;
   }

	$arr = array();
	$arr[] = $postData;
	$arr[] = $commentData;
	$arr[] = $idCode;
    echo json_encode($arr);
?>

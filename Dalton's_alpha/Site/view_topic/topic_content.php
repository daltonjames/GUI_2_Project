<?php
    $username = "jperreau";
    $password = "jp6249";

    #username and database name are the same for me
    $database = new mysqli( 'localhost', $username, $password, $username );
    if ( $database->connect_errno > 0 ) {
       die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
    }

   $select = "SELECT * FROM alpha_topic_resevoir";
    if ( ! $result = $database->query( $select ) ) {
       die( '<p>Error retreving data [' . $database->error . ']</p>' );
    }
   $postData = array();
   while ( $row = $result->fetch_assoc() ) {
       $postData[] = $row;
   }

    #retrieve the comments as well
    $getComments = $postData[0]["id"];
	
	$select = "SELECT * FROM post" . $getComments . "_comments";
    if ( ! $result = $database->query( $select ) ) {
       die( '<p>Error retreving data [' . $database->error . ']</p>' );
    }
   $commentData = array();
   while ( $row = $result->fetch_assoc() ) {
       $commentData[] = $row;
   }

	$arr = array();
	$arr[] = $postData;
	$arr[] = $commentData;
    echo json_encode($arr);
?>

<?php


//connects to database with these username and password credentials
$username = "jperreau";
$password = "jp6249";

//Connct to MySQL and database. If database connection fails, throw error message
$database = new mysqli( 'localhost', $username, $password, $username );
if( $database->connect_errno > 0 ) {
    die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
}

$topic = $_POST['topic-title'];

$description = $_POST['short-desc'];

$time_posted = date( 'Y-m-d H:i:s' );

$opening_comment = $_POST['opening-point'];

// To be changed lated
$uname = "kdoubledubbs";

$sql = 'INSERT INTO alpha_topic_resevoir VALUES ( null, "' . $topic . '" , "' . $description . '" , "' . $time_posted . '" , "' . $time_posted . '" , "' . $opening_comment . '" , "' . $uname . '" ) ';

if( ! $result = $database->query( $sql ) ){
    die( 'POST ERROR');
}

#getId
$sql = 'SELECT * FROM alpha_topic_resevoir WHERE description = "' . $description . '" AND opening_comment = "' . $opening_comment . '"';
if( ! $result = $database->query( $sql ) ){
    die( 'getId ERROR');
}

$postData = array();
while ( $row = $result->fetch_assoc() ) {
   $postData[] = $row;
}
$postId = $postData[0]["id"];

$sql = 'CREATE TABLE post' . $postId . '_comments ( postIndex int(6) ZEROFILL NOT NULL auto_increment, poster text NOT NULL, commentString text NOT NULL, PRIMARY KEY (postIndex), KEY postIndex (postIndex) )';
if( ! $result = $database->query( $sql ) ){
    die( 'Comment Table ERROR');
}


#echo "Success! WOOHOO!"
echo json_encode($postId);

?>
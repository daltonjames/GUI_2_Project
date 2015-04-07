<?php
//TODO: Error check Superglobal $_POST with isset

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

$uname = $_POST['username'];

//explode is equivalent to JavaScript's String.split()
$tagArr = array();
$tagArr = explode(", ", $_POST['tags-list']);
#echo json_encode($tagArr);
#echo "\n";

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

#doesn't account for zerofill id
/*if ( $postId = $database->insert_id == 0 ) {
	die( 'insert_id() ERROR' );
}
$postId = substr(sprintf("%08d", $postId), 0, 8);*/

$sql = 'CREATE TABLE post' . $postId . '_comments ( postIndex int(6) ZEROFILL NOT NULL auto_increment, poster text NOT NULL, commentString text NOT NULL, PRIMARY KEY (postIndex), KEY postIndex (postIndex) )';
if( ! $result = $database->query( $sql ) ){
    die( 'Comment Table ERROR');
}

foreach( $tagArr as $tag ) {
	$sql = 'INSERT INTO beta_tags VALUES ( null, "' . $tag . '", "' . $postId . '")';
	if( ! $result = $database->query( $sql ) ) {
		die( 'Tag Table ERROR');
	}
}

#echo "Success! WOOHOO!"
echo json_encode($postId);

?>
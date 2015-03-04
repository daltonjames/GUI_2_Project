<?php
$username = "jperreau";
$password = "jp6249";
#username and database name are the same for me
$database = new mysqli( 'localhost', $username, $password, $username );
if ( $database->connect_errno > 0 ) {
   die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
}

$u_name = u_name;

$select = 'SELECT username FROM alpha_acct WHERE username="' . $u_name . '"';
if ( ! $result = $database->query( $select ) ) {
   die( '<p>Error retreving data [' . $database->error . ']</p>' );
}

$arr = array();
while ( $row = $result->fetch_assoc() ) {
    $arr[] = $row;
}
echo json_encode($arr);
?>
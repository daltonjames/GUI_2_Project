<?php

$username = "jperreau";
$password = "jp6249";
#username and database name are the same for me
$database = new mysqli( 'localhost', $username, $password, $username );
if ( $database->connect_errno > 0 ) {
   die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
}

$check_username = $_POST[Username];
echo $check_username;
echo "\n";
	
$sql = 'SELECT username FROM alpha_acct WHERE username="' . $check_username . '"';

if ( ! $result = $database->query( $sql ) ) {
   die( '<p>Error retreving data [' . $database->error . ']</p>' );
}

if(mysqli_num_rows($result)>=1){
    echo "name already exists";
}
else	
{
	echo "name being added";
	$sql = "INSERT INTO alpha_acct (`index`, `username`, `password`, `email`) VALUES ( null, '$_POST[Username]' , '$_POST[Password]' , '$_POST[Email]' )"; 	

	if ( ! $result = $database->query( $sql ) ) {
		die( '<p>Error retreving data [' . $database->error . ']</p>' );
	}
}
	
?>
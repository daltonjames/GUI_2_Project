<?php

$username = "jperreau";
$password = "jp6249";

echo "<p>Working...</p>";

#username and database name are the same for me
$database = new mysqli( 'localhost', $username, $password, $username );
if ( $database->connect_errno > 0 ) {
   die( '<p>Unable to connect to database [' . $database->connect_error . ']</p>' );
}
else {
   echo "<p>Connection successful!</p>";
}

$select = "SELECT * FROM alpha_acct";
if ( ! $result = $database->query( $select ) ) {
   die( '<p>Error retreving data [' . $database->error . ']</p>' );
}

echo "<p>Tables in database:</p>";
echo "<table>";
while ( $row = $result->fetch_assoc() ) {
      echo "<tr>";
      echo "<td>{$row['index']}</td>";
      echo "<td>{$row['username']}</td>";
      echo "<td>{$row['password']}</td>";
      echo "<td>{$row['email']}</td>";
      echo "</tr>";
}
echo "</table>";
?>

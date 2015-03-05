<?php
session_start();

$_SESSION['username'] = $_GET[Username];

echo $_SESSION['username']; 

echo "\nsession should be started\n\n";


?>
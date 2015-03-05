<?php
// page1.php

session_start();

$_SESSION['username'] = $_GET[Username];

echo "session should be started";

?>
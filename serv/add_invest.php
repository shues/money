<?php
	require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');
	
    $inv_name = $_GET['inv_name'];
    $inv_long = $_GET['inv_long'];
    $inv_merge = $_GET['inv_merge'];
	
	$query = "INSERT INTO `invest` VALUES ('NULL', '$inv_name', '$inv_long', '$inv_merge')";
	mysqli_query($db,$query);
	echo ok;
    mysqli_close($db);
?>
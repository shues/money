<?php
	require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');
	
	$query = "INSERT INTO `sources` VALUES ('NULL','Зарплата'),('NULL','Фриланс'),('NULL','Долг')";
	mysqli_query($db,$query);
?>
<?php
	require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');
	
	$dat = $_GET['dat'];
	$sum = $_GET['sum_prih'];
	$from = $_GET['src_prih'];
    $comm = $_GET['comm'];
	
	$query = "INSERT INTO `input_cash` VALUES ('NULL', '$dat', '$sum', '$from', '$comm')";
	mysqli_query($db,$query);
	echo 'ok';
?>
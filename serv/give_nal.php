<?php
	require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');
	
	$query = "SELECT SUM(`cash`) FROM `input_cash`";
	$res = mysqli_query($db,$query);
	$ans1 = mysqli_fetch_array($res)[0];
	
	$query = "SELECT SUM(`cash`) FROM `invest_inp`";
	$res = mysqli_query($db,$query);
	$ans2 = mysqli_fetch_array($res)[0];
		
	echo $ans1-$ans2;
?>
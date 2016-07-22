<?php
	require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');
    $dat = $_GET['dat'];
    $cash = $_GET['cash'];
    $invest = $_GET['id'];
    
	$query = "INSERT INTO `invest_out` VALUES ('$dat','$cash','$invest')";
	mysqli_query($db,$query);
    
    $query = "
        SELECT 
            SUM(`cash`)                 
        FROM 
            `invest_inp` 
        WHERE 
            `invest`='$invest'";
        
    $res = mysqli_query($db,$query);
    $sum1 = mysqli_fetch_array($res)[0];
    $query = "
        SELECT 
            SUM(`cash`) 
        FROM 
            `invest_out` 
        WHERE 
            `invest`='$invest'";

    $res = mysqli_query($db,$query);
    $sum2 = mysqli_fetch_array($res)[0];
    echo $invest.':'.$sum1.':'.$sum2;
    mysqli_close($db);
?>
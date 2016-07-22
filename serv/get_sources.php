<?php
    require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');

    $query = "SELECT * FROM `sources`";
    $res = mysqli_query($db,$query);
    while($log = mysqli_fetch_array($res)){
        echo $log[0].':'.$log[1].';';
    }
    mysqli_close($db);
?>
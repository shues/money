<?php
	require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');
	
	$query = "
        SELECT
            `out`.`data`, 
            `out`.`cash`, 
            `invest`.`name` 
        FROM 
            `invest_out` AS `out` 
        LEFT OUTER JOIN 
            `invest` 
        ON 
            `out`.`invest`=`invest`.`id`";
	$res = mysqli_query($db,$query);
	while($ans = mysqli_fetch_array($res)){
        echo $ans[0].':'.$ans[1].':'.$ans[2].';';
    }
    mysqli_close($db);
?>
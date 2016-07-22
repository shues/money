<?php
	require_once('base.php');	
	$db = dbconn();
	if(!$db) {
		return;
	}
	mysqli_query($db,'SET NAMES utf8');
		
    $query = "
    SELECT 
        `invest`.*,
        `inp`.`cash`, 
        `out`.`cash`, 
        `inp`.`cash`-`out`.`cash` AS `result` 
    FROM 
        `invest` 
    LEFT OUTER JOIN 
        (SELECT 
            SUM(`cash`) AS `cash`, 
            `invest` 
        FROM 
            `invest_inp` 
        GROUP BY 
            `invest`) AS `inp` 
    ON 
        `inp`.`invest`=`invest`.`id` 
    LEFT OUTER JOIN 
        (SELECT 
            SUM(`cash`) AS `cash`, 
            `invest` 
        FROM 
            `invest_out` 
        GROUP BY `invest`) AS `out` 
    ON 
        `out`.`invest`=`invest`.`id`";

	$res = mysqli_query($db,$query);
	while($mass = mysqli_fetch_array($res)){
        echo $mass[0].':'.$mass[1].':'.$mass[2].':'.$mass[3].':'.$mass[4].':'.$mass[5].';';
    }
    mysqli_close($db);
?>
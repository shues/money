<?php
    function in_out_invest($invest){
        echo $invest;
        $query = "
        SELECT 
            SUM(`cash`)-(
                SELECT 
                    SUM(`cash`) 
                FROM 
                    `invest_out` 
                WHERE 
                    `invest`='$invest') 
        FROM 
            `invest_inp` 
        WHERE 
            `invest`='$invest'";
        
        $res = mysqli_query($db,$query);
        $sum = mysqli_fetch_array($res)[0];
        return $sum;
    }
?>
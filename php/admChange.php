<?php
    $con = mysql_connect("127.0.0.1:3306","root","root");
    if (!$con)
    {
        die('Could not connect: ' . mysql_error());
    }
	$ordersState = $_GET["ordersstate"];
    $ordersId = $_GET["ordersid"];
    $messState = $_GET["messstate"];
	$messId = $_GET["messid"];
    mysql_select_db("panola", $con);
    if($ordersState){
        $res = mysql_query("update orders set orders_state=".$ordersState." where orders_id=".$ordersId." ");
    }else{
        $res = mysql_query("update message set message_state=".$messState." where message_id=".$messId." ");
    }
    echo $res;
    mysql_close($con);
?>
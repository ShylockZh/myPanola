<?php
	mysql_connect('127.0.0.1:3306','root','root');
	mysql_query('set names utf8');
	mysql_select_db('panola');
	$user_id = $_GET["userid"];
	$sql = "SELECT * from user where user_id=\"".$user_id."\"";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	$data = json_encode($row);
	echo $data;
?>
<?php
	mysql_connect('127.0.0.1:3306','root','root');
	mysql_query('set names utf8');
	mysql_select_db('panola');
	$username = $_GET["username"];
	$pwd = $_GET["pwd"];
	$sql = "SELECT * from user where user_username=\"".$username."\" and user_password=\"".$pwd."\"";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	$data = json_encode($row);
	echo $data;
?>
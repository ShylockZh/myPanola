<?php
	mysql_connect('127.0.0.1:3306','root','root');
	mysql_query('set names utf8');
    mysql_select_db('panola'); 
	$sql = "select * from user u,message m where u.user_id=m.message_user_id order by m.message_id desc";
	$res = mysql_query($sql);
	//定义空得数组
	$rows = array();
	//遍历($row接收每一行遍历的数据)
	while($row = mysql_fetch_assoc($res)){
		//每一条数据给数组接收
		$rows[] = $row;
	}
	//数组接收数据转换成对象
	$data = json_encode( $rows);
	echo $data;
?>
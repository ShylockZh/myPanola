<?php
  //连接数据(ip 端口 用户名 密码 )
  mysql_connect('127.0.0.1:3306','root','root');
  //编码规则
  mysql_query('set names utf8');
  //连接数据库的名称
  mysql_select_db('panola');
  //写sql语句

  $sql="SELECT * FROM gallery";
  //执行sql
  $res=mysql_query($sql);
  $row=array();
  while ($row=mysql_fetch_assoc($res)){
      $rows[]=$row;
  }
  $data=json_encode($rows);
  echo $data;
  ?>
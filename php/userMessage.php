<?php
 header("Content-Type: text/html;charset=utf-8");

$userid = isset($_POST["userid"]) ? $_POST["userid"] : " ";
$message = isset($_POST["message"]) ? $_POST["message"] : " ";
/*echo "name:" . $name . "age:" . $age;*/

$servername = "localhost";
$dbusername = "root";
$password = "root";
$db = "panola";
$conn = new mysqli($servername, $dbusername, $password, $db);
$conn -> query("set names utf8");
if ($conn -> connect_error) {
    die("连接失败:" . $conn -> connect_errno);
}


$stmt = $conn -> prepare("insert into message(message_user_id,message_content,message_state) 
                            VALUES(?,?,?)");
$stmt -> bind_param('isi', $userid1, $message1, $state1);


$userid1 = intval($userid);
$message1 = $message;
$state1 = intval('0');

$b = $stmt -> execute();
if ($b) {
    echo "添加成功!";
} else {
    echo "添加失败";
}
$conn -> close();
?>
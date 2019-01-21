<?php
 header("Content-Type: text/html;charset=utf-8");

$username = isset($_POST["username"]) ? $_POST["username"] : " ";
$pwd = isset($_POST["pwd"]) ? $_POST["pwd"] : " ";
$name = isset($_POST["name"]) ? $_POST["name"] : " ";
$sex = isset($_POST["sex"]) ? $_POST["sex"] : " ";
$phone = isset($_POST["phone"]) ? $_POST["phone"] : " ";
$email = isset($_POST["email"]) ? $_POST["email"] : " ";
$address = isset($_POST["address"]) ? $_POST["address"] : " ";

/*echo "name:" . $name . "age:" . $age;*/

$servername = "localhost";
$dbusername = "root";
$password = "root";
// $charset = 'set names utf8';
$db = "panola";
$conn = new mysqli($servername, $dbusername, $password, $db);
$conn -> query("set names utf8");
if ($conn -> connect_error) {
    die("连接失败:" . $conn -> connect_errno);
}


$stmt = $conn -> prepare("insert into user(user_username,user_password,user_name,user_sex,user_phone,user_email,user_address) 
                            VALUES (?,?,?,?,?,?,?)");
$stmt -> bind_param('sssisss',$username1, $pwd1, $name1, $sex1, $phone1, $email1, $address1);

$username1 = $username;
$pwd1 = $pwd;
$name1 = $name;
$sex1 = intval($sex);
$phone1 = $phone;
$email1 = $email;
$address1 = $address;

$b = $stmt -> execute();
if ($b) {
    echo "添加成功!";
} else {
    echo "添加失败";
}
$conn -> close();

?>
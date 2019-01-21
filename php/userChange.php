<?php
 header("Content-Type: text/html;charset=utf-8");

$userid = isset($_POST["userid"]) ? $_POST["userid"] : " ";
$pwd = isset($_POST["pwd"]) ? $_POST["pwd"] : " ";
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


$stmt = $conn -> prepare("update user 
                        set user_password = ?,
                            user_sex = ?,
                            user_phone = ?,
                            user_email = ?,
                            user_address = ? 
                        where user_id=?");
$stmt -> bind_param('sisssi', $pwd1, $sex1, $phone1, $email1, $address1, $userid1);


$userid1 = intval($userid);
$pwd1 = $pwd;
$sex1 = intval($sex);
$phone1 = $phone;
$email1 = $email;
$address1 = $address;

$b = $stmt -> execute();
if ($b) {
    echo "修改成功!";
} else {
    echo "修改失败";
}
$conn -> close();

?>
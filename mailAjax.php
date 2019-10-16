<?php

$to = "dreadsite@ukr.net";


if ( !empty( $_FILES['file']['tmp_name'] ) and $_FILES['file']['error'] == 0 ) {
	if(in_array(strtolower(end(explode('.', $_FILES['file']['name']))), array('jpeg', 'jpg', 'gif', 'png', 'pdf', 'cdr', 'eps', 'ai', 'svg', 'doc', 'tif', 'psd')) and $_FILES['file']['size'] < 2000000) { 
			$filepath = $_FILES['file']['tmp_name'];
    		$filename = $_FILES['file']['name'];
	}
  } else {
    $filepath = '';
    $filename = '';
 }


$name = trim($_POST["name"]);
$tel = trim($_POST["tel"]);
$email = trim($_POST["email"]);
$sumForm = trim($_POST["sumForm"]);
$choice = trim($_POST["choice"]);
$message = trim($_POST["message"]);


$body = "Имя:\r\n".$name."\r\n\r\n";
$body .= "Контактный номер:\r\n".$tel."\r\n\r\n";
$body .= "E-mail:\r\n".$email."\r\n\r\n";
$body .= "Сообщение:\r\n".$message."\r\n\r\n";
$body .= "Итоговая сумма:\r\n".$sumForm."\r\n\r\n";
$body .= "Выбрано:\r\n".$choice."\r\n\r\n";


	send_mail($to, $body, $email, $filepath, $filename);


function send_mail($to, $body, $email, $filepath, $filename)
{
  $subject = 'Новый заказ с сайта';
  $boundary = "--".md5(uniqid(time())); 
  $headers = "From: ".$email."\r\n";   
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
  $multipart = "--".$boundary."\r\n";
  $multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body."\r\n\r\n";
 
  $multipart .= $body;
 
  $file = '';
  if ( !empty( $filepath ) ) {
    $fp = fopen($filepath, "r");
    if ( $fp ) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--".$boundary."\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content))."\r\n";
    }
  }
  $multipart .= $file."--".$boundary."--\r\n";
  mail($to, $subject, $multipart, $headers);
}
?>
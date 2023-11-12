<?php

/* https://api.telegram.org/bot6482011514:AAFg2cajCGsQaVI10D7tUi35ZUjBB6dulRo/getUpdates,
где, 6482011514:AAFg2cajCGsQaVI10D7tUi35ZUjBB6dulRo - токен вашего бота, полученный ранее */

$phone = $_POST['phone'];
$name = $_POST['name'];
$service = $_POST['service'];
$typeOfGarbage = $_POST['typeOfGarbage'];
$weight = $_POST['weight'];
$transport = $_POST['transport'];
$needMovers = $_POST['needMovers'];
$howManySends = $_POST['howManySends'];
$clearTheRoad = $_POST['clearTheRoad'];
$payment = $_POST['payment'];



$token = "6772556580:AAFl5ESdPqTR5hl6RDAzDKDUUuluzED4bx8";
$chat_id = "-4095620477";
$arr = array(
    'Телефон: ' => $phone,
    'Имя: ' => $name,
    'Тема: ' => $service,

    // 'Тип мусора: ' => $typeOfGarbage,
    // 'Объем мусора: ' => $weight,
    // 'Вид траспорта: ' => $transport,
    // 'Нужны ли грузчики: ' => $needMovers,
    // //   'Сколько ходок: ' => $howManySends,
    // 'Чистый ли путь: ' => $clearTheRoad,
    // 'Вариант оплаты: ' => $payment,
    // 'Доп. Информация: ' => $text,


);

foreach ($arr as $key => $value) {
    $txt .= "<b>" . $key . "</b> " . $value . "%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
if ($sendToTelegram) {
    header('Location: thanks.html');
} else {
    echo "Error";
}





$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ($method === 'POST') {

    $project_name = trim($_POST["project_name"]);
    $admin_email  = trim($_POST["admin_email"]);
    $form_subject = trim($_POST["form_subject"]);

    foreach ($_POST as $key => $value) {
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            $message .= "
			" . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
        }
    }
} else if ($method === 'GET') {

    $project_name = trim($_GET["project_name"]);
    $admin_email  = trim($_GET["admin_email"]);
    $form_subject = trim($_GET["form_subject"]);

    foreach ($_GET as $key => $value) {
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            $message .= "
			" . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
        }
    }
}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text)
{
    return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($project_name) . ' <' . $admin_email . '>' . PHP_EOL .
    'Reply-To: ' . $admin_email . '' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers);

<?php


if(isset($_POST["name"]))
{
    $data = array('action' => $_POST["action"], 'name' => $_POST["name"], 'contents' => $_POST["contents"], 'byte' => $_POST["byte"]);
}else{
    $data = array('action' => $_POST["action"]);
}

$url = 'http://poot97.dothome.co.kr/TextGenerator/action.php';

/* file_get_contents 방법 사용 ( 문제 : 보안상  오류가 발생함 )
$options = array(
	'http' => array(
		'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		'method'  => 'POST',
		'content' => http_build_query($data, '' , '&'),
		'timeout' => 50
	)
);
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;
*/

/* cURL 사용 */
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_POST, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;

//post방식으로 매개변수 전달하여 php파일 불러오는 방법 사용됨.

?>
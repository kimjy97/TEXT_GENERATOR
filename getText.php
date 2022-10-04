<?php
/* file_get_contents 함수 사용 방법
echo file_get_contents('http://poot97.dothome.co.kr/TextGenerator/file/' . $_POST["name"]);
*/

/* 보안 이슈 보완 - cURL 사용 */
$url = 'http://poot97.dothome.co.kr/TextGenerator/file/' . $_POST["name"];
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
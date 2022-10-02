<?php

if(isset($_POST["name"]))
{
    $data = array('action' => $_POST["action"], 'name' => $_POST["name"], 'contents' => $_POST["contents"], 'byte' => $_POST["byte"]);
}else{
    $data = array('action' => $_POST["action"]);
}

$url = 'http://poot97.dothome.co.kr/TextGenerator/action.php';

$options = array(
	'http' => array(
		'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		'method'  => 'POST',
		'content' => http_build_query($data, '' , '&'),
		'timeout' => 50000
	)
);
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;


//post방식으로 매개변수 전달하여 php파일 불러오는 방법 사용됨.
?>
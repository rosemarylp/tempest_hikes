<?php 

// require_once 'connect.inc.php';
// echo $db_user;
// echo $db_pass;

function call_db($url) {
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $url);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch);

	curl_close($ch);

	return $result;
}

function put_db($fields) {
	require_once 'connect.inc.php';


	$id = get_id();

	$url = "http://127.0.0.1:5984/tempest_hikes/" . $id;

	$data = json_encode($fields);

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($data)));
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	echo "Status: " . $status_code;
	$response = curl_exec($ch);

	return $response;

	curl_close($ch);

}

function get_id() {
	$url = "http://127.0.0.1:5984/_uuids";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$response = curl_exec($ch);

	$response = json_decode($response);

	$id = $response->uuids[0];

	return $id;
}


 ?>
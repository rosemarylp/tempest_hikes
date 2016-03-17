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

function put_db($fields, $url) {
	require_once 'connect.inc.php';

	$data = json_encode($fields);

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($data)));
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
	curl_setopt($ch, CURLOPT_POST, true);

	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$response = curl_exec($ch);

	return $response;

	curl_close($ch);
}

function delete_db($url) {
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-type: application/json',
		'Accept: */*')
	);

	$response = curl_exec($ch);

	echo $response;

	curl_close($ch);
}

function put_attachment($result, $attachment) {
	$doc_info = get_doc_info($result);
	$doc_id = $doc_info["id"];
	$rev = $doc_info["rev"];

	if(is_array($attachment)) {
		if (isset($attachment["name"]) && isset($attachment["data"]) && isset($attachment["content-type"])) {
			$attachment_name = $attachment["name"];
			$data = $attachment["data"];
			$content_type = $attachment["content-type"];

			$url = "http://127.0.0.1:5984/tempest_hikes/" . $doc_id . "/" . $attachment_name . "?rev=" . $rev;

			$ch = curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: ' . $content_type,'Content-Length: ' . strlen($data)));
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);

			$response = curl_exec($ch);

			return $response;

			curl_close($ch);
		}
	}
}

function get_doc_info($result) {
	$rev = $result->rev;
	$doc_id = $result->id;
	$doc_info = ["id"=>$doc_id,"rev"=>$rev];

	return $doc_info;
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
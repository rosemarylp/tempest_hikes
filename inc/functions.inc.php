<?php 

function call_db($url) {
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_summaries");

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch);

	curl_close($ch);

	return $result;
}


 ?>
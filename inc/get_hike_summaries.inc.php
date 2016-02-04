<?php 

require_once 'functions.inc.php';

	$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_summaries";
	$hikes = json_decode(call_db($url));
	$hikes = json_encode($hikes);
	// echo gettype($hikes);
	// print_r($hikes);
	echo $hikes;

 ?>
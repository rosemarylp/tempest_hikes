<?php 

require_once 'functions.inc.php';
require_once 'connect.inc.php';

$view = $_GET["view"];

switch ($view) {
	case 'hike_summaries':
		$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_summaries";
		break;
	
	default:
		# code...
		break;
}

$result = call_db($url);
echo $result;

 ?>
<?php 

require_once 'functions.inc.php';
require_once 'connect.inc.php';

$view = $_GET["view"];
if (isset($_GET["lat"])) $lat = $_GET["lat"];
if (isset($_GET["lng"])) $lng = $_GET["lng"];

switch ($view) {
	case 'hike_summaries':
		$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_summaries";
		break;

	case 'hike_feed':
		$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_feed?limit=1";
		break;

	case 'full_hike_info':
		$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/full_hike_info?key={\"lat\":";
		$url .= $lat;
		$url .= ",\"lng\":";
		$url .= $lng;
		$url .= "}";
		break;

	default:
		# code...
		break;
}

$result = call_db($url);
echo $result;
// echo $url;

 ?>
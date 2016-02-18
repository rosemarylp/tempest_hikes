<?php 

require_once 'functions.inc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	var_dump($_POST);
	$fields = [];

	if (isset($_POST['hike_name'])) {
		$hike_name = $_POST['hike_name'];
		array_push($fields,"name"=>$hike_name);
	}

	if (isset($_POST['area'])) {
		$area = $_POST['area'];
		array_push($fields,"area"=>$area);
	}

	if (isset($_POST['date'])) {
		$date = $_POST['date'];
		array_push($fields, "date"=>$date);
	}

	if (isset($_POST['description'])) {
		$description = $_POST['description'];
		array_push($fields, "description"=>$description);
	}

	if (isset($_POST['distance'])) {
		$distance = $_POST['distance'];
		array_push($fields, "distance"=>$distance);
	}

	if (isset($_POST['elevation_gain'])) {
		$elevation_gain = $_POST['elevation_gain'];
		array_push($fields, "elevation_gain"=>$elevation_gain);
	}

	if (isset($_POST['lat'])) {
		$lat = $_POST['lat'];
		array_push($fields, "lat"=>$lat);
	}

	if (isset($_POST['lng'])) {
		$lng = $_POST['lng'];
		array_push($fields, "lng"=>$lng);
	}

	$result = put_db($fields);
}


 ?>
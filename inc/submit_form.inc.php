<?php 

require_once 'functions.inc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	echo "<pre>";
	print_r($_POST);
	echo "</pre>";
	$fields = [];

	if (isset($_POST['hike_name'])) {
		$hike_name = $_POST['hike_name'];
		$fields["name"] = $hike_name;
	}

	if (isset($_POST['area'])) {
		$area = $_POST['area'];
		$fields["area"] = $area;
	}

	if (isset($_POST['date'])) {
		$date = $_POST['date'];
		$fields["date"] = $date;
	}

	if (isset($_POST['description'])) {
		$description = $_POST['description'];
		$fields["description"] = $description;
	}

	if (isset($_POST['distance'])) {
		$distance = $_POST['distance'];
		$fields["distance"] = $distance;
	}

	if (isset($_POST['elevation_gain'])) {
		$elevation_gain = $_POST['elevation_gain'];
		$fields["elevation_gain"] = $elevation_gain;
	}

	if (isset($_POST['lat'])) {
		$lat = $_POST['lat'];
		$fields["lat"] = $lat;
	}

	if (isset($_POST['lng'])) {
		$lng = $_POST['lng'];
		$fields["lng"] = $lng;
	}

	$result = put_db($fields);
	if($result) {
		echo $result;
	}
}


 ?>
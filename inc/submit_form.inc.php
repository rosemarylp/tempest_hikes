<?php 

require_once 'functions.inc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	echo "<pre>";
	// print_r($_POST);
	// print_r($_FILES);
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

	if (isset($_POST['directions'])) {
		$directions = $_POST['directions'];
		$fields["directions"] = $directions;
	}

	$tmp_name = $_FILES["image_upload"]["tmp_name"];
	$file_name = basename($_FILES["image_upload"]["name"]);
	$upload_dir = "../uploads";

	if(move_uploaded_file($tmp_name, $upload_dir . "/" . $file_name)) {
		$file_path = $upload_dir . "/" . $file_name;
		$list_files = scandir($upload_dir);
		foreach ($list_files as $file) {
			if(strpos($file, '.') > 0) {
				$data = file_get_contents($file_path);
			}
		}
	} else {
		echo $tmp_name . "<br>" . $upload_dir;
	}

	$attachment["name"] = $file_name;
	$attachment["content-type"] = $_FILES["image_upload"]["type"];
	$attachment["data"] = $data;

	$result = put_db($fields);
	if($result) {
		// echo $result;
		$result = put_attachment($result, $attachment);
		if ($result) {
			echo $result;
		}
	}
}


 ?>
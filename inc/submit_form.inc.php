<?php 

require_once 'functions.inc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	echo "<pre>";
	print_r($_POST);
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

	if (isset($_POST["type"])) {
		$type = $_POST["type"];
		$fields["type"] = $type;
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
		$fields["lat"] = (float)$lat;
	}

	if (isset($_POST['lng'])) {
		$lng = $_POST['lng'];
		$fields["lng"] = (float)$lng;
	}

	if (isset($_POST['directions'])) {
		$directions = $_POST['directions'];
		$fields["directions"] = $directions;
	}

	if (isset($_POST['action']) && $_POST['action'] == "edit") {
		if (isset($_POST['hike_id'])) {
			$id = $_POST['hike_id'];
		}

		if (isset($_POST['rev'])) {
			$rev = $_POST['rev'];
			$fields['_rev'] = $rev;
		}

	} else {
		$id = get_id();
	}

	if (isset($_POST['existing_attachments'])) {
		//Gets existing attachment data before it's overwritten in doc update
		if (is_array($_POST['existing_attachments'])) {
			for ($i=0; $i < count($_POST['existing_attachments']); $i++) {
				$file_name = $_POST['existing_attachments'][$i];
				$existing_attachment[$i]["name"] = $file_name;

				$file_url = "http://127.0.0.1:5984/tempest_hikes/" . $id . "/" . $file_name;
				$data = file_get_contents($file_url);
				$existing_attachment[$i]["data"] = $data;

				$content_type = pathinfo($file_url, PATHINFO_EXTENSION);
				$existing_attachment[$i]["content-type"] = $content_type;
			}
		} else {
			$file_name = $_POST['existing_attachments'];
			$existing_attachment["name"] = $file_name;

			$file_url = "http://127.0.0.1:5984/tempest_hikes/" . $id . "/" . $file_name;
			$data = file_get_contents($file_url);
			$existing_attachment["data"] = $data;

			$content_type = pathinfo($file_url, PATHINFO_EXTENSION);
			$existing_attachment["content-type"] = $content_type;
		}
	}

	if (isset($_POST["delete_attachment"])) {
		$delete_attachment = $_POST["delete_attachment"];
	}

	$url = "http://127.0.0.1:5984/tempest_hikes/" . $id;

	if (!empty($_FILES)) {
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
	}

	$result = put_db($fields, $url);
	if($result && isset($attachment)) {
		$result = put_attachment($result, $attachment);
		if ($result) {
			// if there is an existing attachment, re-add it to doc
			if (isset($existing_attachment)) {
				if (is_array($existing_attachment)) {
					for ($i=0; $i < count($existing_attachment); $i++) {
						$result = put_attachment($result, $existing_attachment[$i]);
					}
				} else {
					$result = put_attachment($result, $existing_attachment);
				}
			}
		}
	}
	if ($result && isset($delete_attachment)) {
		$result = delete_attachment($result, $delete_attachment);
		if ($result) {
			echo $result;
		}
	}
}


 ?>
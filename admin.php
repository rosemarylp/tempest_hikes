<?php require_once 'inc/connect.inc.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Admin: Tempest Hikes</title>
	<link rel="stylesheet" href="css/style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
	<script src="js/admin.js"></script>
</head>
<body>
	<header>
		<h1>Tempest Hikes</h1>
		<!-- Search Bar -->
	</header>
	<main>
		<h2>Add Hikes</h2>
		<form action="#" id="add_hike_form">
			<label for="hike_name">Hike Name:</label>
			<input type="text" name="hike_name" id="hike_name" required="true">

			<label for="area">Area:</label>
			<input type="text" name="area" id="area" required="true">

			<label for="type">Type:</label>
			<input type="text" name="type" id="type" required="true">

			<label for="date">Date Hiked: </label>
			<input type="date" name="date" id="date" required="true">

			<label for="description">Description:</label>
			<textarea name="description" id="description" cols="30" rows="10" required="true"></textarea>

			<label for="distance">Distance:</label>
			<input type="number" min=".1" max="50" step=".1" name="distance" id="distance" required="true">

			<label for="elevation_gain">Elevation Gain:</label>
			<input type="number" min=".1" max="15000" step=".1" name="elevation_gain" id="elevation_gain" required="true">

			<label for="lat">Lat:</label>
			<input type="number" min="-90" max="90" step=".000000001" name="lat" id="lat" required="true">

			<label for="lng">Lng:</label>
			<input type="number" min="-180" max="180" step=".0000000001" name="lng" id="lng" required="true">

			<label for="image_upload">Image: </label>
			<input type="file" name="image_upload" id="image_upload">

			<input type="submit" name="submit" value="Submit">
		</form>

		<div id="form_message"></div>
	</main>
</body>
</html>
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
			<input type="text" name="hike_name" id="hike_name">

			<label for="area">Area:</label>
			<input type="text" name="area" id="area">

			<label for="date">Date Hiked: </label>
			<input type="date" name="date" id="date">

			<label for="description">Description:</label>
			<textarea name="description" id="description" cols="30" rows="10"></textarea>

			<label for="distance">Distance:</label>
			<input type="number" name="distance" id="distance">

			<label for="elevation_gain">Elevation Gain:</label>
			<input type="number" name="elevation_gain" id="elevation_gain">

			<label for="lat">Lat:</label>
			<input type="text" name="lat" id="lat">

			<label for="lng">Lng:</label>
			<input type="text" name="lng" id="lng">

			<input type="submit" name="submit" value="Submit">
		</form>

		<div id="form_message"></div>
	</main>
</body>
</html>
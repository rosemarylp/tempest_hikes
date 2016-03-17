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
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
	<header>
		<h1>Tempest Hikes</h1>
		<!-- Search Bar -->
	</header>
	<main>
		<button id="add_hike_button">Add Hike</button>
		<button id="back_button"><i class="fa fa-arrow-circle-left"></i> Back</button>
		<div id="hike_list"></div>

		<section id="edit_hike">
			<h2>Edit Hike</h2>
			<form action="#" id="edit_hike_form">
				<label for="edit_hike_name">Hike Name:</label>
				<input type="text" name="hike_name" id="edit_hike_name" >

				<label for="edit_area">Area:</label>
				<input type="text" name="area" id="edit_area" >

				<label for="edit_type">Type:</label>
				<input type="text" name="type" id="edit_type" >

				<label for="edit_date">Date Hiked: </label>
				<input type="date" name="date" id="edit_date" >

				<label for="edit_description">Description:</label>
				<textarea name="description" id="edit_description" cols="30" rows="10" ></textarea>

				<label for="edit_distance">Distance:</label>
				<input type="number" min=".1" max="50" step=".1" name="distance" id="edit_distance" >

				<label for="edit_elevation_gain">Elevation Gain:</label>
				<input type="number" min=".1" max="15000" step=".1" name="elevation_gain" id="edit_elevation_gain" >

				<label for="edit_lat">Lat:</label>
				<input type="number" min="-90" max="90" step=".000000001" name="lat" id="edit_lat" >

				<label for="edit_lng">Lng:</label>
				<input type="number" min="-180" max="180" step=".0000000001" name="lng" id="edit_lng" >

				<div id="edit_directions_container">
					<label for="edit_directions">Driving Directions: </label>
					<button id="edit_add_button">+</button>
					<div class="direction_container">
						<input type="text" name="directions[]" id="edit_directions">
						<i class="fa fa-times-circle delete_direction"></i>
					</div>
				</div>

				<div id="edit_image_container">
					<div>
						<label for="edit_image_upload">Image: </label>
						<input type="file" name="image_upload" id="edit_image_upload">
					</div>

				</div>

				<input type="submit" name="submit" value="Submit">
			</form>
		</section>

		<section id="add_hike">
			<h2>Add Hikes</h2>
			<form action="#" id="add_hike_form">
				<div>
					<label for="hike_name">Hike Name:</label>
					<input type="text" name="hike_name" id="hike_name" >
				</div>

				<div>
					<label for="area">Area:</label>
					<input type="text" name="area" id="area" >
				</div>

				<div>
					<label for="type">Type:</label>
					<input type="text" name="type" id="type">
				</div>

				<div>
					<label for="date">Date Hiked: </label>
					<input type="date" name="date" id="date">
				</div>

				<div>
					<label for="distance">Distance:</label>
					<input type="number" min=".1" max="50" step=".1" name="distance" id="distance">
				</div>

				<div>
					<label for="elevation_gain">Elevation Gain:</label>
					<input type="number" min=".1" max="15000" step=".1" name="elevation_gain" id="elevation_gain">
				</div>

				<div>
					<label for="lat">Lat:</label>
					<input type="number" min="-90" max="90" step=".000000001" name="lat" id="lat">
				</div>

				<div>
					<label for="lng">Lng:</label>
					<input type="number" min="-180" max="180" step=".0000000001" name="lng" id="lng">
				</div>

				<div>
					<label for="description">Description:</label>
					<textarea name="description" id="description"></textarea>
				</div>

				<div id="directions_container">
					<span><label for="directions">Driving Directions: </label>
					<button id="add_button">+</button></span>
					<input type="text" name="directions[]" id="directions">
				</div>

				<label for="image_upload">Image: </label>
				<input type="file" name="image_upload" id="image_upload">

				<input type="submit" name="submit" value="Submit">
			</form>
		</section>
		<div id="form_message"></div>
	</main>
</body>
</html>
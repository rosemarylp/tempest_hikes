<?php require_once 'inc/connect.inc.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Tempest Hikes</title>
	<link rel="stylesheet" href="css/style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
	<script src="http://maps.googleapis.com/maps/api/js?key=<?php echo $maps_key; ?>"></script>
	<script src="js/get_hikes.js"></script>
</head>
<body>
	<header>
		<h1>Tempest Hikes</h1>
		<!-- Search Bar -->
	</header>
	<main>
		<h2>Hikes</h2>
			<?php //include 'inc/render_map.inc.php'; ?>
		<div id="full_hike_info"></div>

		<section id="hike_feed">
			<h2>Recent Hikes</h2>
			<!-- This will be a feed of recent entries in the hiking guide, newest first -->
			<!-- With a link to view the entire entry -->
		</section>
	</main>
</body>
</html>
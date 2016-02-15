<?php 

require_once 'functions.inc.php';
require_once 'connect.inc.php';

	$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_summaries";
	$hikes = json_decode(call_db($url));
	

?>
	<div id="map"></div>
	<script>
		var myLatlng = new google.maps.LatLng(45.725857, -121.824349);
		var mapOptions = {
		  zoom: 9,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.TERRAIN
		};
		var map = new google.maps.Map(document.getElementById("map"),
		    mapOptions);

		marker.setMap(map);
	</script>
	<section id="hike_summary"></section>
	<!-- <script async defer
	        src="https://maps.googleapis.com/maps/api/js?key=<?php //echo $maps_key; ?>&signed_in=true&callback=initMap"></script> -->
	<?php 

	//echo $output;

 ?>
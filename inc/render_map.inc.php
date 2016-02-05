<?php 

require_once 'functions.inc.php';
require_once 'connect.inc.php';

	$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_summaries";
	$hikes = json_decode(call_db($url));
	
	$output = "<ul>";

	for ($i=0; $i < count($hikes->rows); $i++) {
		$output .= "<li>" . $hikes->rows[$i]->value->name . "<ul>";
		$output .= "<li>" . $hikes->rows[$i]->value->lat . ", " . $hikes->rows[$i]->value->long . "</li>";
		$output .= "<li>" . $hikes->rows[$i]->value->distance . "</li>";
		for ($j=0; $j < count($hikes->rows[$i]->value->attachments); $j++) {
			$output .= "<img src=\"http://127.0.0.1:5984/tempest_hikes/" . $hikes->rows[$i]->id . "/" . $hikes->rows[$i]->value->attachments[$j] . "\" height=200>";
		}
		$output .= "</ul>";
		$output .= "</li>";
	}

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
		var marker = new google.maps.Marker({
			position:myLatlng,
		});

		marker.setMap(map);
	</script>
	<!-- <script async defer
	        src="https://maps.googleapis.com/maps/api/js?key=<?php //echo $maps_key; ?>&signed_in=true&callback=initMap"></script> -->
	<?php 

	//echo $output;

 ?>
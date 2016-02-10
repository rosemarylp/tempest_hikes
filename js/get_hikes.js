$(document).ready(function() {
	function get_full_info(lat, lng) {
		var url = "inc/call_db.inc.php?view=full_hike_info&lat=" + lat + "&lng=" + lng;
		$.ajax({
			method: "GET",
			url: url,
			dataType: 'json'
		}).done(function(data) {
			$('#map').hide();
			$('#hike_summary').hide();
			var output = "<h3>" + data.rows[0].value.name + "</h3>";
			output += "<h4>Area: " + data.rows[0].value.area + "</h4>";
			output += "<h4>Distance: " + data.rows[0].value.distance + "</h4>";
			output += "<h4>Elevation Gain: " + data.rows[0].value.elevation_gain + "</h4>";
			output += "<h4>Type: " + data.rows[0].value.type + "</h4>";
			output += "<p>" + data.rows[0].value.description + "</p>";

			for (var i=0; i < data.rows[0].value.attachments.length; i++) {
				output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[0].id + "/" + data.rows[0].value.attachments[i] + "\" height=200>";
			} //end for
			output += "<button id=\"close\">Close</button>";
			$('#full_hike_info').show();
			$('#full_hike_info').html(output);
			$('#close').click(function() {
				$('#full_hike_info').hide();
				$('#map').show();
			});
		});
	} //end get_full_info

	function get_hike_summaries() {
		var url = "inc/call_db.inc.php?view=hike_summaries";
		$.ajax({
			method: "GET",
			url: url,
			dataType: 'json'
		}).done(function(data) {
			console.log(typeof data);
			//var output = "<ul>";
			for (var i = 0; i < data.rows.length; i++) {
				var this_lat = data.rows[i].key.lat;
				var this_lng = data.rows[i].key.lng;

				var this_hike_location = new google.maps.LatLng(this_lat, this_lng);

				var marker = new google.maps.Marker({
					position:this_hike_location,
				});
				
				//Adds click event listener to each marker
				add_hike_info(marker,this_lat,this_lng);

				marker.setMap(map);
			}

			function add_hike_info(marker,this_lat,this_lng) {
				//Adds click event listener to each marker
				marker.addListener('click', function() {
					for (var j=0; j < data.rows.length; j++) {

						if (data.rows[j].key.lat == this_lat && data.rows[j].key.lng == this_lng) {
							var output = "<h3>" + data.rows[j].value.name + "</h3>";
							output += "<h4>Distance: " + data.rows[j].value.distance + "</h4>";
							for (var k=0; k < data.rows[j].value.attachments.length; k++) {
								output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[j].id + "/" + data.rows[j].value.attachments[k] + "\" height=200>";
							} //end for
							output += "<button>More</button>";
							$('#hike_summary').show();
							$('#hike_summary').html(output);
							$('#hike_summary button').click(function() {
								get_full_info(this_lat, this_lng);
							});
						} //endif
					} //end for
				});
			} //end add_hike_info
		});
	} //end get_hike_summaries

	function get_hike_feed() {
		var url = "inc/call_db.inc.php?view=hike_feed";
		$.ajax({
			url: url,
			method: "GET",
			dataType: "json"
		}).done(function(data) {
			// output = "";
			for (var i = 0; i < data.rows.length; i++) {
				var lat = data.rows[i].value.lat;
				var lng = data.rows[i].value.lng;
				var output = "<section>";
				output += "<h3>" + data.rows[i].value.name + "</h3>";
				output += "<h4>Area: " + data.rows[i].value.area + "</h4>";
				output += "<h4>Distance: " + data.rows[i].value.distance + "</h4>";
				output += "<h4>Elevation Gain: " + data.rows[i].value.elevation_gain + "</h4>";
				output += "<h4>Type: " + data.rows[i].value.type + "</h4>";
				output += "<h4>Date Hiked: " + data.rows[i].key + "</h4>";
				output += "<h3>" + data.rows[i].value.lat + data.rows[i].value.lng + "</h3>";

				output += "<p>" + data.rows[i].value.description + "...</p>";
				output += "<button>More</button>";
				// output += "<button onclick=\"get_full_info(" + data.rows[i].value.lat + "," + data.rows[i].value.lng + ")\">More</button></p>";
				// output += add_handler(data.rows[i].value.lat, data.rows[i].value.lng);
				output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[i].id + "/" + data.rows[i].value.image + "\" height=200>";
				output += "</section>";
				$('#hike_feed').append(output);
				add_handler(lat,lng);
			} //end for
			

			function add_handler(lat,lng) {
				// alert(lat,lng);
				$('#hike_feed section:last-of-type button').click(function() {
					get_full_info(lat,lng);
					
				});
			}
			});
		}

	// get_hike_summaries();
	get_hike_feed();
});


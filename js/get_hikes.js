$(document).ready(function() {
	function get_weather(lat, lng) {
		var url = "inc/call_db.inc.php?view=weather&lat=" + lat + "&lng=" + lng;
		$.ajax({
			method: "GET",
			url: url,
			dataType: "json"
		}).done(function(data) {
			var output = "";
			output += "<h4>Weather</h4>";
			output += "<span>Powered by Weather Underground <img src=\"images/wunderground.jpg\"></span>";
			for (var i = 0; i < data.forecast.simpleforecast.forecastday.length; i++) {
				output += "<section>";
				output += "<h5>" + moment(data.forecast.simpleforecast.forecastday[i].date.epoch, "X").format("M/D") + "</h5>";
				output += "<img src=\"" + data.forecast.simpleforecast.forecastday[i].icon_url + "\">";
				output += "<h6>" + data.forecast.simpleforecast.forecastday[i].high.fahrenheit + "&deg;/" + data.forecast.simpleforecast.forecastday[i].low.fahrenheit + "&deg;</h6>";
				output += "<h6>" + data.forecast.simpleforecast.forecastday[i].conditions + "</h6>";
				output += "<h6>Precip: </h6>" + data.forecast.simpleforecast.forecastday[i].qpf_allday.in + "\"";
				output += "<h6>Snow: </h6>" + data.forecast.simpleforecast.forecastday[i].snow_allday.in + "\"";
				output += "<h6>Avg Wind: </h6>" + data.forecast.simpleforecast.forecastday[i].avewind.mph + "mph";
				output += "<h6>Humidity: </h6>" + data.forecast.simpleforecast.forecastday[i].avehumidity + "%";
				output += "</section>";
			}

			$('#weather').html(output);
		});
	}
	function get_full_info(lat, lng) {
		var url = "inc/call_db.inc.php?view=full_hike_info&lat=" + lat + "&lng=" + lng;
		$.ajax({
			method: "GET",
			url: url,
			dataType: 'json'
		}).done(function(data) {
			$('#map').fadeOut();
			$('#hike_feed').fadeOut();
			$('#hike_summary').fadeOut();
			var output = "<h3>" + data.rows[0].value.name + "</h3>";
			output += "<h4>Area: </h4>" + data.rows[0].value.area;
			output += "<h4>Distance: </h4>" + data.rows[0].value.distance + "mi.";
			output += "<h4>Elevation Gain: </h4>" + data.rows[0].value.elevation_gain + "ft.";
			output += "<h4>Type: </h4>" + data.rows[0].value.type;
			output += "<p>" + data.rows[0].value.description + "</p>";
			output += "<h4>Driving Directions: </h4>";
			output += "<ul>";
			for (var j=0; j < data.rows[0].value.directions.length; j++) {
				output += "<li>" + data.rows[0].value.directions[j] + "</li>";
			}
			output += "</ul>";

			for (var i=0; i < data.rows[0].value.attachments.length; i++) {
				output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[0].id + "/" + data.rows[0].value.attachments[i] + "\" height=200>";
			} //end for
			output += "<section id=\"weather\">";
			output += "</section>";
			output += "<button id=\"close\">Close</button>";
			$('#full_hike_info').html(output);
			get_weather(lat,lng);
			$('#full_hike_info').fadeIn();
			$('#close').click(function() {
				$('#full_hike_info').fadeOut();
				$('#map').fadeIn();
				$('#hike_feed').fadeIn();
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
							output += "<div><h4>Distance: </h4>" + data.rows[j].value.distance + "mi.";
							output += "<h4>Elevation Gain: </h4>" + data.rows[j].value.elevation_gain + "ft.";
							output += "<p>" + data.rows[j].value.description + "...</p></div>";
							output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[j].id + "/" + data.rows[j].value.image + "\" height=200>";
							output += "<button>More</button>";
							$('#hike_summary').html(output);
							$('#hike_summary').fadeIn();
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
			for (var i = 0; i < data.rows.length; i++) {
				var lat = data.rows[i].value.lat;
				var lng = data.rows[i].value.lng;
				var output = "<section class=\"feed_item\">";
				output += "<h3>" + data.rows[i].value.name + "</h3>";
				output += "<div class=\"feed_details_container\">";
				output += "<h4>Area: </h4>" + data.rows[i].value.area;
				output += "<h4>Distance: </h4>" + data.rows[i].value.distance + " miles";
				output += "<h4>Elevation Gain: </h4>" + data.rows[i].value.elevation_gain + "ft.";
				output += "<h4>Type: </h4>" + data.rows[i].value.type;
				output += "<h4>Date Hiked: </h4>" + moment(data.rows[i].key, "YYYY-MM-DD").format("MMMM Do, YYYY");
				output += "<p>" + data.rows[i].value.description + "...</p>";
				output += "</div>";
				output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[i].id + "/" + data.rows[i].value.image + "\" height=200>";
				output += "<button>More</button>";

				output += "</section>";
				$('#hike_feed').append(output);
				add_handler(lat,lng);
			} //end for

			function add_handler(lat,lng) {
				$('#hike_feed section:last-of-type button').click(function() {
					get_full_info(lat,lng);
				});
			}
			});
		}

	$('#hike_summary').hide();
	get_hike_summaries();
	get_hike_feed();
});


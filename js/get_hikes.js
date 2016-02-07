$(document).ready(function() {
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

				var content_string = "<div>";
				content_string += "<h3>" + data.rows[i].value.name + "</h3>";
				content_string += "<p>";
				content_string += "<strong>Distance:</strong>" + data.rows[i].value.distance + "</p>";
				content_string += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[i].id + "/" + data.rows[i].value.attachments[0] + "\" height=200>";
				content_string += "</div>";

				var infowindow = new google.maps.InfoWindow({
					content:content_string
				});

				var this_lat = data.rows[i].key.lat;
				var this_lng = data.rows[i].key.long;

				var this_hike_location = new google.maps.LatLng(this_lat, this_lng);


				var marker = new google.maps.Marker({
					position:this_hike_location,
				});
				show_info(marker,this_lat,this_lng);
				marker.setMap(map);

				// output += "<li>" + data.rows[i].value.name + "<ul>";
				// output += "<li>" + data.rows[i].value.location + "</li>";
				// output += "<li>" + data.rows[i].value.distance + "</li>";
				// for (var j=0; j < data.rows[i].value.attachments.length; j++) {
				// 	output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[i].id + "/" + data.rows[i].value.attachments[j] + "\" height=200>";
				// }
				// output += "</ul>";
				// output += "</li>";
			}
			function show_info(marker,this_lat,this_lng) {
				marker.addListener('click', function() {
					for (var j=0; j < data.rows.length; j++) {

						if (data.rows[j].key.lat == this_lat && data.rows[j].key.long == this_lng) {
							alert(data.rows[j].value.name);
						}
					}

				});
			}
			//output += "</ul>";
			//$('#hike_summaries').append(output);
		});
	}

	get_hike_summaries();
});


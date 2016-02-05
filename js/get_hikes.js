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

				var this_hike_location = new google.maps.LatLng(data.rows[i].value.lat, data.rows[i].value.long);

				var marker = new google.maps.Marker({
					position:this_hike_location,
				});

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
			//output += "</ul>";
			//$('#hike_summaries').append(output);
		});
	}

	get_hike_summaries();
});


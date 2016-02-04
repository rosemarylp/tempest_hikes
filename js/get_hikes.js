$(document).ready(function() {
	function get_hike_summaries() {
		var url = "inc/get_hike_summaries.inc.php";
		$.ajax({
			method: "GET",
			url: url,
			dataType: 'json'
		}).done(function(data) {
			console.log(typeof data);
			var output = "<ul>";
			for (var i = 0; i < data.rows.length; i++) {
				output += "<li>" + data.rows[i].value.name + "<ul>";
				output += "<li>" + data.rows[i].value.location + "</li>";
				output += "<li>" + data.rows[i].value.distance + "</li>";
				for (var j=0; j < data.rows[i].value.attachments.length; j++) {
					output += "<img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[i].id + "/" + data.rows[i].value.attachments[j] + "\" height=200>";
				}
				output += "</ul>";
				output += "</li>";
			}
			output += "</ul>";
			$('#hike_summaries').html(output);
		});
	}

	get_hike_summaries();
});


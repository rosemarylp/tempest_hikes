$(document).ready(function() {

$('#add_hike').hide();
$('#edit_hike').hide();

function get_hikes() {
	var url = "inc/call_db.inc.php?view=admin_list";
	$.ajax({
		method: "GET",
		url: url,
		dataType: 'json'
	}).done(function(data) {
		for (var i=0; i < data.rows.length; i++) {
			var lat = data.rows[i].key.lat;
			var lng = data.rows[i].key.lng;
			var hike_id = data.rows[i].id;
			var rev = data.rows[i].value.rev;

			var output = "<section class=\"admin_list_item\">";
			output += "<h3>" + data.rows[i].value.name + "</h3>";
			output += "<h4> Area: </h4>" + data.rows[i].value.area;
			output += "<h4> Date: </h4>" + data.rows[i].value.date;
			output += "<button class=\"edit\">Edit</button>";
			output += "<button class=\"delete\">Delete</button>";
			output += "</section>";
			$('#hike_list').append(output);
			add_handlers(lat, lng, hike_id, rev);
		} //end for

		function add_handlers(lat, lng, hike_id, rev) {
			var edit_button = $('#hike_list section:last-of-type .edit');
			var delete_button = $('#hike_list section:last-of-type .delete');

			$(edit_button).click(function() {
				$('#hike_list').html('');
				$('#edit_hike').show();
				edit_hike(lat, lng, hike_id);
			});

			$(delete_button).click(function() {
				var button = $(this);
				var delete_ok = confirm("Are you sure you want to delete this hike?");
				if (delete_ok == true) {
					delete_hike(hike_id, rev, button)
				}
			});
		}
	})
}

function delete_hike(hike_id, rev, button) {
	var url = "inc/delete_hike.inc.php";

	var request = $.ajax({
		method: "POST",
		url: url,
		data: {id: hike_id, rev: rev}
	}).done(function(data){
		console.log(data);
	}).success(function() {
		$(button).parent().hide();
	});
}

function edit_hike(lat, lng, hike_id) {
	var url = "inc/call_db.inc.php?view=full_hike_info&lat=" + lat + "&lng=" + lng;
	$.ajax({
		method: "GET",
		url: url,
		dataType: 'json'
	}).done(function(data) {
		var hike_id = data.rows[0].id;
		var rev = data.rows[0].value.rev;
		// Populate Fields
		$('#edit_hike #edit_hike_name').val(data.rows[0].value.name);
		$('#edit_hike #edit_area').val(data.rows[0].value.area);
		$('#edit_hike #edit_type').val(data.rows[0].value.type);
		$('#edit_hike #edit_date').val(data.rows[0].value.date);
		$('#edit_hike #edit_description').val(data.rows[0].value.description);
		$('#edit_hike #edit_distance').val(data.rows[0].value.distance);
		$('#edit_hike #edit_elevation_gain').val(data.rows[0].value.elevation_gain);
		$('#edit_hike #edit_lat').val(data.rows[0].key.lat);
		$('#edit_hike #edit_lng').val(data.rows[0].key.lng);

		if(data.rows[0].value.directions.length > 1) {
			$('#edit_hike #edit_directions').val(data.rows[0].value.directions[0]);
			for (var i=1; i < data.rows[0].value.directions.length; i++) {
				var new_field = "<div class=\"direction_container\">";
				new_field += "<input type=\"text\" name=\"directions[]\">";
				new_field += "<i class=\"fa fa-times-circle\"></i>";
				new_field += "</div>";
				$(new_field).appendTo($("#edit_directions_container"));
				$('#edit_directions_container .direction_container:last-of-type input').val(data.rows[0].value.directions[i]);
			}
		} else {
			$('#edit_hike #edit_directions').val(data.rows[0].value.directions[0]);
		}

		if(data.rows[0].value.hasOwnProperty("attachments")) {
			for (var j=0; j < data.rows[0].value.attachments.length; j++) {
				var output = "<div><img src=\"http://127.0.0.1:5984/tempest_hikes/" + data.rows[0].id + "/" + data.rows[0].value.attachments[j] + "\" height=200>";
				output += "<div class=\"checkbox-container\"><input type=\"checkbox\" name=\"delete_attachment[]\" id=\"" + data.rows[0].value.attachments[j] + "\" value=\"" + data.rows[0].value.attachments[j] + "\">";
				output += "<label for=\"" + data.rows[0].value.attachments[j] + "\"> <i class=\"fa fa-times-circle\"></i></label></div></div>";
				$('#edit_image_container').append(output);
			} //end for
		}

		$('#edit_hike_form').submit(function(event) {
			event.preventDefault();
			submit_form("edit", hike_id, rev, data);
		});
	});
}

function submit_form(action, hike_id, rev, data) {
	switch(action) {
		case "edit":
			var form_contents = $("#edit_hike_form").serializeArray();
			var image_upload = document.getElementById('edit_image_upload');
			var url = "inc/submit_form.inc.php?action=edit&id=" + hike_id + "&rev=" + rev;

			var files = image_upload.files;

			var formData = new FormData();

			for (var i = 0; i < files.length; i++) {
				var file = files[i];

				if (!file.type.match('image.*')) {
					continue;
				}

				formData.append('image_upload', file, file.name);
			}

			function delete_attachments(attachments) {
				$('input:checked').each(function() {
					var deleted = $(this).val();
					attachments.splice($.inArray(deleted, attachments), 1);
				});
			}

			if(data.rows[0].value.hasOwnProperty("attachments")) {
				//Send existing attachments with formdata so they aren't overwritten
				var existing_attachments = data.rows[0].value.attachments;
				delete_attachments(existing_attachments);
				formData.append('existing_attachments', existing_attachments);
			}

			for (var j=0; j < form_contents.length; j++) {
				formData.append(form_contents[j].name, form_contents[j].value);
			}

			formData.append('action', action);
			formData.append('hike_id', hike_id);
			formData.append('rev', rev);

			post_to_db(url, '#edit_hike');

		break;

		case "add":
			var form_contents = $('#add_hike_form').serializeArray();
			var image_upload = document.getElementById('image_upload');
			var url = "inc/submit_form.inc.php";

			var files = image_upload.files;

			var formData = new FormData();

			for (var i = 0; i < files.length; i++) {
				//Note: http://blog.teamtreehouse.com/uploading-files-ajax
				var file = files[i];

				// Check the file type.
				if (!file.type.match('image.*')) {
				    continue;
				}

				// Add the file to the request.
				formData.append('image_upload', file, file.name);
			}

			for (var j=0; j < form_contents.length; j++) {
				formData.append(form_contents[j].name, form_contents[j].value);
			}

			post_to_db(url, '#add_hike');

		break;

		function post_to_db(url, form) {
			var xhr = new XMLHttpRequest();

			xhr.open('POST', url, true);

			xhr.send(formData);

			xhr.onreadystatechange = function() {
				if (this.readyState === 4) {
					if (this.status === 200) {
						$(form).hide();
						get_hikes();
					}
				}
			}
		}
	}
}

$('#add_hike_button').click(function() {
	$('#hike_list').html('');
	$('#add_hike').show();
})

$('#add_hike_form').submit(function() {
	event.preventDefault();
	submit_form("add");
});

$(':file').change(function() {
	var file = this.files[0];
	name = file.name;
	size = file.size;
	type = file.type;

	if(file.name.length < 1) {

	}
	else if(file.size > 10000000) {
		alert("File is too big");
	}
	else if(file.type != 'image/jpg') {
		// alert("Invalid file type");
	}
});

$('#add_button, #edit_add_button').click(function() {
	event.preventDefault();
	var new_field = "<div class=\"direction_container\">";
	new_field += "<input type=\"text\" name=\"directions[]\">";
	new_field += "<i class=\"fa fa-times-circle\"></i>";
	new_field += "</div>";
	if ($(this).attr("id") == "add_button") {
		$(new_field).appendTo($("#directions_container"));
	} else {
		$(new_field).appendTo($("#edit_directions_container"));
	}
});

$('.delete_direction').click(function() {
	$(this).parent().remove();
});

get_hikes();

});
$(document).ready(function() {

$('#add_hike_form').hide();

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

			var output = "<section class=\"admin_list_item\">";
			output += "<h3>" + data.rows[i].value.name + "</h3>";
			output += "<h4> Area: </h4>" + data.rows[i].value.area;
			output += "<h4> Date: </h4>" + data.rows[i].value.date;
			output += "<button class=\"edit\">Edit</button>";
			output += "<button class=\"delete\">Delete</button>";
			output += "</section>";
			$('#hike_list').append(output);
			add_handlers(lat, lng);
		} //end for

		function add_handlers(lat, lng) {
			var edit_button = $('#hike_list section:last-of-type .edit');
			var delete_button = $('#hike_list section:last-of-type .delete');

			$(edit_button).click(function() {
				alert("Edit" + lat + lng);
			});

			$(delete_button).click(function() {
				alert("Delete" + lat + lng);
			});
		}
	})
}

function submit_form() {
	var form_contents = $('#add_hike_form').serializeArray();
	// var image_upload = $('#image_upload');
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

	var xhr = new XMLHttpRequest();

	xhr.open('POST', url, true);

	xhr.send(formData);
}

$('#add_hike_form').submit(function() {
	event.preventDefault();
	submit_form();
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

$('#add_button').click(function() {
	event.preventDefault();
	var new_field = "<input type=\"text\" name=\"directions[]\">";
	$(new_field).appendTo($("#directions_container"));
});

get_hikes();

});
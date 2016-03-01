$(document).ready(function() {

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

	// var jqxhr = $.post(url,formData,"json").done(function(data) {
	// 	var response = JSON.parse(data);
	// 	var message = response.reason;
	// 	$('#form_message').html(message);
	// }).fail(function() {
	// 	var message = "There was an error.";
	// 	$('#form_message').html(message);
	// });
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

});
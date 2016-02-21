$(document).ready(function() {

function submit_form() {
	var fields = $('#add_hike_form').serialize();
	var url = "inc/submit_form.inc.php";

	var formData = new FormData();
	var hike_name = $('#hike_name').val();
	formData.append('hike_name',hike_name);

	console.log(JSON.stringify(formData));

	alert(formData);

	var jqxhr = $.post(url,formData,"json").done(function(data) {
		var response = JSON.parse(data);
		var message = response.reason;
		$('#form_message').html(message);
	}).fail(function() {
		var message = "There was an error.";
		$('#form_message').html(message);
	});
}

$('#add_hike_form').submit(function() {
	submit_form();
	event.preventDefault();
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
})

});
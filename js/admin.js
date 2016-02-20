$(document).ready(function() {

function submit_form() {
	var fields = $('#add_hike_form').serialize();
	var url = "inc/submit_form.inc.php";

	var jqxhr = $.post(url,fields,"json").done(function(data) {
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

});
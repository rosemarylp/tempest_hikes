<?php 

require_once 'functions.inc.php';

	$url = "http://127.0.0.1:5984/tempest_hikes/_design/tempest_hikes/_view/hike_summaries";
	$hikes = json_decode(call_db($url));
	
	$output = "<ul>";

	for ($i=0; $i < count($hikes->rows); $i++) {
		$output .= "<li>" . $hikes->rows[$i]->value->name . "<ul>";
		$output .= "<li>" . $hikes->rows[$i]->value->location . "</li>";
		$output .= "<li>" . $hikes->rows[$i]->value->distance . "</li>";
		for ($j=0; $j < count($hikes->rows[$i]->value->attachments); $j++) {
			$output .= "<img src=\"http://127.0.0.1:5984/tempest_hikes/" . $hikes->rows[$i]->id . "/" . $hikes->rows[$i]->value->attachments[$j] . "\" height=200>";
		}
		$output .= "</ul>";
		$output .= "</li>";
	}

	echo $output;

 ?>
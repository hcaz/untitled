var devchache = false;

$(document).ready(function() {
	$("#loader > p").html("Loading game-play scripts<br />Do not refresh page.");
		$("head").append("<script type=\"text/javascript\" src=\"/javascript/player.js\" defer></script>");
	$("#loader > p").html("Contacting server<br />Do not refresh page.");
		player_sync();
	$("#loader").fadeOut( "slow" );
});
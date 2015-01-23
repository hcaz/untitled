$(document).ready(function() {
	$("#loader > p").html("Loading game-play scripts<br />Do not refresh page.");
		$("head").append("<script type=\"text/javascript\" src=\"/javascript/player.js\" defer></script>");
	$("#loader > p").html("Getting player details<br />Do not refresh page.");
		window.localplayer = player_set_name();
	$("#loader > p").html("Contacting server<br />Do not refresh page.");
	$("#loader").fadeOut("fast");
	player_map();
	player_sync();
	window.setInterval(function(){
		player_sync();
	}, 1000);
});
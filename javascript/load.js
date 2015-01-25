$(document).ready(function() {
	$("#loader > p").html("Loading game-play scripts<br />Do not refresh page.");
		$("head").append("<script type=\"text/javascript\" src=\"/javascript/player.js\" defer></script>");
		window.style = style_name();
		$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"/styles/"+window.style+".css\"/>");
	$("#loader > p").html("Getting player details<br />Do not refresh page.");
		window.localplayer = player_set_name();
	$("#loader > p").html("Contacting server<br />Do not refresh page.");
	$("#loader").fadeOut("fast");
	player_map();
	player_sync();
});

function style_name(){
	if (typeof $.cookie('style') === 'undefined'){
		style = prompt("Please enter a style (main, space)", "main");
		if(style!="main" && style!="space"){
			style = "main";
		}
		$.cookie("style", style, { expires: 7 });
		return style;
	} else {
		return $.cookie("style");
	}
}
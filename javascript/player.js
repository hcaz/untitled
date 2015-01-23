var players = [["test","000000",100,200]];
function player_display(){
	players.push([window.player,"000000",0,0]);
	for(var i=0;i<players.length;i++){
		player = "player_"+players[i][0];
		x = player_location_x(players[i][2]);
		y = player_location_y(players[i][3]);
		if($('#'+player).length){
			x = $('#'+player).position().left - x;
			y = $('#'+player).position().top - y;
			$('#'+player).animate({left: "+="+x, top:"+="+y}, 10000);
		}else{
			$("#players").append("<div class=\"player\" id=\""+player+"\" style=\"top:"+y+"px;left:"+x+"px;\"></div>");
		}
	}
}
function player_sync(){
	console.log("Sync");
	player_display();
}

$(document).keydown(function(e) {
	speed = 2;
	switch(e.which) {
		case 37: // left
		case 65: // a
		$('#players').animate({left: "-="+speed}, 10);
		break;

		case 38: // up
		case 87: // w
		$('#players').animate({top:"-="+speed}, 10);
		break;

		case 39: // right
		case 68: // d
		$('#players').animate({left: "+="+speed}, 10);
		break;

		case 40: // down
		case 83: // down
		$('#players').animate({top:"+="+speed}, 10);
		break;

		default: return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
});

function player_set_name(){
	if (typeof $.cookie('player') === 'undefined'){
		player = prompt("Please enter your name", "foobar");
		$.cookie("player", player, { expires: 7 });
		return player;
	} else {
		return $.cookie("player");
	}
}
function player_location_x(x){x = ($(document).width() / 2 ) + x;return x;}
function player_location_y(y){y = ($(document).height() / 2 ) + y;return y;}
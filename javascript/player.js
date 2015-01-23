var players = [["test","eee",5300,5000]];
function player_display(){
	for(var i=0;i<players.length;i++){
		player = "player_"+players[i][0];
		x = players[i][2];
		y = players[i][3];
		if($('#'+player).length){
			x = $('#'+player).position().left - x;
			y = $('#'+player).position().top - y;
			$('#'+player).animate({left: "+="+x, top:"+="+y}, 10000);
		}else{
			$("#players").append("<div class=\"player\" id=\""+player+"\" style=\"top:"+y+"px;left:"+x+"px;background: #"+players[i][4]+";\"></div>");
		}
	}
}
function player_map(){
	$("#players").append("<div class=\"player\" id=\"player_"+window.localplayer+"\" style=\"top:5000px;left:5000px;\"></div>");
	x = 5000 - ($(document).width() / 2);
	y = 5000 - ($(document).height() / 2);
	$('#players').css("left", "-"+x);
	$('#players').css("top", "-"+y);
}
function player_sync(){
	$.post("/api", {name:window.localplayer,x:$('#player_'+window.localplayer).position().left,y:$('#player_'+window.localplayer).position().top})
	.done(function(data){
		console.log( "Data Loaded: " + data );
	});
	player_display();
}

$(document).keydown(function(e) {
	speed = 4;
	switch(e.which) {
		case 39: // right
		case 68: // d
		$('#players').animate({left: "-="+speed}, 10);
		$('#player_'+window.localplayer).animate({left: "+="+speed}, 10);
		break;

		case 40: // down
		case 83: // down
		$('#players').animate({top:"-="+speed}, 10);
		$('#player_'+window.localplayer).animate({top:"+="+speed}, 10);
		break;

		case 37: // left
		case 65: // a
		$('#players').animate({left: "+="+speed}, 10);
		$('#player_'+window.localplayer).animate({left: "-="+speed}, 10);
		break;

		case 38: // up
		case 87: // w
		$('#players').animate({top:"+="+speed}, 10);
		$('#player_'+window.localplayer).animate({top:"-="+speed}, 10);
		break;
		default: return; // exit this handler for other keys
	}
	
	if($('#player_'+window.localplayer).position().left > 10000 || $('#player_'+window.localplayer).position().left < 0 || $('#player_'+window.localplayer).position().top > 10000 || $('#player_'+window.localplayer).position().top < 0){
		x = 5000 - ($(document).width() / 2);
		y = 5000 - ($(document).height() / 2);
		$('#players').css("left", "-"+x);
		$('#players').css("top", "-"+y);
		
		$('#player_'+window.localplayer).css("left", "5000");
		$('#player_'+window.localplayer).css("top", "5000");
		alert("Out of bounds!");
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
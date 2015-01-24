var players = [["fill","000000",10000,10000]];
function player_display(){
	for(var i=0;i<players.length;i++){
		if(players[i][0]!=window.localplayer){
			player = "player_"+players[i][0];
			x = players[i][2];
			y = players[i][3];
			if($('#'+player).length){
				if($('#'+player).position().left != x || $('#'+player).position().top != y){
					x = x - $('#'+player).position().left;
					y = y - $('#'+player).position().top;
					$('#'+player).animate({left: "+="+x, top:"+="+y}, 1);
				}
			}else{
				$("#players").append("<div class=\"player\" id=\""+player+"\" style=\"top:"+y+"px;left:"+x+"px;background:#"+players[i][1]+";\"><span class=\"bubble\">"+players[i][0]+"</span></div>");
			}
		}
	}
}
function player_map(){
	$("#players").append("<div class=\"player\" id=\"player_"+window.localplayer+"\" style=\"top:5000px;left:5000px;background:#000000;\"><span class=\"bubble\">"+window.localplayer+"</span></div>");
	x = 5000 - ($(document).width() / 2);
	y = 5000 - ($(document).height() / 2);
	$('#players').css("left", "-"+x);
	$('#players').css("top", "-"+y);
}
function player_sync(){
	xpos = $('#player_'+window.localplayer).position().left;
	ypos = $('#player_'+window.localplayer).position().top;
	
	$.ajax({
		type: "POST",
		url: "/api/index.php?cache="+Math.round(new Date().getTime() / 1000),
		data: { playerx: xpos, playery: ypos }
	}).done(function( msg ) {
		players = jQuery.parseJSON(msg);
		player_sync();
	});
	
	player_display();
}

$(document).keydown(function(e) {
	speed = 4;
	switch(e.which) {
		case 39: // right
		case 68: // d
		$('#players').animate({left: "-="+speed}, 1);
		$('#player_'+window.localplayer).animate({left: "+="+speed}, 1);
		break;

		case 40: // down
		case 83: // down
		$('#players').animate({top:"-="+speed}, 1);
		$('#player_'+window.localplayer).animate({top:"+="+speed}, 1);
		break;

		case 37: // left
		case 65: // a
		$('#players').animate({left: "+="+speed}, 1);
		$('#player_'+window.localplayer).animate({left: "-="+speed}, 1);
		break;

		case 38: // up
		case 87: // w
		$('#players').animate({top:"+="+speed}, 1);
		$('#player_'+window.localplayer).animate({top:"-="+speed}, 1);
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
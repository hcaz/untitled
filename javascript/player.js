var players = [["fill",false,10000,10000]];
function player_display(){
	var currentPlayers = [];
	for(var i=0;i<players.length;i++){
		if(players[i][0]!=window.localplayer){
			currentPlayers[players[i][0]] = true;
			player = "player_"+players[i][0];
			x = players[i][2];
			y = players[i][3];
			if(players[i][1]){
				background = "FF3300";
			}else{
				background = "66FF00";
			}
			if($('#'+player).length){
				$("#table_"+player).html("<td>"+players[i][0]+"</td><td>"+x+","+y+"</td>");
				x = x - $('#'+player).position().left;
				y = y - $('#'+player).position().top;
				$('#'+player).animate({left: "+="+x, top:"+="+y, backgroundColor: "#"+background}, 1);
			}else{
				$("#players").append("<div class=\"player\" id=\""+player+"\" style=\"top:"+y+"px;left:"+x+"px;background:#"+background+";\"><span class=\"bubble\">"+players[i][0]+"</span></div>");
				if(players[i][0]!="fill"){$('#playerlist').append("<tr class=\"playerlistAdd\" id=\"table_"+player+"\"><td>"+players[i][0]+"</td><td>X</td><td>"+x+","+y+"</td></tr>");}
			}
		}else{
			if(players[i][1]){
				background = "FF3300";
			}else{
				background = "66FF00";
			}
			$('#player_'+player).animate({backgroundColor: "#"+background}, 1);
			window.tagVar = players[i][0];
		}
	}
	$(".player").each(function(index){
		if(currentPlayers[$(this).text()]!=true && $(this).text()!="fill" && $(this).text()!=window.localplayer){
			$("#player_"+$(this).text()).remove();
			$("#table_player_"+$(this).text()).remove();
		}
	});
}
function player_map(){
	$('#playerlist').append("<tr id=\"table_"+window.localplayer+"\"><td>"+window.localplayer+"</td><td>5000,5000</td></tr>");
	$("#players").append("<div class=\"player\" id=\"player_"+window.localplayer+"\" style=\"top:5000px;left:5000px;background:#000000;\"><span class=\"bubble\">"+window.localplayer+"</span></div>");
	x = 5000 - ($(document).width() / 2);
	y = 5000 - ($(document).height() / 2);
	$('#players').css("left", "-"+x);
	$('#players').css("top", "-"+y);
	$('#players').fadeIn("fast");
	$('#playerlist').fadeIn("fast");
}
$("#playerlist").click(function() {
	$(".playerlistAdd").fadeToggle("slow", "linear");
});
function player_cross(){
	$(".player").each(function(index){
		if($(this).text()!="fill" && $(this).text()!=window.localplayer){
			if(overlaps( $('#player_'+window.localplayer), this )){
				$.ajax({
					type: "POST",
					url: "/api/index.php?cache="+Math.round(new Date().getTime() / 1000),
					data: { tig: "true", playertag: $(this).text() }
				}).done(function( msg ) {
					players = jQuery.parseJSON(msg);
					player_sync();
				});
			}
		}
	});
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
	if(window.tagVar==true){
		player_cross();
	}
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
	$("#table_"+window.localplayer).html("<td>"+window.localplayer+"</td><td>"+$('#player_'+window.localplayer).position().left+","+$('#player_'+window.localplayer).position().top+"</td>");
	
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

var overlaps = (function () {
    function getPositions( elem ) {
        var pos, width, height;
        pos = $( elem ).position();
        width = $( elem ).width();
        height = $( elem ).height();
        return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
    }

    function comparePositions( p1, p2 ) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function ( a, b ) {
        var pos1 = getPositions( a ),
            pos2 = getPositions( b );
        return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
    };
})();
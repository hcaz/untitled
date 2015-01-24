var players = [["fill",false,2000,2000]];
function player_display(){
	var currentPlayers = [];
	for(var i=0;i<players.length;i++){
		if(players[i][0]!=window.localplayer){
			currentPlayers[players[i][0]] = true;
			player = "player_"+players[i][0];
			x = players[i][2];
			y = players[i][3];
			if(players[i][1]=="y"){
				background = "tig";
			}else{
				background = "normal";
			}
			if($('#'+player).length){
				$("#table_"+player).html("<td>"+players[i][0]+"</td><td>"+x+","+y+"</td>");
				x = x - $('#'+player).position().left;
				y = y - $('#'+player).position().top;
				$('#'+player).animate({left: "+="+x, top:"+="+y}, 1);
				$('#'+player).removeClass("player_me player_tig player_normal");
				$('#'+player).addClass("player_"+background);
			}else{
				$("#players").append("<div class=\"player player_"+background+"\" id=\""+player+"\" style=\"top:"+y+"px;left:"+x+"px;\"><span class=\"bubble\">"+players[i][0]+"</span></div>");
				if(players[i][0]!="fill"){$('#playerlist').append("<tr class=\"playerlistAdd\" id=\"table_"+player+"\"><td>"+players[i][0]+"</td><td>X</td><td>"+x+","+y+"</td></tr>");}
			}
		}else{
			if(players[i][1]=="y"){
				background = "tig";
			}else{
				background = "me";
			}
			$('#player_'+players[i][0]).removeClass("player_me player_tig player_normal");
			$('#player_'+players[i][0]).addClass("player_"+background);
			window.tagVar = players[i][1];
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
	$('#playerlist').append("<tr id=\"table_"+window.localplayer+"\"><td>"+window.localplayer+"</td><td>1000,1000</td></tr>");
	$("#players").append("<div class=\"player player_me\" id=\"player_"+window.localplayer+"\" style=\"top:1000px;left:1000px;\"><span class=\"bubble\">"+window.localplayer+"</span></div>");
	x = 1000 - ($(document).width() / 2);
	y = 1000 - ($(document).height() / 2);
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
	vartime = (new Date).getTime();
	if(window.tagVar=="y"){
		player_cross();
	}
}

$(document).keydown(function(e) {
	if(window.tagVar=="y"){
		speed = 20;
	}else{
		speed = 10;
	}
	switch(e.which) {
		case 39: // right
		case 68: // d
		if($('#player_'+window.localplayer).position().left < 1950){
			$('#players').animate({left: "-="+speed}, 1);
			$('#player_'+window.localplayer).animate({left: "+="+speed}, 1);
		}
		break;

		case 40: // down
		case 83: // down
		if($('#player_'+window.localplayer).position().top < 1950){
			$('#players').animate({top:"-="+speed}, 1);
			$('#player_'+window.localplayer).animate({top:"+="+speed}, 1);
		}
		break;

		case 37: // left
		case 65: // a
		if($('#player_'+window.localplayer).position().left > 25){
			$('#players').animate({left: "+="+speed}, 1);
			$('#player_'+window.localplayer).animate({left: "-="+speed}, 1);
		}
		break;

		case 38: // up
		case 87: // w
		if($('#player_'+window.localplayer).position().top > 25){
			$('#players').animate({top:"+="+speed}, 1);
			$('#player_'+window.localplayer).animate({top:"-="+speed}, 1);
		}
		break;
		default: return; // exit this handler for other keys
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
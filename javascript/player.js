var players = [["Me","000000",0,0]];
function player_display(){
	for(var i=0;i<players.length;i++){
		$("#players").append("<div class=\"player\" id=\"player_"+players[i][0]+"\" style=\"top:0px;left:0px;\"></div>");
	}
}
function player_move(){
	
}
function player_sync(){
	player_display();
}
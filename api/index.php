<?php
$conn = new mysqli("localhost", "untitled_main", "randompassword", "untitled_main");
if($_REQUEST['player']!=""){
	$result = $conn->query("SELECT `ID` FROM `PLAYERS` WHERE `HANDLE` = '".$_REQUEST['player']."';");
	if($result->num_rows == 0){
		$result = $conn->query("INSERT INTO `PLAYERS` (`HANDLE`, `COLOR`, `X`, `Y`, `STAMP`) VALUES ('".$_REQUEST['player']."', 'eeeeee', '".$_REQUEST['playerx']."', '".$_REQUEST['playery']."', UNIX_TIMESTAMP(NOW()));");
	}else{
		$result = $conn->query("UPDATE `PLAYERS` SET `X` = '".$_REQUEST['playerx']."', `Y` = '".$_REQUEST['playery']."' WHERE `HANDLE` = '".$_REQUEST['player']."';");
	}
}
$result = $conn->query("SELECT `HANDLE`, `COLOR`, `X`, `Y` FROM `PLAYERS`;");// WHERE `STAMP` > '".(time()-300)."'
while($row = $result->fetch_assoc()) {
	$players[] = array($row["HANDLE"],$row["COLOR"],$row["X"],$row["Y"]);
}
echo json_encode($players);
<?php
$conn = new mysqli("localhost", "untitled_main", "randompassword", "untitled_main");
if($_REQUEST['tig']=="true"){
	$result = $conn->query("SELECT `ID` FROM `PLAYERS` WHERE `TAGGED` > '".(time()-10)."';");
	if(mysqli_num_rows($result)==0){
		$conn->query("UPDATE `PLAYERS` SET `COLOR` = 'n';");
		$conn->query("UPDATE `PLAYERS` SET `COLOR` = 'y', `TAGGED` = UNIX_TIMESTAMP(NOW()), `COUNT` = `COUNT` + 1 WHERE `HANDLE` = '".$_REQUEST['playertag']."';");
		$players[] = "true";
	}
}else{
	$result = $conn->query("SELECT `ID` FROM `PLAYERS` WHERE `STAMP` > '".(time()-30)."' AND `COLOR` = 'y';");
	if(mysqli_num_rows($result)==0){
		$conn->query("UPDATE `PLAYERS` SET `COLOR` = 'n';");
		$result = $conn->query("SELECT `ID` FROM `PLAYERS` WHERE `STAMP` > '".(time()-30)."';");
		while($row = $result->fetch_assoc()){
			$id[] = $row['ID'];
		}
		$idR = array_rand($id);
		$id = $id[$idR];
		$conn->query("UPDATE `PLAYERS` SET `COLOR` = 'y' WHERE `ID` = '".$id."';");
	}
	if($_REQUEST['player']!=""){
		$result = $conn->query("SELECT `ID` FROM `PLAYERS` WHERE `HANDLE` = '".$_REQUEST['player']."';");
		if($result->num_rows == 0){
			$result = $conn->query("INSERT INTO `PLAYERS` (`HANDLE`, `COLOR`, `X`, `Y`, `STAMP`) VALUES ('".$_REQUEST['player']."', '999999', '".$_REQUEST['playerx']."', '".$_REQUEST['playery']."', UNIX_TIMESTAMP(NOW()));");
		}else{
			$result = $conn->query("UPDATE `PLAYERS` SET `X` = '".$_REQUEST['playerx']."', `Y` = '".$_REQUEST['playery']."', `STAMP` = UNIX_TIMESTAMP(NOW()) WHERE `HANDLE` = '".$_REQUEST['player']."';");
		}
	}
	$result = $conn->query("SELECT `HANDLE`, `COLOR`, `X`, `Y` FROM `PLAYERS` WHERE `STAMP` > '".(time()-30)."';");
	while($row = $result->fetch_assoc()) {
		$players[] = array($row["HANDLE"],$row["COLOR"],$row["X"],$row["Y"],false);
	}
}
echo json_encode($players);
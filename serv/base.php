<?php
	function dbconn() {
		//$db = mysqli_connect("mysql.hostinger.ru", "u423387145_crosh", "glos2ar12", "u423387145_money");
		$db = mysqli_connect("localhost", "root", "glos2ar12", "money");
		return $db;
	}
?>
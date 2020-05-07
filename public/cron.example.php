x
<?php
	$servername = "localhost";
	$username = "weather";
	$password = "****";

	try {
	  $conn = new PDO("mysql:host=$servername;dbname=weather", $username, $password);
  	  // set the PDO error mode to exception
  	  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  	  echo "Connected successfully";
	} catch(PDOException $e) {
  	  echo "Connection failed: " . $e->getMessage();
	}

	$sql = "TRUNCATE api_datas";
	$sql = "TRUNCATE api_data_16days ";

	// use exec() because no results are returned
	$conn->exec($sql);
	echo "<br>Records deleted successfully";


?>

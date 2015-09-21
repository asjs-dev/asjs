<?php
	include_once( "builder/buildJS.php" );
	$buildJS = new BuildJS();
	
	header( "Content-type: text/javascript" );
	echo $buildJS->build( "bin/", "js/normal/com/asjs/Application.js", "bin/js/min/application.js" );
?>

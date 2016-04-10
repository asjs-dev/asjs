<?php
	$minimizeCL		= readline( "minimize script: " );
	$watchingCL		= readline( "watching modifications: " );
	
	$minimize		= $minimizeCL == "true";
	$watching		= $watchingCL == "true";
	
	$projectFolder	= "bin/";
	$jsFolder		= "js/";
	$inputFolder	= $jsFolder . "normal/";
	$outputFolder	= $projectFolder . $jsFolder . "min/";
	$watcherPath	= $projectFolder . $inputFolder;
	
	include_once( "builder/colors.php" );
	$colors = new Colors();
	
	include_once( "builder/buildJS.php" );
	$buildJS = new BuildJS();
	
	$build = function() {
		global $buildJS, $projectFolder, $inputFolder, $outputFolder, $minimize, $colors;
		
		echo date( "H:i:s" ) . "	";
		
		try {
			$buildJS->build( $projectFolder, $inputFolder . "com/asjs/Application.js", $outputFolder . "application.js", $minimize );
			echo $colors->getColoredString( "build complete", "yellow" );
		} catch( Exception $e ) {
			echo $colors->getColoredString( $e->getMessage(), "light_red" );
		}
		
		echo "\n";
	};
	
	function watching() {
		global $watcherPath, $build;
		
		$timeoutCL		= readline( "watcher timeout: " );
		$timeout		= max( 1, (int)$timeoutCL );
		
		system( 'clear' );
		
		ini_set( 'xdebug.max_nesting_level', -1 );
		include_once( "builder/watcher.php" );
		
		$watcher = new Watcher();
		$watcher->setCallback( $build );
		$watcher->setPathToWatch( $watcherPath );
		$watcher->setWaitingMessage( "waiting: " );
		$watcher->startWatching( $timeout );
		
		ini_set( 'xdebug.max_nesting_level', 100 );
	}
	
	if ( $watching ) watching();
	else call_user_func( $build );
	
	$buildJS->clearCache();
?>
